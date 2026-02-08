"use server";

import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceFiles } from "@/db/schema/resource-file";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { incrementStorageUsed } from "@/lib/storage-quota";
import { RESOURCES_CACHE_TAG } from "../data";
import { fileResourceSchema } from "../schemas/file-resource-schema";

const schema = fileResourceSchema;

type Input = z.infer<typeof schema>;

export async function createFileResourceAction(
  data: Input,
): Promise<ActionResponse> {
  const validatedData = schema.safeParse(data);

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
    const { title, description, collectionId, file } = validatedData.data;

    const [resource] = await db
      .insert(resources)
      .values({
        type: "file",
        title,
        description: description || null,
        collectionId: collectionId || null,
        userId: session.user.id,
      })
      .returning({ id: resources.id });

    await db.insert(resourceFiles).values({
      resourceId: resource.id,
      url: file.url,
      key: file.key,
      filename: file.filename,
      mimeType: file.mimeType,
      sizeBytes: file.sizeBytes,
    });

    // Increment storage used by user
    await incrementStorageUsed(session.user.id, file.sizeBytes);

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "File resource created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
