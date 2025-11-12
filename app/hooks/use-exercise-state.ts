"use client";

import { useState, useCallback, useEffect } from "react";

export interface ExerciseAnswer {
  questionId: string;
  answer: any; // Can be string, string[], Blob, etc.
  timeSpent: number; // seconds
  isAnswered: boolean;
  submittedAt?: Date;
}

export interface ExerciseStateData {
  exerciseId: string;
  exerciseType: string;
  currentQuestionIndex: number;
  answers: Record<string, ExerciseAnswer>;
  startedAt: Date;
  completedAt?: Date;
}

interface UseExerciseStateOptions {
  exerciseId: string;
  exerciseType: string;
  totalQuestions: number;
  onComplete?: (data: ExerciseStateData) => void;
  autoSave?: boolean;
}

export function useExerciseState({
  exerciseId,
  exerciseType,
  totalQuestions,
  onComplete,
  autoSave = true,
}: UseExerciseStateOptions) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ExerciseAnswer>>({});
  const [startedAt] = useState(new Date());
  const [completedAt, setCompletedAt] = useState<Date | undefined>();
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = currentQuestionIndex + 1;

  // Load saved state on mount
  useEffect(() => {
    if (autoSave) {
      const saved = localStorage.getItem(`exercise_${exerciseId}`);
      if (saved) {
        try {
          const data = JSON.parse(saved) as ExerciseStateData;
          setCurrentQuestionIndex(data.currentQuestionIndex);
          setAnswers(data.answers);
        } catch (error) {
          console.error("Failed to load saved exercise state:", error);
        }
      }
    }
  }, [exerciseId, autoSave]);

  // Auto-save state
  useEffect(() => {
    if (autoSave && Object.keys(answers).length > 0) {
      const data: ExerciseStateData = {
        exerciseId,
        exerciseType,
        currentQuestionIndex,
        answers,
        startedAt,
        completedAt,
      };
      localStorage.setItem(`exercise_${exerciseId}`, JSON.stringify(data));
    }
  }, [exerciseId, exerciseType, currentQuestionIndex, answers, startedAt, completedAt, autoSave]);

  // Submit answer for current question
  const submitAnswer = useCallback(
    (questionId: string, answer: any) => {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      setAnswers((prev) => ({
        ...prev,
        [questionId]: {
          questionId,
          answer,
          timeSpent,
          isAnswered: true,
          submittedAt: new Date(),
        },
      }));
    },
    [questionStartTime]
  );

  // Go to next question
  const goToNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      // Last question - complete exercise
      const completionDate = new Date();
      setCompletedAt(completionDate);

      const finalData: ExerciseStateData = {
        exerciseId,
        exerciseType,
        currentQuestionIndex,
        answers,
        startedAt,
        completedAt: completionDate,
      };

      onComplete?.(finalData);

      // Clear saved state
      if (autoSave) {
        localStorage.removeItem(`exercise_${exerciseId}`);
      }
    }
  }, [currentQuestionIndex, totalQuestions, exerciseId, exerciseType, answers, startedAt, onComplete, autoSave]);

  // Go to previous question
  const goToPrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex]);

  // Jump to specific question
  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentQuestionIndex(index);
        setQuestionStartTime(Date.now());
      }
    },
    [totalQuestions]
  );

  // Check if question is answered
  const isQuestionAnswered = useCallback(
    (questionId: string) => {
      return answers[questionId]?.isAnswered || false;
    },
    [answers]
  );

  // Get answer for question
  const getAnswer = useCallback(
    (questionId: string) => {
      return answers[questionId]?.answer;
    },
    [answers]
  );

  // Get all answered question indices
  const getAnsweredIndices = useCallback(() => {
    return Object.values(answers)
      .filter((a) => a.isAnswered)
      .map((_, index) => index + 1);
  }, [answers]);

  // Calculate total time spent
  const getTotalTimeSpent = useCallback(() => {
    return Object.values(answers).reduce((sum, answer) => sum + answer.timeSpent, 0);
  }, [answers]);

  // Reset exercise
  const reset = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCompletedAt(undefined);
    setQuestionStartTime(Date.now());
    if (autoSave) {
      localStorage.removeItem(`exercise_${exerciseId}`);
    }
  }, [exerciseId, autoSave]);

  return {
    // State
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    isCompleted: !!completedAt,

    // Actions
    submitAnswer,
    goToNext,
    goToPrevious,
    goToQuestion,
    reset,

    // Helpers
    isQuestionAnswered,
    getAnswer,
    getAnsweredIndices,
    getTotalTimeSpent,

    // Progress
    progress: (currentQuestion / totalQuestions) * 100,
    answeredCount: Object.keys(answers).length,
  };
}
