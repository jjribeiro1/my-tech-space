"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { collections } from "@/db/schema/collection";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";
import { ActionResponse } from "@/types/action";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
});

type Input = z.infer<typeof schema>;

export async function createCollectionAction(
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

    await db.insert(collections).values({
      userId: session.user.id,
      ...validatedData.data,
      slug: slugify(validatedData.data.name),
    });

    revalidateTag("new-collection");

    return {
      success: true,
      message: "Collection created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
