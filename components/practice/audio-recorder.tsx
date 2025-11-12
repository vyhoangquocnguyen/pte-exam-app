"use client";

import { MicrophoneIcon, StopIcon, PlayIcon, PauseIcon, TrashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useMemo, useEffect } from "react";
interface AudioRecorderProps {
  maxDuration?: number | null; // seconds (null = unlimited)
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  onAutoStop?: () => void;
  autoStart?: boolean;
  forceReset?: boolean; // Trigger reset when true
}

export default function AudioRecorder({
  maxDuration = null,
  onRecordingComplete,
  onAutoStop,
  autoStart = false,
  forceReset = false,
}: AudioRecorderProps) {
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    formatTime,
    deleteRecording,
    reset,
  } = useAudioRecorder({ maxDuration, onRecordingComplete, onAutoStop, autoStart });

  // Playback control (after recoding)
  const {
    isPlaying,
    togglePlay,
    progress,
    currentTime,
    duration,
    formatTime: formatPlaybackTime,
  } = useAudioPlayer({
    src: audioUrl || "",
    maxPlays: 1,
    onEnded: () => console.log("Playback ended"),
  });

  const bars = useMemo(() => {
    return Array.from({ length: 40 }, () => Math.random() * 70 + 10);
  }, []);

  // Reset when forceReset changes
  useEffect(() => {
    if (forceReset) {
      reset();
    }
  }, [forceReset, reset]);

  const recordingProgress = maxDuration ? (recordingTime / maxDuration) * 100 : 0;

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
      {/* Recording Visualizer */}
      <div
        className={cn(
          "h-24 mb-6 rounded-xl flex items-center justify-center relative overflow-hidden",
          isRecording && !isPaused ? "bg-gradient-to-r from-red-50 to-pink-50" : "bg-gray-50"
        )}>
        {isRecording && !isPaused ? (
          <div className="flex items-end justify-center gap-1 h-full py-4">
            {bars.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{
                  height: `${height}%`,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        ) : audioUrl ? (
          <div className="flex items-center gap-4 w-full px-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-all">
              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatPlaybackTime(Math.floor(currentTime))} / {formatPlaybackTime(duration)}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <MicrophoneIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Ready to record</p>
          </div>
        )}
      </div>

      {/* Hidden audio element for playback
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={(e) => setPlaybackTime(e.currentTarget.currentTime)}
          onEnded={() => {
            setIsPlaying(false);
            setPlaybackTime(0);
          }}
        />
      )} */}

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* Timer and Progress */}
        {isRecording && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Recording...</span>
              <span className={cn("text-xl font-display font-bold", isPaused ? "text-yellow-600" : "text-red-600")}>
                {formatTime(recordingTime)}
              </span>
            </div>
            {maxDuration && (
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all" style={{ width: `${recordingProgress}%` }} />
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          {!isRecording && !audioBlob && (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all">
              <MicrophoneIcon className="w-6 h-6" />
              Start Recording
            </button>
          )}

          {/* Pause/Resume/Stop */}
          {isRecording && (
            <>
              {!isPaused ? (
                <button
                  onClick={pauseRecording}
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold transition-all">
                  Pause
                </button>
              ) : (
                <button
                  onClick={resumeRecording}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all">
                  Resume
                </button>
              )}

              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all">
                <StopIcon className="w-5 h-5" />
                Stop
              </button>
            </>
          )}

          {/* After recording is done */}
          {audioBlob && (
            <>
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-all">
                <MicrophoneIcon className="w-5 h-5" />
                Record Again
              </button>

              <button
                onClick={deleteRecording}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all">
                <TrashIcon className="w-5 h-5" />
                Delete
              </button>
            </>
          )}
        </div>

        {/* Info Text */}
        {maxDuration && !isRecording && !audioBlob && (
          <p className="text-sm text-gray-500 text-center">Maximum recording time: {formatTime(maxDuration)}</p>
        )}
      </div>
    </div>
  );
}
