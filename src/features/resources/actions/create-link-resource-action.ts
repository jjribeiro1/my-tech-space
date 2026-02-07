"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceLinks } from "@/db/schema/resource-link";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import { LinkResourceInput } from "../schemas/link-resource-schema";

export async function createLinkResourceAction(
  data: LinkResourceInput,
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const { title, description, collectionId, url } = data;

    const [resource] = await db
      .insert(resources)
      .values({
        type: "link",
        title,
        description: description || null,
        collectionId: collectionId || null,
        userId: session.user.id,
      })
      .returning({ id: resources.id });

    await db.insert(resourceLinks).values({
      resourceId: resource.id,
      url,
    });

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Link resource created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
