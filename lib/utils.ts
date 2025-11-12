import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type SkillType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format score to band score (0-90)
export function formatScore(score: number): string {
  return Math.round(score).toString();
}

//Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

//Format time (seconds to MM:SS)
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

//Get skill color classes
export function getSkillColor(skill: SkillType, variant?: "bg" | "light" | "text"): string {
  const colors: Record<SkillType, { bg: string; light: string; text: string }> = {
    speaking: {
      bg: "bg-speaking",
      light: "bg-blue-50",
      text: "text-speaking",
    },
    writing: {
      bg: "bg-writing",
      light: "bg-purple-50",
      text: "text-writing",
    },
    reading: {
      bg: "bg-reading",
      light: "bg-amber-50",
      text: "text-reading",
    },
    listening: {
      bg: "bg-listening",
      light: "bg-pink-50",
      text: "text-listening",
    },
  };
  return colors[skill][variant ?? "bg"];
}

//Get score color
export function getScoreColor(score: number): string {
  if (score >= 79) return "text-green-600";
  if (score >= 65) return "text-yellow-600";
  if (score >= 50) return "text-orange-600";
  return "text-red-600";
}
