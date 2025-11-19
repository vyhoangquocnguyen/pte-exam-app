"use client";

import { useCallback, useRef, useState } from "react";

interface useAudioRecorderOptions {
  maxDuration?: number;
  onRecordingComplete?: (blob: Blob, duration: number) => void;
}

export function useAudioRecorder(options: useAudioRecorderOptions = {}) {
  const { maxDuration, onRecordingComplete } = options;

  // State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Ref
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timeRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up
  const cleanup = useCallback(() => {
    // Stop timer
    if (timeRef.current) {
      window.clearInterval(timeRef.current);
      timeRef.current = null;
    }

    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    // Clear Refs
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
  }, []);

  // Stop Recording
  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current) return;
    // Stop the MediaRecorder (this will trigger the onstop event)
    mediaRecorderRef.current.stop();

    // Stop timer
    if (timeRef.current) {
      window.clearInterval(timeRef.current);
      timeRef.current = null;
    }
  }, []);

  // Start Recording
  const startRecording = useCallback(async () => {
    try {
      setError(null);

      // 1. Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      // 2. Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      //3. Collect audio data when recording
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      //4. Handle recording stop
      mediaRecorder.onstop = () => {
        //Create audio blob from chunks
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        //Notify parent component
        onRecordingComplete?.(blob, timeRef.current ? recordingTime : 0); // Pass correct duration

        //Clean up
        cleanup();
        setIsRecording(false);
        setRecordingTime(0);
      };
      // 5. Start recording
      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);

      // 6. Start timer (count up per sec)
      timeRef.current = window.setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;

          // Auto stop if max duration reached
          if (maxDuration && newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);
    } catch (err) {
      // Handle mircrophone denied
      const message = err instanceof Error ? err.message : "Microphone access denied";
      setError(message as "string" | null);
    }
  }, [maxDuration, onRecordingComplete, stopRecording, recordingTime, cleanup]);

  // Cancel Recording
  const cancelRecording = useCallback(() => {
    cleanup();
    setIsRecording(false);
    setRecordingTime(0);
    setError(null);
  }, [cleanup]);

  // format time
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Return API
  return {
    // State
    isRecording,
    recordingTime,
    error,
    // Methods
    startRecording,
    stopRecording,
    cancelRecording,
    // Utils
    formatTime,
    process: maxDuration ? (recordingTime / maxDuration) * 100 : 0,
    timeRemaining: maxDuration ? maxDuration - recordingTime : null,
  };
}
