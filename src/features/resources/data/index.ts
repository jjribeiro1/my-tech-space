import "server-only";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resourceTypes } from "@/db/schema/resource-type";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { GetResourcesFilters } from "./types";

async function fetchResourceTypes() {
  const data = await db
    .select()
    .from(resourceTypes)
    .orderBy(asc(resourceTypes.name));

  return data;
}

export async function getAllResourceTypes() {
  const cachedFetcher = cache(() => fetchResourceTypes(), [], {
    revalidate: 60 * 60,
  });

  return cachedFetcher();
}

async function fetchResourcesByCollection(
  userId: string,
  collectionId: string,
  filters: GetResourcesFilters,
) {
  const data = await db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.collectionId, collectionId),
        eq(resources.userId, userId),
        isNull(resources.deleted_at),
        filters?.isFavorite === "true"
          ? eq(resources.isFavorite, true)
          : undefined,
      ),
    )
    .orderBy(desc(resources.created_at));

  return data;
}

export async function getResourcesByCollection(
  collectionId: string,
  filters: GetResourcesFilters,
) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;
  const keyParts = [userId, collectionId, JSON.stringify(filters)];

  const cachedFetcher = cache(
    () => fetchResourcesByCollection(userId, collectionId, filters),
    keyParts,
    {
      revalidate: 60 * 10,
      tags: [
        "create-resource",
        "update-resource",
        "delete-resource",
        "toggle-favorite",
      ],
    },
  );

  return cachedFetcher();
}

async function fetchLatestResources(
  userId: string,
  filters: GetResourcesFilters,
) {
  const data = await db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.userId, userId),
        isNull(resources.deleted_at),
        filters?.isFavorite === "true"
          ? eq(resources.isFavorite, true)
          : undefined,
      ),
    )
    .orderBy(desc(resources.created_at))
    .limit(5);

  return data;
}

export async function getLatestResources(filters: GetResourcesFilters) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;
  const keyParts = ["latest-resources", userId, JSON.stringify(filters)];

  const cachedFetcher = cache(
    () => fetchLatestResources(userId, filters),
    keyParts,
    {
      tags: [
        "create-resource",
        "update-resource",
        "delete-resource",
        "toggle-favorite",
      ],
      revalidate: 60 * 10,
    },
  );

  return cachedFetcher();
}
