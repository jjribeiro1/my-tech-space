import { FileText, Video, BookOpen, Code } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ResourceTypes() {
  return (
    <section className="bg-muted/50 w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              All Your Resources in One Place
            </h2>
            <p className="text-muted-foreground max-w-[700px] md:text-xl">
              TechSpace supports all the formats developers use to learn and
              grow
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">Articles</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save blog posts, tutorials, and documentation from around the
                web
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">Videos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Store links to tutorials, courses, and conference talks
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">Documentation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep references to official docs, guides, and API references
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">Code Snippets</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save useful code examples, patterns, and solutions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
