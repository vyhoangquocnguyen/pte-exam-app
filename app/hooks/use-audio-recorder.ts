import { useState, useRef, useEffect } from "react";

interface AudioRecoderControls {
  isRecording: boolean;
  recordingBlob: Blob | null;
  recordingUrl: string | null;
  recordingTime: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
  getMicrophonePermission: () => Promise<void>;
  permissionGranted: boolean;
  error: string | null;
}

const MIME_TYPE = "audio/webm";

export const useAudioRecorder = (): AudioRecoderControls => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Ultility functions

  const getMicrophonePermission = async () => {
    if (!("MediaRecorder" in window)) {
      setError("Your browser does not support audio recording");
      return;
    }

    try {
      // 1. Request microphone acces
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionGranted(true);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Permission denided or microphone not found.");
    }
  };

  const startRecording = async () => {
    if (!permissionGranted || !streamRef.current) {
      await getMicrophonePermission();
      if (!streamRef.current) return;
    }

    // clean up previous record data
    audioChunksRef.current = [];
    setRecordingBlob(null);
    setRecordingUrl(null);
    setRecordingTime(0);

    // 2. Creating the MediaRecorder instance
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: MIME_TYPE,
    });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      // 3, Collect data chunks
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      // 4. on stop, creat the final blob
      const blob = new Blob(audioChunksRef.current, { type: MIME_TYPE });
      const url = URL.createObjectURL(blob);
      setRecordingBlob(blob);
      setRecordingUrl(url);
      setIsRecording(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Stop the microphone tracks to free the resource
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    // Start recording
    mediaRecorder.start();
    setIsRecording(true);
    // Start recording time
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const clearRecording = () => {
    if (recordingUrl) {
      URL.revokeObjectURL(recordingUrl);
    }
    setRecordingUrl(null);
    setRecordingBlob(null);
    setRecordingTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recordingUrl) {
        URL.revokeObjectURL(recordingUrl);
      }
    };
  }, [recordingUrl]);

  return {
    isRecording,
    recordingBlob,
    recordingUrl,
    recordingTime,
    startRecording,
    stopRecording,
    clearRecording,
    getMicrophonePermission,
    permissionGranted,
    error,
  };
};
