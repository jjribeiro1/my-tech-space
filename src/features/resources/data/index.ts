import "server-only";
import { redirect } from "next/navigation";
import { asc, count, eq } from "drizzle-orm";
import { db } from "@/db";
import { resourceTypes } from "@/db/schema/resource-type";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";

export async function getResourceCountFromCollection(collectionId: string) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await db
    .select({ count: count() })
    .from(resources)
    .where(eq(resources.collectionId, collectionId));

  return data[0].count;
}

export async function getAllResourceTypes() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await db
    .select()
    .from(resourceTypes)
    .orderBy(asc(resourceTypes.name));

  return data;
}
