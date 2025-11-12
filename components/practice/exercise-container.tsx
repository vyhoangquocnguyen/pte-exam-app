import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ExerciseContainerProps {
  children: ReactNode;
  backHref: string;
  backLabel?: string;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full";
  removePadding?: boolean;
}

export default function ExerciseContainer({
  children,
  backHref,
  backLabel = "Exit",
  className,
  maxWidth = "full",
  removePadding = false,
}: ExerciseContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
        !removePadding && "p-4 sm:p-6 lg:p-8",
        removePadding && "-m-4 sm:-m-6 lg:-m-8"
      )}>
      <div className={cn("mx-auto", maxWidthClasses[maxWidth], !removePadding && "p-4 sm:p-6 lg:p-8")}>
        {/* Back Button */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group">
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{backLabel}</span>
        </Link>

        {/* Main Content */}
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
