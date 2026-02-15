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
    const result = await imagekitClient.files.upload({
      file: input.file,
      fileName: input.fileName,
      folder: "/reflecto-app",
    });

    return result as ImageKitUploadResponse;
  }

  async deleteFile(fileId: string): Promise<void> {
    await imagekitClient.files.delete(fileId);
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
