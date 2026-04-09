import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TargetsPage3() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Targets</h1>
        <p className="text-muted-foreground">Variance analysis and interpretation.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorable vs. Unfavorable Variance</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Variance is the difference between the hours a department was allowed (budgeted) and the hours it actually
            worked. A <strong className="text-foreground">favorable variance</strong> means the department worked fewer
            hours than the budget allowed — this is generally positive from a cost perspective. An{" "}
            <strong className="text-foreground">unfavorable variance</strong> means more hours were worked than the
            budget supported, which increases labor cost.
          </p>
          <p>
            Most productivity systems express this as a percentage:
          </p>
          <div className="bg-muted rounded-md p-4 text-center font-mono text-sm text-foreground">
            Productivity % = Budgeted Hours ÷ Worked Hours × 100
          </div>
          <p>
            A result <strong className="text-foreground">above 100%</strong> is favorable; below 100% is unfavorable.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Targets Flex with Volume</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            One of the most important features of a well-designed productivity system is that targets{" "}
            <strong className="text-foreground">flex automatically with actual volume</strong>. If a unit was budgeted
            for 300 patient days but actually had 350, the system recalculates the allowed hours using the target rate
            — the manager is given credit for the additional 50 days rather than being compared against a static budget.
          </p>
          <p>
            This is what separates a <strong className="text-foreground">flex budget</strong> from a{" "}
            <strong className="text-foreground">fixed budget</strong>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When Targets Should Be Reviewed</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Targets are not permanent. They should be reviewed when:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>a department&apos;s scope of service changes significantly</li>
            <li>new patient populations are added</li>
            <li>technology changes the work required per UOS</li>
            <li>benchmarks show the target is consistently out of range with peers</li>
          </ul>
          <p>
            A target that is set too tight creates constant unfavorable variances even when the unit is staffing
            appropriately. A target that is too loose allows overstaffing without accountability.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Misunderstandings</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Not every unfavorable variance is the manager&apos;s fault, and not every favorable variance is a success.
            An unfavorable variance driven by a high-acuity week may be appropriate and unavoidable. A favorable
            variance achieved by leaving staff short on nights is dangerous.
          </p>
          <p>
            Productivity data should always be reviewed in context — alongside{" "}
            <strong className="text-foreground">patient satisfaction</strong>,{" "}
            <strong className="text-foreground">quality metrics</strong>, and{" "}
            <strong className="text-foreground">staffing complaints</strong>.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training/targets/2" />}>Back</Button>
        <Button render={<Link href="/productivity-training/targets/4" />}>Next</Button>
      </div>
    </div>
  );
}
