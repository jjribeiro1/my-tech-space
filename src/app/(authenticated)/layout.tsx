export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
          <div className="flex items-center gap-2">
            <div className="text-primary font-bold md:text-xl">MyTechSpace</div>
          </div>
        </div>
      </header>
      <main className="px-4 md:px-0">{children}</main>
    </>
  );
}
