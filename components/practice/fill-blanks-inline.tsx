"use client";

import { cn } from "@/lib/utils";

interface Blank {
  id: string;
  position: number; // Character position in text
  correctAnswer?: string; // For feedback
}

interface FillBlanksInlineProps {
  text: string; // Text with {{blank_id}} markers
  blanks: Blank[];
  answers: Record<string, string>;
  onAnswerChange: (blankId: string, value: string) => void;
  options?: Record<string, string[]>; // Dropdown options per blank
  showFeedback?: boolean;
  disabled?: boolean;
  mode?: "input" | "dropdown";
}

export default function FillBlanksInline({
  text,
  blanks,
  answers,
  onAnswerChange,
  options,
  showFeedback = false,
  disabled = false,
  mode = "input",
}: FillBlanksInlineProps) {
  // Parse text and create parts
  const parts: Array<{ type: "text" | "blank"; content: string; blankId?: string }> = [];
  let lastIndex = 0;

  // Find all {{blank_id}} patterns
  const blankRegex = /\{\{([^}]+)\}\}/g;
  let match;

  while ((match = blankRegex.exec(text)) !== null) {
    // Add text before blank
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    // Add blank
    parts.push({
      type: "blank",
      content: "",
      blankId: match[1],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  const renderBlank = (blankId: string) => {
    const blank = blanks.find((b) => b.id === blankId);
    if (!blank) return null;

    const value = answers[blankId] || "";
    const isCorrect =
      showFeedback && blank.correctAnswer && value.toLowerCase().trim() === blank.correctAnswer.toLowerCase().trim();
    const isIncorrect = showFeedback && blank.correctAnswer && value && !isCorrect;

    const inputClasses = cn(
      "inline-block min-w-[120px] px-3 py-1 mx-1 border-b-2 bg-transparent transition-all",
      "focus:outline-none focus:border-brand-500",
      !showFeedback && "border-gray-300 hover:border-gray-400",
      isCorrect && "border-green-500 bg-green-50",
      isIncorrect && "border-red-500 bg-red-50",
      disabled && "cursor-not-allowed opacity-60"
    );

    if (mode === "dropdown" && options?.[blankId]) {
      return (
        <select
          value={value}
          onChange={(e) => onAnswerChange(blankId, e.target.value)}
          disabled={disabled}
          className={cn(inputClasses, "cursor-pointer")}>
          <option value="">Select...</option>
          {options[blankId].map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onAnswerChange(blankId, e.target.value)}
        disabled={disabled}
        className={inputClasses}
        placeholder="..."
        autoComplete="off"
      />
    );
  };

  return (
    <div className="text-lg leading-relaxed p-6 bg-gray-50 rounded-xl">
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.content}</span>;
        } else if (part.type === "blank" && part.blankId) {
          return <span key={index}>{renderBlank(part.blankId)}</span>;
        }
        return null;
      })}
    </div>
  );
}

// Simple single blank input
interface FillBlankInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showFeedback?: boolean;
  correctAnswer?: string;
  maxLength?: number;
}

export function FillBlankInput({
  value,
  onChange,
  placeholder = "Type your answer...",
  disabled = false,
  showFeedback = false,
  correctAnswer,
  maxLength,
}: FillBlankInputProps) {
  const isCorrect = showFeedback && correctAnswer && value.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  const isIncorrect = showFeedback && correctAnswer && value && !isCorrect;

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={cn(
          "w-full px-4 py-3 rounded-lg border-2 transition-all",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          !showFeedback && "border-gray-300 focus:border-brand-500 focus:ring-brand-500",
          isCorrect && "border-green-500 bg-green-50 focus:ring-green-500",
          isIncorrect && "border-red-500 bg-red-50 focus:ring-red-500",
          disabled && "bg-gray-100 cursor-not-allowed"
        )}
      />

      {maxLength && (
        <p className="text-sm text-gray-500 text-right">
          {value.length} / {maxLength}
        </p>
      )}

      {showFeedback && isCorrect && <p className="text-sm text-green-600 font-semibold">✓ Correct!</p>}

      {showFeedback && isIncorrect && correctAnswer && (
        <p className="text-sm text-red-600">
          ✗ Incorrect. Correct answer: <span className="font-semibold">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
}
