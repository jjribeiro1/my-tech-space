import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container mx-auto my-0 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-[700px] md:text-xl">
              Organize your developer knowledge in three simple steps
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="h-96">
            <CardHeader className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold">
                1
              </div>
              <CardTitle className="text-xl">Create Collections</CardTitle>
              <CardDescription>
                Organize your knowledge into custom collections that match your
                interests
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">
                  Group resources by technology, project, or learning path
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">Create public or private collections</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">Customize with descriptions and tags</p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-96">
            <CardHeader className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold">
                2
              </div>
              <CardTitle className="text-xl">Save Resources</CardTitle>
              <CardDescription>
                Add articles, videos, documentation, and code snippets to your
                collections
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">Easily save resources by pasting URLs</p>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">Add personal notes to each resource</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">
                  Organize with tags and custom metadata
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-96">
            <CardHeader className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold">
                3
              </div>
              <CardTitle className="text-xl">Access Anywhere</CardTitle>
              <CardDescription>
                Find and use your resources whenever you need them, organized
                your way
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">
                  Powerful search across all your collections
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">Filter by type, tag, date, and more</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="text-primary h-4 w-4" />
                </div>
                <p className="text-sm">
                  Share collections with teammates or keep private
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
