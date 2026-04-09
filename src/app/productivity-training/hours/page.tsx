import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HoursPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hours</h1>
        <p className="text-muted-foreground">Understanding how worked hours are defined and categorized in healthcare productivity</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Are Worked Hours?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            In healthcare productivity, <strong className="text-foreground">hours</strong> refers to the total number of staff hours charged to a department during a pay period. This includes all time employees are physically present and working — clinical care, documentation, charge duties, and supervision. Hours are typically pulled directly from the payroll or timekeeping system and represent the raw labor input used in every productivity calculation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Productive vs. Non-Productive Hours</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Not all paid hours count the same way in productivity. <strong className="text-foreground">Productive hours</strong> are time worked providing services to patients or performing the core functions of the department. <strong className="text-foreground">Non-productive hours</strong> are paid time during which no patient care or departmental work is performed — including paid time off (PTO), holiday pay, orientation, education days, jury duty, and bereavement leave.
          </p>
          <p>
            Most productivity systems only include productive hours in the HPPD or WHPUOS calculation, since you cannot hold a manager accountable for hours the employee was not actually working.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paid Hours vs. Productive Hours</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The distinction matters for leaders. A manager who sees a large favorable variance should check whether it was achieved through genuine efficiency — or simply because several staff members were on PTO and their non-productive hours were excluded from the calculation.
          </p>
          <p>
            Conversely, heavy orientation weeks will inflate productive hours temporarily as new staff are worked into the schedule before reaching full productivity.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training" />}>Back</Button>
        <Button render={<Link href="/productivity-training/hours/2" />}>Next</Button>
      </div>
    </div>
  );
}
