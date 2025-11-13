"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useTimer } from "@/hooks/use-timer";

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
  const { timeLeft, formattedTime } = useTimer({
    initialTime,
    isRunning,
    onTimeUp,
  });

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
