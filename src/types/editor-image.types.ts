export interface EditorImageAttributes {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  fileId?: string;
}

export type ImageUploadStatus = "idle" | "uploading" | "success" | "error";

export interface ImageUploadState {
  status: ImageUploadStatus;
  progress: number;
  error?: string;
}
