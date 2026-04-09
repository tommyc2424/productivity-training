"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUESTIONS = [
  {
    question:
      "A nursing unit has a target of 7.5 HPPD. If the unit reports 40 patient days in a pay period, what is the budgeted hours allowance?",
    options: ["200", "275", "300", "375"],
    correctIndex: 2,
  },
  {
    question:
      "A radiology department has a WHPUOS target of 1.4 and performs 300 exams. What is the budgeted hours allowance?",
    options: ["210", "300", "420", "480"],
    correctIndex: 2,
  },
  {
    question:
      "A department worked 480 hours and had a budgeted allowance of 500 hours. What is the productivity percentage?",
    options: ["96%", "100%", "104%", "110%"],
    correctIndex: 2,
  },
  {
    question:
      "Which of the following best describes a 'flex budget' in healthcare productivity?",
    options: [
      "A budget that never changes regardless of volume",
      "A budget that adjusts based on actual volume worked",
      "A budget that only covers overtime hours",
      "A budget set by external benchmarks only",
    ],
    correctIndex: 1,
  },
  {
    question:
      "A productivity target is set at the 50th percentile of an external benchmark database. This means:",
    options: [
      "The department is in the top 50% of all hospitals",
      "Half of similar departments operate with fewer hours per unit of service",
      "The department must reduce its target by 50%",
      "The target was set using 50 months of historical data",
    ],
    correctIndex: 1,
  },
];

export default function TargetsQuizPage() {
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = selected.every((s) => s !== null);

  const score = submitted
    ? selected.filter((s, i) => s === QUESTIONS[i].correctIndex).length
    : null;

  const handleSubmit = () => {
    const finalScore = selected.filter((s, i) => s === QUESTIONS[i].correctIndex).length;
    localStorage.setItem("quiz_targets", JSON.stringify({ score: finalScore, total: QUESTIONS.length }));
    setSubmitted(true);
  };

  const handleSelect = (qIndex: number, oIndex: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = [...prev];
      next[qIndex] = oIndex;
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Targets Quiz</h1>
        <p className="text-muted-foreground">
          Answer the following questions to test your understanding of productivity targets.
        </p>
      </div>

      {QUESTIONS.map((q, qi) => {
        const isCorrect = submitted && selected[qi] === q.correctIndex;
        const isWrong = submitted && selected[qi] !== q.correctIndex;
        return (
          <Card key={qi}>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                {qi + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {q.options.map((option, oi) => {
                const isSelected = selected[qi] === oi;
                const isAnswer = q.correctIndex === oi;

                let style =
                  "w-full text-left px-4 py-2 rounded-md border text-sm transition-colors ";

                if (submitted) {
                  if (isAnswer) {
                    style += "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200";
                  } else if (isSelected && !isAnswer) {
                    style += "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200";
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
              {submitted && isWrong && (
                <p className="text-sm text-muted-foreground pt-1">
                  Correct answer: <strong className="text-foreground">{q.options[q.correctIndex]}</strong>
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
        <Button variant="outline" render={<Link href="/productivity-training/targets/3" />}>Back</Button>
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            Submit
          </Button>
        ) : (
          <Button render={<Link href="/productivity-training" />}>Exit</Button>
        )}
      </div>
    </div>
  );
}
