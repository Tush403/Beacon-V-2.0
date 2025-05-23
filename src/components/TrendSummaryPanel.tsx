
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { generateTestTypeSummary } from '@/actions/aiActions';
import type { TrendSummaryInput, TrendData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle as UIAlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface TrendSummaryPanelProps {
  selectedTestType: string | "";
  trendData: TrendData;
}

// This component is no longer used as its functionality has been moved
// to src/app/page.tsx. It is being deleted.
// Keeping the content here for reference during this transaction,
// but the file operation will be a delete.

const TrendSummaryPanel: React.FC<TrendSummaryPanelProps> = ({ selectedTestType, trendData }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSummaryDialog, setShowSummaryDialog] = useState<boolean>(false);

  const currentTestTypeForSummary = useMemo(() => {
    return selectedTestType || "UI Testing";
  }, [selectedTestType]);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      setSummary(null); 

      const inputData: TrendSummaryInput | undefined = trendData[currentTestTypeForSummary] || trendData["Default"];

      if (!inputData) {
        setError(`No trend data available for ${currentTestTypeForSummary}.`);
        setIsLoading(false);
        return;
      }

      try {
        const result = await generateTestTypeSummary(inputData);
        if ('error' in result) {
          setError(result.error);
        } else {
          setSummary(result.summary);
        }
      } catch (e) {
        setError("An unexpected error occurred while fetching the summary.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSummary();
  }, [currentTestTypeForSummary, trendData]);

  const handleViewSummaryClick = () => {
    setShowSummaryDialog(true);
  };

  return (
    <>
      <Card className="shadow-xl rounded-lg border-border/50 bg-card text-card-foreground animate-in fade-in-0 slide-in-from-left-12 duration-700 ease-out delay-200 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-primary">
            <Zap className="mr-2 h-6 w-6 text-accent animate-pulse" />
            AI-Powered Trend Summary
          </CardTitle>
          <CardDescription>
            Key insights for {currentTestTypeForSummary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleViewSummaryClick}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading && !summary}
          >
            {isLoading && !summary ? 'Loading Summary...' : `View AI Summary for ${currentTestTypeForSummary}`}
          </Button>
        </CardContent>
        {error && !isLoading && !summary && ( 
             <CardFooter className="border-t border-border/50 pt-4">
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    <UIAlertTitle>Error Fetching Summary</UIAlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </CardFooter>
        )}
      </Card>

      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-primary">
              <Zap className="mr-2 h-5 w-5 text-accent" />
              AI Trend Summary: {currentTestTypeForSummary}
            </DialogTitle>
            <DialogDescription>
              AI-generated insights based on current tool trends.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted/50" />
                <Skeleton className="h-4 w-full bg-muted/50" />
                <Skeleton className="h-4 w-3/4 bg-muted/50" />
              </div>
            )}
            {error && !isLoading && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive rounded-md">
                <AlertCircle className="h-4 w-4" />
                <UIAlertTitle>Error Fetching Summary</UIAlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {summary && !isLoading && !error && (
              <div className="p-3 rounded-lg bg-background/70 dark:bg-black/20 backdrop-blur-sm shadow-sm border border-border/30">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {summary}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrendSummaryPanel;
