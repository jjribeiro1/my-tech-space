"use server";
import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";

const schema = z.object({
  id: z.uuid(),
});

export async function toggleFavoriteResourceAction(
  id: string,
): Promise<ActionResponse> {
  const validatedData = schema.safeParse({ id });

  if (!validatedData.success) {
    return {
      success: false,
      message: "Something went wrong, invalid data",
    };
  }

  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const resource = await db
      .select({ isFavorite: resources.isFavorite })
      .from(resources)
      .where(
        and(
          eq(resources.userId, session.user.id),
          eq(resources.id, validatedData.data.id),
        ),
      );

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
      .where(
        and(
          eq(resources.userId, session.user.id),
          eq(resources.id, validatedData.data.id),
        ),
      );

    updateTag(RESOURCES_CACHE_TAG);

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
