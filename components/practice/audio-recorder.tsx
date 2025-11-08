"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { useAudioRecorder } from "@/app/hooks/use-audio-recorder";
import { Button } from "../ui/button";
import AudioPlayer from "./audio-player";
import { Mic, Redo, StopCircle } from "lucide-react";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${sec}`;
};

const AudioRecorder = () => {
  const {
    isRecording,
    recordingUrl,
    recordingTime,
    permissionGranted,
    error,
    startRecording,
    stopRecording,
    clearRecording,
    getMicrophonePermission,
  } = useAudioRecorder();

  if (error) {
    return (
      <p className="text-red-500 p-4">
        {" "}
        Error: {error}. Please ensure your microphone is connected and access is granted
      </p>
    );
  }

  if (!permissionGranted) {
    return <Button onClick={getMicrophonePermission}>Click to Enable Microphone</Button>;
  }

  return (
    <Card>
      <CardContent>
        {/* Playback Area: shown when recording is stopped and a URL exists */}
        {recordingUrl ? (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Your Recording:</h3>
            <AudioPlayer audioUrl={recordingUrl} onClear={clearRecording} />
          </div>
        ) : (
          //   Recording Area: shown when recording is in progress or no recording exists

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Recording Indicator */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out
                                ${isRecording ? "bg-red-500 animate-pulse" : "bg-primary/10 border-2 border-primary"}`}>
                {isRecording ? <StopCircle className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-primary" />}
              </div>
            </div>

            <div className="text-xl font-mono">{formatTime(recordingTime)}</div>
            <div className="flex gap-4">
              {isRecording ? (
                <Button onClick={stopRecording} variant="destructive" className="w-32">
                  <StopCircle className="mr-2 h-4 w-4" /> Stop
                </Button>
              ) : (
                <Button onClick={startRecording} disabled={isRecording} className="w-32">
                  <Mic className="mr-2 h-4 w-4" /> Start
                </Button>
              )}

              <Button onClick={clearRecording} variant="outline" disabled={isRecording || !recordingUrl}>
                <Redo className="mr-2 h-4 w-4" /> Redo
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;
