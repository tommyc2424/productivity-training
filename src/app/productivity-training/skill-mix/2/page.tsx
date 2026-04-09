import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SkillMix2Page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skill Mix</h1>
        <p className="text-muted-foreground">How skill mix is tracked and reported.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Measuring Skill Mix</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Skill mix is typically expressed as a percentage of total worked hours attributed to each staff category. For example:
          </p>
          <p>
            <strong className="text-foreground">RN hours ÷ Total Direct Care Hours × 100 = RN Skill Mix %</strong>
          </p>
          <p>
            If a unit worked 800 total hours and RNs worked 560 of them, the RN skill mix is{" "}
            <strong className="text-foreground">70%</strong>. This calculation is applied to productive hours only —
            orientation and education hours are often excluded.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Mix Targets</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Many organizations set a <strong className="text-foreground">target skill mix</strong> alongside the HPPD target.
            A unit might be budgeted at <strong className="text-foreground">8.0 HPPD with a 65% RN skill mix</strong>. That
            means of every 8 hours allowed per patient day, 5.2 should be RN hours and 2.8 should be from other staff categories.
          </p>
          <p>
            When skill mix runs <strong className="text-foreground">above target</strong> — more RN hours than planned — labor
            cost increases even if total hours stay within the HPPD target.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Mix in Productivity Reports</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Most enterprise productivity platforms (Strata, Kronos Analytics, API Healthcare) display skill mix breakdowns
            alongside HPPD and variance data. Some also calculate a{" "}
            <strong className="text-foreground">blended cost per hour</strong> — the weighted average cost of all hours worked —
            which captures the combined effect of hours volume and staff composition.
          </p>
          <p>
            A favorable HPPD with an unfavorable blended cost per hour is a signal that skill mix ran too high even though total
            hours were controlled.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Charge Nurses and Supervisors</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Whether <strong className="text-foreground">charge nurse hours</strong> are included in the productive hour
            calculation — and whether they are counted as direct care or indirect — varies by organization. Some systems exclude
            charge hours from the direct care skill mix calculation entirely. Understanding how your system handles this is
            important for interpreting skill mix trends accurately.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/skill-mix">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/skill-mix/3">Next</Link>
        </Button>
      </div>
    </div>
  );
}
