"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions?: number[];
  variant?: "bar" | "dots" | "segments";
  showNumbers?: boolean;
}

export default function ProgressIndicator({
  currentQuestion,
  totalQuestions,
  answeredQuestions = [],
  variant = "bar",
  showNumbers = true,
}: ProgressIndicatorProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  if (variant === "bar") {
    return (
      <div>
        {showNumbers && (
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-gray-900">
              {currentQuestion} / {totalQuestions}
            </span>
          </div>
        )}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-brand-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const questionNum = index + 1;
          const isAnswered = answeredQuestions.includes(questionNum);
          const isCurrent = questionNum === currentQuestion;

          return (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                isCurrent && "ring-2 ring-brand-500 ring-offset-2",
                isAnswered && "bg-brand-500",
                !isAnswered && questionNum < currentQuestion && "bg-gray-400",
                !isAnswered && questionNum === currentQuestion && "bg-brand-500",
                !isAnswered && questionNum > currentQuestion && "bg-gray-200"
              )}
            />
          );
        })}
        {showNumbers && (
          <span className="text-sm text-gray-600 ml-2">
            {currentQuestion} / {totalQuestions}
          </span>
        )}
      </div>
    );
  }

  if (variant === "segments") {
    return (
      <div className="space-y-4">
        {showNumbers && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Question Progress</span>
            <span className="text-sm font-semibold text-gray-900">
              {currentQuestion} of {totalQuestions}
            </span>
          </div>
        )}
        <div className="grid grid-cols-25 gap-2">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const questionNum = index + 1;
            const isAnswered = answeredQuestions.includes(questionNum);
            const isCurrent = questionNum === currentQuestion;

            return (
              <div
                key={index}
                className={cn(
                  "aspect-square rounded-sm flex items-center justify-center text-xs font-semibold transition-all",
                  isCurrent && "ring-2 ring-brand-500 ring-offset-1",
                  isAnswered && "bg-brand-500 text-white",
                  !isAnswered && questionNum < currentQuestion && "bg-gray-300 text-gray-600",
                  !isAnswered &&
                    questionNum === currentQuestion &&
                    "bg-brand-100 text-brand-700 border-2 border-brand-500",
                  !isAnswered && questionNum > currentQuestion && "bg-gray-100 text-gray-400"
                )}
                title={`Question ${questionNum}${isAnswered ? " (Answered)" : ""}`}>
                {isAnswered ? <CheckIcon className="w-3 h-3" /> : questionNum}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
