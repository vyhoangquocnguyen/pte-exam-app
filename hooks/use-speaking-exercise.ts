"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "./use-audio-recorder";
import { useExercise } from "./use-exercise";
import { usePreparationTimer } from "./use-preparation-timer";
import { Exercise, SpeakingContent, ExercisePhase, AudioAnswer, assertSpeakingContent } from "@/types/exercise-schemas";

interface UseSpeakingExerciseOptions {
  exercises: Exercise[];
  onComplete?: (results: SpeakingExerciseResults) => void;
}

interface SpeakingExerciseResults {
  answers: Record<string, AudioAnswer>;
  totalTime: number;
  completedAt: Date;
}

export function useSpeakingExercise({ exercises, onComplete }: UseSpeakingExerciseOptions) {
  // STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<ExercisePhase>("instructions");
  const [answers, setanswers] = useState<Record<string, AudioAnswer>>({});

  // REF
  const startTimeRef = useRef<number>(0);
  // initialize start time when exercise session begins
  useEffect(() => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const currentExercise = exercises[currentIndex];

  // Validate exercise content
  if (!currentExercise || !currentExercise.content) {
    throw new Error("Invalid exercise content");
  }

  // Assert its a speaking exercise
  assertSpeakingContent(currentExercise.content);
  const content = currentExercise.content as SpeakingContent;

  // Get timing from content
  const preparationTime = content.preparationTime || 0;
  const recordingTime = content.recordingTime;

  // Audio recorder hook
  const recorder = useAudioRecorder({
    maxDuration: recordingTime,
    onRecordingComplete: (blob, duration) => {
      // Save answers
      const answers: AudioAnswer = {
        type: "audio",
        audioBlob: blob,
        audioUrl: URL.createObjectURL(blob),
        duration,
      };
      setanswers((prev) => ({ ...prev, [currentExercise.id]: answers }));
      // set phase to review
      setPhase("review");
    },
  });

  // Timer hook
  const timer = usePreparationTimer({
    preparationTime,
    recordingTime,
    onPreparationComplete: () => {
      setPhase("active");
      recorder.startRecording();
    },
    onRecordingComplete: () => {
      recorder.stopRecording();
    },
  });

  // Start exercise
  const startExercise = useCallback(() => {
    if (preparationTime > 0) {
      setPhase("preparation");
      timer.start();
    } else {
      // if no preparation time, start recording directly
      setPhase("active");
      recorder.startRecording();
    }
  }, [preparationTime, recorder, timer]);

  // Go to next question
  const goToNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPhase("instructions");
      timer.reset();
    } else {
      // Complete exercise
      const totalTime = Date.now() - startTimeRef.current;
      onComplete?.({
        answers,
        totalTime,
        completedAt: new Date(),
      });
    }
  }, [currentIndex, exercises.length, answers, timer, onComplete]);

  // Go to previous question
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const prevExercise = exercises[currentIndex - 1];
      setPhase(answers[prevExercise.id] ? "review" : "instructions");
      timer.reset();
    }
  }, [currentIndex, exercises, answers, timer]);

  // Retry current question
  const retryQuestion = useCallback(() => {
    // Remove current answers
    setanswers((prev) => {
      const newanswerss = { ...prev };
      delete newanswerss[currentExercise.id];
      return newanswerss;
    });

    // Revoke old audio URL
    const oldanswers = answers[currentExercise.id];
    if (oldanswers?.audioUrl) {
      URL.revokeObjectURL(oldanswers.audioUrl);
    }

    // Reset to instructions phase
    setPhase("instructions");
    timer.reset();
  }, [currentExercise.id, answers, timer]);

  // Jump to specific question
  const goToExercise = useCallback(
    (index: number) => {
      if (index >= 0 && index < exercises.length) {
        setCurrentIndex(index);
        const exercise = exercises[index];
        setPhase(answers[exercise.id] ? "review" : "instructions");
        timer.reset();
      }
    },
    [exercises, answers, timer]
  );

  // Clean up audio URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(answers).forEach((answer) => {
        if (answer.audioUrl) {
          URL.revokeObjectURL(answer.audioUrl);
        }
      });
    };
  }, [answers]);

  return {
    // STATE
    currentExercise,
    currentIndex,
    phase,
    totalQuestions: exercises.length,
    answeredQuestions: Object.keys(answers).length,

    // CONTENT
    startExercise,
    goToNext,
    goToPrevious,
    retryQuestion,
    goToExercise,
    setPhase,

    // TIMERS
    timer,

    // RECORDER
    recorder,

    // ANSWERS
    answers,
    currentAnswer: answers[currentExercise.id],
    
    //HELPERS
    isFirstExercise: currentIndex === 0,
    isLastExercise: currentIndex === exercises.length - 1,
    hasAnswered: !!answers[currentExercise.id],
    canGoNext: !!answers[currentExercise.id],
    canGoPrevious: currentIndex > 0,
  }
}
