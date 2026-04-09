import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HoursPage2() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hours</h1>
        <p className="text-muted-foreground">How hours are captured and categorized in timekeeping systems</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timekeeping Systems</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Hours data originates in the timekeeping or scheduling system — platforms like <strong className="text-foreground">Kronos (UKG)</strong>, <strong className="text-foreground">API Healthcare</strong>, or similar workforce management tools. Employees clock in and out, and those hours are tied to pay codes that classify what kind of time was worked. That pay code data flows downstream into the payroll system and ultimately into the productivity reporting platform.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pay Codes and Their Importance</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Pay codes are the mechanism by which timekeeping systems classify hours. A pay code of <strong className="text-foreground">&quot;REG&quot;</strong> signals regular productive time. <strong className="text-foreground">&quot;OT&quot;</strong> signals overtime. <strong className="text-foreground">&quot;PTO&quot;</strong> signals paid time off. <strong className="text-foreground">&quot;EDU&quot;</strong> might signal education time. <strong className="text-foreground">&quot;ORNT&quot;</strong> signals orientation.
          </p>
          <p>
            These codes determine whether an hour is counted as productive or non-productive in the productivity calculation. If pay codes are misconfigured or misused — for example, if a charge nurse clocks all time under &quot;REG&quot; even during staff meetings — the hours data will misrepresent how staff time is actually being spent.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Pay Code Categories</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            <strong className="text-foreground">Productive codes</strong> (counted in productivity): Regular time, overtime, charge pay differential, on-call callback, and any code that represents hands-on work in the department.
          </p>
          <p>
            <strong className="text-foreground">Non-productive codes</strong> (excluded from productivity): PTO, holiday, sick, orientation, education/training, jury duty, bereavement, FMLA.
          </p>
          <p>
            Agency and contract staff hours are handled separately and will be covered in the Premium Labor section.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviewing Your Hours Data</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Before drawing conclusions from a productivity report, managers should verify that the hours feeding the calculation are accurate and correctly coded. A sudden spike in hours without a corresponding volume increase often points to a timekeeping issue rather than a true staffing problem.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/hours">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/hours/3">Next</Link>
        </Button>
      </div>
    </div>
  );
}
