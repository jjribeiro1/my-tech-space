"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";

export async function toggleFavoriteResourceAction(
  id: string,
): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session) {
      redirect("/auth/login");
    }

    const resource = await db
      .select({ isFavorite: resources.isFavorite })
      .from(resources)
      .where(and(eq(resources.userId, session.user.id), eq(resources.id, id)));

    if (!resource) {
      return {
        message: "Resource not found",
        success: false,
      };
    }

    const resourceIsFavorite = resource[0].isFavorite;

    await db
      .update(resources)
      .set({ isFavorite: resourceIsFavorite ? false : true })
      .where(and(eq(resources.userId, session.user.id), eq(resources.id, id)));

    revalidateTag("toggle-favorite", "max");

    return {
      message: resourceIsFavorite
        ? "Resource removed from favorites"
        : "Resource added to favorites",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
