// components/practice/timer.tsx
"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  initialTime: number; // Time in seconds
  // onTimeUp: () => void; // Future: callback for auto-submit
}

// Helper to format seconds into MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

export default function Timer({ initialTime }: TimerProps) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    // Only run the timer if time is greater than 0
    if (time <= 0) return;

    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          // Future: onTimeUp();
          clearInterval(timerInterval);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(timerInterval);
  }, [time, initialTime]);

  const isCritical = time < 10;

  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold 
        ${isCritical ? "bg-red-500 text-white animate-pulse" : "bg-primary text-primary-foreground"}`}>
      <Clock className="h-4 w-4" />
      Time Left: {formatTime(time)}
    </div>
  );
}
