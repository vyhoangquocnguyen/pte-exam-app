"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { mockReadAloudExercises } from "@/lib/mock-data/mock-exercises";

import { useSpeakingExercise } from "@/hooks/use-speaking-exercise";

import { ExerciseHeader } from "@/components/practice/layout/exercise-header";
import { ExerciseNavigation } from "@/components/practice/layout/exercise-navigation";
import { ReadAloudDisplay } from "@/components/practice/content/speaking/read-aloud-display";
import { SpeakingPreparationView } from "@/components/practice/content/speaking/shared/speaking-preparation-view";
import { ReadAloudContent } from "@/types/exercise-schemas";
import { ExerciseInstructions } from "@/components/practice/layout/exercise-instruction";

export default function ReadAloudPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize exercises (simulate API call)
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Speaking exercise hook
  const speaking = useSpeakingExercise({
    exercises: mockReadAloudExercises, //feeding exercise data
    onComplete: (results) => {
      console.log("✅ Exercise completed:", results);
      console.log("📊 Total answers:", Object.keys(results.answers).length);
      console.log("⏱️ Total time:", Math.floor(results.totalTime / 1000), "seconds");

      // TODO: Save results to backend
      // await fetch('/api/exercises/submit', {
      //   method: 'POST',
      //   body: JSON.stringify(results)
      // });

      // Show completion message
      alert(`Great job! You completed all ${Object.keys(results.answers).length} questions.`);

      // Redirect to speaking overview
      router.push("/practice/speaking");
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading exercises...</p>
        </div>
      </div>
    );
  }
  const exercise = speaking.currentExercise;

  return (
    <>
      <ExerciseHeader
        title={exercise.title}
        difficulty={exercise.difficulty}
        currentQuestion={speaking.currentIndex + 1}
        totalQuestions={speaking.totalQuestions}
      />
      {speaking.phase === "instructions" && (
        <ExerciseInstructions
          exerciseType={exercise.type}
          subType={exercise.subType}
          content={exercise.content as ReadAloudContent}
          onStart={speaking.startExercise}
        />
      )}
      {speaking.phase === "preparation" && (
        <SpeakingPreparationView
          timeLeft={speaking.timer.timeLeft}
          totalTime={speaking.timer.totalTime}
          onSkip={speaking.timer.skipPreparation}>
          {(exercise.content as ReadAloudContent).text}
        </SpeakingPreparationView>
      )}

      <ExerciseNavigation
        canGoNext={speaking.canGoNext}
        canGoPrevious={speaking.canGoPrevious}
        onNext={speaking.goToNext}
        onPrevious={speaking.goToPrevious}
        currentIndex={speaking.currentIndex}
        totalQuestions={speaking.totalQuestions}
        isLocked={speaking.canGoNext}
        answeredCount={speaking.answeredQuestions}
        exercises={mockReadAloudExercises}
        onJumpTo={speaking.goToExercise}
      />
    </>
  );
}
