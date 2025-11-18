"use client";

import { ReactNode } from "react";
import { ExerciseHeader } from "./exercise-header";
import { ExerciseInstructions } from "./exercise-instruction";
import { ExerciseNavigation } from "./exercise-navigation";
import { Exercise, ExerciseContent, ExercisePhase } from "@/types/exercise-schemas";

interface TimerState {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  isRunning: boolean;
}

interface ExerciseLayoutProps<T extends ExerciseContent> {
  exercise: Exercise & { content: T };
  currentIndex: number;
  totalQuestions: number;
  phase: ExercisePhase;
  children: ReactNode;

  // Navigation
  canGoNext: boolean;
  canGoPrevious: boolean;
  isNavigationLocked?: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onJumpTo?: (index: number) => void;

  // Progress
  answeredCount: number;
  exercises?: Exercise[];

  // Timer (optional)
  timer?: TimerState;
  timerPhase?: "preparation" | "recording" | "active";

  // Instructions
  onStartExercise?: () => void;
}

export function ExerciseLayouts<T extends ExerciseContent>({
  exercise,
  currentIndex,
  totalQuestions,
  phase,
  children,
  canGoNext,
  canGoPrevious,
  isNavigationLocked = false,
  onNext,
  onPrevious,
  onJumpTo,
  answeredCount,
  exercises,
  timer,
  timerPhase,
  onStartExercise,
}: ExerciseLayoutProps<T>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header with Timer */}
        <ExerciseHeader
          title={exercise.title}
          difficulty={exercise.difficulty}
          currentQuestion={currentIndex + 1}
          totalQuestions={totalQuestions}
          timer={timer}
          timerPhase={timerPhase}
        />

        {/* Instructions (conditional) */}
        {phase === "instructions" && (
          <ExerciseInstructions
            exerciseType={exercise.type}
            subType={exercise.subType}
            content={exercise.content}
            onStart={onStartExercise ?? (() => {})}
          />
        )}

        {/* Main Content Area */}
        {phase !== "instructions" && <div className="bg-white rounded-xl shadow-lg p-8">{children}</div>}

        {/* Navigation */}
        <ExerciseNavigation
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isLocked={isNavigationLocked}
          onNext={onNext}
          onPrevious={onPrevious}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          onJumpTo={onJumpTo}
          exercises={exercises}
        />
      </div>
    </div>
  );
}
