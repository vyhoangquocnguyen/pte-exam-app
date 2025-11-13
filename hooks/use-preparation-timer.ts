"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type TimerPhase = "preparation" | "recording" | "completed";

interface UsePreparationTimerOptions {
  preparationTime: number; // seconds
  recordingTime: number; // seconds
  onPreparationComplete?: () => void;
  onRecordingComplete?: () => void;
  autoStart?: boolean;
}

export function usePreparationTimer({
  preparationTime,
  recordingTime,
  onPreparationComplete,
  onRecordingComplete,
  autoStart = false,
}: UsePreparationTimerOptions) {
  const [phase, setPhase] = useState<TimerPhase>("preparation");
  const [timeLeft, setTimeLeft] = useState(preparationTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Pause timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Skip preparation and go to recording
  const skipPreparation = useCallback(() => {
    if (phase === "preparation") {
      setPhase("recording");
      setTimeLeft(recordingTime);
      onPreparationComplete?.();
    }
  }, [phase, recordingTime, onPreparationComplete]);

  // Reset everything
  const reset = useCallback(() => {
    setPhase("preparation");
    setTimeLeft(preparationTime);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [preparationTime]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up for current phase
          if (phase === "preparation") {
            // Move to recording phase
            setPhase("recording");
            setTimeLeft(recordingTime);
            onPreparationComplete?.();
            return recordingTime;
          } else if (phase === "recording") {
            // Recording complete
            setPhase("completed");
            setIsRunning(false);
            onRecordingComplete?.();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, phase, recordingTime, onPreparationComplete, onRecordingComplete]);

  // Format time
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    // State
    phase,
    timeLeft,
    isRunning,

    // Actions
    start,
    pause,
    skipPreparation,
    reset,

    // Helpers
    formatTime,
    isPreparation: phase === "preparation",
    isRecording: phase === "recording",
    isCompleted: phase === "completed",
    totalTime: preparationTime + recordingTime,
    progress:
      phase === "preparation"
        ? ((preparationTime - timeLeft) / preparationTime) * 50
        : 50 + ((recordingTime - timeLeft) / recordingTime) * 50,
  };
}
