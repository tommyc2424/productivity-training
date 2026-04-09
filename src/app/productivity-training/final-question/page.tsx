"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SCENARIO = {
  title: "Med-Surg Unit — Pay Period Summary",
  facts: [
    { label: "Pay period length", value: "14 days" },
    { label: "Midnight census patient days (sum of 14 days)", value: "400" },
    { label: "Observation patients", value: "4 patients with a combined 96 observation hours" },
    { label: "HPPD target", value: "8.0" },
    { label: "Regular employed hours worked", value: "3,100" },
    { label: "Overtime hours", value: "80" },
    { label: "Agency hours", value: "100" },
    { label: "PTO hours (paid, non-productive)", value: "150" },
    { label: "Education / orientation hours", value: "60" },
  ],
};

const QUESTIONS = [
  {
    label: "Step 1 — Productive Volume",
    question:
      "Using the midnight census data and observation hours above, what is the total productive volume (patient day equivalents) for the pay period?",
    hint: "Observation patient days = Total observation hours ÷ 24. Add that to the midnight census total.",
    options: ["396", "400", "404", "500"],
    correctIndex: 2,
    explanation:
      "400 midnight census patient days + (96 observation hours ÷ 24) = 400 + 4 = 404 patient day equivalents.",
  },
  {
    label: "Step 2 — Target Hours",
    question:
      "Using the patient day equivalents calculated in Step 1 and the unit's HPPD target, what is the target hours allowance for this pay period?",
    hint: "Budgeted Hours = Volume × HPPD Target",
    options: ["3,200", "3,232", "3,280", "3,320"],
    correctIndex: 1,
    explanation:
      "404 patient days × 8.0 HPPD = 3,232 budgeted hours.",
  },
  {
    label: "Step 3 — Productive Hours",
    question:
      "Using the timesheet data above, what are the total productive hours that should be used in the productivity calculation?",
    hint: "Only PTO is excluded. Education and orientation hours count as productive.",
    options: ["3,100", "3,280", "3,340", "3,490"],
    correctIndex: 2,
    explanation:
      "Regular (3,100) + Overtime (80) + Agency (100) + Education/Orientation (60) = 3,340 productive hours. Only PTO (150) is non-productive and excluded.",
  },
  {
    label: "Step 4 — Premium Labor %",
    question:
      "Using the productive hours from Step 3, what is the premium labor percentage for this pay period?",
    hint: "Premium Labor % = (Overtime Hours + Agency Hours) ÷ Total Productive Hours × 100",
    options: ["2.4%", "5.4%", "7.6%", "10.4%"],
    correctIndex: 1,
    explanation:
      "(80 overtime + 100 agency) ÷ 3,340 productive hours × 100 = 180 ÷ 3,340 × 100 ≈ 5.4%.",
  },
  {
    label: "Step 5 — Productivity",
    question:
      "Using the target hours from Step 2 and the productive hours from Step 3, what is the department's productivity percentage for this pay period?",
    hint: "Productivity % = Target Hours ÷ Worked Hours × 100",
    options: ["93.5%", "96.8%", "100.0%", "104.7%"],
    correctIndex: 1,
    explanation:
      "3,232 target hours ÷ 3,340 productive hours × 100 = 96.8% — an unfavorable result, meaning the unit used more hours than its volume warranted.",
  },
];

export default function FinalQuestionPage() {
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = selected.every((s) => s !== null);

  const score = submitted
    ? selected.filter((s, i) => s === QUESTIONS[i].correctIndex).length
    : null;

  const handleSelect = (qIndex: number, oIndex: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = [...prev];
      next[qIndex] = oIndex;
      return next;
    });
  };

  const handleSubmit = () => {
    const finalScore = selected.filter(
      (s, i) => s === QUESTIONS[i].correctIndex
    ).length;
    localStorage.setItem(
      "quiz_final",
      JSON.stringify({ score: finalScore, total: QUESTIONS.length })
    );
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">The Final Question</h1>
        <p className="text-muted-foreground">
          Apply everything you have learned. Read the scenario below, then work
          through each step in order — each answer builds toward the final
          productivity calculation.
        </p>
      </div>

      {/* Scenario */}
      <Card className="border-primary/40 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">{SCENARIO.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {SCENARIO.facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* Questions */}
      {QUESTIONS.map((q, qi) => {
        const isCorrect = submitted && selected[qi] === q.correctIndex;
        const isWrong = submitted && selected[qi] !== q.correctIndex;

        return (
          <Card key={qi}>
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                {q.label}
              </p>
              <CardTitle className="text-base font-medium">
                {qi + 1}. {q.question}
              </CardTitle>
              {!submitted && (
                <p className="text-xs text-muted-foreground mt-1">
                  Hint: {q.hint}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              {q.options.map((option, oi) => {
                const isSelected = selected[qi] === oi;
                const isAnswer = q.correctIndex === oi;

                let style =
                  "w-full text-left px-4 py-2 rounded-md border text-sm transition-colors ";
                if (submitted) {
                  if (isAnswer) {
                    style +=
                      "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200";
                  } else if (isSelected && !isAnswer) {
                    style +=
                      "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200";
                  } else {
                    style += "border-border text-muted-foreground";
                  }
                } else {
                  style += isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:bg-muted text-foreground";
                }

                return (
                  <button
                    key={oi}
                    className={style}
                    onClick={() => handleSelect(qi, oi)}
                  >
                    {option}
                  </button>
                );
              })}

              {submitted && (
                <p className="text-sm text-muted-foreground pt-1">
                  {isCorrect ? "✓ " : "✗ "}
                  {q.explanation}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}

      {submitted && score !== null && (
        <Card className="border-primary">
          <CardContent className="pt-6 text-center text-lg font-semibold">
            You got {score} out of {QUESTIONS.length} correct.
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" render={<Link href="/productivity-training" />}>
          Back
        </Button>
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            Submit
          </Button>
        ) : (
          <Button render={<Link href="/productivity-training" />}>
            Exit
          </Button>
        )}
      </div>
    </div>
  );
}
