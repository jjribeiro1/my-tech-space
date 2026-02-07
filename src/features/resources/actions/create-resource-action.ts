"use server";
import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceLinks } from "@/db/schema/resource-link";
import { resourceCodeSnippets } from "@/db/schema/resource-code-snippet";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import {
  LinkResourceInput,
  CodeSnippetResourceInput,
} from "../schemas/resource-schema";

export async function createResourceAction(
  data: LinkResourceInput | CodeSnippetResourceInput,
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const { type, title, description, collectionId } = data;

    const [resource] = await db
      .insert(resources)
      .values({
        type,
        title,
        description: description || null,
        collectionId: collectionId || null,
        userId: session.user.id,
      })
      .returning({ id: resources.id });

    if (data.type === "link") {
      await db.insert(resourceLinks).values({
        resourceId: resource.id,
        url: data.url,
        faviconUrl: data.faviconUrl || null,
      });
    } else if (data.type === "code_snippet") {
      await db.insert(resourceCodeSnippets).values({
        resourceId: resource.id,
        code: data.code,
        language: data.language,
        filename: data.filename || null,
      });
    }

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Resource created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
