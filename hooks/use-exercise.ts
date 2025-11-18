"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Exercise, ExerciseAnswer, ExerciseFeedback, ExercisePhase, ExerciseResults } from "@/types/exercise-schemas";
;

interface UseExerciseOptions {
  exercises: Exercise[];
  onComplete?: (results: ExerciseResults) => void;
}

export function useExercise({ exercises, onComplete }: UseExerciseOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<ExercisePhase>("instructions");
  const [answers, setAnswers] = useState<Record<string, ExerciseAnswer>>({});
  const [feedback, setFeedback] = useState<Record<string, ExerciseFeedback>>({});

  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const currentExercise = exercises[currentIndex];
  const isLastQuestion = currentIndex === exercises.length - 1;
  const isFirstQuestion = currentIndex === 0;

  const saveAnswer = useCallback((exerciseId: string, answer: ExerciseAnswer) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  }, []);

  const saveFeedback = useCallback((exerciseId: string, feedbackData: ExerciseFeedback) => {
    setFeedback((prev) => ({ ...prev, [exerciseId]: feedbackData }));
  }, []);

  const goToNext = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setPhase("instructions");
    } else {
      const totalTime = Date.now() - startTimeRef.current;
      onComplete?.({
        answers,
        feedback,
        totalTime,
        completedAt: new Date(),
      });
    }
  }, [isLastQuestion, answers, feedback, onComplete]);

  const goToPrevious = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentIndex((prev) => prev - 1);
      const prevExercise = exercises[currentIndex - 1];
      setPhase(answers[prevExercise.id] ? "review" : "instructions");
    }
  }, [isFirstQuestion, exercises, currentIndex, answers]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < exercises.length) {
        setCurrentIndex(index);
        setPhase(answers[exercises[index].id] ? "review" : "instructions");
      }
    },
    [exercises, answers]
  );

  const hasAnswer = useCallback(
    (exerciseId: string) => {
      return !!answers[exerciseId];
    },
    [answers]
  );

  const getAnswer = useCallback(
    (exerciseId: string) => {
      return answers[exerciseId];
    },
    [answers]
  );

  const getFeedback = useCallback(
    (exerciseId: string) => {
      return feedback[exerciseId];
    },
    [feedback]
  );

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setPhase("instructions");
    setAnswers({});
    setFeedback({});
    startTimeRef.current = Date.now();
  }, []);

  return {
    // State
    currentExercise,
    currentIndex,
    phase,
    totalQuestions: exercises.length,
    isFirstQuestion,
    isLastQuestion,

    // Actions
    setPhase,
    saveAnswer,
    saveFeedback,
    goToNext,
    goToPrevious,
    goToQuestion,
    reset,

    // Queries
    hasAnswer,
    getAnswer,
    getFeedback,
    answeredCount: Object.keys(answers).length,
    progress: ((currentIndex + 1) / exercises.length) * 100,
  };
}
