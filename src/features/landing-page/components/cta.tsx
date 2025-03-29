import { Link, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-col items-center gap-2">
            <h2 className="text-center text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Organize Your Developer Knowledge?
            </h2>
            <p className="text-muted-foreground text-center md:text-xl">
              Join TechSpace today and start building your personal knowledge
              library
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/auth/register"
              className={buttonVariants({ size: "lg" })}
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
