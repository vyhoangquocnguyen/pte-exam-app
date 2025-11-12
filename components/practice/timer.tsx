"use client";

import { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface TimerProps {
  initialTime: number; // seconds
  onTimeUp?: () => void;
  isRunning?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "warning" | "danger";
}

export default function Timer({
  initialTime,
  onTimeUp,
  isRunning = true,
  showIcon = true,
  size = "md",
  variant = "default",
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Auto-determine variant based on time
  const currentVariant =
    variant === "default" ? (timeLeft <= 10 ? "danger" : timeLeft <= 30 ? "warning" : "default") : variant;

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const variantClasses = {
    default: "text-gray-900",
    warning: "text-yellow-600",
    danger: "text-red-600 animate-pulse",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && <ClockIcon className={cn(iconSizes[size], variantClasses[currentVariant])} />}
      <span className={cn("font-display font-bold tabular-nums", sizeClasses[size], variantClasses[currentVariant])}>
        {formattedTime}
      </span>
    </div>
  );
}
