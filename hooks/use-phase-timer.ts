"use client";

import { useCallback, useEffect, useRef, useState } from "react";

//This timer hook is use for question phase in speaking exercises

type TimePhase = "idle" | "preparation" | "recording" | "completed";

interface UsePhaseTimerOptions {
  preparationTime: number;
  recordingTime: number;
  onPreparationComplete?: () => void;
  onRecordingComplete?: () => void;
  autoStart?: boolean;
}

export function usePhaseTimer(options: UsePhaseTimerOptions) {
  const { preparationTime, recordingTime, onPreparationComplete, onRecordingComplete, autoStart = false } = options;

  // STATE
  const [phase, setPhase] = useState<TimePhase>("idle");
  const [timeLeft, setTimeLeft] = useState(preparationTime);

  //REFS
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onPrepCompleteRef = useRef(onPreparationComplete);
  const onRecCompleteRef = useRef(onRecordingComplete);

  // Keep callback ref up to date
  useEffect(() => {
    onPrepCompleteRef.current = onPreparationComplete;
    onRecCompleteRef.current = onRecordingComplete;
  }, [onPreparationComplete, onRecordingComplete]);

  // START: Preparation phase
  const start = useCallback(() => {
    setPhase("preparation");
    setTimeLeft(preparationTime);
  }, [preparationTime]);

  // SKIP: Jump to Recording phase
  const skipToRecording = useCallback(() => {
    // clear existing timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // move to recording phase
    setPhase("recording");
    setTimeLeft(recordingTime);

    //   notify parent component
    onPrepCompleteRef.current?.();
  }, [recordingTime]);

  // RESET: back to idle phase
  const reset = useCallback(() => {
    // clear Timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      // Reset state
      setPhase("idle");
      setTimeLeft(preparationTime);
    }
  }, [preparationTime]);

  // Timer Effct: Count down logic

  useEffect(() => {
    // Dont runt timer in idle or completed phase
    if (phase === "idle" || phase === "completed") return;

    // Start Countdown
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        //Time's up
        if (prev <= 1) {
          // PREPARTION -> RECORDING
          if (phase === "preparation") {
            setPhase("recording");
            onRecCompleteRef.current?.(); // notify parent component
            return recordingTime;
          }

          // RECORDING -> COMPLETED
          if (phase === "recording") {
            setPhase("completed");
            onRecCompleteRef.current?.(); // notify parent component
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount or phase change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [phase, recordingTime]);
    
    // Helper function
    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    }, []);

    return {
      //State
      phase,
      timeLeft,
      isRunning: phase === "preparation" || phase === "recording",
      //Actions
      start,
      skipToRecording,
      reset,
      //helper
      formatTime,
      isPreparation: phase === "preparation",
      isRecording: phase === "recording",
      isCompleted: phase === "completed",
      isIdle: phase === "idle",
    };
}
