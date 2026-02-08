"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceCodeSnippets } from "@/db/schema/resource-code-snippet";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";
import { codeSnippetResourceSchema } from "../schemas/code-snippet-resource-schema";

const schema = z.object({
  id: z.uuid(),
  data: codeSnippetResourceSchema,
});

export async function updateCodeSnippetResourceAction(
  id: string,
  data: z.infer<typeof codeSnippetResourceSchema>,
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
    const { title, description, collectionId, code, language, filename } =
      validatedData.data.data;

    const [updatedResource] = await db
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
      )
      .returning({ id: resources.id });

    if (!updatedResource) {
      return {
        success: false,
        message: "Resource not found or you don't have permission to update it",
      };
    }

    const existingSnippet = await db
      .select({ id: resourceCodeSnippets.id })
      .from(resourceCodeSnippets)
      .where(eq(resourceCodeSnippets.resourceId, validatedData.data.id));

    if (existingSnippet.length > 0) {
      await db
        .update(resourceCodeSnippets)
        .set({
          code,
          language,
          filename: filename || null,
        })
        .where(eq(resourceCodeSnippets.resourceId, validatedData.data.id));
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
