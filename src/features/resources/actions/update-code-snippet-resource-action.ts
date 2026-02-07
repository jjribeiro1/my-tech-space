"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceCodeSnippets } from "@/db/schema/resource-code-snippet";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import { CodeSnippetResourceInput } from "../schemas/code-snippet-resource-schema";

export async function updateCodeSnippetResourceAction(
  id: string,
  data: CodeSnippetResourceInput,
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const { title, description, collectionId, code, language, filename } = data;

    await db
      .update(resources)
      .set({
        title,
        description: description || null,
        collectionId: collectionId || null,
        updated_at: new Date(),
      })
      .where(and(eq(resources.id, id), eq(resources.userId, session.user.id)));

    const existingSnippet = await db
      .select({ id: resourceCodeSnippets.id })
      .from(resourceCodeSnippets)
      .where(eq(resourceCodeSnippets.resourceId, id));

    if (existingSnippet.length > 0) {
      await db
        .update(resourceCodeSnippets)
        .set({
          code,
          language,
          filename: filename || null,
        })
        .where(eq(resourceCodeSnippets.resourceId, id));
    } else {
      await db.insert(resourceCodeSnippets).values({
        resourceId: id,
        code,
        language,
        filename: filename || null,
      });
    }

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Code snippet resource updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
