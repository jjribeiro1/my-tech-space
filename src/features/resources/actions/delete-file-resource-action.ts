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
import { RESOURCES_CACHE_TAG } from "../data";

const utapi = new UTApi();

const schema = z.object({
  id: z.uuid(),
});

export async function deleteFileResourceAction(
  id: string,
): Promise<ActionResponse> {
  const validatedData = schema.safeParse({ id });

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

    const fileData = await db
      .select({ key: resourceFiles.key })
      .from(resourceFiles)
      .innerJoin(resources, eq(resourceFiles.resourceId, resources.id))
      .where(
        and(
          eq(resources.id, validatedData.data.id),
          eq(resources.userId, session.user.id),
        ),
      )
      .limit(1);

    if (fileData.length > 0 && fileData[0]?.key) {
      await utapi.deleteFiles(fileData[0].key);
    }

    await db
      .delete(resources)
      .where(
        and(
          eq(resources.id, validatedData.data.id),
          eq(resources.userId, session.user.id),
        ),
      );

    updateTag(RESOURCES_CACHE_TAG);

    return {
      success: true,
      message: "File resource deleted successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
