import "server-only";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { collections } from "@/db/schema/collection";
import { getSession } from "@/lib/session";

export async function getCollectionsFromUser() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, session.user.id));

  return data;
}
