export interface IStorageService {
  /**
   * Generate a presigned URL for client-side upload
   */
  getPresignedUrl(
    userId: string,
    fileName: string,
    fileType: string,
  ): Promise<{ uploadUrl: string; fileUrl: string }>;

  /**
   * Delete a file from storage
   */
  deleteFile(fileUrl: string): Promise<void>;
}

/**
 * Mock Storage Service (to be replaced with S3/Vercel Blob)
 */
export class MockStorageService implements IStorageService {
  async getPresignedUrl(userId: string, fileName: string, _fileType: string) {
    // In a real app, this would use S3 presigned Post or Vercel Blob put
    const key = `uploads/${userId}/${Date.now()}-${fileName}`;
    return {
      uploadUrl: `https://fake-s3-upload.com/${key}`,
      fileUrl: `https://fake-cdn.com/${key}`,
    };
  }

  async deleteFile(fileUrl: string) {
    console.log(`Deleting file from storage: ${fileUrl}`);
  }
}

export const storageService = new MockStorageService();
