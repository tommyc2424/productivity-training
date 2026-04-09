import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VolumePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Volume</h1>
        <p className="text-muted-foreground">Understanding how volume drives productivity calculations in healthcare.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Is Volume?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            In healthcare productivity, <strong className="text-foreground">volume</strong> refers to the measurable
            workload a department or unit performs over a given period. It is the foundational input used to determine
            how many staff hours are required to meet patient care demands.
          </p>
          <p>
            Volume is expressed in <strong className="text-foreground">units of service (UOS)</strong> — the standard
            metric that captures what a department actually produces. The specific UOS varies by department type:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Inpatient nursing units: <strong className="text-foreground">patient days</strong></li>
            <li>Emergency departments: <strong className="text-foreground">visits or encounters</strong></li>
            <li>Operating rooms: <strong className="text-foreground">cases or minutes</strong></li>
            <li>Radiology: <strong className="text-foreground">exams or relative value units (RVUs)</strong></li>
            <li>Laboratory: <strong className="text-foreground">tests or billable procedures</strong></li>
            <li>Physical therapy: <strong className="text-foreground">treatments or visits</strong></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fixed vs. Variable Volume</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Not all volume behaves the same way. In healthcare productivity, volume is classified as either
            <strong className="text-foreground"> fixed</strong> or <strong className="text-foreground">variable</strong> depending
            on whether it changes in response to patient activity.
          </p>
          <p>
            <strong className="text-foreground">Variable volume</strong> fluctuates with patient demand. When more patients arrive,
            more work is generated and more staff hours are needed. Most clinical departments — nursing, lab, imaging — operate
            on variable volume.
          </p>
          <p>
            <strong className="text-foreground">Fixed volume</strong> remains constant regardless of patient census. The work exists
            whether the hospital is full or half empty, and staffing cannot easily be scaled up or down in response to daily demand.
          </p>
          <p>
            <strong className="text-foreground">Environmental Services (EVS)</strong> is a practical example of fixed volume.
            An EVS department is responsible for cleaning a defined number of square feet — the facility doesn&apos;t shrink
            when occupancy drops. A hospital with 200,000 square feet of cleanable space requires that same footage to be
            cleaned every day, regardless of whether 300 or 150 patients are admitted. The UOS for EVS is typically
            <strong className="text-foreground"> square footage</strong>, and the budgeted hours are set against that fixed number
            rather than fluctuating with census.
          </p>
          <p>
            Understanding whether a department&apos;s volume is fixed or variable is critical when evaluating productivity.
            Holding a fixed-volume department to a variable staffing model — or vice versa — will produce misleading results
            and unfair expectations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actual vs. Budgeted Volume</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Most productivity systems calculate staffing allowances using <strong className="text-foreground">actual volume</strong> —
            what truly happened during the pay period — rather than the originally budgeted volume. This is called a
            <strong className="text-foreground"> flex budget</strong> or <strong className="text-foreground">variable budget</strong>.
          </p>
          <p>
            Using actual volume ensures the productivity benchmark is fair. If a unit was budgeted for 400 patient days
            but actually cared for 450, the system grants additional hours for those 50 extra days rather than penalizing
            the manager for staffing up to meet real demand.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Accurate Volume Capture Matters</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity scores are only as accurate as the volume data feeding them. Common issues include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Missed or delayed census entries inflating productivity scores</li>
            <li>Incorrect UOS definitions that don&apos;t reflect true workload complexity</li>
            <li>Combining volumes from distinct service lines that have different staffing needs</li>
          </ul>
          <p>
            Managers should review their department&apos;s UOS definition and verify volume is being captured
            correctly before drawing conclusions from any productivity report.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button render={<Link href="/productivity-training/volume/2" />}>Next</Button>
      </div>
    </div>
  );
}
