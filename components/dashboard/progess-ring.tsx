"use client";

import { Card } from "../ui/card";

interface ProgressRingProps {
  score: number;
  skill: string;
}

const ProgressRing = ({ score, skill }: ProgressRingProps) => {
  const percentage = Math.round((score / 90) * 100);
  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 36 36" className="absolute top-0 left-0 h-full w-full transform -rotate-90">
          {/* <circle cx="18" cy="18" r="16" fill="none" strokeWidth="4" stroke="currentColor" strokeDasharray="120" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="16" fill="none" strokeWidth="4" stroke="currentColor" strokeDasharray="120" strokeDashoffset="120" /> */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#10b981" // Tailwind green-500
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{skill}</p>
    </Card>
  );
};

export default ProgressRing;
