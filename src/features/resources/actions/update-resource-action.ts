"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { eq, and } from "drizzle-orm";

const schema = z.object({
  id: z.string().uuid(),
  url: z.string().url({ message: "Invalid url" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  collectionId: z.string().uuid(),
  resourceTypeId: z.string().uuid(),
});

type Input = z.infer<typeof schema>;

export async function updateResourceAction(
  data: Input,
): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session) {
      redirect("/auth/login");
    }
    const validatedData = schema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Something went wrong, invalid data",
      };
    }

    const { id, title, description, url, collectionId, resourceTypeId } =
      validatedData.data;

    await db
      .update(resources)
      .set({
        title,
        url,
        description,
        collectionId,
        resourceTypeId,
      })
      .where(and(eq(resources.id, id), eq(resources.userId, session.user.id)));

    revalidateTag("update-resource");

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
