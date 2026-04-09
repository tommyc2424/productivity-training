import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VolumePage2() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Volume</h1>
        <p className="text-muted-foreground">How volume is counted using CPT codes and weights.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CPT Codes as the Foundation of Volume Counting</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            In many ancillary and procedural departments, volume is not simply counted as a raw number of visits or
            encounters. Instead, it is measured using <strong className="text-foreground">Current Procedural Terminology (CPT) codes</strong> —
            a standardized set of codes maintained by the American Medical Association that describe every medical
            procedure and service performed.
          </p>
          <p>
            Each CPT code represents a distinct procedure, and each procedure carries a different level of complexity,
            time, and resource consumption. A routine chest X-ray is a fundamentally different workload than an MRI
            with contrast — and counting both as a single "exam" would obscure the true effort required.
          </p>
          <p>
            CPT-based volume counting is most common in departments like:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Radiology</strong> — imaging procedures vary widely in scan time and technologist effort</li>
            <li><strong className="text-foreground">Laboratory</strong> — tests range from a simple glucose check to complex molecular panels</li>
            <li><strong className="text-foreground">Rehabilitation services</strong> — physical, occupational, and speech therapy procedures</li>
            <li><strong className="text-foreground">Cardiology</strong> — EKGs, stress tests, echocardiograms, and catheterizations</li>
            <li><strong className="text-foreground">Surgery</strong> — procedures differ drastically in duration and team size</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weights: Normalizing Volume Across Procedures</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            To account for the difference in effort between procedures, each CPT code is assigned a
            <strong className="text-foreground"> weight</strong> — a numeric value that reflects the relative work involved
            compared to a baseline procedure. This is often referred to as a
            <strong className="text-foreground"> relative value unit (RVU)</strong> or an internal departmental weight.
          </p>
          <p>
            The weighted volume calculation works as follows:
          </p>
          <div className="bg-muted rounded-md p-4 text-center font-mono text-sm text-foreground">
            Weighted Volume = Σ (Procedure Count × CPT Weight)
          </div>
          <p>
            For example, if a radiology department performs:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>50 chest X-rays with a weight of <strong className="text-foreground">0.5</strong> = <strong className="text-foreground">25 weighted units</strong></li>
            <li>20 CT scans with a weight of <strong className="text-foreground">3.0</strong> = <strong className="text-foreground">60 weighted units</strong></li>
            <li>5 MRIs with a weight of <strong className="text-foreground">5.0</strong> = <strong className="text-foreground">25 weighted units</strong></li>
          </ul>
          <p>
            The total reported volume would be <strong className="text-foreground">110 weighted units</strong> rather than 75 raw procedures.
            This weighted total is what gets used to calculate budgeted hours, ensuring that a department performing
            more complex work is granted the hours it actually requires.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Where Weights Come From</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Weights can be sourced from several places depending on the organization and system:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Medicare RVUs</strong> — the CMS-published work RVU values are widely used
              as an industry standard, particularly in physician and therapy productivity
            </li>
            <li>
              <strong className="text-foreground">Vendor-defined weights</strong> — productivity system vendors (such as Kaufman Hall,
              Strata, or API Healthcare) often provide their own curated CPT weight tables built from benchmarking data
            </li>
            <li>
              <strong className="text-foreground">Internally developed weights</strong> — some organizations build custom weights
              using time studies or historical staffing data to reflect their specific workflows
            </li>
          </ul>
          <p>
            Regardless of the source, weights should be reviewed periodically. As clinical technology evolves, the
            relative effort of procedures can change — a procedure that once required significant technologist time
            may become highly automated, and its weight should reflect that.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training/volume" />}>Back</Button>
        <Button render={<Link href="/productivity-training/volume/3" />}>Next</Button>
      </div>
    </div>
  );
}
