"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceLinks } from "@/db/schema/resource-link";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import { LinkResourceInput } from "../schemas/link-resource-schema";

export async function updateLinkResourceAction(
  id: string,
  data: LinkResourceInput,
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const { title, description, collectionId, url } = data;

    await db
      .update(resources)
      .set({
        title,
        description: description || null,
        collectionId: collectionId || null,
        updated_at: new Date(),
      })
      .where(and(eq(resources.id, id), eq(resources.userId, session.user.id)));

    await db
      .update(resourceLinks)
      .set({
        url,
      })
      .where(eq(resourceLinks.resourceId, id));

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
