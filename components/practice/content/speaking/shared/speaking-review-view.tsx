// components/practice/speaking/shared/speaking-review-view.tsx
import { ReactNode } from "react";
import { PlayIcon, ArrowPathIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

interface SpeakingReviewViewProps {
  audioUrl?: string;
  duration: number;
  onRetry: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
  children: ReactNode; // <--- The variable part (Original text/image)
}

export function SpeakingReviewView({
  audioUrl,
  duration,
  onRetry,
  onNext,
  isLastQuestion,
  children,
}: SpeakingReviewViewProps) {
  return (
    <div className="space-y-6">
      {/* Universal Completion Banner */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
            <MicrophoneIcon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-900">Recording Complete!</h3>
            <p className="text-green-700">Duration: {duration} seconds</p>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PlayIcon className="w-5 h-5" />
            Listen to Your Recording
          </h4>
          <audio controls src={audioUrl} className="w-full h-14 rounded-lg" />
        </div>
      )}

      {/* The Original Content for review */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Original Content:</h4>
        {children}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <ArrowPathIcon className="w-5 h-5" />
          Retry
        </button>
        <button
          onClick={onNext}
          className={`flex-1 py-4 text-white rounded-xl font-semibold shadow-lg transition-opacity hover:opacity-90 ${
            isLastQuestion
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : "bg-gradient-to-r from-blue-500 to-purple-600"
          }`}>
          {isLastQuestion ? "Finish Exercise" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
