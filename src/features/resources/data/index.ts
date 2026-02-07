import "server-only";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { and, asc, desc, eq, ilike, isNull } from "drizzle-orm";
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

async function resolveUserId(userId?: string) {
  if (userId) {
    return userId;
  }

  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  return session.user.id;
}

export async function getResources(
  filters: GetResourcesFilters,
  userId?: string,
) {
  const resolvedUserId = await resolveUserId(userId);
  const keyParts = [
    resolvedUserId,
    filters?.collectionId ?? "",
    filters?.isFavorite ?? "",
    filters?.search ?? "",
    String(filters.limit),
  ];

  const cachedFetcher = cache(
    () => fetchResources(resolvedUserId, filters),
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
