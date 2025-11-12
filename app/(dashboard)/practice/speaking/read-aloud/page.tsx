"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  MicrophoneIcon,
  StopIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Timer from "@/components/practice/timer";

type Phase = "preparation" | "recording" | "finished";

// Mock exercise data
const exercise = {
  text: "The concept of sustainable development has gained significant attention in recent decades. It represents a holistic approach to growth that balances economic progress with environmental protection and social equity. This framework ensures that we meet the needs of the present without compromising the ability of future generations to meet their own needs.",
  preparationTime: 40,
  recordingTime: 40,
};

export default function ReadAloudExercisePage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timerPhase, setTimerPhase] = useState<Phase>("preparation");

  const totalQuestions = 12;

  const handleSubmit = () => {
    setIsAnswered(true);
    setShowFeedback(true);
    setTimerPhase("finished");
  };

  const handlePreparationTimeUp = useCallback(() => {
    setTimerPhase("recording");
    setIsRecording(true); // Start recording automatically
    console.log("Preparation time up. Recording started.");
  }, []);

  const handleRecordingTimeUp = useCallback(() => {
    setIsRecording(false);
    handleSubmit();
    console.log("Recording time up. Submission triggered.");
  }, []);

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      handleSubmit(); // Manual stop triggers submission
      console.log("Stopped recording manually");
    } else {
      if (timerPhase === "preparation") {
        setTimerPhase("recording"); // <-- KEY FIX: Switch to recording phase
        console.log("Skipping preparation time. Recording started manually.");
      }
      setIsRecording(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setTimerPhase("preparation");
      setIsRecording(false);
      setIsAnswered(false);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setTimerPhase("preparation"); // Reset phase for the previous question
      setIsRecording(false);
      setIsAnswered(false);
      setShowFeedback(false);
    }
  };

  const initialTimerTime = timerPhase === "preparation" ? exercise.preparationTime : exercise.recordingTime;
  const isTimerRunning = (timerPhase === "preparation" || isRecording) && !showFeedback;
  const onTimerTimeUp = timerPhase === "preparation" ? handlePreparationTimeUp : handleRecordingTimeUp;

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/practice/speaking"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Exit</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion} of {totalQuestions}
            </span>

            <Timer
              key={currentQuestion + timerPhase}
              initialTime={initialTimerTime}
              onTimeUp={onTimerTimeUp}
              isRunning={isTimerRunning}
              size="md"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-speaking transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Main Exercise Card */}
        <div className="bg-white rounded-2xl card-shadow-lg p-8 mb-6">
          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📖 Instructions</h3>
            <p className="text-sm text-blue-700">
              Read the text aloud. You have {exercise.preparationTime} seconds to prepare and {exercise.recordingTime}{" "}
              seconds to record your response.
            </p>
          </div>

          {/* Question Text */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <p className="text-lg leading-relaxed text-gray-800">{exercise.text}</p>
          </div>

          {/* Recording Controls */}
          {!showFeedback && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-speaking hover:bg-blue-700"
                }`}>
                {isRecording ? (
                  <StopIcon className="w-10 h-10 text-white" />
                ) : (
                  <MicrophoneIcon className="w-10 h-10 text-white" />
                )}
              </button>

              <p className="text-sm font-medium text-gray-600">
                {isRecording ? "Recording... Click to stop" : "Recording stopped. Click to restart."}
              </p>

              {isRecording && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-sm text-red-600 font-semibold">Recording in progress</span>
                </div>
              )}
            </div>
          )}

          {/* Mock Feedback */}
          {showFeedback && (
            <div className="space-y-6">
              {/* Score */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <p className="text-sm text-green-700 mb-2">Your Score</p>
                <p className="font-display text-6xl font-bold text-green-600 mb-2">78</p>
                <p className="text-sm text-green-700">Great job! Keep practicing!</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Pronunciation</p>
                  <p className="font-display text-2xl font-bold text-gray-900">82</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Fluency</p>
                  <p className="font-display text-2xl font-bold text-gray-900">76</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Content</p>
                  <p className="font-display text-2xl font-bold text-gray-900">75</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Oral Fluency</p>
                  <p className="font-display text-2xl font-bold text-gray-900">79</p>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">Strengths</p>
                      <p className="text-sm text-green-700">Clear pronunciation, good pacing, natural intonation</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <XMarkIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900 mb-1">Areas to Improve</p>
                      <p className="text-sm text-yellow-700">
                        Work on word stress in longer words, slight hesitation detected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 1 || !showFeedback}
            className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Previous
          </button>

          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={!isRecording && !isAnswered}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-speaking hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-speaking hover:bg-blue-700 transition-colors">
              {currentQuestion === totalQuestions ? "Finish" : "Next Question"}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
