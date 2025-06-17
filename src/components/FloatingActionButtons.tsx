
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Loader2 } from 'lucide-react'; // Added Loader2
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FloatingActionButtonsProps {
  onViewRoiClick: () => void;
  onViewAiSummaryClick: () => void;
  isRoiDisabled?: boolean;
  isAiSummaryDisabled?: boolean;
}

export default function FloatingActionButtons({
  onViewRoiClick,
  onViewAiSummaryClick,
  isRoiDisabled,
  isAiSummaryDisabled,
}: FloatingActionButtonsProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={cn(
          "fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-30 flex flex-col gap-2 items-center",
          "p-1.5 sm:p-2 bg-card/80 backdrop-blur-sm shadow-xl rounded-full"
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-popover text-popover-foreground border-border shadow-md">
            <p>View ROI Projection</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              onClick={onViewAiSummaryClick}
              disabled={isAiSummaryDisabled}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 shadow-md"
              aria-label="View AI Trend Summary"
            >
              {isAiSummaryDisabled ? (
                <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
              ) : (
                <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-popover text-popover-foreground border-border shadow-md">
            <p>View AI Trend Summary</p>
          </TooltipContent>
        </Tooltip>
        {/* Portfolio button placeholder - can be re-enabled if needed
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>View Portfolio (Coming Soon)</p>
          </TooltipContent>
        </Tooltip>
        */}
      </div>
    </TooltipProvider>
  );
}
