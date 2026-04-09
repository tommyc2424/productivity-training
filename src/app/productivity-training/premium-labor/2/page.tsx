import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PremiumLabor2Page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Premium Labor</h1>
        <p className="text-muted-foreground">
          How premium labor is tracked, reported, and analyzed
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tracking Premium Hours</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Most workforce management and productivity systems categorize hours not just by pay code (REG, OT, PTO)
            but also by <strong className="text-foreground">worker type</strong> — employed versus contract/agency.
            Agency hours typically flow into the system through a separate interface: the staffing agency submits time
            records, which are imported or manually entered.
          </p>
          <p>
            Some systems require managers to manually classify hours as agency when approving timecards.{" "}
            <strong className="text-foreground">Inconsistent entry</strong> is a common problem that leads to
            underreporting of true premium labor usage.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>Organizations track premium labor using several metrics:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Premium Labor % of Total Hours</strong> = (Overtime Hours + Agency
              Hours + Per Diem Hours) &divide; Total Worked Hours &times; 100
            </li>
            <li>
              <strong className="text-foreground">Premium Labor Cost</strong> = sum of all premium-rate hours
              multiplied by the premium rate for each category
            </li>
            <li>
              <strong className="text-foreground">Cost per Hour</strong> — the average cost of all hours worked,
              blended across rates — rises as premium labor increases
            </li>
          </ul>
          <p>
            Many organizations set targets for premium labor as a percentage of total hours, commonly between{" "}
            <strong className="text-foreground">5% and 10%</strong>, with anything above{" "}
            <strong className="text-foreground">15%</strong> considered a significant concern.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overtime vs. Agency: A Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            When a shift goes uncovered, managers generally have two options: offer the shift to an employed staff
            member at overtime rates, or call the agency. Overtime costs{" "}
            <strong className="text-foreground">1.5&times; base</strong>, which sounds expensive. But agency bill
            rates — what the hospital actually pays — often range from{" "}
            <strong className="text-foreground">2&times; to 3.5&times;</strong> the employed hourly equivalent when
            factoring in agency margins, housing stipends, and travel allowances.
          </p>
          <p>
            In most cases, <strong className="text-foreground">overtime from an employed nurse is significantly less
            expensive than an equivalent agency hour</strong>. Managers who reflexively call the agency to avoid
            overtime may inadvertently be choosing the more expensive option.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reporting and Accountability</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Premium labor reports are typically reviewed at the department, director, and CNO/CFO levels. Departments
            with chronic high premium labor usage are often flagged for deeper investigation:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Are there unfilled positions?</li>
            <li>Is turnover high?</li>
            <li>Is scheduling creating predictable gaps?</li>
            <li>Is the call-out rate elevated?</li>
          </ul>
          <p>
            Premium labor is a <strong className="text-foreground">symptom as much as a problem</strong> —
            understanding the underlying cause is essential to making a lasting improvement.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/premium-labor">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/premium-labor/3">Next</Link>
        </Button>
      </div>
    </div>
  );
}
