import { storageService } from "./storage.service";

export class UploadService {
  /**
   * Orchestrates the upload flow:
   * 1. Validates file constraints
   * 2. Gets presigned URL
   * 3. (Optional) Handles server-side processing like resizing
   */
  async prepareUpload(userId: string, fileName: string, fileType: string) {
    // Add validation logic here (size limits, etc.)
    return storageService.getPresignedUrl(userId, fileName, fileType);
  }
}

export const uploadService = new UploadService();
