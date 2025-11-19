"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Exercise, ExerciseAnswer, ExerciseFeedback, ExercisePhase, ExerciseResults } from "@/types/exercise-schemas";
interface UseExerciseOptions {
  exercises: Exercise[];
  onComplete?: (results: ExerciseResults) => void;
}

export function useExercise({ exercises, onComplete }: UseExerciseOptions) {
  // STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<ExercisePhase>("instructions");
  const [answers, setAnswers] = useState<Record<string, ExerciseAnswer>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, ExerciseFeedback>>({});

  // REFS
  // ref to track the start time of the exercise session
  const startTimeRef = useRef<number>(0);

  // useEffect to set the start time when the exercise session begins.
  useEffect(() => {
    if (startTimeRef.current === 0) {
      //The side effect (impure action) happens safely inside useEffect
      startTimeRef.current = Date.now();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // COMPUTE VALUES
  const currentExercise = exercises[currentIndex];
  const isLastExercise = currentIndex === exercises.length - 1;
  const isFirstExercise = currentIndex === 0;
  const answeredCount = Object.keys(answers).length;

  // SAVE DATA

  // save answer for a specific exercise
  const saveAnswer = useCallback((exerciseId: string, answer: ExerciseAnswer) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  }, []);

  // save feed back for a specific exercise
  const saveFeedback = useCallback((exerciseId: string, feedbackData: ExerciseFeedback) => {
    setFeedbacks((prev) => ({ ...prev, [exerciseId]: feedbackData }));
  }, []);

  // NAVIGATION HANDLERS
  // go to the next question(or complete if last)
  const goToNext = useCallback(() => {
    if (isLastExercise) {
      //Excercise complete - calculate total time
      const totalTime = Date.now() - startTimeRef.current;

      onComplete?.({
        answers,
        feedbacks,
        totalTime,
        completedAt: new Date(),
      });
    } else {
      //Move to next exercise
      setCurrentIndex((prev) => prev + 1);
      setPhase("instructions");
    }
  }, [isLastExercise, onComplete, answers, feedbacks]);

  // go to the previous question
  const goToPrevious = useCallback(() => {
    if (!isFirstExercise) {
      setCurrentIndex((prev) => prev - 1);

      // If already answered, go to review phase
      const prevExercise = exercises[currentIndex - 1];
      setPhase(answers[prevExercise.id] ? "review" : "instructions");
    }
  }, [isFirstExercise, currentIndex, answers, exercises]);

  // go to specific question by index
  const goToExercise = useCallback(
    (index: number) => {
      if (index >= 0 && index < exercises.length) {
        setCurrentIndex(index);

        // Determine phase based on whether the exercise has been answered
        const targetExercise = exercises[index];
        setPhase(answers[targetExercise.id] ? "review" : "instructions");
      }
    },
    [answers, exercises]
  );

  // QUERIES: check State

  // Check if a question has been answered
  const hasAnswered = useCallback(
    (exerciseId: string) => {
      return !!answers[exerciseId];
    },
    [answers]
  );

  // Get answer for a specific question
  const getAnswer = useCallback(
    (exerciseId: string) => {
      return answers[exerciseId];
    },
    [answers]
  );

  // Get feedback for a specific question
  const getFeedback = useCallback(
    (exerciseId: string) => {
      return feedbacks[exerciseId];
    },
    [feedbacks]
  );

  // ACTIONS: Reset
  // Reset the entire exercise session
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setPhase("instructions");
    setAnswers({});
    setFeedbacks({});
    startTimeRef.current = Date.now();
  }, []);

  return {
    // STATE
    currentExercise,
    currentIndex,
    phase,
    totalQuestions: exercises.length,
    answeredCount,

    // NAVIGATION FLAGS
    isFirstExercise,
    isLastExercise,

    // ACTIONS: STATE MANAGEMENT
    setPhase,
    saveAnswer,
    saveFeedback,

    // ACTIONS: NAVIGATION
    goToNext,
    goToPrevious,
    goToExercise,

    // QUERIES: CHECK STATE
    hasAnswered,
    getAnswer,
    getFeedback,

    // ACTIONS: RESET
    reset,

    //PROGRESS TRACKING
    progress: ((currentIndex + 1) / exercises.length) * 100,
  };
}
