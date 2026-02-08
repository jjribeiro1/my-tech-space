"use server";
import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { and, eq } from "drizzle-orm";
import { RESOURCES_CACHE_TAG } from "../data";

const schema = z.object({
  id: z.uuid(),
});

export async function deleteResourceAction(
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
    await db
      .delete(resources)
      .where(
        and(
          eq(resources.id, validatedData.data.id),
          eq(resources.userId, session.user.id),
        ),
      );

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Resource deleted successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
