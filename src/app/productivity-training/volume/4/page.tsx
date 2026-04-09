"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUESTIONS = [
  {
    question:
      "A radiology department performs 100 chest X-rays (weight 0.5) and 10 MRIs (weight 5.0). What is the total weighted volume?",
    options: ["50", "100", "110", "150"],
    correctIndex: 1,
  },
  {
    question:
      "An inpatient unit has 30 patients at midnight on Monday and 28 patients at midnight on Tuesday. How many patient days does the unit report for those two days?",
    options: ["28", "29", "30", "58"],
    correctIndex: 3,
  },
  {
    question:
      "An observation patient stays for 36 hours. How many patient-day equivalents does this represent?",
    options: ["1.0", "1.5", "2.0", "36"],
    correctIndex: 1,
  },
  {
    question:
      "Which of the following is an example of fixed volume?",
    options: [
      "Emergency department visits",
      "Inpatient patient days",
      "Square footage cleaned by Environmental Services",
      "Physical therapy treatments",
    ],
    correctIndex: 2,
  },
  {
    question:
      "A lab runs 200 basic metabolic panels (weight 1.0) and 50 comprehensive panels (weight 2.5). What is the total weighted volume?",
    options: ["250", "275", "300", "325"],
    correctIndex: 3,
  },
];

export default function VolumeQuizPage() {
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
    localStorage.setItem("quiz_volume", JSON.stringify({ score: finalScore, total: QUESTIONS.length }));
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
        <h1 className="text-3xl font-bold mb-2">Volume Quiz</h1>
        <p className="text-muted-foreground">
          Answer the following questions to test your understanding of productive volume calculations.
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
        <Button variant="outline" render={<Link href="/productivity-training/volume/3" />}>Back</Button>
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
