"use client";

import { AlertCircle } from "lucide-react";
import { Exercise } from "@/types/exercise-schemas";

interface ExerciseNavigationProps {
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLocked: boolean;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  onJumpTo?: (index: number) => void;
  exercises?: Exercise[];
}

export function ExerciseNavigation({
  canGoNext,
  canGoPrevious,
  isLocked,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  answeredCount,
  onJumpTo,
  exercises,
}: ExerciseNavigationProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Main Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious || isLocked}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold">
          ← Previous
        </button>

        <div className="flex items-center gap-2">
          {isLocked && (
            <span className="text-sm text-orange-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Navigation locked
            </span>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext || isLocked}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg">
          Next Question →
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>
            {answeredCount} / {totalQuestions} answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Indicators */}
      {exercises && onJumpTo && (
        <div className="flex gap-2 justify-center flex-wrap">
          {exercises.map((ex, idx) => {
            const isAnswered = answeredCount > idx;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={ex.id}
                onClick={() => !isLocked && onJumpTo(idx)}
                disabled={isLocked}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  isCurrent
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                    : isAnswered
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : "bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200"
                } disabled:opacity-50 disabled:cursor-not-allowed`}>
                {idx + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
