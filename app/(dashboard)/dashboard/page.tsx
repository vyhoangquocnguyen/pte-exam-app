import HeroStats from "@/components/dashboard/hero-stats";
import SkillCard from "@/components/dashboard/skill-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const userStats = {
  targetScore: 75,
  studyStreak: 12,
  totalPracticeTime: "45h 15m",
};

const skillProgress = [
  { skill: "Speaking", avgScore: 68, totalAttempts: 55 },
  { skill: "Writing", avgScore: 72, totalAttempts: 32 },
  { skill: "Reading", avgScore: 81, totalAttempts: 60 },
  { skill: "Listening", avgScore: 75, totalAttempts: 48 },
] as const;

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back, </h1>
      {/* Hero Stats */}
      <HeroStats {...userStats} />

      {/* Skill Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {skillProgress.map(({ skill, avgScore, totalAttempts }) => (
          <SkillCard key={skill} skill={skill} avgScore={avgScore} totalAttempts={totalAttempts} />
        ))}
      </section>

      {/* Activity Timeline/ Recent Attempt */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Placeholder for the activity Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          {/* this section is actual ActivityTimeline component */}
          <p className="text-muted-foreground h-40 flex items-center justify-center">
            Activity time line : last 5 attmps or sth
          </p>
        </Card>

        {/* Placeholder for Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Practice</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {/* Replace with actual buttons linking to practice modules */}
            <p className="text-muted-foreground">[Start Mock Test Button]</p>
            <p className="text-muted-foreground">[Practice Writing Button]</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
