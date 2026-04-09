import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SkillMix3Page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skill Mix</h1>
        <p className="text-muted-foreground">Regulatory constraints and managing skill mix in practice.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regulatory and Policy Constraints</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Skill mix decisions are not made in a vacuum. Several external constraints govern the minimum qualifications required
            to deliver certain types of care.{" "}
            <strong className="text-foreground">State Nurse Practice Acts</strong> define the scope of practice for RNs, LPNs,
            and UAPs — specifying which tasks each may legally perform.
          </p>
          <p>
            Some states mandate minimum RN-to-patient ratios in specific units — most notably{" "}
            <strong className="text-foreground">California</strong>, which sets mandatory ratios for ICU, ED, and
            medical-surgical units.{" "}
            <strong className="text-foreground">Joint Commission</strong> and{" "}
            <strong className="text-foreground">CMS conditions of participation</strong> also set staffing expectations that
            floors cannot fall below.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Substitution Effect</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The <strong className="text-foreground">substitution effect</strong> refers to replacing hours from a higher-cost,
            higher-licensed staff category with hours from a lower-cost, lower-licensed category. Done thoughtfully, this reduces
            labor cost without compromising care. Done recklessly, it creates gaps in clinical oversight, increases RN workload
            for tasks that still require licensure, and ultimately leads to adverse patient events.
          </p>
          <p>
            The right approach is <strong className="text-foreground">task analysis</strong> — identifying which nursing
            functions can be safely delegated and ensuring appropriate supervision is in place.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Managing Skill Mix Day to Day</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Managers influence skill mix primarily through <strong className="text-foreground">scheduling decisions</strong>.
            Each shift&apos;s mix of RNs, LPNs, and CNAs determines that day&apos;s skill mix contribution. Calling in an RN
            to cover an open CNA slot changes the mix. Running with an RN short and covering with a CNA changes it the other way.
          </p>
          <p>
            Charge nurses who understand skill mix targets can make better real-time decisions about which role to call in when
            unexpected vacancies arise.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Mix and Patient Acuity</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The appropriate skill mix should reflect the <strong className="text-foreground">acuity</strong> of the patients
            being cared for. A unit with high-acuity post-surgical patients requires a different mix than a step-down unit with
            stable telemetry patients.
          </p>
          <p>
            Some organizations use <strong className="text-foreground">acuity-adjusted staffing models</strong> that dynamically
            shift the skill mix target based on real-time patient complexity scores rather than applying a single fixed percentage
            across all census levels.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training/skill-mix/2">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/skill-mix/4">Next</Link>
        </Button>
      </div>
    </div>
  );
}
