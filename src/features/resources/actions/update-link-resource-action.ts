"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceLinks } from "@/db/schema/resource-link";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import { linkResourceSchema } from "../schemas/link-resource-schema";

const schema = z.object({
  id: z.uuid(),
  data: linkResourceSchema,
});

export async function updateLinkResourceAction(
  id: string,
  data: z.infer<typeof linkResourceSchema>,
): Promise<ActionResponse> {
  const validatedData = schema.safeParse({ id, data });

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
    const { title, description, collectionId, url } = validatedData.data.data;

    await db
      .update(resources)
      .set({
        title,
        description: description || null,
        collectionId: collectionId || null,
        updated_at: new Date(),
      })
      .where(
        and(
          eq(resources.id, validatedData.data.id),
          eq(resources.userId, session.user.id),
        ),
      );

    await db
      .update(resourceLinks)
      .set({
        url,
      })
      .where(eq(resourceLinks.resourceId, validatedData.data.id));

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Link resource updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
