import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PremiumLabor3Page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Premium Labor</h1>
        <p className="text-muted-foreground">
          Strategies for reducing reliance on premium labor
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reducing Premium Labor Starts with Vacancy Management</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The single most effective way to reduce premium labor is to{" "}
            <strong className="text-foreground">fill open positions with employed staff</strong>. Every vacant FTE
            that is covered by agency or overtime represents a structural premium cost that cannot be managed away at
            the shift level.
          </p>
          <p>
            Managers should partner aggressively with HR and recruitment to set realistic time-to-fill targets,
            participate actively in interviewing, and flag vacancies that are at risk of going unfilled beyond
            60&ndash;90 days so escalation can happen early.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Building an Internal Float Pool</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            An <strong className="text-foreground">internal float pool</strong> — a group of employed, cross-trained
            staff who can flex to different units based on daily need — provides coverage at employed rates rather than
            agency rates. Float pool nurses typically earn a differential for their flexibility, but even with that
            premium, their cost is substantially below agency.
          </p>
          <p>
            Building and maintaining a viable float pool requires investment in cross-training, consistent float pool
            utilization to keep skills current, and competitive compensation to attract staff who are willing to work
            without a set unit assignment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proactive Schedule Management</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Most premium labor is reactive — a last-minute response to a gap.{" "}
            <strong className="text-foreground">Proactive schedule management</strong> shifts that response earlier,
            when lower-cost options are still available. Strategies include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Posting open shifts 3&ndash;4 weeks in advance rather than the day before</li>
            <li>Using self-scheduling systems that let staff pick up extra shifts voluntarily</li>
            <li>
              Creating incentive programs (shift differential bonuses) for internal staff who cover hard-to-fill shifts
            </li>
            <li>
              Building flexibility into the master schedule so that low-census cancellations in one area can be offset
              by coverage needs in another
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Managing Call-Outs</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            High call-out rates are a direct driver of last-minute premium labor. Addressing call-out behavior
            requires both policy enforcement and cultural investigation:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Is the schedule itself creating burnout that leads to call-outs?</li>
            <li>Are certain shifts chronically short-staffed, making staff reluctant to come in?</li>
            <li>Are there workplace issues driving avoidance?</li>
          </ul>
          <p>
            Reducing call-outs sustainably requires{" "}
            <strong className="text-foreground">understanding the cause</strong> — not just tightening the attendance
            policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setting Targets and Holding Accountability</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Premium labor reduction requires <strong className="text-foreground">explicit targets</strong>. Finance
            and operations should set a specific premium labor % goal for each department — for example, reducing from
            18% to 12% over two quarters.
          </p>
          <p>
            Managers should receive <strong className="text-foreground">monthly premium labor reports with trend
            lines</strong>, not just pay period snapshots. Director-level accountability, with escalation to the CNO
            when targets are missed, is necessary to drive sustained improvement.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/premium-labor/2">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/premium-labor/4">Next</Link>
        </Button>
      </div>
    </div>
  );
}
