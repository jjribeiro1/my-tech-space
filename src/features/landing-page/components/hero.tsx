import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="from-primary/10 to-background w-full bg-linear-to-b py-12 md:py-24 lg:py-32">
      <div className="container mx-auto my-0 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-center text-2xl font-bold tracking-tighter sm:text-5xl md:text-left xl:text-6xl/none">
                Your Personal Developer Knowledge Hub
              </h1>
              <p className="text-muted-foreground max-w-150 text-center md:text-left md:text-xl">
                Centralize all your learning resources in one personalized
                space. Save articles, videos, documentation, and code snippets
                organized your way.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 min-[400px]:flex-row sm:justify-normal">
              <Link
                href="/auth/register"
                className={buttonVariants({ className: "h-8 sm:h-10" })}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: "outline",
                  className: "h-8 sm:h-10",
                })}
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-background relative w-full max-w-150 overflow-hidden rounded-lg border shadow-xl">
              <Image
                src="/images/hero-image.webp"
                width={800}
                height={600}
                alt="TechSpace Dashboard Preview"
                className="w-full object-cover"
                priority
              />
              <div className="from-background/80 to-background/20 pointer-events-none absolute inset-0 bg-linear-to-t"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
