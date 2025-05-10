import "server-only";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { collections } from "@/db/schema/collection";
import { getSession } from "@/lib/session";

async function fetchCollectionsFromUser(userId: string) {
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

export async function getCollectionsFromUser() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;
  const keyParts = ["collectionsFromUser", userId];
  const cachedFetcher = cache(
    () => fetchCollectionsFromUser(userId),
    keyParts,
    {
      revalidate: 60 * 10,
      tags: [
        "create-collection",
        "delete-collection",
        "update-collection",
        "create-resource",
        "delete-resource",
      ],
    },
  );

  return cachedFetcher();
}
