export type Resource = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  resourceTypeId: string | null;
  collectionId: string | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
};
