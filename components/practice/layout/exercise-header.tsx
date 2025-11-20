"use client";

import { Difficulty } from "@/types/exercise-schemas";
import { ClockIcon } from "@heroicons/react/24/outline";

interface ExerciseHeaderProps {
  title: string;
  difficulty: Difficulty;
  currentQuestion: number;
  totalQuestions: number;
  timer?: {
    timeLeft: number;
    formatTime: (seconds: number) => string;
    isRunning: boolean;
  };
}

export function ExerciseHeader({ title, difficulty, currentQuestion, totalQuestions, timer }: ExerciseHeaderProps) {
  const difficultyColors = {
    [Difficulty.EASY]: "bg-green-100 text-green-700",
    [Difficulty.MEDIUM]: "bg-yellow-100 text-yellow-700",
    [Difficulty.HARD]: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Difficulty Badge */}
          <div className={`px-4 py-2 rounded-lg ${difficultyColors[difficulty]}`}>
            <span className="text-sm font-semibold uppercase">{difficulty}</span>
          </div>

          {/* Timer (if provided) */}
          {timer && (
            <div className="flex flex-col">
              <ClockIcon className="w-5 h-5 text-gray-500" />
              <span className="text-lg font-bold">{timer.formatTime(timer.timeLeft)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
