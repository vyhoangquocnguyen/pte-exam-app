// components/feedback/ai-feedback.tsx
"use client";

import type { AIFeedbackData } from "@/types/feedback";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle } from "lucide-react";

interface AIFeedbackProps {
  feedback: AIFeedbackData;
  // Type can be used to specialize the tabs (e.g., show Speaking Metrics tab only for Speaking)
  taskType: "Speaking" | "Writing" | "Reading" | "Listening";
}

// Utility function to get type-safe entries from an object.  
function getTypedObjectEntries<T extends Record<string, any>>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

// Helper component for dynamic score styling
const ScoreBadge = ({ score }: { score: number }) => {
  // Use Tailwind classes for conditional styling
  const color = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";
  return <Badge className={`${color} text-white text-md py-1 px-3 min-w-[50px] justify-center`}>{score}%</Badge>;
};

const AIFeedback = ({ feedback, taskType }: AIFeedbackProps) => {
  const { overallScore, skillScores, detailedAnalysis } = feedback;

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="flex items-center justify-between text-2xl">
          <Zap className="h-6 w-6 mr-2 text-primary" />
          AI Feedback & Scoring
          <ScoreBadge score={overallScore} />
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-12">
            <TabsTrigger value="summary">Overall Summary</TabsTrigger>
            <TabsTrigger value="scores">Skill Breakdown</TabsTrigger>
            <TabsTrigger value="corrections">Detailed Corrections</TabsTrigger>
            {/* Conditionally show Speaking Metrics tab */}
            {taskType === "Speaking" && <TabsTrigger value="metrics">Speaking Metrics</TabsTrigger>}
          </TabsList>

          {/* Tab 1: Overall Summary */}
          <TabsContent value="summary" className="mt-4 p-4 border rounded-md bg-secondary/10">
            <h3 className="text-lg font-semibold mb-2 text-primary-foreground">General Evaluation</h3>
            <p className="text-gray-700 dark:text-gray-300">{detailedAnalysis.summary}</p>
          </TabsContent>

          {/* Tab 2: Skill Breakdown (Accuracy, Grammar, etc.) */}
          <TabsContent value="scores" className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {getTypedObjectEntries(skillScores).map(([skill, score]) => (
              <div key={skill} className="flex justify-between items-center p-3 border rounded-md shadow-sm">
                <span className="font-medium text-sm">{skill}:</span>
                <ScoreBadge score={score} />
              </div>
            ))}
          </TabsContent>

          {/* Tab 3: Detailed Corrections */}
          <TabsContent value="corrections" className="mt-4 space-y-4">
            {detailedAnalysis.corrections.length > 0 ? (
              detailedAnalysis.corrections.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border-l-4 border-yellow-500 bg-yellow-50/50 dark:bg-gray-800 rounded-md shadow-sm">
                  <Badge variant="secondary" className="mb-2 text-xs font-bold">
                    {item.type}
                  </Badge>
                  <p className="text-sm">
                    **Original:** <span className="line-through text-red-600">{item.text}</span>
                  </p>
                  <p className="text-sm mt-1">
                    **Correction:** <span className="font-semibold text-green-600">{item.correction}</span>
                  </p>
                  <p className="text-xs italic mt-2 text-muted-foreground">**Reason:** {item.explanation}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 p-8">
                <CheckCircle className="inline h-5 w-5 mr-2 text-green-500" /> No major issues found! Outstanding
                attempt.
              </p>
            )}
          </TabsContent>

          {/* Tab 4: Speaking Metrics (Conditional) */}
          {taskType === "Speaking" && detailedAnalysis.speakingMetrics && (
            <TabsContent value="metrics" className="mt-4 grid grid-cols-2 gap-4 p-4 border rounded-md">
              <div className="p-3 border rounded-md bg-blue-50/50">
                <span className="font-medium">Pace (WPM):</span>
                <p className="text-2xl font-bold text-blue-600">{detailedAnalysis.speakingMetrics.pace}</p>
              </div>
              <div className="p-3 border rounded-md bg-red-50/50">
                <span className="font-medium">Excessive Pauses:</span>
                <p className="text-2xl font-bold text-red-600">{detailedAnalysis.speakingMetrics.pauses} times</p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIFeedback;
