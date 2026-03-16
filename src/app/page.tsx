import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURE_CARDS = [
  { title: "App Router", desc: "File-based routing with server components" },
  { title: "shadcn/ui", desc: "Accessible, customizable component library" },
  { title: "TypeScript", desc: "Type-safe code from day one" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8 text-center">
      <Badge variant="secondary">Next.js + shadcn/ui</Badge>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome to your new app
      </h1>
      <p className="text-muted-foreground text-lg max-w-md">
        Edit{" "}
        <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
          src/app/page.tsx
        </code>{" "}
        to get started.
      </p>
      <div className="flex gap-3">
        <Button>Get started</Button>
        <Button variant="outline">Learn more</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {FEATURE_CARDS.map(({ title, desc }) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
