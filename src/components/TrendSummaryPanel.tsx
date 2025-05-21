
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { generateTestTypeSummary } from '@/actions/aiActions';
import type { TrendSummaryInput, TrendData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Lightbulb, Zap } from 'lucide-react'; // Changed Lightbulb to Zap for a more "insightful" feel
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TrendSummaryPanelProps {
  selectedTestType: string | ""; // Can be empty if no filter is selected
  trendData: TrendData;
}

const TrendSummaryPanel: React.FC<TrendSummaryPanelProps> = ({ selectedTestType, trendData }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentTestTypeForSummary = useMemo(() => {
    return selectedTestType || "UI Testing"; // Default to UI Testing if no test type selected
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

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-primary">
          <Zap className="mr-2 h-6 w-6 text-accent animate-pulse" /> {/* Using Zap and added pulse */}
          AI-Powered Trend Summary
        </CardTitle>
        <CardDescription>
          Key insights for {currentTestTypeForSummary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-3/4 bg-muted/50" />
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="destructive" className="bg-destructive/20 border-destructive/50 text-destructive-foreground rounded-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Summary</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {summary && !isLoading && !error && (
          <p className="text-sm text-foreground/90 leading-relaxed glassmorphism-text p-3 rounded-md bg-background/30">
            {summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendSummaryPanel;
