import "server-only";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { and, asc, count, desc, eq, ilike, isNull } from "drizzle-orm";
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

async function fetchResources(userId: string, filters: GetResourcesFilters) {
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

export async function getResources(filters: GetResourcesFilters) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;
  const keyParts = [
    userId,
    filters?.collectionId ?? "",
    filters?.isFavorite ?? "",
    filters?.search ?? "",
    String(filters.limit),
  ];

  const cachedFetcher = cache(() => fetchResources(userId, filters), keyParts, {
    revalidate: 60 * 10,
    tags: [
      "create-resource",
      "update-resource",
      "delete-resource",
      "toggle-favorite",
    ],
  });

  return cachedFetcher();
}

async function fetchFavoritesResourceCount(userId: string) {
  const data = await db
    .select({ value: count(resources.id) })
    .from(resources)
    .where(
      and(
        eq(resources.userId, userId),
        eq(resources.isFavorite, true),
        isNull(resources.deleted_at),
      ),
    );

  return data[0].value;
}

export async function getFavoritesResourceCount() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.id;
  const keyParts = ["favorites-count", userId];

  const cachedFetcher = cache(
    () => fetchFavoritesResourceCount(userId),
    keyParts,
    { revalidate: 60 * 10, tags: ["update-resource", "delete-resource"] },
  );

  return cachedFetcher();
}
