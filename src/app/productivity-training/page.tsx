"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TOPICS = [
  { label: "Volume", slug: "volume", quizKey: "quiz_volume" },
  { label: "Targets", slug: "targets", quizKey: "quiz_targets" },
  { label: "Hours", slug: "hours", quizKey: "quiz_hours" },
  { label: "Productivity", slug: "productivity", quizKey: "quiz_productivity" },
  { label: "Skill Mix", slug: "skill-mix", quizKey: "quiz_skill-mix" },
  { label: "Premium Labor", slug: "premium-labor", quizKey: "quiz_premium-labor" },
  { label: "The Final Question", slug: "final-question", quizKey: "quiz_final" },
];

type QuizResult = { score: number; total: number };

export default function ProductivityTrainingPage() {
  const [results, setResults] = useState<Record<string, QuizResult>>({});

  useEffect(() => {
    const loaded: Record<string, QuizResult> = {};
    TOPICS.forEach(({ quizKey }) => {
      const raw = localStorage.getItem(quizKey);
      if (raw) loaded[quizKey] = JSON.parse(raw);
    });
    setResults(loaded);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Productivity Training</h1>
      <p className="text-muted-foreground mb-8">
        Complete each topic below to track your progress.
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Topics Outline</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {TOPICS.map(({ label, slug, quizKey }) => {
            const result = results[quizKey];
            return (
              <Link
                key={slug}
                href={`/productivity-training/${slug}`}
                className="flex items-center justify-between w-full py-4 px-2 rounded hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{label}</span>
                <div className="flex items-center gap-2">
                  {result && (
                    <span className="text-sm text-muted-foreground">
                      {result.score}/{result.total}
                    </span>
                  )}
                  {result ? (
                    <CheckCircle className="text-green-500 w-6 h-6 shrink-0" />
                  ) : (
                    <XCircle className="text-red-500 w-6 h-6 shrink-0" />
                  )}
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
