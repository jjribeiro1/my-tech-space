import "server-only";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { collections } from "@/db/schema/collection";

export async function getCollectionsFromUser(userId: string) {
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

export async function getCollectionFromUserBySlug(
  slug: string,
  userId: string,
) {
  const data = await db
    .select()
    .from(collections)
    .where(
      and(
        eq(collections.slug, slug),
        eq(collections.userId, userId),
        isNull(collections.deleted_at),
      ),
    )
    .limit(1);
  return data[0];
}
