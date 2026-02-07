"use server";
import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { and, eq } from "drizzle-orm";
import { collections } from "@/db/schema/collection";
import { resources } from "@/db/schema/resource";
import { COLLECTIONS_CACHE_TAG } from "../data";

export async function deleteCollectionAction(
  id: string,
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const now = new Date();

    await db
      .update(collections)
      .set({ deleted_at: now })
      .where(
        and(eq(collections.id, id), eq(collections.userId, session.user.id)),
      );

    await db
      .update(resources)
      .set({ deleted_at: now })
      .where(
        and(
          eq(resources.collectionId, id),
          eq(resources.userId, session.user.id),
        ),
      );

    updateTag(COLLECTIONS_CACHE_TAG);

    return {
      success: true,
      message: "Collection deleted successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
