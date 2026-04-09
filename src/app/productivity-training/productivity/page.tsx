import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductivityPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Productivity</h1>
        <p className="text-muted-foreground">
          Understanding the productivity formula and what it actually measures.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The Core Formula</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Healthcare productivity is expressed as a ratio of budgeted hours to worked hours:{" "}
            <strong className="text-foreground">Productivity % = (Budgeted Hours ÷ Worked Hours) × 100</strong>.
          </p>
          <p>
            <strong className="text-foreground">Budgeted hours</strong> are calculated by multiplying actual volume
            by the department&apos;s target rate (HPPD or WHPUOS).{" "}
            <strong className="text-foreground">Worked hours</strong> come from the timekeeping system.
          </p>
          <p>
            The result is a percentage:{" "}
            <strong className="text-foreground">100%</strong> means the department used exactly the hours its
            volume warranted. <strong className="text-foreground">Above 100% is favorable</strong> — fewer hours
            were worked than budgeted.{" "}
            <strong className="text-foreground">Below 100% is unfavorable</strong> — more hours were used than
            the volume justified.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>A Worked Example</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Suppose a nursing unit has a target of <strong className="text-foreground">8.0 HPPD</strong>. During
            the pay period, the unit had <strong className="text-foreground">60 patient days</strong>.
          </p>
          <p>
            <strong className="text-foreground">Budgeted Hours</strong> = 60 × 8.0 = 480.
          </p>
          <p>
            If the unit actually worked <strong className="text-foreground">460 hours</strong>: Productivity % =
            (480 ÷ 460) × 100 = <strong className="text-foreground">104.3% — favorable</strong>.
          </p>
          <p>
            If the unit worked <strong className="text-foreground">510 hours</strong>: Productivity % = (480 ÷
            510) × 100 = <strong className="text-foreground">94.1% — unfavorable</strong>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Productivity Does Not Measure</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity is a measure of <strong className="text-foreground">hours efficiency only</strong>. It
            does not measure quality of care, patient satisfaction, or staff well-being.
          </p>
          <p>
            A unit can achieve 110% productivity while having unsafe staffing ratios if volume drops unexpectedly
            and managers send staff home. Always interpret productivity alongside{" "}
            <strong className="text-foreground">quality indicators</strong> — patient falls, pressure injuries,
            HCAHPS scores — before drawing conclusions about department performance.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/productivity/2">Next</Link>
        </Button>
      </div>
    </div>
  );
}
