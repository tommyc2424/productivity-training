"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUESTIONS = [
  {
    question:
      "A unit has a target of 9.0 HPPD, 50 patient days, and worked 480 hours. What is the productivity percentage?",
    options: ["87.5%", "93.8%", "100%", "104.2%"],
    correctIndex: 1,
  },
  {
    question: "A productivity score of 107% most likely indicates:",
    options: [
      "The department worked more hours than budgeted",
      "The department worked fewer hours than the volume warranted",
      "The department had no overtime during the pay period",
      "Volume was higher than budgeted",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Which of the following is the BEST first step when investigating an unfavorable productivity variance?",
    options: [
      "Immediately reduce staffing on all shifts",
      "Check whether volume was lower than expected or hours were higher than necessary",
      "Submit a target adjustment request to finance",
      "Review the prior year's productivity scores",
    ],
    correctIndex: 1,
  },
  {
    question:
      "A department's rolling 13-period average productivity is 88%. This most likely indicates:",
    options: [
      "An isolated event that caused one bad pay period",
      "A structural staffing problem that needs to be addressed",
      "The target is set too high and should be increased",
      "Productivity above 100% in most individual pay periods",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Why should extremely high productivity scores (e.g., 115%) be reviewed with caution?",
    options: [
      "High productivity always means the budget is wrong",
      "The department may be understaffed to a point that affects patient care quality",
      "Productivity above 110% automatically triggers an audit",
      "High scores indicate that overtime was used excessively",
    ],
    correctIndex: 1,
  },
];

export default function ProductivityQuizPage() {
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
      "quiz_productivity",
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
        <h1 className="text-3xl font-bold mb-2">Productivity Quiz</h1>
        <p className="text-muted-foreground">
          Answer the following questions to test your understanding of healthcare productivity.
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
          <Link href="/productivity-training/productivity/3">Back</Link>
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
