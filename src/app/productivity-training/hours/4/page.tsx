"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUESTIONS = [
  {
    question:
      "Which of the following is classified as a NON-productive hour in most productivity systems?",
    options: [
      "Regular time spent on patient care",
      "Overtime hours worked during a short-staffed shift",
      "Paid time off (PTO)",
      "Charge nurse hours",
    ],
    correctIndex: 2,
  },
  {
    question:
      "A department worked 600 hours in a pay period, of which 80 hours were PTO. How many productive hours are counted in the productivity calculation?",
    options: ["80", "520", "600", "680"],
    correctIndex: 1,
  },
  {
    question:
      "Why can a department have a favorable productivity score while still exceeding its labor budget?",
    options: [
      "The productivity formula includes supply costs",
      "Overtime hours cost more than straight time but count equally in the hours formula",
      "Non-productive hours are counted twice in the budget",
      "Budgeted hours are always understated",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Which system is the primary source of hours data used in productivity reporting?",
    options: [
      "The EMR (electronic medical record)",
      "The payroll or timekeeping system",
      "The staffing grid",
      "The nurse scheduling whiteboard",
    ],
    correctIndex: 1,
  },
  {
    question:
      "A department has 8 FTEs each working 2,080 hours per year. What is the total annualized productive hours for the department?",
    options: ["2,080", "8,320", "16,640", "20,800"],
    correctIndex: 2,
  },
];

export default function HoursQuizPage() {
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
    localStorage.setItem("quiz_hours", JSON.stringify({ score: finalScore, total: QUESTIONS.length }));
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
        <h1 className="text-3xl font-bold mb-2">Hours Quiz</h1>
        <p className="text-muted-foreground">
          Answer the following questions to test your understanding of how worked hours are defined and categorized.
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
        <Button variant="outline" asChild>
          <Link href="/productivity-training/hours/3">Back</Link>
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
