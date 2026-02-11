import Link from "next/link";
import { getSession } from "@/lib/session";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { StorageIndicatorWrapper } from "@/components/storage-indicator-wrapper";
import { UserProfile } from "@/features/auth/components/user-profile";

export async function ProfilePageHeaderContent() {
  const session = await getSession();
  const isAuthenticated = !!session;

  return (
    <>
      <Link
        href={isAuthenticated ? "/dashboard" : "/"}
        className="text-primary cursor-pointer font-bold md:text-xl"
      >
        MyTechSpace
      </Link>

      <div className="flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <StorageIndicatorWrapper />
            <UserProfile />
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "outline",
                className: "h-8 sm:h-10",
              })}
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className={buttonVariants({ className: "h-8 sm:h-10" })}
            >
              Create account
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </>
  );
}

export function ProfilePageHeaderContentSkeleton() {
  return (
    <div className="flex w-full items-center justify-between">
      <Skeleton className="h-8 w-32" />
      <div className="flex items-center gap-x-4">
        <Skeleton className="h-8 w-20 sm:h-10" />
        <Skeleton className="h-8 w-28 sm:h-10" />
      </div>
    </div>
  );
}
