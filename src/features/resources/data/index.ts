import "server-only";
import { redirect } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { resourceTypes } from "@/db/schema/resource-type";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";

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

export async function getResourceByCollection(collectionId: string) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await db
    .select()
    .from(resources)
    .where(eq(resources.collectionId, collectionId))
    .orderBy(desc(resources.created_at));

  return data;
}
