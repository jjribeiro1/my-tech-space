import { Suspense } from "react";
import {
  ProfilePageHeaderContent,
  ProfilePageHeaderContentSkeleton,
} from "@/features/profile/components/profile-page-header";

export default function PublicProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b px-6 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
          <Suspense fallback={<ProfilePageHeaderContentSkeleton />}>
            <ProfilePageHeaderContent />
          </Suspense>
        </div>
      </header>
      <main className="px-4 md:px-6">{children}</main>
    </>
  );
}
