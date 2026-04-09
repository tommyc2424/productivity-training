import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TargetsPage2() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Targets</h1>
        <p className="text-muted-foreground">How targets are established.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How Targets Are Set</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Targets are not arbitrary. They are established through a combination of{" "}
            <strong className="text-foreground">historical performance</strong>,{" "}
            <strong className="text-foreground">industry benchmarks</strong>, and{" "}
            <strong className="text-foreground">operational judgment</strong>. The goal is to set a target that reflects
            efficient, safe staffing — not a best-case scenario that can only be achieved by cutting corners, and not a
            floor that is so generous the department never feels any pressure to staff efficiently.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Internal Historical Data</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The most common starting point is the department&apos;s own past performance. Finance and operations teams
            review <strong className="text-foreground">12 to 24 months</strong> of payroll and volume data to calculate
            the average HPPD or WHPUOS the department has actually achieved. This gives a baseline that reflects the
            real workload and mix of that specific unit.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>External Benchmarks</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Many health systems supplement internal data with external benchmark databases — sources like{" "}
            <strong className="text-foreground">Premier</strong>,{" "}
            <strong className="text-foreground">Solucient</strong>,{" "}
            <strong className="text-foreground">Strata Decision Technology</strong>, or{" "}
            <strong className="text-foreground">NDNQI</strong>. These databases aggregate performance data across
            hundreds of hospitals and allow a department to compare its target against peer institutions of similar size,
            teaching status, and patient complexity.
          </p>
          <p>
            A target set at the <strong className="text-foreground">50th percentile</strong> means half of similar
            departments operate at fewer hours per unit of service.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Target vs. Budget</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The target is sometimes set differently from the budget. The{" "}
            <strong className="text-foreground">budget</strong> is what was approved for the fiscal year and may include
            strategic investments or known inefficiencies. The{" "}
            <strong className="text-foreground">target</strong> — used for ongoing productivity measurement — reflects
            what efficient operations should look like on any given pay period. Understanding the difference helps
            managers interpret their reports correctly.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training/targets" />}>Back</Button>
        <Button render={<Link href="/productivity-training/targets/3" />}>Next</Button>
      </div>
    </div>
  );
}
