export enum ExerciseType {
  SPEAKING = "speaking",
  WRITING = "writing",
  READING = "reading",
  LISTENING = "listening",
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type ExercisePhase = "loading" | "instructions" | "preparation" | "active" | "review" | "feedback";

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
  transcript: string;
  maxPlays: number;
  repeatCount?: number;
  preparationTime: number;
  recordingTime: number;
}

export interface DescribeImageContent extends BaseExerciseContent {
  readonly type: "describe-image";
  imageUrl: string;
  imageAlt: string;
  imageDescription?: string;
  preparationTime: number;
  recordingTime: number;
}

export type SpeakingContent = ReadAloudContent | RepeatSentenceContent | DescribeImageContent;

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
// READING CONTENT TYPES
// ----------------------------
export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MCQSingleContent extends BaseExerciseContent {
  readonly type: "mcq-single";
  passage: string;
  question: string;
  options: MCQOption[];
}

export interface MCQMultipleContent extends BaseExerciseContent {
  readonly type: "mcq-multiple";
  passage: string;
  question: string;
  options: MCQOption[];
}

export interface ReorderParagraph {
  id: string;
  text: string;
  correctOrder: number;
}

export interface ReorderParagraphsContent extends BaseExerciseContent {
  readonly type: "reorder-paragraphs";
  paragraphs: ReorderParagraph[];
}

export interface FillBlank {
  id: string;
  correctAnswer: string;
  options: string[];
}

export interface FillBlanksContent extends BaseExerciseContent {
  readonly type: "fill-blanks";
  text: string; // Text with placeholders like {{blank1}}
  blanks: FillBlank[];
}

export type ReadingContent = MCQSingleContent | MCQMultipleContent | ReorderParagraphsContent | FillBlanksContent;

// ----------------------------
// LISTENING CONTENT TYPES
// ----------------------------
export interface ListeningMCQSingleContent extends BaseExerciseContent {
  readonly type: "listening-mcq-single";
  audioUrl: string;
  question: string;
  options: MCQOption[];
}

export interface SummarizeSpokenTextContent extends BaseExerciseContent {
  readonly type: "summarize-spoken-text";
  audioUrl: string;
  transcript: string;
  maxPlays: number;
  minWords: number;
  maxWords: number;
  timeLimit: number;
}

export type ListeningContent = ListeningMCQSingleContent | SummarizeSpokenTextContent;

// ----------------------------
// ALL CONTENT TYPES
// ----------------------------
export type ExerciseContent = SpeakingContent | WritingContent | ReadingContent | ListeningContent;

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
export type WritingExercise = Exercise & { content: WritingContent };
export type ReadingExercise = Exercise & { content: ReadingContent };
export type ListeningExercise = Exercise & { content: ListeningContent };

// ----------------------------
// EXERCISE SET
// ----------------------------
export interface ExerciseSet {
  id: string;
  name: string;
  type: ExerciseType;
  exercises: Exercise[];
  createdAt: string;
}

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
export function isReadAloudContent(content: ExerciseContent): content is ReadAloudContent {
  return content.type === "read-aloud";
}

export function isRepeatSentenceContent(content: ExerciseContent): content is RepeatSentenceContent {
  return content.type === "repeat-sentence";
}

export function isDescribeImageContent(content: ExerciseContent): content is DescribeImageContent {
  return content.type === "describe-image";
}

export function isSpeakingContent(content: ExerciseContent): content is SpeakingContent {
  return isReadAloudContent(content) || isRepeatSentenceContent(content) || isDescribeImageContent(content);
}

export function isReadingContent(content: ExerciseContent): content is ReadingContent {
  return !isSpeakingContent(content) && !isWritingContent(content) && !isListeningContent(content);
}

export function isWritingContent(content: ExerciseContent): content is WritingContent {
  return content.type === "summarize-text" || content.type === "essay";
}

export function isListeningContent(content: ExerciseContent): content is ListeningContent {
  return content.type === "listening-mcq-single" || content.type === "summarize-spoken-text";
}

export function isAudioAnswer(answer: ExerciseAnswer): answer is AudioAnswer {
  return answer.type === "audio";
}

export function isTextAnswer(answer: ExerciseAnswer): answer is TextAnswer {
  return answer.type === "text";
}

// ----------------------------
// ASSERTION FOR SPEAKING (used in hook)
// ----------------------------
export function assertSpeakingContent(content: ExerciseContent): asserts content is SpeakingContent {
  if (!isSpeakingContent(content)) {
    throw new Error(`Invalid content: expected SpeakingContent but received "${content.type}"`);
  }
}
