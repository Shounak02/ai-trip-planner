import React from "react";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void; // Allow click handlers to be passed
}

export default function InteractiveHoverButton({
  text = "Get Started",
  className,
  onClick,
}: InteractiveHoverButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-32 cursor-pointer overflow-hidden rounded-full border border-border bg-background p-2 text-center font-semibold text-foreground transition-colors duration-300 ${className}`}
    >
      {/* Text sliding out */}
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>

      {/* Text + icon sliding in */}
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 hover:text-sm">
        <span>{text}</span>
        <ArrowRight className="text-foreground" />
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 scale-0 rounded-full bg-primary dark:bg-primary-foreground transition-all duration-300 group-hover:scale-100 "></div>
    </button>
  );
}
