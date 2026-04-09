import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AREAS = [
  {
    title: "Productivity Training",
    description: "Access training materials and resources to improve team productivity.",
    href: "/productivity-training",
  },
  {
    title: "Staffing Grid Calculator",
    description: "Calculate and plan staffing requirements with our grid calculator.",
    href: "/staffing-grid-calculator",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome
      </h1>
      <p className="text-muted-foreground text-lg max-w-md">
        Select an area to get started.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-full max-w-2xl">
        {AREAS.map(({ title, description, href }) => (
          <Link key={title} href={href}>
            <Card className="h-full cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
