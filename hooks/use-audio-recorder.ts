"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseAudioRecorderOptions {
  maxDuration?: number | null; // seconds
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  onAutoStop?: () => void; // Called when auto-stopped due to max duration
  autoStart?: boolean;
}

export function useAudioRecorder({
  maxDuration = null,
  onRecordingComplete,
  onAutoStop,
  autoStart = false,
}: UseAudioRecorderOptions = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStopping, setIsStopping] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Auto-start if specified
  useEffect(() => {
    if (autoStart) {
      startRecording();
    }

    return () => {
      cleanup();
    };
  }, [autoStart]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  }, [audioUrl]);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("🎙️ MediaRecorder stopped, creating blob...");
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        setIsStopping(false); // Reset stopping flag
        console.log("📤 Calling onRecordingComplete with blob size:", blob.size, "duration:", recordingTime);
        onRecordingComplete?.(blob, recordingTime);

        // Cleanup stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;

          // Auto-stop if max duration reached
          if (maxDuration && newTime >= maxDuration) {
            console.log("🛑 Max duration reached, stopping recording...");
            // Clear timer first to prevent multiple calls
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            
            // Stop the MediaRecorder directly
            if (mediaRecorderRef.current) {
              console.log("🎙️ Directly stopping MediaRecorder from timer...");
              setIsStopping(true);
              mediaRecorderRef.current.stop();
              setIsRecording(false);
              setIsPaused(false);
              onAutoStop?.();
            }
            
            return maxDuration;
          }

          return newTime;
        });
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Microphone access denied";
      setError(errorMessage);
      console.error("Error accessing microphone:", err);
    }
  }, [maxDuration, onRecordingComplete, onAutoStop, recordingTime]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording, isPaused]);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);

      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (maxDuration && newTime >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return newTime;
        });
      }, 1000);
    }
  }, [isRecording, isPaused, maxDuration]);

  // Stop recording
  const stopRecording = useCallback(() => {
    console.log("🛑 stopRecording called, isRecording:", isRecording, "isStopping:", isStopping);
    
    if (isStopping) {
      console.log("⚠️ Already stopping, ignoring duplicate call");
      return;
    }

    if (mediaRecorderRef.current) {
      console.log("🎙️ Stopping MediaRecorder...");
      setIsStopping(true);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      console.log("⚠️ Cannot stop - no MediaRecorder");
    }
  }, [isRecording, isStopping]);

  // Delete recording
  const deleteRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  }, [audioUrl]);

  // Reset everything
  const reset = useCallback(() => {
    cleanup();
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioUrl(null);
    setError(null);
    setIsStopping(false);
    audioChunksRef.current = [];
  }, [cleanup]);

  // Format time
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    // State
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    error,

    // Actions
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    reset,

    // Helpers
    formatTime,
    hasRecording: !!audioBlob,
    canRecord: !isRecording,
    progress: maxDuration ? (recordingTime / maxDuration) * 100 : 0,
  };
}
