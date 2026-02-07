"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { collections } from "@/db/schema/collection";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";
import { ActionResponse } from "@/types/action";

const schema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
});

type Input = z.infer<typeof schema>;

export async function updateCollectionAction(
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

    const { id, name, description, isPrivate } = validatedData.data;

    await db
      .update(collections)
      .set({
        name,
        description,
        isPrivate,
        updated_at: new Date(),
        slug: slugify(name),
      })
      .where(
        and(eq(collections.userId, session.user.id), eq(collections.id, id)),
      );

    revalidateTag("update-collection", "max");

    return {
      success: true,
      message: "Collection updated successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
