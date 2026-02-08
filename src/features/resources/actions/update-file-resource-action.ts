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
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import {
  incrementStorageUsed,
  decrementStorageUsed,
} from "@/lib/storage-quota";
import { RESOURCES_CACHE_TAG } from "../data";

const utapi = new UTApi();

const schema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string(),
  collectionId: z.uuid().optional(),
  file: z
    .object({
      url: z.url(),
      key: z.string(),
      filename: z.string(),
      mimeType: z.string(),
      sizeBytes: z.number(),
    })
    .optional(),
});

type Input = z.infer<typeof schema>;

export async function updateFileResourceAction(
  data: Input,
): Promise<ActionResponse> {
  const validatedData = schema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Something went wrong, invalid data",
    };
  }

  try {
    const session = await getSession();
    if (!session) {
      redirect("/auth/login");
    }

    const { id, title, description, collectionId, file } = validatedData.data;

    await db
      .update(resources)
      .set({
        title,
        description: description || null,
        collectionId: collectionId || null,
      })
      .where(and(eq(resources.id, id), eq(resources.userId, session.user.id)));

    if (file) {
      const existingFile = await db
        .select({ key: resourceFiles.key, sizeBytes: resourceFiles.sizeBytes })
        .from(resourceFiles)
        .where(eq(resourceFiles.resourceId, id))
        .limit(1);

      const oldFileSize = existingFile[0]?.sizeBytes ?? 0;

      if (existingFile.length > 0 && existingFile[0]?.key) {
        await utapi.deleteFiles(existingFile[0].key);
      }

      await db.delete(resourceFiles).where(eq(resourceFiles.resourceId, id));

      await db.insert(resourceFiles).values({
        resourceId: id,
        url: file.url,
        key: file.key,
        filename: file.filename,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
      });

      // Update storage: remove old file size, add new file size
      if (oldFileSize > 0) {
        await decrementStorageUsed(session.user.id, oldFileSize);
      }
      await incrementStorageUsed(session.user.id, file.sizeBytes);
    }

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "File resource updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
