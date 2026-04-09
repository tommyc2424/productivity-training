import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductivityPage2() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Productivity</h1>
        <p className="text-muted-foreground">
          Reading and interpreting productivity reports.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pay Period vs. Rolling Average</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity reports typically show two views. The{" "}
            <strong className="text-foreground">pay period view</strong> captures what happened during a single
            two-week period — useful for identifying immediate issues. The{" "}
            <strong className="text-foreground">rolling average</strong> (often 4, 6, or 13 pay periods) smooths
            out the highs and lows to give a trend line.
          </p>
          <p>
            A single bad pay period may reflect a one-time event — a flu surge, a holiday weekend, a high-acuity
            stretch. A consistently unfavorable rolling average signals a{" "}
            <strong className="text-foreground">structural staffing problem</strong> that needs to be addressed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Volume Variance vs. Hours Variance</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            When productivity is unfavorable, the root cause is almost always one of two things:{" "}
            <strong className="text-foreground">volume was lower than expected</strong> (fewer UOS were generated,
            shrinking the hours allowance) or{" "}
            <strong className="text-foreground">hours were higher than necessary</strong> (staff were not reduced
            when volume dropped).
          </p>
          <p>
            Separating these two drivers is essential. Volume variance is often outside the manager&apos;s control;
            hours variance usually is not.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benchmarking Your Score</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity percentages are only meaningful in context. Most organizations target a{" "}
            <strong className="text-foreground">range</strong> — commonly 95% to 105% — rather than a single
            number.
          </p>
          <p>
            Scores consistently above <strong className="text-foreground">110%</strong> may indicate understaffing
            rather than efficiency. Scores below <strong className="text-foreground">90%</strong> consistently
            suggest either a misaligned target or chronic overstaffing. External benchmarks can confirm whether the
            target itself is reasonable.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Reporting Pitfalls</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>Watch for these when reviewing reports:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Volume capture delays</strong> — if volume is entered late,
              budgeted hours will appear low initially, making productivity look worse than it is.
            </li>
            <li>
              <strong className="text-foreground">Overtime in the wrong pay period</strong> — hours sometimes post
              to a different period than where they were worked.
            </li>
            <li>
              <strong className="text-foreground">Orientation and education hours included in productive time</strong>{" "}
              — these inflate hours without corresponding volume.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/productivity">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/productivity/3">Next</Link>
        </Button>
      </div>
    </div>
  );
}
