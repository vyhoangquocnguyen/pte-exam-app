"use client";

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  currentQuestion: number;
  totalQuestions: number;
  isAnswered?: boolean;
  showSubmit?: boolean;
  submitLabel?: string;
  disableNext?: boolean;
  disablePrevious?: boolean;
  layout?: "spread" | "center" | "right";
}

export default function NavigationButtons({
  onPrevious,
  onNext,
  onSubmit,
  currentQuestion,
  totalQuestions,
  isAnswered = false,
  showSubmit = true,
  submitLabel = "Submit Answer",
  disableNext = false,
  disablePrevious = false,
  layout = "spread",
}: NavigationButtonsProps) {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  const containerClasses = cn(
    "flex items-center gap-4",
    layout === "spread" && "justify-between",
    layout === "center" && "justify-center",
    layout === "right" && "justify-end"
  );

  return (
    <div className={containerClasses}>
      {/* Previous Button */}
      {layout === "spread" && (
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion || disablePrevious}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
            "border-2 border-gray-300",
            isFirstQuestion || disablePrevious
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          )}>
          <ArrowLeftIcon className="w-5 h-5" />
          Previous
        </button>
      )}

      {/* Middle Buttons */}
      <div className="flex items-center gap-3">
        {/* Submit Button */}
        {showSubmit && !isAnswered && (
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <CheckIcon className="w-5 h-5" />
            {submitLabel}
          </button>
        )}

        {/* Next Button (after answering) */}
        {(isAnswered || !showSubmit) && !isLastQuestion && (
          <button
            onClick={onNext}
            disabled={disableNext}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all",
              disableNext
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-brand-500 hover:bg-brand-600 text-white"
            )}>
            Next Question
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        )}

        {/* Finish Button (last question) */}
        {(isAnswered || !showSubmit) && isLastQuestion && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all">
            <CheckIcon className="w-5 h-5" />
            Finish Test
          </button>
        )}
      </div>
    </div>
  );
}
