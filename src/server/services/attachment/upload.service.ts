import { storageService } from "./storage.service";
import type { ImageKitUploadResponse } from "@/server/types/imagekit.types";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

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

    if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
      throw new Error(
        `File type ${fileType} not allowed. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      );
    }

    return storageService.uploadFile({
      file,
      fileName,
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
