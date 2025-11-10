import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
export function getSkillColer(skill: "speaking" | "writing" | "reading" | "listening"): string {
  const color = {
    speaking: "bg-speaking text-white",
    writing: "bg-writing text-white",
    reading: "bg-reading text-white",
    listening: "bg-listening text-white",
  };
  return color[skill];
}

//Get score color
export function getScoreColor(score: number): string {
  if (score >= 79) return "text-green-600";
  if (score >= 65) return "text-yellow-600";
  if (score >= 50) return " text-orange-600";
  return "text-red-600";
}
