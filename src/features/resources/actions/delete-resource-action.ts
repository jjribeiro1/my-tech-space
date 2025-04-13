"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { getSession } from "@/lib/session";
import { ActionResponse } from "@/types/action";
import { and, eq } from "drizzle-orm";

export async function deleteResourceAction(
  id: string,
): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session) {
      redirect("/auth/login");
    }

    await db
      .delete(resources)
      .where(and(eq(resources.id, id), eq(resources.userId, session.user.id)));

    revalidateTag("delete-resource");

    return {
      success: true,
      message: "Resource deleted successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
