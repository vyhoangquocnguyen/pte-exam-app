"use client";

import { cn } from "@/lib/utils";

interface PhaseTimerProps {
  isPreparation: boolean;
  isRecording: boolean;
  isCompleted: boolean;
  isAnswered: boolean;
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

export default function PhaseTimer({
  isPreparation,
  isRecording,
  isCompleted,
  isAnswered,
  timeLeft,
  formatTime,
}: PhaseTimerProps) {
  return (
    <div className="mb-6 flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
      <div className="flex items-center gap-3">
        {isPreparation && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-900">Preparation Time</span>
          </div>
        )}
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-red-900">Recording Time</span>
          </div>
        )}
        {(isCompleted || isAnswered) && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm font-semibold text-green-900">Completed</span>
          </div>
        )}
      </div>

      {!isCompleted && !isAnswered && (
        <div
          className={cn(
            "text-3xl font-display font-bold",
            isPreparation && "text-blue-600",
            isRecording && "text-red-600"
          )}
        >
          {formatTime(timeLeft)}
        </div>
      )}
    </div>
  );
}
