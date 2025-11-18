export enum ExerciseType {
  SPEAKING = "SPEAKING",
  WRITING = "WRITING",
  READING = "READING",
  LISTENING = "LISTENING",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export type ExercisePhase =
  | "loading"
  | "instructions"
  | "preparation"
  | "active"
  | "review"
  | "feedback";

// ----------------------------
// Base Content Type
// ----------------------------
interface BaseExerciseContent {
  readonly type: string;
}

// ----------------------------
// SPEAKING CONTENT TYPES
// ----------------------------
export interface ReadAloudContent extends BaseExerciseContent {
  readonly type: "read-aloud";
  text: string;
  preparationTime: number;
  recordingTime: number;
}

export interface RepeatSentenceContent extends BaseExerciseContent {
  readonly type: "repeat-sentence";
  audioUrl: string;
  preparationTime: number;
  recordingTime: number;
}

export interface DescribeImageContent extends BaseExerciseContent {
  readonly type: "describe-image";
  imageUrl: string;
  preparationTime: number;
  recordingTime: number;
}

export type SpeakingContent =
  | ReadAloudContent
  | RepeatSentenceContent
  | DescribeImageContent;

// ----------------------------
// WRITING CONTENT TYPES
// ----------------------------
export interface SummarizeTextContent extends BaseExerciseContent {
  readonly type: "summarize-text";
  text: string;
  wordLimit: number;
  timeLimit: number;
}

export interface EssayContent extends BaseExerciseContent {
  readonly type: "essay";
  prompt: string;
  wordLimit: { min: number; max: number };
  timeLimit: number;
}

export type WritingContent = SummarizeTextContent | EssayContent;

// ----------------------------
// ALL CONTENT TYPES
// ----------------------------
export type ExerciseContent = SpeakingContent | WritingContent;

// ----------------------------
// EXERCISE MODEL (NON-GENERIC)
// ----------------------------
export interface Exercise {
  id: string;
  type: ExerciseType;
  subType: string;
  difficulty: Difficulty;
  title: string;
  content: ExerciseContent;
  timeLimit?: number;
  createdAt: string;
  updatedAt: string;
}

// Helpful aliases
export type SpeakingExercise = Exercise & { content: SpeakingContent };

// ----------------------------
// ANSWER TYPES
// ----------------------------
interface BaseAnswer {
  readonly type: string;
  duration: number;
}

export interface AudioAnswer extends BaseAnswer {
  readonly type: "audio";
  audioBlob: Blob;
  audioUrl?: string;
  transcript?: string;
}

export interface TextAnswer extends BaseAnswer {
  readonly type: "text";
  text: string;
  wordCount: number;
}

export interface MCQAnswer extends BaseAnswer {
  readonly type: "mcq";
  selectedOptions: string[];
}

export type ExerciseAnswer = AudioAnswer | TextAnswer | MCQAnswer;

// ----------------------------
// FEEDBACK TYPES
// ----------------------------
export interface WordTiming {
  word: string;
  correct: boolean;
  timestamp: number;
}

export interface ScoreBreakdown {
  pronunciation?: number;
  fluency?: number;
  content?: number;
  vocabulary?: number;
  grammar?: number;
  [key: string]: number | undefined;
}

export interface ExerciseFeedback {
  overallScore: number;
  breakdown: ScoreBreakdown;
  transcript?: string;
  strengths: string[];
  improvements: string[];
  wordTimings?: WordTiming[];
  detailedAnalysis?: string;
}

export interface ExerciseResults {
  answers: Record<string, ExerciseAnswer>;
  feedback: Record<string, ExerciseFeedback>;
  totalTime: number;
  completedAt: Date;
}

// ----------------------------
// TYPE GUARDS
// ----------------------------
export function isReadAloudContent(
  content: ExerciseContent
): content is ReadAloudContent {
  return content.type === "read-aloud";
}

export function isRepeatSentenceContent(
  content: ExerciseContent
): content is RepeatSentenceContent {
  return content.type === "repeat-sentence";
}

export function isDescribeImageContent(
  content: ExerciseContent
): content is DescribeImageContent {
  return content.type === "describe-image";
}

export function isSpeakingContent(
  content: ExerciseContent
): content is SpeakingContent {
  return (
    isReadAloudContent(content) ||
    isRepeatSentenceContent(content) ||
    isDescribeImageContent(content)
  );
}

export function isAudioAnswer(
  answer: ExerciseAnswer
): answer is AudioAnswer {
  return answer.type === "audio";
}

export function isTextAnswer(answer: ExerciseAnswer): answer is TextAnswer {
  return answer.type === "text";
}

// ----------------------------
// ASSERTION FOR SPEAKING (used in hook)
// ----------------------------
export function assertSpeakingContent(
  content: ExerciseContent
): asserts content is SpeakingContent {
  if (!isSpeakingContent(content)) {
    throw new Error(
      `Invalid content: expected SpeakingContent but received "${content.type}"`
    );
  }
}
