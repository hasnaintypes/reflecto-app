import { storageService } from "./storage.service";
import type { ImageKitUploadResponse } from "@/server/types/imagekit.types";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const FILE_SIGNATURES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
  "image/gif": [0x47, 0x49, 0x46],
  "image/webp": [0x52, 0x49, 0x46, 0x46],
};

const MAX_FILENAME_LENGTH = 200;

function validateFileSignature(base64Data: string, fileType: string): boolean {
  const expectedSignature = FILE_SIGNATURES[fileType];
  if (!expectedSignature) return false;

  // Strip data URI prefix if present
  const raw = base64Data.includes(",") ? base64Data.split(",")[1]! : base64Data;
  const bytes = Buffer.from(raw, "base64");

  if (bytes.length < expectedSignature.length) return false;

  return expectedSignature.every((byte, i) => bytes[i] === byte);
}

function sanitizeFileName(fileName: string): string {
  // Remove path traversal sequences and directory separators
  const safe = fileName.replace(/\.\.\//g, "").replace(/[/\\]/g, "");

  // Extract extension
  const lastDot = safe.lastIndexOf(".");
  const ext = lastDot > 0 ? safe.slice(lastDot + 1).toLowerCase() : "";

  // Remove special characters, keep only alphanumeric, hyphens, underscores
  const name = safe
    .slice(0, lastDot > 0 ? lastDot : undefined)
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, MAX_FILENAME_LENGTH);

  const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 10);

  return `${Date.now()}-${name || "upload"}.${safeExt || "bin"}`;
}

export class UploadService {
  async uploadImage(
    userId: string,
    file: string, // base64 encoded file data
    fileName: string,
    fileType: string,
    fileSize: number,
  ): Promise<ImageKitUploadResponse> {
    if (fileSize > MAX_IMAGE_SIZE) {
      throw new Error(
        `File size exceeds ${MAX_IMAGE_SIZE / 1024 / 1024}MB limit`,
      );
    }

    // Validate actual base64 data size (base64 inflates by ~33%)
    const raw = file.includes(",") ? file.split(",")[1]! : file;
    const actualSize = Math.ceil(raw.length * 0.75);
    if (actualSize > MAX_IMAGE_SIZE) {
      throw new Error(
        `Actual file size exceeds ${MAX_IMAGE_SIZE / 1024 / 1024}MB limit`,
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
      throw new Error(
        `File type ${fileType} not allowed. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      );
    }

    if (!validateFileSignature(file, fileType)) {
      throw new Error(
        "File content does not match the declared file type",
      );
    }

    const safeFileName = sanitizeFileName(fileName);

    return storageService.uploadFile({
      file,
      fileName: safeFileName,
      folder: `/users/${userId}`,
    });
  }

  generateThumbnailUrl(filePath: string): string {
    return storageService.getFileUrl(filePath, {
      w: "300",
      q: "80",
    });
  }
}

export const uploadService = new UploadService();
