export type Resource = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  isFavorite: boolean | null;
  resourceTypeId: string | null;
  collectionId: string | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export type ResourceType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
