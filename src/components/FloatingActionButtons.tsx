
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Briefcase } from 'lucide-react'; // Briefcase as example for "Portfolio"
import { cn } from '@/lib/utils';

interface FloatingActionButtonsProps {
  onViewRoiClick: () => void;
  onViewAiSummaryClick: () => void;
  // Removed isPortfolioDisabled, assumed always enabled or handled by parent
  // Removed onPortfolioClick as it's not in the current UI request
  isRoiDisabled?: boolean;
  isAiSummaryDisabled?: boolean;
  // isVisible prop removed
}

export default function FloatingActionButtons({
  onViewRoiClick,
  onViewAiSummaryClick,
  isRoiDisabled,
  isAiSummaryDisabled,
  // isVisible prop removed from destructuring
}: FloatingActionButtonsProps) {
  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-30 flex flex-col gap-2 items-center",
        "p-1.5 sm:p-2 bg-card/80 backdrop-blur-sm shadow-xl rounded-full"
        // Removed: !isVisible && "hidden"
      )}
    >
      <Button
        variant="default"
        size="icon"
        onClick={onViewRoiClick}
        disabled={isRoiDisabled}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 shadow-md"
        aria-label="View ROI Projection"
      >
        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="default"
        size="icon"
        onClick={onViewAiSummaryClick}
        disabled={isAiSummaryDisabled}
        className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 shadow-md"
        aria-label="View AI Trend Summary"
      >
        <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      {/* Portfolio button placeholder - can be re-enabled if needed
      <Button
        variant="outline"
        size="icon"
        // onClick={onPortfolioClick}
        // disabled={isPortfolioDisabled}
        className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 shadow-md"
        aria-label="View Portfolio"
      >
        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      */}
    </div>
  );
}
