"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUESTIONS = [
  {
    question: "Which of the following is NOT typically classified as premium labor?",
    options: [
      "Agency/travel nurse hours",
      "Overtime hours for employed staff",
      "Per diem staff hours at above-base rates",
      "Regular straight-time hours for a full-time employee",
    ],
    correctIndex: 3,
  },
  {
    question:
      "A department has 800 total worked hours, of which 120 are overtime and 80 are agency. What is the premium labor percentage?",
    options: ["10%", "15%", "20%", "25%"],
    correctIndex: 3,
  },
  {
    question:
      "When comparing the cost of overtime versus agency labor, which statement is generally true?",
    options: [
      "Agency labor is always cheaper because it avoids benefit costs",
      "Overtime at 1.5× is usually less expensive than agency bill rates of 2×–3.5×",
      "They cost exactly the same per hour worked",
      "Agency labor costs less because it includes productivity bonuses",
    ],
    correctIndex: 1,
  },
  {
    question: "What is the primary advantage of an internal float pool over agency staffing?",
    options: [
      "Float pool nurses can work in any state without additional licensure",
      "Float pool staff are covered at employed rates, which are substantially lower than agency rates",
      "Float pool eliminates the need for overtime entirely",
      "Float pool nurses are excluded from the HPPD calculation",
    ],
    correctIndex: 1,
  },
  {
    question:
      "A department has 15% premium labor this pay period. The organization's target is 8%. Which is the BEST first step for the manager?",
    options: [
      "Immediately cancel all agency contracts",
      "Investigate root causes — vacancy rate, call-out rate, scheduling gaps — before taking action",
      "Change the premium labor target to 15%",
      "Require all staff to work mandatory overtime to fill gaps internally",
    ],
    correctIndex: 1,
  },
];

export default function PremiumLaborQuizPage() {
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = selected.every((s) => s !== null);

  const score = submitted
    ? selected.filter((s, i) => s === QUESTIONS[i].correctIndex).length
    : null;

  const handleSubmit = () => {
    const finalScore = selected.filter(
      (s, i) => s === QUESTIONS[i].correctIndex
    ).length;
    localStorage.setItem(
      "quiz_premium-labor",
      JSON.stringify({ score: finalScore, total: QUESTIONS.length })
    );
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
        <h1 className="text-3xl font-bold mb-2">Premium Labor Quiz</h1>
        <p className="text-muted-foreground">
          Answer the following questions to test your understanding of premium labor in healthcare.
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
              {submitted && isWrong && (
                <p className="text-sm text-muted-foreground pt-1">
                  Correct answer:{" "}
                  <strong className="text-foreground">
                    {q.options[q.correctIndex]}
                  </strong>
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
        <Button variant="outline" asChild>
          <Link href="/productivity-training/premium-labor/3">Back</Link>
        </Button>
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            Submit
          </Button>
        ) : (
          <Button asChild>
            <Link href="/productivity-training">Exit</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
