"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface UseAudioPlayerOptions {
  src: string;
  maxPlays?: number | null;
  onPlayCountChange?: (count: number) => void;
  onEnded?: () => void;
  autoPlay?: boolean;
}

export function useAudioPlayer({
  src,
  maxPlays = null,
  onPlayCountChange,
  onEnded,
  autoPlay = false,
}: UseAudioPlayerOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onEnded?.();
    };

    const handleError = () => {
      setError("Failed to load audio");
      setIsLoading(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    if (autoPlay) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setPlayCount(1);
          onPlayCountChange?.(1);
        })
        .catch(() => {
          setError("Autoplay failed. User interaction required.");
        });
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [src, autoPlay, onEnded, onPlayCountChange]);

  // Play/Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (maxPlays !== null && playCount >= maxPlays) {
      return; // Max plays reached
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);

          // Increment play count only when starting from beginning
          if (currentTime === 0) {
            const newCount = playCount + 1;
            setPlayCount(newCount);
            onPlayCountChange?.(newCount);
          }
        })
        .catch((err) => {
          setError("Playback failed");
          console.error("Audio playback error:", err);
        });
    }
  }, [isPlaying, currentTime, playCount, maxPlays, onPlayCountChange]);

  // Seek to position
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  // Restart from beginning
  const restart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  // Change volume
  const changeVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audio.volume = clampedVolume;
    setVolume(clampedVolume);
  }, []);

  // Check if can play more
  const canPlay = maxPlays === null || playCount < maxPlays;

  // Format time helper
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    // State
    isPlaying,
    currentTime,
    duration,
    playCount,
    volume,
    isLoading,
    error,
    canPlay,

    // Actions
    togglePlay,
    seek,
    restart,
    changeVolume,

    // Helpers
    formatTime,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,

    // Audio element ref (for advanced use)
    audioRef,
  };
}
