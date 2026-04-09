import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PremiumLaborPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Premium Labor</h1>
        <p className="text-muted-foreground">
          Understanding the cost and impact of non-standard staffing in healthcare
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Is Premium Labor?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            <strong className="text-foreground">Premium labor</strong> refers to any staffing that costs more than the
            standard employed rate for the same role. The three most common forms are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Overtime</strong> — paying 1.5× or 2× the regular rate to an employed
              staff member working beyond their scheduled hours
            </li>
            <li>
              <strong className="text-foreground">Per diem or float pool staff</strong> — employed staff who work on an
              as-needed basis, typically at a premium rate above the base hourly wage in exchange for schedule flexibility
            </li>
            <li>
              <strong className="text-foreground">Agency or travel staff</strong> — contract workers placed through a
              staffing agency, often at rates two to three times higher than a regular employed position
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Premium Labor Exists</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Premium labor is typically a response to <strong className="text-foreground">staffing gaps</strong> —
            vacancies that cannot be filled with employed staff in time to cover the next shift. Root causes include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              High turnover and slow recruiting cycles that leave positions open for weeks or months
            </li>
            <li>
              Unexpected call-outs that require same-day coverage
            </li>
            <li>
              Seasonal volume surges that exceed the capacity of the permanent workforce
            </li>
            <li>
              Specialty shortages in high-demand roles like ICU nurses, OR technicians, and imaging techs where
              qualified candidates are scarce
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Premium Labor and Productivity Scores</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            From a pure hours standpoint, premium labor hours count the same as employed hours in the{" "}
            <strong className="text-foreground">HPPD or WHPUOS</strong> calculation. One agency nurse hour is one
            worked hour.
          </p>
          <p>
            However, the <strong className="text-foreground">cost</strong> of achieving that productivity score is
            dramatically different. A department hitting 100% productivity using 20% agency hours may be spending
            30&ndash;40% more on labor than a department hitting the same score with fully employed staff.
          </p>
          <p>
            This is why most organizations track premium labor as a{" "}
            <strong className="text-foreground">separate metric</strong> — as a percentage of total hours and as a
            dollar amount — alongside the productivity percentage.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/premium-labor/2">Next</Link>
        </Button>
      </div>
    </div>
  );
}
