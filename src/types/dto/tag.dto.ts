export interface TagHistoryDTO {
  id: string;
  name: string;
  usageCount: number;
}

export interface TagCloudDTO {
  tags: TagHistoryDTO[];
}
