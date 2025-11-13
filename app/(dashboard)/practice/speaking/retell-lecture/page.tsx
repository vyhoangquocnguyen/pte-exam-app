"use client";

import { useState } from "react";
import { useExerciseState } from "@/hooks/use-exercise-state";
import { usePreparationTimer } from "@/hooks/use-preparation-timer";
import ExerciseContainer from "@/components/practice/exercise-container";
import QuestionHeader from "@/components/practice/question-header";
import AudioPlayer from "@/components/practice/audio-player";
import AudioRecorder from "@/components/practice/audio-recorder";
import ProgressIndicator from "@/components/practice/progress-indicator";
import PhaseTimer from "@/components/practice/phase-timer";
import NavigationButtons from "@/components/practice/navigation-buttons";
import CompletionScreen from "@/components/practice/completion-screen";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Mock data - in real app this comes from mockRetellLectureExercises
const mockRetellLectureExercises = [
  {
    id: "rl-1",
    type: "speaking" as const,
    subType: "retell-lecture",
    difficulty: "hard" as const,
    title: "Re-tell Lecture - Climate Science",
    content: {
      audioUrl: "/audio/lecture-climate.mp3",
      transcript:
        "Climate change is one of the most pressing issues of our time. Scientists have observed rising global temperatures, melting ice caps, and increasing frequency of extreme weather events. These changes are primarily driven by human activities, particularly the emission of greenhouse gases from burning fossil fuels.",
      preparationTime: 10,
      recordingTime: 40,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function RetellLecturePage() {
  const exercises = mockRetellLectureExercises;
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasFinishedAudio, setHasFinishedAudio] = useState(false);

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
    exerciseId: "retell-lecture-session",
    exerciseType: "speaking",
    totalQuestions: exercises.length,
    onComplete: (data) => {
      console.log("Re-tell Lecture exercises completed:", data);
    },
  });

  const currentExercise = exercises[currentQuestionIndex];
  const questionId = currentExercise.id;
  const isAnswered = isQuestionAnswered(questionId);

  const timer = usePreparationTimer({
    preparationTime: currentExercise.content.preparationTime,
    recordingTime: currentExercise.content.recordingTime,
    autoStart: false,
  });

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    submitAnswer(questionId, {
      audioBlob: blob,
      duration,
      lectureTranscript: currentExercise.content.transcript,
    });
  };

  const handleAudioEnded = () => {
    setHasFinishedAudio(true);
    timer.start();
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
        title="Re-tell Lecture"
        instructions="You will hear a lecture. After the lecture, you will have 10 seconds to prepare, then 40 seconds to re-tell the lecture in your own words."
        showTimer={false}
      />

      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 card-shadow-lg">
        {hasFinishedAudio && !isAnswered && (
          <PhaseTimer
            isPreparation={timer.isPreparation}
            isRecording={timer.isRecording}
            isCompleted={timer.isCompleted}
            isAnswered={isAnswered}
            timeLeft={timer.timeLeft}
            formatTime={timer.formatTime}
          />
        )}

        {/* Audio Player */}
        {!hasFinishedAudio && !isAnswered && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Listen to the lecture:</h3>
            <AudioPlayer
              src={currentExercise.content.audioUrl}
              maxPlays={1}
              onEnded={handleAudioEnded}
              showWaveform={true}
            />

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">⚠️ Listen carefully:</span> You can only play the lecture once. Take
                mental notes of key points.
              </p>
            </div>
          </div>
        )}

        {/* Optional Transcript Toggle */}
        {currentExercise.content.transcript && hasFinishedAudio && !timer.isRecording && (
          <div className="mb-6">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium">
              {showTranscript ? (
                <>
                  <EyeSlashIcon className="w-4 h-4" />
                  Hide Transcript
                </>
              ) : (
                <>
                  <EyeIcon className="w-4 h-4" />
                  Show Transcript (Practice Mode)
                </>
              )}
            </button>

            {showTranscript && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">{currentExercise.content.transcript}</p>
              </div>
            )}
          </div>
        )}

        {/* Preparation Phase */}
        {timer.isPreparation && !isAnswered && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">🧠 Prepare:</span> Think about the main points of the lecture. Organize
              your thoughts before recording begins.
            </p>
          </div>
        )}

        {/* Recording Phase */}
        {timer.isRecording && !isAnswered && (
          <div>
            <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-900">
                <span className="font-semibold">🎤 Re-tell now:</span> Summarize the lecture in your own words. Include
                main ideas and supporting details.
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
        {!hasFinishedAudio && !isAnswered && (
          <div className="text-center py-8 text-gray-500">
            <p>Play the lecture above to begin...</p>
          </div>
        )}

        {/* Completion State */}
        {(timer.isCompleted || isAnswered) && (
          <CompletionScreen title="Lecture Re-told!" description="Your summary has been submitted for evaluation." />
        )}
      </div>

      <NavigationButtons
        onPrevious={goToPrevious}
        onNext={goToNext}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isAnswered={isAnswered || timer.isCompleted}
        showSubmit={false}
        layout="spread"
      />
    </ExerciseContainer>
  );
}
