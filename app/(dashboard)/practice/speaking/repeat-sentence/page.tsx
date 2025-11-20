"use client";

import { useState, useEffect } from "react";
import { ExerciseLayouts } from "@/components/practice/layout/exercise-layout";
import { useSpeakingExercise } from "@/hooks/use-speaking-exercise";
import { mockReadAloudExercises, mockRepeatSentenceExercises } from "@/lib/mock-data/mock-exercises";
import { RepeatSentenceContent } from "@/types/exercise-schemas";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { MicrophoneIcon, StopIcon, ArrowPathIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function RepeatSentencePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize exercises (simulate API call)
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Speaking exercise hook
  const speaking = useSpeakingExercise({
    exercises: mockRepeatSentenceExercises,
    onComplete: (results) => {
      console.log("✅ Exercise completed:", results);
      console.log("📊 Total answers:", Object.keys(results.answers).length);
      console.log("⏱️ Total time:", Math.floor(results.totalTime / 1000), "seconds");

      // TODO: Save results to backend
      // await fetch('/api/exercises/submit', {
      //   method: 'POST',
      //   body: JSON.stringify(results)
      // });

      // Show completion message
      alert(`Great job! You completed all ${Object.keys(results.answers).length} questions.`);

      // Redirect to speaking overview
      router.push("/practice/speaking");
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading exercises...</p>
        </div>
      </div>
    );
  }

  const content = speaking.currentExercise.content as RepeatSentenceContent;

  return (
    <ExerciseLayouts
      exercise={speaking.currentExercise}
      currentIndex={speaking.currentIndex}
      totalQuestions={speaking.totalQuestions}
      phase={speaking.phase}
      canGoNext={speaking.canGoNext}
      canGoPrevious={speaking.canGoPrevious}
      isNavigationLocked={speaking.phase === "preparation" || speaking.phase === "active"}
      onNext={speaking.goToNext}
      onPrevious={speaking.goToPrevious}
      onJumpTo={speaking.goToExercise}
      answeredCount={speaking.answeredQuestions}
      exercises={mockReadAloudExercises}
      timerPhase={speaking.timer.isPreparation ? "preparation" : speaking.timer.isRecording ? "recording" : "active"}
      onStartExercise={speaking.startExercise}>
      {/* ========================================
          PREPARATION PHASE
      ======================================== */}
      {speaking.phase === "preparation" && (
        <div className="space-y-6">
          {/* Preparation Timer Banner */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">{speaking.timer.timeLeft}</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-25"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-900">Preparation Time</h3>
                <p className="text-blue-700">Read the text silently and prepare your response</p>
              </div>
              <button
                onClick={speaking.timer.skipPreparation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Skip →
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
                style={{
                  width: `${((content.preparationTime - speaking.timer.timeLeft) / content.preparationTime) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-900 mb-2">💡 Preparation Tips:</p>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Identify difficult words and how to pronounce them</li>
              <li>• Notice punctuation marks for natural pausing</li>
              <li>• Plan your intonation and emphasis</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================
          ACTIVE PHASE (Recording)
      ======================================== */}
      {speaking.phase === "active" && (
        <div className="space-y-6">
          {/* Recording Banner */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <MicrophoneIcon className="w-8 h-8 text-white" />
                  </div>
                  {speaking.recorder.isRecording && (
                    <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900">Recording Now</h3>
                  <p className="text-red-700 font-mono text-lg">
                    {speaking.recorder.formatTime(speaking.recorder.recordingTime)} /{" "}
                    {speaking.recorder.formatTime(content.recordingTime)}
                  </p>
                </div>
              </div>

              <button
                onClick={speaking.recorder.stopRecording}
                disabled={!speaking.recorder.isRecording}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                <StopIcon className="w-5 h-5" />
                Stop Recording
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-red-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-1000 ease-linear"
                style={{ width: `${speaking.recorder.process}%` }}
              />
            </div>

            {speaking.recorder.timeRemaining !== null && (
              <p className="text-sm text-red-700 mt-2 text-center">
                {speaking.recorder.timeRemaining} seconds remaining
              </p>
            )}
          </div>

          {/* Text to Read (visible while recording) */}

          {/* Recording Tips */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-purple-900 mb-2">🎯 While Recording:</p>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Speak clearly at a natural pace</li>
              <li>• Don't rush - you have enough time</li>
              <li>• Pronounce each word correctly</li>
              <li>• Use natural intonation</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================
          REVIEW PHASE
      ======================================== */}
      {speaking.phase === "review" && speaking.currentAnswer && (
        <div className="space-y-6">
          {/* Completion Banner */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                <MicrophoneIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-900">Recording Complete!</h3>
                <p className="text-green-700">Duration: {speaking.currentAnswer.duration} seconds</p>
              </div>
            </div>
          </div>

          {/* Audio Playback */}
          {speaking.currentAnswer.audioUrl && (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PlayIcon className="w-5 h-5" />
                Listen to Your Recording
              </h4>
              <audio
                controls
                src={speaking.currentAnswer.audioUrl}
                className="w-full"
                style={{
                  height: "54px",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}


          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={speaking.retryQuestion}
              className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <ArrowPathIcon className="w-5 h-5" />
              Retry This Question
            </button>

            {!speaking.isLastExercise && (
              <button
                onClick={speaking.goToNext}
                className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg">
                Next Question →
              </button>
            )}

            {speaking.isLastExercise && (
              <button
                onClick={speaking.goToNext}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg">
                Complete Exercise ✓
              </button>
            )}
          </div>

          {/* Feedback Placeholder */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-3">📊 AI Feedback Coming Soon</h4>
            <p className="text-sm text-blue-800">
              Your recording has been saved. AI-powered feedback will analyze your pronunciation, fluency, and content
              to help you improve!
            </p>
          </div>
        </div>
      )}
    </ExerciseLayouts>
  );
}
