import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HoursPage3() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hours</h1>
        <p className="text-muted-foreground">Overtime, straight time, and how hours composition affects productivity</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Straight Time vs. Overtime</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            All productive hours count equally in the productivity formula — one overtime hour counts the same as one straight-time hour when calculating HPPD or WHPUOS. However, the cost of those hours is very different. An overtime hour typically costs <strong className="text-foreground">1.5× the regular rate</strong>, meaning that a department hitting its productivity target but doing so heavily on overtime may still be significantly over its labor budget.
          </p>
          <p>
            Productivity and labor cost are related but distinct measurements.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Overtime Matters Even When Productivity Looks Good</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A manager can have a perfectly favorable productivity score — Budgeted Hours ÷ Worked Hours above 100% — while simultaneously incurring substantial overtime costs that erode the department&apos;s financial performance. This is why most organizations track overtime as a separate metric alongside productivity, rather than relying on productivity alone to evaluate staffing efficiency.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hours and Pay Period Timing</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity is typically reported by pay period — usually every two weeks. Hours are attributed to the pay period in which they were worked (not paid). Managers should be aware of pay period boundaries: a night shift straddling two pay periods may have hours split between them, and large schedule adjustments at period end can distort single-period productivity without changing the underlying staffing pattern.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Annualizing Hours</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            For long-term planning, hours are often <strong className="text-foreground">annualized</strong> — projected across a full year based on current staffing patterns. A department staffed with 10 FTEs, each working 2,080 hours per year, has 20,800 annualized hours. Comparing annualized hours to annualized volume gives a more stable view of productivity than any single pay period.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/hours/2">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/hours/4">Next</Link>
        </Button>
      </div>
    </div>
  );
}
