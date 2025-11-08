// lib/constants.ts
import { Home, BookOpen, Edit, Mic, Headphones, BarChart2, Calendar, Settings, ListChecks } from "lucide-react";
// Note: lucide-react is the default icon library for shadcn/ui

export const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Practice Modules",
    href: "/practice",
    icon: ListChecks,
    submenu: [
      { title: "Speaking", href: "/practice/speaking", icon: Mic },
      { title: "Writing", href: "/practice/writing", icon: Edit },
      { title: "Reading", href: "/practice/reading", icon: BookOpen },
      { title: "Listening", href: "/practice/listening", icon: Headphones },
    ],
  },
  {
    title: "Mock Tests",
    href: "/mock-tests",
    icon: Calendar,
  },
  {
    title: "Progress Tracking",
    href: "/progress",
    icon: BarChart2,
  },
  {
    title: "Profile & Settings",
    href: "/profile",
    icon: Settings,
  },
];
