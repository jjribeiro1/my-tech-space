import { FolderPlus, Layers, BookOpen, Code } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Benefits() {
  return (
    <section className="bg-muted/50 w-full py-12 md:py-24">
      <div className="container mx-auto my-0 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Benefits
            </h2>
            <p className="text-muted-foreground max-w-[700px] md:text-xl">
              TechSpace helps you organize your developer knowledge in a way
              that makes sense to you
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                <FolderPlus className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Custom Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create your own personalized collections and categories that
                match your learning style
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                <Layers className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Multiple Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save articles, videos, documentation, and code snippets all in
                one organized place
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                <BookOpen className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Personal Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build your own knowledge library that grows with you and adapts
                to your learning needs
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                <Code className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Easy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Quickly add, organize, and find resources with powerful search
                and filtering tools
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
