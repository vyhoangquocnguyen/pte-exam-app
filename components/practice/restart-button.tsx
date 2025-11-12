"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface RestartButtonProps {
  onRestart: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RestartButton({
  onRestart,
  disabled = false,
  variant = "secondary",
  size = "md",
  className,
}: RestartButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const handleClick = () => {
    if (confirm("Are you sure you want to restart this question? Your current answer will be lost.")) {
      onRestart();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <ArrowPathIcon className="w-4 h-4" />
      Restart Question
    </button>
  );
}