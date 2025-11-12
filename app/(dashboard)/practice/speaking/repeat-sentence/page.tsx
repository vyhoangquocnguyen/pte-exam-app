"use client";

import { useState } from "react";
import { useExerciseState } from "@/hooks/use-exercise-state";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import ExerciseContainer from "@/components/practice/exercise-container";
import QuestionHeader from "@/components/practice/question-header";
import AudioPlayer from "@/components/practice/audio-player";
import AudioRecorder from "@/components/practice/audio-recorder";
import ProgressIndicator from "@/components/practice/progress-indicator";
import NavigationButtons from "@/components/practice/navigation-buttons";
import { mockRepeatSentenceExercises } from "@/lib/mock-data/exercises";

export default function RepeatSentencePage() {
  const exercises = mockRepeatSentenceExercises;
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

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
    exerciseId: "repeat-sentence-session",
    exerciseType: "speaking",
    totalQuestions: exercises.length,
    onComplete: (data) => {
      console.log("Repeat Sentence exercises completed:", data);
    },
  });

  const currentExercise = exercises[currentQuestionIndex];
  const questionId = currentExercise.id;
  const isAnswered = isQuestionAnswered(questionId);

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    submitAnswer(questionId, {
      audioBlob: blob,
      duration,
      originalTranscript: currentExercise.content.transcript,
    });
  };

  const handleNext = () => {
    setHasPlayedAudio(false);
    goToNext();
  };

  const handlePrevious = () => {
    setHasPlayedAudio(false);
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
        title="Repeat Sentence"
        instructions="You will hear a sentence. Please repeat the sentence exactly as you hear it. The sentence will be played only once."
        showTimer={false}
      />

      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 card-shadow-lg">
        {/* Audio Player */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Listen to the sentence:</h3>
          <AudioPlayer
            src={currentExercise.content.audioUrl}
            maxPlays={currentExercise.content.maxPlays}
            onPlayCountChange={(count) => {
              if (count === 1) setHasPlayedAudio(true);
            }}
            showWaveform={true}
          />
        </div>

        {/* Instructions */}
        {!hasPlayedAudio && !isAnswered && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">⚠️ Important:</span> You can only play the audio once. Listen carefully
              and prepare to repeat immediately.
            </p>
          </div>
        )}

        {/* Recording Interface */}
        {hasPlayedAudio && !isAnswered && (
          <div>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">🎤 Now record:</span> Repeat the sentence exactly as you heard it. You
                have {currentExercise.content.recordingTime} seconds.
              </p>
            </div>

            <AudioRecorder
              maxDuration={currentExercise.content.recordingTime}
              onRecordingComplete={handleRecordingComplete}
              autoStart={false}
            />
          </div>
        )}

        {/* Completion State */}
        {isAnswered && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Recorded!</h3>
            <p className="text-gray-600">Your repetition has been submitted for evaluation.</p>
          </div>
        )}

        {/* Waiting State */}
        {!hasPlayedAudio && !isAnswered && (
          <div className="text-center py-12 text-gray-500">
            <p>Play the audio above to begin...</p>
          </div>
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
