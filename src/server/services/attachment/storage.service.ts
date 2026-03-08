import { imagekitClient } from "@/lib/imagekit/client";
import type {
  ImageKitUploadResponse,
  ImageUploadInput,
} from "@/server/types/imagekit.types";
import { env } from "@/env";

export interface IStorageService {
  uploadFile(input: ImageUploadInput): Promise<ImageKitUploadResponse>;
  deleteFile(fileId: string): Promise<void>;
  getFileUrl(
    filePath: string,
    transformations?: Record<string, string>,
  ): string;
}

export class ImageKitStorageService implements IStorageService {
  async uploadFile(input: ImageUploadInput): Promise<ImageKitUploadResponse> {
    try {
      const result = await imagekitClient.files.upload({
        file: input.file,
        fileName: input.fileName,
        folder: "/reflecto-app",
      });
      return result as ImageKitUploadResponse;
    } catch (error) {
      console.error("Storage upload failed:", error);
      throw new Error(
        `Failed to upload file: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await imagekitClient.files.delete(fileId);
    } catch (error) {
      console.error("Storage delete failed:", error);
      throw new Error(
        `Failed to delete file: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  getFileUrl(
    filePath: string,
    transformations?: Record<string, string>,
  ): string {
    const url = `${env.IMAGEKIT_URL_ENDPOINT}/${filePath}`;
    if (!transformations) return url;

    const transformStr = Object.entries(transformations)
      .map(([key, value]) => `${key}-${value}`)
      .join(",");

    return `${env.IMAGEKIT_URL_ENDPOINT}/tr:${transformStr}/${filePath}`;
  }
}

export const storageService = new ImageKitStorageService();
