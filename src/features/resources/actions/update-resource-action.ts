"use server";
import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { eq, and } from "drizzle-orm";
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

export async function updateResourceAction(
  data: { id: string } & (LinkResourceInput | CodeSnippetResourceInput),
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const { id, type, title, description, collectionId } = data;

    await db
      .update(resources)
      .set({
        title,
        description: description || null,
        collectionId: collectionId || null,
        updated_at: new Date(),
      })
      .where(and(eq(resources.id, id), eq(resources.userId, session.user.id)));

    if (type === "link") {
      await db
        .update(resourceLinks)
        .set({
          url: data.url,
          faviconUrl: data.faviconUrl || null,
        })
        .where(eq(resourceLinks.resourceId, id));
    } else if (type === "code_snippet") {
      const existingSnippet = await db
        .select({ id: resourceCodeSnippets.id })
        .from(resourceCodeSnippets)
        .where(eq(resourceCodeSnippets.resourceId, id));

      if (existingSnippet.length > 0) {
        await db
          .update(resourceCodeSnippets)
          .set({
            code: data.code,
            language: data.language,
            filename: data.filename || null,
          })
          .where(eq(resourceCodeSnippets.resourceId, id));
      } else {
        await db.insert(resourceCodeSnippets).values({
          resourceId: id,
          code: data.code,
          language: data.language,
          filename: data.filename || null,
        });
      }
    }

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Resource updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
