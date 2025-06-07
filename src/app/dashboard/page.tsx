
"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import ToolFilters from '@/components/ToolFilters';
import ToolResults from '@/components/ToolResults';
import RoiChart from '@/components/RoiChart';
import EffortEstimator from '@/components/EffortEstimator';
import RoiComparisonTable from '@/components/RoiComparisonTable';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import type { Filters, Tool, EffortEstimationOutput } from '@/lib/types';
// EstimatorInputValues will be handled by a local type for UI
import { mockToolsData, filterOptionsData, trendDataPerTestType, comparisonParametersData } from '@/lib/data';
import { ALL_FILTER_VALUE } from '@/lib/constants';
import { estimateEffort as estimateEffortAction, generateTestTypeSummary } from '@/actions/aiActions';
import type { GenerateTestTypeSummaryOutput, GenerateTestTypeSummaryInput } from '@/ai/flows/generate-test-type-summary';
import type { EstimateEffortInput } from '@/ai/flows/estimate-effort-flow'; // For AI action call
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle as UIAlertTitle } from "@/components/ui/alert";
import { AlertCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import BackToTopButton from '@/components/BackToTopButton';
import ReleaseNotesDisplay from '@/components/ReleaseNotesDisplay';

// UI-specific type for estimator inputs, allowing strings for numeric fields
interface EstimatorInputValuesForUI {
  complexityLow: string;
  complexityMedium: string;
  complexityHigh: string;
  complexityHighlyComplex: string;
  usesFramework: boolean;
  usesCiCd: boolean;
  teamSize: string;
  automationToolName: string;
}

const initialFilters: Filters = {
  applicationType: "",
  testType: "",
  operatingSystem: "",
  codingRequirement: "",
  codingLanguage: "",
  pricingModel: "",
  reportingAnalytics: "",
};

const initialEstimatorInputs: EstimatorInputValuesForUI = {
  complexityLow: "",
  complexityMedium: "",
  complexityHigh: "",
  complexityHighlyComplex: "",
  usesFramework: false,
  usesCiCd: false,
  teamSize: "1", // Default to "1" as a string, can also be ""
  automationToolName: "",
};

interface DashboardPageProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DashboardPage({ params, searchParams }: DashboardPageProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const [estimatorInputs, setEstimatorInputs] = useState<EstimatorInputValuesForUI>(initialEstimatorInputs);
  const [effortEstimation, setEffortEstimation] = useState<EffortEstimationOutput | null>(null);
  const [estimatorLoading, setEstimatorLoading] = useState<boolean>(false);
  const [estimatorError, setEstimatorError] = useState<string | null>(null);

  const [toolForCol1Id, setToolForCol1Id] = useState<string | null>(null);
  const [toolForCol2Id, setToolForCol2Id] = useState<string | null>(null);
  const [toolForCol3Id, setToolForCol3Id] = useState<string | null>(null);

  const [showRoiChartDialog, setShowRoiChartDialog] = useState(false);

  const [aiTrendSummary, setAiTrendSummary] = useState<GenerateTestTypeSummaryOutput | null>(null);
  const [aiTrendSummaryLoading, setAiTrendSummaryLoading] = useState<boolean>(false);
  const [aiTrendSummaryError, setAiTrendSummaryError] = useState<string | null>(null);
  const [showAiTrendSummaryDialog, setShowAiTrendSummaryDialog] = useState<boolean>(false);

  const [showInitialReleaseNotes, setShowInitialReleaseNotes] = useState(false);


  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const body = document.body;
    if (showInitialReleaseNotes || showRoiChartDialog || showAiTrendSummaryDialog) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = '';
    };
  }, [showInitialReleaseNotes, showRoiChartDialog, showAiTrendSummaryDialog]);


  const handleFilterChange = useCallback(<K extends keyof Filters>(filterType: K, value: Filters[K]) => {
    setFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [filterType]: value,
      };
      if (filterType === 'codingRequirement' && value === 'AI/ML') {
        newFilters.codingLanguage = 'N/A';
      } else if (filterType === 'codingRequirement' && value !== 'AI/ML' && prevFilters.codingLanguage === 'N/A' && prevFilters.codingRequirement === 'AI/ML') {
        newFilters.codingLanguage = ''; 
      }
      return newFilters;
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(initialFilters);
    setToolForCol1Id(null);
    setToolForCol2Id(null);
    setToolForCol3Id(null);
  }, []);

  const filteredToolsForDisplay = useMemo(() => {
    let tools = mockToolsData;

    if (filters.applicationType && filters.applicationType !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool => tool.applicationTypes.includes(filters.applicationType!));
    }
    if (filters.testType && filters.testType !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool => tool.testTypes.includes(filters.testType!));
    }
    if (filters.operatingSystem && filters.operatingSystem !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool => tool.operatingSystems.includes(filters.operatingSystem!));
    }
    if (filters.codingRequirement && filters.codingRequirement !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool => tool.codingRequirements.includes(filters.codingRequirement!));
    }
    if (filters.codingLanguage && filters.codingLanguage !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool =>
        tool.codingLanguages.includes(filters.codingLanguage!) ||
        (filters.codingLanguage === "N/A" && tool.codingLanguages.includes("N/A"))
      );
    }
    if (filters.pricingModel && filters.pricingModel !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool => tool.pricingModels.includes(filters.pricingModel!));
    }
    if (filters.reportingAnalytics && filters.reportingAnalytics !== ALL_FILTER_VALUE) {
      tools = tools.filter(tool => tool.reportingAnalytics.includes(filters.reportingAnalytics!));
    }

    return tools.sort((a, b) => b.score - a.score);
  }, [filters]);

  const topThreeTools = useMemo(() => {
    return filteredToolsForDisplay.slice(0, 3);
  }, [filteredToolsForDisplay]);

  useEffect(() => {
    if (topThreeTools.length > 0) {
      setToolForCol1Id(topThreeTools[0].id);
      setToolForCol2Id(topThreeTools.length > 1 ? topThreeTools[1].id : null);
      setToolForCol3Id(topThreeTools.length > 2 ? topThreeTools[2].id : null);
    } else {
      setToolForCol1Id(null);
      setToolForCol2Id(null);
      setToolForCol3Id(null);
    }
  }, [topThreeTools]);

  const handleTool2Change = useCallback((toolId: string | null) => {
    setToolForCol2Id(toolId);
  }, []);

  const handleTool3Change = useCallback((toolId: string | null) => {
    setToolForCol3Id(toolId);
  }, []);

  const tool1ForComparison = useMemo(() => mockToolsData.find(t => t.id === toolForCol1Id) || null, [toolForCol1Id]);
  const tool2ForComparison = useMemo(() => mockToolsData.find(t => t.id === toolForCol2Id) || null, [toolForCol2Id]);
  const tool3ForComparison = useMemo(() => mockToolsData.find(t => t.id === toolForCol3Id) || null, [toolForCol3Id]);


  const handleEstimatorInputChange = useCallback((field: keyof EstimatorInputValuesForUI, value: string | boolean) => {
    setEstimatorInputs(prevInputs => {
      let processedValue = value;
      if (typeof value === 'string' && (field === 'complexityLow' || field === 'complexityMedium' || field === 'complexityHigh' || field === 'complexityHighlyComplex' || field === 'teamSize')) {
        // Allow empty string or positive integers. Remove leading zeros unless the value is "0".
        if (value === "") {
          processedValue = "";
        } else if (/^\d+$/.test(value)) {
          if (value.length > 1 && value.startsWith('0')) {
            processedValue = value.replace(/^0+/, '');
            if (processedValue === '') processedValue = '0'; // Handles case like "00" -> "0"
          } else {
            processedValue = value;
          }
        } else {
          processedValue = prevInputs[field]; // Revert to previous value if input is not valid number string
        }
      }
      return {
        ...prevInputs,
        [field]: processedValue,
      };
    });
  }, []);


  const handleGetEstimate = useCallback(async () => {
    const teamSizeNum = parseInt(estimatorInputs.teamSize, 10);

    if (isNaN(teamSizeNum) || teamSizeNum <= 0) {
        setEstimatorError("Team size must be a number greater than 0.");
        setEffortEstimation(null);
        return;
    }

    setEstimatorLoading(true);
    setEstimatorError(null);
    setEffortEstimation(null);

    const effortInputForAI: EstimateEffortInput = {
      complexityLow: parseInt(estimatorInputs.complexityLow, 10) || 0,
      complexityMedium: parseInt(estimatorInputs.complexityMedium, 10) || 0,
      complexityHigh: parseInt(estimatorInputs.complexityHigh, 10) || 0,
      complexityHighlyComplex: parseInt(estimatorInputs.complexityHighlyComplex, 10) || 0,
      usesFramework: estimatorInputs.usesFramework,
      usesCiCd: estimatorInputs.usesCiCd,
      teamSize: teamSizeNum, // Already validated
      automationToolName: estimatorInputs.automationToolName,
    };

    try {
      const result = await estimateEffortAction(effortInputForAI);
      if ('error'in result) {
        setEstimatorError(result.error);
      } else {
        setEffortEstimation(result);
      }
    } catch (e) {
      console.error("Effort estimation error:", e);
      setEstimatorError("An unexpected error occurred during estimation.");
    } finally {
      setEstimatorLoading(false);
    }
  }, [estimatorInputs]);

  const toolsForChartDialog = useMemo(() => {
    const selectedTools = [tool1ForComparison, tool2ForComparison, tool3ForComparison].filter(Boolean) as Tool[];
    return selectedTools.filter(tool => tool.roiProjection && tool.roiProjection.length > 0);
  }, [tool1ForComparison, tool2ForComparison, tool3ForComparison]);

  const currentTestTypeForSummary = useMemo(() => {
    return filters.testType && filters.testType !== ALL_FILTER_VALUE ? filters.testType : "UI Testing";
  }, [filters.testType]);

  const handleViewAiTrendSummaryClick = async () => {
    setAiTrendSummaryLoading(true);
    setAiTrendSummary(null);
    setAiTrendSummaryError(null);

    const inputData: GenerateTestTypeSummaryInput | undefined = trendDataPerTestType[currentTestTypeForSummary] || trendDataPerTestType["Default"];

    if (!inputData) {
      setAiTrendSummaryError(`No trend data available for ${currentTestTypeForSummary}.`);
      setAiTrendSummaryLoading(false);
      setShowAiTrendSummaryDialog(true);
      return;
    }

    try {
      const result = await generateTestTypeSummary(inputData);
      if ('error' in result) {
        setAiTrendSummaryError(result.error);
      } else {
        setAiTrendSummary(result);
      }
    } catch (e: any) {
      setAiTrendSummaryError(e.message || "An unexpected error occurred while fetching the summary.");
      console.error(e);
    } finally {
      setAiTrendSummaryLoading(false);
      setShowAiTrendSummaryDialog(true);
    }
  };

  const showFab = (tool1ForComparison || tool2ForComparison || tool3ForComparison) &&
                  !showInitialReleaseNotes &&
                  !showRoiChartDialog &&
                  !showAiTrendSummaryDialog;
  
  const isGetEstimateDisabled = useMemo(() => {
    if (estimatorLoading) return true;
    const teamSizeNum = parseInt(estimatorInputs.teamSize, 10);
    return isNaN(teamSizeNum) || teamSizeNum <= 0;
  }, [estimatorLoading, estimatorInputs.teamSize]);

  return (
    <>
      <div className={cn(
        "flex flex-col min-h-screen",
        (showInitialReleaseNotes || showRoiChartDialog || showAiTrendSummaryDialog) && "filter backdrop-blur-sm pointer-events-none"
      )}>
        <Header />
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              <ToolFilters
                filters={filters}
                filterOptions={filterOptionsData}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
              <EffortEstimator
                inputValues={estimatorInputs}
                onInputChange={handleEstimatorInputChange}
                onSubmit={handleGetEstimate}
                estimation={effortEstimation}
                isLoading={estimatorLoading}
                error={estimatorError}
                allTools={mockToolsData}
                isSubmitDisabled={isGetEstimateDisabled}
              />
            </div>

            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
               <ToolResults
                toolsToDisplay={topThreeTools}
              />

              {tool1ForComparison && (
                  <RoiComparisonTable
                      allTools={mockToolsData}
                      tool1={tool1ForComparison}
                      tool2={tool2ForComparison}
                      tool3={tool3ForComparison}
                      onTool2Change={handleTool2Change}
                      onTool3Change={handleTool3Change}
                      comparisonParameters={comparisonParametersData}
                  />
              )}
            </div>
          </div>
        </main>
        <footer className="flex items-center justify-between p-4 text-sm text-muted-foreground border-t border-border/50 mt-auto bg-background/80 backdrop-blur-sm">
          <span>V.2.0</span>
          <div className="flex items-center gap-x-3 sm:gap-x-4">
              <Link href="https://www.taodigitalsolutions.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  Privacy Policy
              </Link>
              <span className="select-none">|</span>
              <Link href="https://www.taodigitalsolutions.com/terms-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  Terms of Service
              </Link>
          </div>
          <span className="text-right">
              Copyright© {currentYear !== null ? currentYear : '....'} Tao Digital Solutions Inc. All rights reserved
          </span>
        </footer>
      </div>

      {showFab && (
        <FloatingActionButtons
          onViewRoiClick={() => setShowRoiChartDialog(true)}
          onViewAiSummaryClick={handleViewAiTrendSummaryClick}
          isRoiDisabled={toolsForChartDialog.length === 0}
          isAiSummaryDisabled={aiTrendSummaryLoading}
        />
      )}

      <Dialog open={showInitialReleaseNotes} onOpenChange={(open) => { if (!open) setShowInitialReleaseNotes(false); }}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">ToolWise - Release Notes (V.2.0)</DialogTitle>
            <DialogDescription>
              Welcome! Please review the latest updates before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ReleaseNotesDisplay />
          </div>
          <DialogFooter className="pt-4 mt-auto">
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setShowInitialReleaseNotes(false)}
            >
              Acknowledge & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRoiChartDialog} onOpenChange={setShowRoiChartDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">ROI Projection Comparison</DialogTitle>
            <DialogDescription>Projected Return on Investment (ROI) for selected tools over 6 months.</DialogDescription>
          </DialogHeader>
          {toolsForChartDialog.length > 0 ? (
              <RoiChart tools={toolsForChartDialog} />
          ) : (
              <p className="text-muted-foreground text-center py-8">No tools selected in the comparison table with ROI data to display projection.</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAiTrendSummaryDialog} onOpenChange={setShowAiTrendSummaryDialog}>
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
            {aiTrendSummaryLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted/50" />
                <Skeleton className="h-4 w-full bg-muted/50" />
                <Skeleton className="h-4 w-3/4 bg-muted/50" />
              </div>
            )}
            {aiTrendSummaryError && !aiTrendSummaryLoading && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive rounded-md">
                <AlertCircle className="h-4 w-4" />
                <UIAlertTitle>Error Fetching Summary</UIAlertTitle>
                <AlertDescription>{aiTrendSummaryError}</AlertDescription>
              </Alert>
            )}
            {aiTrendSummary && !aiTrendSummaryLoading && !aiTrendSummaryError && (
              <div className="p-3 rounded-lg bg-background/70 dark:bg-black/20 backdrop-blur-sm shadow-sm border border-border/30">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {aiTrendSummary.summary}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BackToTopButton />
    </>
  );
}
