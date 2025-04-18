import "server-only";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resourceTypes } from "@/db/schema/resource-type";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";

const resourceTypesData = cache(
  async () => {
    const data = await db
      .select()
      .from(resourceTypes)
      .orderBy(asc(resourceTypes.name));

    return data;
  },
  [],
  { revalidate: 60 * 60, tags: ["new-type"] },
);

export async function getAllResourceTypes() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await resourceTypesData();

  return data;
}

const resourcesByCollection = cache(
  async (collectionId: string) => {
    const data = await db
      .select()
      .from(resources)
      .where(
        and(
          eq(resources.collectionId, collectionId),
          isNull(resources.deleted_at),
        ),
      )
      .orderBy(desc(resources.created_at));

    return data;
  },
  [],
  {
    revalidate: 60 * 10,
    tags: ["create-resource", "update-resource", "delete-resource"],
  },
);

export async function getResourcesByCollection(collectionId: string) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await resourcesByCollection(collectionId);

  return data;
}

const latestResources = cache(
  async (userId: string) => {
    const data = await db
      .select()
      .from(resources)
      .where(and(eq(resources.userId, userId), isNull(resources.deleted_at)))
      .orderBy(desc(resources.created_at))
      .limit(5);

    return data;
  },
  [],
  {
    tags: ["create-resource", "update-resource", "delete-resource"],
  },
);

export async function getLatestResources() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await latestResources(session.user.id)

  return data
}
