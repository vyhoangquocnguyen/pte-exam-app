export type SkillType = "speaking" | "writing" | "reading" | "listening";

export type Difficulty = "easy" | "medium" | "hard";

export interface User {
  id: string;
  name: string;
  email: string;
  targetScore: number;
  studyStreak: number;
  avatar?: string;
}

export interface Exercise {
  id: string;
  type: SkillType;
  subType: string;
  difficulty: Difficulty;
  title: string;
  content: any;
  timeLimit?: number;
}

export interface Attempt {
  id: string;
  exerciseId: string;
  score: number;
  breakdown: {
    grammar?: number;
    fluency?: number;
    content?: number;
    vocabulary?: number;
  };
  createdAt: Date;
}

export interface Progress {
  skillType: SkillType;
  level: number;
  xp: number;
  avgScore: number;
  totalTests: number;
}

export interface HeroStatsProps {
  totalScore: number;
  testCompleted: number;
  studyStreak: number;
  nextGoal: number;
}
