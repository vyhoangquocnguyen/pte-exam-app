"use client";

import { PlayIcon, PauseIcon, ArrowPathIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  maxPlays?: number | null; // Limit number of plays (null = unlimited)
  onPlayCountChange?: (count: number) => void;
  autoPlay?: boolean;
  onEnded?: () => void; // Callback when audio ends
  showWaveform?: boolean;
}

export default function AudioPlayer({
  src,
  maxPlays = null,
  onPlayCountChange,
  autoPlay = false,
  onEnded,
  showWaveform = true,
}: AudioPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    playCount,
    progress,
    canPlay,
    formatTime,
    togglePlay,
    restart,
    seek,
    changeVolume,
    volume,
    audioRef,
  } = useAudioPlayer({ src, maxPlays, onPlayCountChange, autoPlay, onEnded });

  // Use this hook if audio source comes from recording
  const { audioUrl } = useAudioRecorder();

  // Determine which source to play
  const audioSource = src || audioUrl;

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
      <audio ref={audioRef} src={audioSource || ""} preload="metadata" />

      {/* Waveform Visualization (Simplified) */}
      {showWaveform && (
        <div className="flex items-center justify-center h-20 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg overflow-hidden">
          <div className="flex items-end justify-center gap-1 h-full py-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const height = Math.random() * 60 + 20;
              const isActive = (i / 40) * 100 <= progress;

              return (
                <div
                  key={i}
                  className={cn(
                    "w-1 rounded-full transition-all duration-150",
                    isActive ? "bg-brand-500" : "bg-gray-300"
                  )}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlay}
          disabled={!canPlay}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            canPlay ? "bg-brand-500 hover:bg-brand-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}>
          {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-0.5" />}
        </button>

        <button
          onClick={restart}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all">
          <ArrowPathIcon className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-32">
          <SpeakerWaveIcon className="w-5 h-5 text-gray-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
        </div>
      </div>

      {/* Play Count Info */}
      {maxPlays !== null && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Plays: {playCount} / {maxPlays}
          </span>
          {!canPlay && <span className="text-red-600 font-semibold">Maximum plays reached</span>}
        </div>
      )}
    </div>
  );
}
