import Timer from "./timer";
import { cn } from "@/lib/utils";

interface QuestionHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  title?: string;
  instructions?: string;
  timeLimit?: number; // seconds
  onTimeUp?: () => void;
  showTimer?: boolean;
  className?: string;
}

export default function QuestionHeader({
  questionNumber,
  totalQuestions,
  title,
  instructions,
  timeLimit,
  onTimeUp,
  showTimer = true,
  className,
}: QuestionHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {/* Top Bar - Question Number & Timer */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>

          {title && (
            <>
              <div className="h-4 w-px bg-gray-300" />
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </>
          )}
        </div>

        {showTimer && timeLimit && <Timer initialTime={timeLimit} onTimeUp={onTimeUp} size="lg" showIcon={true} />}
      </div>

      {/* Instructions */}
      {instructions && (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">📋 Instructions: </span>
            {instructions}
          </p>
        </div>
      )}
    </div>
  );
}
