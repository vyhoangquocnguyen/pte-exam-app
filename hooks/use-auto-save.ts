"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseAutoSaveOptions<T> {
  key: string;
  data: T;
  interval?: number; // milliseconds
  enabled?: boolean;
  onSave?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useAutoSave<T>({
  key,
  data,
  interval = 30000, // 30 seconds default
  enabled = true,
  onSave,
  onError,
}: UseAutoSaveOptions<T>) {
  const lastSavedRef = useRef<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Save function
  const save = useCallback(() => {
    try {
      const serialized = JSON.stringify(data);

      // Only save if data has changed
      if (serialized !== lastSavedRef.current) {
        localStorage.setItem(key, serialized);
        lastSavedRef.current = serialized;
        onSave?.(data);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Failed to save");
      onError?.(err);
      console.error("Auto-save error:", err);
    }
  }, [key, data, onSave, onError]);

  // Load function
  const load = useCallback((): T | null => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved) as T;
        lastSavedRef.current = saved;
        return parsed;
      }
      return null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Failed to load");
      onError?.(err);
      console.error("Load error:", err);
      return null;
    }
  }, [key, onError]);

  // Clear saved data
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key);
      lastSavedRef.current = "";
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Failed to clear");
      onError?.(err);
      console.error("Clear error:", err);
    }
  }, [key, onError]);

  // Manual save
  const saveNow = useCallback(() => {
    save();
  }, [save]);

  // Auto-save interval
  useEffect(() => {
    if (!enabled) return;

    // Save immediately on mount if data exists
    if (data) {
      save();
    }

    // Set up interval
    timerRef.current = setInterval(() => {
      save();
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Save one last time on unmount
      save();
    };
  }, [data, interval, enabled, save]);

  return {
    save: saveNow,
    load,
    clear,
    isSaved: lastSavedRef.current === JSON.stringify(data),
  };
}
