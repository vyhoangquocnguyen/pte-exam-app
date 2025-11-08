import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProgressRing from "./progess-ring"; // Client component import

interface SkillCardProps {
  skill: "Speaking" | "Writing" | "Reading" | "Listening";
  avgScore: number;
  totalAttempts: number;
}

export default function SkillCard({ skill, avgScore, totalAttempts }: SkillCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{skill}</CardTitle>
        {/* Placeholder Icon */}
        <span className="text-muted-foreground">⚙️</span>
      </CardHeader>
      <CardContent className="flex justify-between items-end pt-4">
        <ProgressRing score={avgScore} skill="Avg Score" />
        <div className="text-right">
          <p className="text-2xl font-bold">{avgScore}</p>
          <p className="text-xs text-muted-foreground mt-1">{totalAttempts} Attempts</p>
        </div>
      </CardContent>
    </Card>
  );
}
