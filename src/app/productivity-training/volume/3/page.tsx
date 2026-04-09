import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VolumePage3() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Volume</h1>
        <p className="text-muted-foreground">How inpatient volume is counted and reported.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How Inpatient Volume Is Calculated</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Inpatient volume is measured in <strong className="text-foreground">patient days</strong> — the number of
            patients occupying a bed at a defined census point, typically midnight. Each patient present at that
            moment counts as one patient day for that unit.
          </p>
          <p>
            At the end of a pay period, the total patient days are summed and used as the unit of service for
            productivity calculations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Which CPT Codes Count Toward Inpatient Volume</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            For inpatient nursing units, volume is driven by census rather than CPT codes. However, in departments
            that serve inpatients — such as respiratory therapy, physical therapy, or pharmacy — CPT codes are used
            to capture the specific services delivered to those patients.
          </p>
          <p>
            The CPT codes that count toward inpatient volume are generally those billed under the facility fee and
            tied directly to hands-on patient care. Common categories include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Evaluation and Management (E&M) codes</strong> — inpatient visits,
              consultations, and subsequent care (99221–99233)
            </li>
<li>
              <strong className="text-foreground">Procedure codes</strong> — treatments and interventions performed at
              the bedside, such as respiratory treatments, wound care, or catheter placements
            </li>
          </ul>
          <p>
            Codes that are purely administrative, duplicative, or unbillable are typically excluded from the volume
            count to prevent inflation of the UOS.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Counting Observation Patients</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Observation patients present a unique challenge because they are not formally admitted — they are placed
            under an outpatient status while their condition is monitored, often on the same unit as inpatients.
            From a staffing perspective, they require the same nursing care, but from a billing and volume perspective,
            they are counted differently.
          </p>
          <p>
            Observation hours are tracked using <strong className="text-foreground">hourly units</strong> rather than
            patient days. The primary CPT code used is:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">CPT 99224–99226</strong> — Subsequent observation care, used for each
              calendar day the patient remains in observation status
            </li>
            <li>
              <strong className="text-foreground">CPT G0378</strong> — Hospital observation services, billed per hour,
              used by facilities to capture the total observation hours provided
            </li>
          </ul>
          <p>
            To convert observation hours into a patient-day equivalent for productivity purposes, most organizations
            divide total observation hours by 24:
          </p>
          <div className="bg-muted rounded-md p-4 text-center font-mono text-sm text-foreground">
            Observation Patient Days = Total Observation Hours ÷ 24
          </div>
          <p>
            These converted patient days are then added to the midnight census patient days to produce a combined
            <strong className="text-foreground"> adjusted census</strong> that more accurately reflects the unit&apos;s
            true workload. Without this adjustment, units carrying a heavy observation population would appear
            understaffed relative to their actual patient volume.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training/volume/2" />}>Back</Button>
        <Button render={<Link href="/productivity-training/volume/4" />}>Next</Button>
      </div>
    </div>
  );
}
