import { ReactNode } from "react";

interface SpeakingPreparationViewProps {
  timeLeft: number;
  totalTime: number;
  onSkip: () => void;
  tips?: string[];
  children: ReactNode; // <--- The variable part (Text, Image, etc.)
}

export function SpeakingPreparationView({ timeLeft, totalTime, onSkip, tips, children }: SpeakingPreparationViewProps) {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-6">
      {/* Universal Timer Banner */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-3xl text-white font-bold">{timeLeft}</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-25"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-900">Preparation Time</h3>
            <p className="text-blue-700">Study the content below.</p>
          </div>
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Skip →
          </button>
        </div>
        <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* The Stimulus (Text or Image) */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
        <div className="prose max-w-none">
          <p className="text-xl leading-relaxed text-gray-800"> {children}</p>
        </div>
      </div>

      {/* Universal Tips */}
      {tips && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-900 mb-2">💡 Tips:</p>
          <ul className="text-sm text-amber-800 space-y-1">
            {tips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
