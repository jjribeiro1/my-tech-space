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
import { NeonDbError } from "@neondatabase/serverless";

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

    revalidateTag("create-collection");

    return {
      success: true,
      message: "Collection created successfully",
    };
  } catch (err) {
    const defaultMessage = "Something went wrong, please try again";

    if (err instanceof NeonDbError) {
      return {
        success: false,
        message:
          err.constraint === "user_id_name_unique_idx" ? "Collection already exists" : defaultMessage,
      };
    }
    return {
      success: false,
      message: defaultMessage,
    };
  }
}
