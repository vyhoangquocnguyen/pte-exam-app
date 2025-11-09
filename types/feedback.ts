export type SkillScore = "Accuracy" | "Grammar" | "Vocabulary" | "Fluency" | "Content";

// Defome a specific, actionable piece of feedback
export interface FeedbackItem {
  type: "Grammar" | "Vocabulary" | "Fluency" | "Punctuation" | "Spelling" | "Content";
  text: string; //The original text/phrase the AI flagged
  correction: string; //The suggested replacement or fix
  explanation: string; //Why the change is needed
}

//The main object containing the comprehensive analysis
export interface AIFeedbackData {
  attemptedId: string;
  overallScore: number;
  skillScores: Record<SkillScore, number>; //Score for each sub-skill

  detailedAnalysis: {
    summary: string; //2-3 sentences overall evaluation
    corrections: FeedbackItem[];

    speakingMetrics?: {
      pace: number; //Words per minute
      pauses: number; //Count of excessive pauses
    };
  };
}
