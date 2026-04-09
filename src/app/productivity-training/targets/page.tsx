import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TargetsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Targets</h1>
        <p className="text-muted-foreground">How targets drive staffing expectations and productivity measurement in healthcare departments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Is a Productivity Target?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A <strong className="text-foreground">target</strong> defines the expected number of worked hours per unit of service.
            For inpatient units the metric is <strong className="text-foreground">Hours Per Patient Day (HPPD)</strong>. For ancillary
            and outpatient departments the metric is <strong className="text-foreground">Worked Hours Per Unit of Service (WHPUOS)</strong>.
          </p>
          <p>
            The target represents how many hours of staff time the department should consume for each unit of work performed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hours Per Patient Day (HPPD)</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Used in <strong className="text-foreground">inpatient nursing</strong> and other census-based departments.
          </p>
          <div className="bg-muted rounded-md p-4 text-center font-mono text-sm text-foreground">
            HPPD = Total Worked Hours ÷ Patient Days
          </div>
          <p>
            A unit with a target of <strong className="text-foreground">8.0 HPPD</strong> is expected to use 8 worked hours of staff
            time for each patient day. If the unit has <strong className="text-foreground">30 patient days</strong> in a pay period,
            the budgeted hours would be <strong className="text-foreground">240</strong>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Worked Hours Per Unit of Service (WHPUOS)</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Used in departments where volume is measured in something other than patient days — lab tests, imaging exams,
            therapy treatments, etc.
          </p>
          <div className="bg-muted rounded-md p-4 text-center font-mono text-sm text-foreground">
            WHPUOS = Total Worked Hours ÷ Units of Service
          </div>
          <p>
            A radiology department with a target of <strong className="text-foreground">1.2 WHPUOS</strong> and{" "}
            <strong className="text-foreground">500 exams</strong> would have a budgeted allowance of{" "}
            <strong className="text-foreground">600 hours</strong>.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training" />}>Back</Button>
        <Button render={<Link href="/productivity-training/targets/2" />}>Next</Button>
      </div>
    </div>
  );
}
