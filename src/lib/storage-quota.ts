import "server-only";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq, sql } from "drizzle-orm";

// 50 MB in bytes
export const STORAGE_QUOTA_BYTES = 50 * 1024 * 1024;

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export async function getUserStorageUsed(userId: string): Promise<number> {
  const [user] = await db
    .select({ storageUsedBytes: users.storageUsedBytes })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user?.storageUsedBytes ?? 0;
}

export async function hasQuotaForUpload(
  userId: string,
  fileSizeBytes: number,
): Promise<boolean> {
  const currentUsage = await getUserStorageUsed(userId);
  return currentUsage + fileSizeBytes <= STORAGE_QUOTA_BYTES;
}

export async function incrementStorageUsed(
  userId: string,
  bytes: number,
): Promise<void> {
  await db
    .update(users)
    .set({
      storageUsedBytes: sql`${users.storageUsedBytes} + ${bytes}`,
    })
    .where(eq(users.id, userId));
}

export async function decrementStorageUsed(
  userId: string,
  bytes: number,
): Promise<void> {
  await db
    .update(users)
    .set({
      storageUsedBytes: sql`GREATEST(0, ${users.storageUsedBytes} - ${bytes})`,
    })
    .where(eq(users.id, userId));
}

export function getQuotaInfo(currentUsage: number) {
  return {
    used: currentUsage,
    total: STORAGE_QUOTA_BYTES,
    remaining: Math.max(0, STORAGE_QUOTA_BYTES - currentUsage),
    percentage: Math.min(100, (currentUsage / STORAGE_QUOTA_BYTES) * 100),
  };
}
