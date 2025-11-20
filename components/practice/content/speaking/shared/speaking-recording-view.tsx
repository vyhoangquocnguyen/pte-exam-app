import { ReactNode } from "react";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/outline";

interface SpeakingRecordingViewProps {
  currentDuration: number;
  totalDuration: number;
  formatTime: (seconds: number) => string;
  onStop: () => void;
  children: ReactNode; // <--- The variable part
}

export function SpeakingRecordingView({
  currentDuration,
  totalDuration,
  formatTime,
  onStop,
  children,
}: SpeakingRecordingViewProps) {
  const progress = (currentDuration / totalDuration) * 100;

  return (
    <div className="space-y-6">
      {/* Universal Recording Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                <MicrophoneIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-900">Recording Now</h3>
              <p className="text-red-700 font-mono text-lg">
                {formatTime(currentDuration)} / {formatTime(totalDuration)}
              </p>
            </div>
          </div>
          <button
            onClick={onStop}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm">
            <StopIcon className="w-5 h-5" />
            Stop Recording
          </button>
        </div>
        <div className="h-3 bg-red-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* The Stimulus (Text or Image) stays visible */}
      {children}
    </div>
  );
}
