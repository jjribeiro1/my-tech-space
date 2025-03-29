import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto my-0 flex h-16 items-center justify-between px-4 md:px-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-primary font-bold md:text-xl">
            MyTechSpace
          </Link>
        </div>

        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
}
