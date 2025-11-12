// Database schema types for exercises
// These match what will come from the backend/database

export type SkillType = "speaking" | "writing" | "reading" | "listening";
export type Difficulty = "easy" | "medium" | "hard";

// Base Exercise interface
export interface BaseExercise {
  id: string;
  type: SkillType;
  subType: string;
  difficulty: Difficulty;
  title: string;
  timeLimit?: number; // seconds
  createdAt: string;
  updatedAt: string;
}

// ========== SPEAKING EXERCISES ==========

export interface ReadAloudExercise extends BaseExercise {
  type: "speaking";
  subType: "read-aloud";
  content: {
    text: string; // Text to read
    preparationTime: number; // seconds
    recordingTime: number; // seconds
  };
}

export interface RepeatSentenceExercise extends BaseExercise {
  type: "speaking";
  subType: "repeat-sentence";
  content: {
    audioUrl: string; // Sentence audio
    transcript: string; // For evaluation
    maxPlays: number; // Usually 1-2
    recordingTime: number; // seconds (usually 15)
  };
}

export interface DescribeImageExercise extends BaseExercise {
  type: "speaking";
  subType: "describe-image";
  content: {
    imageUrl: string;
    imageAlt: string;
    preparationTime: number; // 25 seconds
    recordingTime: number; // 40 seconds
  };
}

export interface RetellLectureExercise extends BaseExercise {
  type: "speaking";
  subType: "retell-lecture";
  content: {
    audioUrl: string;
    transcript?: string; // Optional transcript
    preparationTime: number; // 10 seconds
    recordingTime: number; // 40 seconds
  };
}

export interface AnswerShortQuestionExercise extends BaseExercise {
  type: "speaking";
  subType: "answer-short-question";
  content: {
    audioUrl: string;
    question: string; // Text of question
    recordingTime: number; // 10 seconds
    acceptedAnswers: string[]; // Possible correct answers
  };
}

// ========== WRITING EXERCISES ==========

export interface EssayExercise extends BaseExercise {
  type: "writing";
  subType: "essay";
  content: {
    prompt: string;
    minWords: number; // Usually 200
    maxWords: number; // Usually 300
    timeLimit: number; // 20 minutes
  };
}

export interface SummarizeWrittenTextExercise extends BaseExercise {
  type: "writing";
  subType: "summarize-written-text";
  content: {
    passage: string;
    minWords: number; // Usually 5
    maxWords: number; // Usually 75
    timeLimit: number; // 10 minutes
    mustBeSingleSentence: boolean; // true
  };
}

// ========== READING EXERCISES ==========

export interface MCQSingleExercise extends BaseExercise {
  type: "reading";
  subType: "mcq-single";
  content: {
    passage: string;
    question: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

export interface MCQMultipleExercise extends BaseExercise {
  type: "reading";
  subType: "mcq-multiple";
  content: {
    passage: string;
    question: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

export interface ReorderParagraphsExercise extends BaseExercise {
  type: "reading";
  subType: "reorder-paragraphs";
  content: {
    paragraphs: Array<{
      id: string;
      text: string;
      correctOrder: number;
    }>;
  };
}

export interface ReadingFillBlanksExercise extends BaseExercise {
  type: "reading";
  subType: "fill-blanks";
  content: {
    text: string; // Text with {{blank_id}} markers
    blanks: Array<{
      id: string;
      correctAnswer: string;
      options?: string[]; // For dropdown variant
    }>;
  };
}

// ========== LISTENING EXERCISES ==========

export interface SummarizeSpokenTextExercise extends BaseExercise {
  type: "listening";
  subType: "summarize-spoken-text";
  content: {
    audioUrl: string;
    transcript: string; // For evaluation
    maxPlays: number; // Usually 2
    minWords: number; // 50
    maxWords: number; // 70
    timeLimit: number; // 10 minutes
  };
}

export interface ListeningMCQSingleExercise extends BaseExercise {
  type: "listening";
  subType: "mcq-single";
  content: {
    audioUrl: string;
    question: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

export interface ListeningMCQMultipleExercise extends BaseExercise {
  type: "listening";
  subType: "mcq-multiple";
  content: {
    audioUrl: string;
    question: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

export interface ListeningFillBlanksExercise extends BaseExercise {
  type: "listening";
  subType: "fill-blanks";
  content: {
    audioUrl: string;
    transcript: string; // With {{blank_id}} markers
    blanks: Array<{
      id: string;
      correctAnswer: string;
    }>;
  };
}

export interface HighlightCorrectSummaryExercise extends BaseExercise {
  type: "listening";
  subType: "highlight-correct-summary";
  content: {
    audioUrl: string;
    summaries: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

export interface SelectMissingWordExercise extends BaseExercise {
  type: "listening";
  subType: "select-missing-word";
  content: {
    audioUrl: string; // Audio with beep at end
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

export interface HighlightIncorrectWordsExercise extends BaseExercise {
  type: "listening";
  subType: "highlight-incorrect-words";
  content: {
    audioUrl: string;
    transcript: string; // With some incorrect words
    incorrectWordIndices: number[]; // Indices of wrong words
  };
}

export interface WriteDictationExercise extends BaseExercise {
  type: "listening";
  subType: "write-dictation";
  content: {
    audioUrl: string;
    correctSentence: string;
    maxPlays: number; // Usually 3
  };
}

// Union type of all exercises
export type Exercise =
  | ReadAloudExercise
  | RepeatSentenceExercise
  | DescribeImageExercise
  | RetellLectureExercise
  | AnswerShortQuestionExercise
  | EssayExercise
  | SummarizeWrittenTextExercise
  | MCQSingleExercise
  | MCQMultipleExercise
  | ReorderParagraphsExercise
  | ReadingFillBlanksExercise
  | SummarizeSpokenTextExercise
  | ListeningMCQSingleExercise
  | ListeningMCQMultipleExercise
  | ListeningFillBlanksExercise
  | HighlightCorrectSummaryExercise
  | SelectMissingWordExercise
  | HighlightIncorrectWordsExercise
  | WriteDictationExercise;

// Exercise set (collection of exercises for a session)
export interface ExerciseSet {
  id: string;
  name: string;
  type: SkillType;
  exercises: Exercise[];
  createdAt: string;
}

// User attempt/submission
export interface ExerciseAttempt {
  id: string;
  userId: string;
  exerciseId: string;
  answer: any; // Varies by exercise type
  score: number; // 0-90
  breakdown?: {
    grammar?: number;
    fluency?: number;
    content?: number;
    vocabulary?: number;
    pronunciation?: number;
  };
  feedback?: {
    strengths: string[];
    improvements: string[];
    suggestions: string[];
    corrections?: Array<{
      original: string;
      correction: string;
      explanation: string;
    }>;
  };
  timeSpent: number; // seconds
  createdAt: string;
}
