export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isPrivate: boolean;
  userId: string | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
};
