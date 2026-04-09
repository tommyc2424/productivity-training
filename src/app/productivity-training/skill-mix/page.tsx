import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SkillMixPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skill Mix</h1>
        <p className="text-muted-foreground">Understanding how staff composition affects quality, cost, and productivity.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Is Skill Mix?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            <strong className="text-foreground">Skill mix</strong> refers to the proportion of different staff types — by role,
            license, or competency level — used to deliver care in a department. In nursing, skill mix is commonly expressed as
            the percentage of hours worked by <strong className="text-foreground">Registered Nurses (RNs)</strong> versus{" "}
            <strong className="text-foreground">Licensed Practical/Vocational Nurses (LPN/LVNs)</strong> versus{" "}
            <strong className="text-foreground">Unlicensed Assistive Personnel (UAP)</strong>, which includes Certified Nursing
            Assistants (CNAs), Patient Care Technicians (PCTs), and similar roles.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Skill Mix Matters</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            The mix of staff a department uses affects three things simultaneously:{" "}
            <strong className="text-foreground">patient outcomes</strong>,{" "}
            <strong className="text-foreground">labor cost</strong>, and{" "}
            <strong className="text-foreground">productivity scores</strong>. Higher RN ratios are associated with better patient
            outcomes — lower falls, fewer pressure injuries, better HCAHPS scores — but RN hours are more expensive.
          </p>
          <p>
            A team relying heavily on CNAs may reduce cost per hour but may also require more supervisory RN time, potentially
            eroding the savings. Getting skill mix right is about finding the appropriate balance for the specific patient
            population, not simply minimizing cost.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Mix in the Productivity Formula</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Skill mix does not appear explicitly in the <strong className="text-foreground">HPPD</strong> or{" "}
            <strong className="text-foreground">WHPUOS</strong> formula — all productive hours are counted equally regardless of
            who worked them. However, skill mix indirectly affects productivity through cost and scheduling.
          </p>
          <p>
            A department that substitutes lower-cost UAP hours for RN hours may use the same total hours but spend significantly
            less. Conversely, understaffing UAP roles may force RNs to perform tasks below their licensure, reducing the effective
            capacity of high-cost staff.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/productivity-training">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/productivity-training/skill-mix/2">Next</Link>
        </Button>
      </div>
    </div>
  );
}
