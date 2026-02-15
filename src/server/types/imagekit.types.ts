export interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
  AITags: string[] | null;
  description: string | null;
}

export interface ImageUploadInput {
  file: string; // base64 encoded file data
  fileName: string;
  folder?: string;
}
