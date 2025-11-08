
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Clock } from "lucide-react";

interface HeroStatsProps {
  targetScore: number;
  studyStreak: number;
  totalPracticeTime: string;
}

export default function HeroStats({ targetScore, studyStreak, totalPracticeTime }: HeroStatsProps) {
  // NOTE: In the real app, this component would perform data fetching here.

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Target Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{targetScore} / 90</div>
          <p className="text-xs text-muted-foreground">+3 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{studyStreak} days</div>
          <p className="text-xs text-muted-foreground">Keep up the great work!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Logged</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalPracticeTime}</div>
          <p className="text-xs text-muted-foreground">Across all modules</p>
        </CardContent>
      </Card>
    </div>
  );
}
