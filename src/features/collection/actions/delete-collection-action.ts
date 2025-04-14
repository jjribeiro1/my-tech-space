"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { db } from "@/db";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { and, eq } from "drizzle-orm";
import { collections } from "@/db/schema/collection";

export async function deleteCollectionAction(
  id: string,
): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session) {
      redirect("/auth/login");
    }

    await db
      .delete(collections)
      .where(
        and(eq(collections.id, id), eq(collections.userId, session.user.id)),
      );

    revalidateTag("delete-collection");

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
