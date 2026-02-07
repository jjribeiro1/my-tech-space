"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceCodeSnippets } from "@/db/schema/resource-code-snippet";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import { CodeSnippetResourceInput } from "../schemas/code-snippet-resource-schema";

export async function createCodeSnippetResourceAction(
  data: CodeSnippetResourceInput,
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const { title, description, collectionId, code, language, filename } = data;

    const [resource] = await db
      .insert(resources)
      .values({
        type: "code_snippet",
        title,
        description: description || null,
        collectionId: collectionId || null,
        userId: session.user.id,
      })
      .returning({ id: resources.id });

    await db.insert(resourceCodeSnippets).values({
      resourceId: resource.id,
      code,
      language,
      filename: filename || null,
    });

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "Code snippet resource created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
