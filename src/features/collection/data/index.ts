import "server-only";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { collections } from "@/db/schema/collection";
import { getSession } from "@/lib/session";

const collectionsFromUser = cache(
  async (userId: string) => {
    const data = await db
      .select()
      .from(collections)
      .where(
        and(eq(collections.userId, userId), isNull(collections.deleted_at)),
      );

    return data;
  },
  [],
  { revalidate: 60 * 10, tags: ["create-collection", "delete-collection"] },
);

export async function getCollectionsFromUser() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const data = await collectionsFromUser(session.user.id);

  return data;
}
