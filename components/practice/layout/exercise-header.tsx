"use client";

import { Clock, Mic } from "lucide-react";
import { Difficulty } from "@/types/exercise-schemas";

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
  timerPhase?: "preparation" | "recording" | "active";
}

export function ExerciseHeader({
  title,
  difficulty,
  currentQuestion,
  totalQuestions,
  timer,
  timerPhase,
}: ExerciseHeaderProps) {
  const difficultyColors = {
    [Difficulty.EASY]: "bg-green-100 text-green-700",
    [Difficulty.MEDIUM]: "bg-yellow-100 text-yellow-700",
    [Difficulty.HARD]: "bg-red-100 text-red-700",
  };

  const timerConfig = {
    preparation: { label: "Preparation", color: "bg-blue-500", icon: Clock },
    recording: { label: "Recording", color: "bg-red-500", icon: Mic },
    active: { label: "Time Left", color: "bg-purple-500", icon: Clock },
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
          {timer && timerPhase && (
            <div className={`${timerConfig[timerPhase].color} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
              {(() => {
                const Icon = timerConfig[timerPhase].icon;
                return <Icon className="w-5 h-5" />;
              })()}
              <div className="flex flex-col">
                <span className="text-xs opacity-90">{timerConfig[timerPhase].label}</span>
                <span className="text-lg font-bold">{timer.formatTime(timer.timeLeft)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
