"use server";
import "server-only";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { RESOURCES_CACHE_TAG } from "../data";

const schema = z.object({
  url: z.url({ message: "Invalid url" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  collectionId: z.uuid(),
  resourceTypeId: z.uuid(),
});

type Input = z.infer<typeof schema>;

export async function createResourceAction(
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
    await db.insert(resources).values({
      ...validatedData.data,
      userId: session.user.id,
    });

    updateTag(RESOURCES_CACHE_TAG);

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
