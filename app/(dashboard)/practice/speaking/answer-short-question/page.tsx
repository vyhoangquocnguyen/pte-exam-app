"use client";

import { useState, useEffect } from "react";
import { useExerciseState } from "@/hooks/use-exercise-state";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import ExerciseContainer from "@/components/practice/exercise-container";
import QuestionHeader from "@/components/practice/question-header";
import AudioPlayer from "@/components/practice/audio-player";
import AudioRecorder from "@/components/practice/audio-recorder";
import ProgressIndicator from "@/components/practice/progress-indicator";
import NavigationButtons from "@/components/practice/navigation-buttons";
import CompletionScreen from "@/components/practice/completion-screen";

// Mock data
const mockAnswerShortQuestionExercises = [
  {
    id: "asq-1",
    type: "speaking" as const,
    subType: "answer-short-question",
    difficulty: "easy" as const,
    title: "Answer Short Question #1",
    content: {
      audioUrl: "/audio/short-question-1.mp3",
      question: "What is the capital of France?",
      recordingTime: 10,
      acceptedAnswers: ["Paris", "paris"],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "asq-2",
    type: "speaking" as const,
    subType: "answer-short-question",
    difficulty: "easy" as const,
    title: "Answer Short Question #2",
    content: {
      audioUrl: "/audio/short-question-2.mp3",
      question: "How many days are there in a week?",
      recordingTime: 10,
      acceptedAnswers: ["seven", "Seven", "7"],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AnswerShortQuestionPage() {
  const exercises = mockAnswerShortQuestionExercises;
  const [audioHasFinished, setAudioHasFinished] = useState(false);

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    submitAnswer,
    goToNext,
    goToPrevious,
    isQuestionAnswered,
    getAnsweredIndices,
  } = useExerciseState({
    exerciseId: "answer-short-question-session",
    exerciseType: "speaking",
    totalQuestions: exercises.length,
    onComplete: (data) => {
      console.log("Answer Short Question exercises completed:", data);
    },
  });

  const currentExercise = exercises[currentQuestionIndex];
  const questionId = currentExercise.id;
  const isAnswered = isQuestionAnswered(questionId);

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    submitAnswer(questionId, {
      audioBlob: blob,
      duration,
      question: currentExercise.content.question,
      acceptedAnswers: currentExercise.content.acceptedAnswers,
    });
  };

  const handleNext = () => {
    setAudioHasFinished(false);
    goToNext();
  };

  const handlePrevious = () => {
    setAudioHasFinished(false);
    goToPrevious();
  };

  return (
    <ExerciseContainer backHref="/practice/speaking" backLabel="Back to Speaking">
      <div className="mb-6">
        <ProgressIndicator
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          answeredQuestions={getAnsweredIndices()}
          variant="segments"
        />
      </div>

      <QuestionHeader
        questionNumber={currentQuestion}
        totalQuestions={totalQuestions}
        title="Answer Short Question"
        instructions="You will hear a question. Please give a simple and short answer. Often just one or a few words is enough."
        showTimer={false}
      />

      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 card-shadow-lg">
        {/* Audio Player */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Listen to the question:</h3>
          <AudioPlayer
            src={currentExercise.content.audioUrl}
            maxPlays={1}
            onEnded={() => setAudioHasFinished(true)}
            showWaveform={true}
          />
        </div>

        {/* Instructions */}
        {!audioHasFinished && !isAnswered && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">👂 Listen first:</span> Play the audio to hear the question. You can only
              play it once, so listen carefully.
            </p>
          </div>
        )}

        {/* Quick Tips */}
        {audioHasFinished && !isAnswered && (
          <div className="mb-6 space-y-3">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">⚡ Quick answer:</span> Give a brief, direct answer. One or two words is
                usually enough.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-900">
                <span className="font-semibold">💡 Examples:</span>
              </p>
              <ul className="text-xs text-purple-800 mt-2 space-y-1 ml-4">
                <li>• "What color is the sky?" → "Blue"</li>
                <li>• "How many wheels does a car have?" → "Four"</li>
                <li>• "What season comes after winter?" → "Spring"</li>
              </ul>
            </div>
          </div>
        )}

        {/* Recording Interface */}
        {audioHasFinished && !isAnswered && (
          <div>
            <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-900">
                <span className="font-semibold">🎤 Answer now:</span> Record your short answer. Maximum{" "}
                {currentExercise.content.recordingTime} seconds.
              </p>
            </div>

            <AudioRecorder
              maxDuration={currentExercise.content.recordingTime}
              onRecordingComplete={handleRecordingComplete}
              autoStart={true}
            />
          </div>
        )}

        {/* Waiting State */}
        {!audioHasFinished && !isAnswered && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0a5 5 0 007.072 0"
              />
            </svg>
            <p>Play the audio above to hear the question...</p>
          </div>
        )}

        {/* Completion State */}
        {isAnswered && (
          <CompletionScreen title="Answer Recorded!" description="Your answer has been submitted for evaluation." />
        )}
      </div>

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isAnswered={isAnswered}
        showSubmit={false}
        layout="spread"
      />
    </ExerciseContainer>
  );
}
