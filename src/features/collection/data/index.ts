import "server-only";
import { cacheTag } from "next/cache";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { collections } from "@/db/schema/collection";

export const COLLECTIONS_CACHE_TAG = "collections-from-user";
export async function getCollectionsFromUser(userId: string) {
  "use cache";
  cacheTag(COLLECTIONS_CACHE_TAG);

  const data = await db
    .select({
      id: collections.id,
      name: collections.name,
      slug: collections.slug,
      description: collections.description,
      isPrivate: collections.isPrivate,
      userId: collections.userId,
      created_at: collections.created_at,
      updated_at: collections.updated_at,
      deleted_at: collections.deleted_at,
      resourceCount: db.$count(
        resources,
        and(
          eq(resources.collectionId, collections.id),
          isNull(resources.deleted_at),
        ),
      ),
    })
    .from(collections)
    .where(and(eq(collections.userId, userId), isNull(collections.deleted_at)))
    .orderBy(desc(collections.created_at));
  return data;
}
