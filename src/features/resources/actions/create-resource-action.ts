"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";

const schema = z.object({
  url: z.string().url({ message: "Invalid url" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  collectionId: z.string().uuid(),
  resourceTypeId: z.string().uuid(),
});

type Input = z.infer<typeof schema>;

export async function createResourceAction(
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

    await db.insert(resources).values({
      ...validatedData.data,
      userId: session.user.id,
    });

    revalidateTag("create-resource");

    return {
      success: true,
      message: "Resource created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
