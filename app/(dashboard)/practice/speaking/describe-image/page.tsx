"use client";

import { useExerciseState } from "@/hooks/use-exercise-state";
import { usePreparationTimer } from "@/hooks/use-preparation-timer";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import ExerciseContainer from "@/components/practice/exercise-container";
import QuestionHeader from "@/components/practice/question-header";
import ImageViewer from "@/components/practice/image-viewer";
import AudioRecorder from "@/components/practice/audio-recorder";
import ProgressIndicator from "@/components/practice/progress-indicator";
import NavigationButtons from "@/components/practice/navigation-buttons";
import PhaseTimer from "@/components/practice/phase-timer";
import { mockDescribeImageExercises } from "@/lib/mock-data/mock-exercises";

export default function DescribeImagePage() {
  const exercises = mockDescribeImageExercises;

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
    exerciseId: "describe-image-session",
    exerciseType: "speaking",
    totalQuestions: exercises.length,
    onComplete: (data) => {
      console.log("Describe Image exercises completed:", data);
    },
  });

  const currentExercise = exercises[currentQuestionIndex];
  const questionId = currentExercise.id;
  const isAnswered = isQuestionAnswered(questionId);

  const timer = usePreparationTimer({
    preparationTime: currentExercise.content.preparationTime,
    recordingTime: currentExercise.content.recordingTime,
    autoStart: true,
  });

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    submitAnswer(questionId, {
      audioBlob: blob,
      duration,
      imageUrl: currentExercise.content.imageUrl,
    });
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
        title="Describe Image"
        instructions="Look at the image below. You will have 25 seconds to study the image, then 40 seconds to describe it in detail."
        showTimer={false}
      />

      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 card-shadow-lg">
        <PhaseTimer
          isPreparation={timer.isPreparation}
          isRecording={timer.isRecording}
          isCompleted={timer.isCompleted}
          isAnswered={isAnswered}
          timeLeft={timer.timeLeft}
          formatTime={timer.formatTime}
        />

        {/* Image */}
        <div className="mb-6">
          <ImageViewer
            src={currentExercise.content.imageUrl}
            alt={currentExercise.content.imageAlt}
            allowZoom={true}
            showControls={true}
          />
        </div>

        {/* Instructions based on phase */}
        {timer.isPreparation && !isAnswered && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">👀 Study the image:</span> Look at all details, trends, labels, and key
              features. Think about what you'll describe.
            </p>
          </div>
        )}

        {timer.isRecording && !isAnswered && (
          <div>
            <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-900">
                <span className="font-semibold">🎤 Describe now:</span> Speak clearly about what you see. Mention main
                features, trends, data points, and relationships.
              </p>
            </div>

            <AudioRecorder
              maxDuration={currentExercise.content.recordingTime}
              onRecordingComplete={handleRecordingComplete}
              autoStart={true}
            />
          </div>
        )}

        {/* Completion State */}
        {(timer.isCompleted || isAnswered) && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Description Recorded!</h3>
            <p className="text-gray-600">Your image description has been submitted for evaluation.</p>
          </div>
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
