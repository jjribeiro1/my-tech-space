"use server";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const STORAGE_LIMIT_BYTES = 100 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function getProgressColor(percentage: number): string {
  if (percentage >= 90) return "bg-red-500";
  if (percentage >= 70) return "bg-yellow-500";
  return "bg-green-500";
}

export async function StorageIndicator() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return null;
    }

    const [user] = await db
      .select({ storageUsedBytes: users.storageUsedBytes })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return null;
    }

    const usedBytes = user.storageUsedBytes;
    const percentage = Math.min(
      Math.round((usedBytes / STORAGE_LIMIT_BYTES) * 100),
      100,
    );
    const progressColor = getProgressColor(percentage);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <div className="bg-muted h-2 w-30 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    progressColor,
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-muted-foreground text-xs font-medium">
                {percentage}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {formatBytes(usedBytes)} / {formatBytes(STORAGE_LIMIT_BYTES)}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } catch {
    // Return null during static generation or if session is unavailable
    return null;
  }
}
