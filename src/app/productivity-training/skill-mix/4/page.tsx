"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUESTIONS = [
  {
    question:
      "A unit works 900 total hours, with 630 worked by RNs. What is the RN skill mix percentage?",
    options: ["50%", "60%", "70%", "80%"],
    correctIndex: 2,
  },
  {
    question:
      "A unit is budgeted at 8.0 HPPD with a 60% RN skill mix. For each patient day, how many hours should be worked by RNs?",
    options: ["3.2 hours", "4.0 hours", "4.8 hours", "6.0 hours"],
    correctIndex: 2,
  },
  {
    question:
      "Which of the following best describes the 'substitution effect' in skill mix management?",
    options: [
      "Replacing overtime hours with straight time",
      "Replacing higher-licensed staff hours with lower-cost staff hours for appropriate tasks",
      "Substituting agency nurses for employed staff",
      "Replacing day shift hours with night shift hours",
    ],
    correctIndex: 1,
  },
  {
    question:
      "A department has a favorable HPPD score but an unfavorable blended cost per hour. This most likely means:",
    options: [
      "Volume was higher than expected",
      "Total hours were within target but skill mix ran above budget (too many RN hours)",
      "Agency staff were used to fill all open shifts",
      "The HPPD target needs to be lowered",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Which state is known for having mandatory minimum nurse-to-patient ratio laws?",
    options: ["Texas", "New York", "California", "Florida"],
    correctIndex: 2,
  },
];

export default function SkillMixQuizPage() {
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
    localStorage.setItem("quiz_skill-mix", JSON.stringify({ score: finalScore, total: QUESTIONS.length }));
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
        <h1 className="text-3xl font-bold mb-2">Skill Mix Quiz</h1>
        <p className="text-muted-foreground">
          Answer the following questions to test your understanding of skill mix in healthcare productivity.
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
          <Link href="/productivity-training/skill-mix/3">Back</Link>
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
