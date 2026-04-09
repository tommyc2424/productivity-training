import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductivityPage3() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Productivity</h1>
        <p className="text-muted-foreground">
          Taking action on productivity data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The Manager&apos;s Role</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity data is not self-managing. The report tells you{" "}
            <strong className="text-foreground">what happened</strong>; the manager&apos;s job is to understand
            why and decide what to do next.
          </p>
          <p>
            Most organizations expect managers to review productivity reports each pay period,{" "}
            <strong className="text-foreground">document variances above a threshold</strong> (commonly ±5%), and
            develop action plans when unfavorable trends persist across multiple periods.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Responding to an Unfavorable Variance</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Start with volume. Did volume drop unexpectedly? If so, were hours reduced proportionally, or did staff
            remain on the schedule even as census fell? If hours stayed high while volume dropped, the corrective
            action is <strong className="text-foreground">scheduling tighter alignment to census</strong> — flexing
            staff off when low-census conditions are identified early.
          </p>
          <p>
            If volume was on target but hours were still high, investigate whether{" "}
            <strong className="text-foreground">overtime</strong> drove the variance, whether{" "}
            <strong className="text-foreground">agency hours</strong> were used excessively, or whether a specific
            shift or role was consistently overstaffed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Responding to a Favorable Variance</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A favorable variance is generally positive, but extreme results warrant scrutiny. Productivity
            consistently above <strong className="text-foreground">108–110%</strong> may mean the unit is running
            lean to a point that affects quality.
          </p>
          <p>
            Review patient safety data alongside the productivity trend. If quality is holding, the department may
            simply be well-managed. If{" "}
            <strong className="text-foreground">quality metrics are deteriorating</strong> alongside high
            productivity, a target review is warranted.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Building a Culture of Accountability</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Productivity improves most sustainably when the entire management team — from charge nurses to directors
            — understands the data and shares responsibility for results.
          </p>
          <p>
            <strong className="text-foreground">Daily huddles</strong> that reference current census against
            scheduled staff, <strong className="text-foreground">shift-by-shift flex decisions</strong> made by
            charge nurses, and clear escalation paths for variance documentation all build a culture where labor
            efficiency is a daily practice rather than a bi-weekly report card.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/productivity/2">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/productivity/4">Next</Link>
        </Button>
      </div>
    </div>
  );
}
