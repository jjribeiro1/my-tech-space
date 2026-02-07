import "server-only";
import { cacheTag } from "next/cache";
import { and, asc, desc, eq, ilike, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resourceTypes } from "@/db/schema/resource-type";
import { resources } from "@/db/schema/resource";
import { GetResourcesFilters } from "./types";

export const RESOURCES_CACHE_TAG = "resources-from-user";
export const RESOURCE_TYPES_CACHE_TAG = "resource-types";

export async function getAllResourceTypes() {
  "use cache";
  cacheTag(RESOURCE_TYPES_CACHE_TAG);
  const data = await db
    .select()
    .from(resourceTypes)
    .orderBy(asc(resourceTypes.name));

  return data;
}

export async function getResourcesFromUser(
  userId: string,
  filters: GetResourcesFilters,
) {
  "use cache";
  cacheTag(RESOURCES_CACHE_TAG);

  const data = await db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.userId, userId),
        isNull(resources.deleted_at),
        filters?.collectionId
          ? eq(resources.collectionId, filters.collectionId)
          : undefined,
        filters?.isFavorite === "true"
          ? eq(resources.isFavorite, true)
          : undefined,
        filters?.search && filters.search.length > 0
          ? ilike(resources.title, `%${filters.search}%`)
          : undefined,
      ),
    )
    .orderBy(desc(resources.created_at))
    .limit(filters.limit);

  return data;
}
