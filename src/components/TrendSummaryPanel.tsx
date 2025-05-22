
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { generateTestTypeSummary } from '@/actions/aiActions';
import type { TrendSummaryInput, TrendData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Zap } from 'lucide-react'; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TrendSummaryPanelProps {
  selectedTestType: string | ""; 
  trendData: TrendData;
}

const TrendSummaryPanel: React.FC<TrendSummaryPanelProps> = ({ selectedTestType, trendData }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card text-card-foreground animate-in fade-in-0 slide-in-from-left-12 duration-700 ease-out delay-200">
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
            <AlertTitle>Error Fetching Summary</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {summary && !isLoading && !error && (
           <div className="p-3 rounded-lg bg-white/70 dark:bg-black/20 backdrop-blur-sm shadow-sm border border-border/30">
            <p className="text-sm text-foreground/90 leading-relaxed">
              {summary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendSummaryPanel;

