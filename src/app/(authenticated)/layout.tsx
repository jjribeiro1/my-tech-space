import Link from "next/link";
import { UserProfile } from "@/features/auth/components/user-profile";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-6 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
          <Link
            href={"/dashboard"}
            className="text-primary cursor-pointer font-bold md:text-xl"
          >
            MyTechSpace
          </Link>

          <div className="flex items-center gap-x-4">
            <UserProfile />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="px-4 md:px-6">{children}</main>
    </>
  );
}
