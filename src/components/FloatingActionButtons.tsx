
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonsProps {
  onViewRoiClick: () => void;
  isRoiDisabled: boolean;
  onViewAiSummaryClick: () => void;
  isAiSummaryDisabled: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onViewRoiClick,
  isRoiDisabled,
  onViewAiSummaryClick,
  isAiSummaryDisabled,
}) => {
  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 right-4 z-50",
        "flex flex-col items-end gap-3 p-2", // Added padding to container
        "bg-card/70 backdrop-blur-md shadow-2xl rounded-full border border-border/30" // Pill/cylinder container styling
      )}
    >
      <Button
        onClick={onViewRoiClick}
        variant="default"
        size="lg" // Using lg for better touch target if buttons become more compact
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg w-auto px-4 group transition-all duration-300 ease-in-out transform hover:scale-105"
        disabled={isRoiDisabled}
        aria-label="View ROI Projection Comparison"
      >
        <TrendingUp className="h-5 w-5 mr-0 sm:mr-2 transition-all duration-300" />
        <span className="hidden sm:inline">ROI Projection</span>
        <span className="sm:hidden">ROI</span>
      </Button>
      <Button
        onClick={onViewAiSummaryClick}
        variant="default"
        size="lg"
        className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg w-auto px-4 group transition-all duration-300 ease-in-out transform hover:scale-105"
        disabled={isAiSummaryDisabled}
        aria-label="View AI Trend Summary"
      >
        <Zap className="h-5 w-5 mr-0 sm:mr-2 transition-all duration-300" />
        <span className="hidden sm:inline">AI Summary</span>
        <span className="sm:hidden">AI</span>
      </Button>
    </div>
  );
};

export default FloatingActionButtons;
