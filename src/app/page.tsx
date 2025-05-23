
"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link'; // Ensure Link is imported
import Header from '@/components/Header';
import ToolFilters from '@/components/ToolFilters';
import ToolResults from '@/components/ToolResults';
import RoiChart from '@/components/RoiChart';
import TrendSummaryPanel from '@/components/TrendSummaryPanel';
import EffortEstimator from '@/components/EffortEstimator';
import RoiComparisonTable from '@/components/RoiComparisonTable';
import type { Filters, Tool, EstimatorInputValues, EffortEstimationOutput } from '@/lib/types';
import { mockToolsData, filterOptionsData, trendDataPerTestType, comparisonParametersData } from '@/lib/data';
import { ALL_FILTER_VALUE } from '@/lib/constants';
import { estimateEffort as estimateEffortAction } from '@/actions/aiActions';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';


const initialFilters: Filters = {
  applicationType: "",
  testType: "",
  operatingSystem: "",
  codingRequirement: "",
  codingLanguage: "",
  pricingModel: "",
  reportingAnalytics: "",
};

const initialEstimatorInputs: EstimatorInputValues = {
  complexityLow: 0,
  complexityMedium: 0,
  complexityHigh: 0,
  complexityHighlyComplex: 0,
  usesFramework: false,
  usesCiCd: false,
  teamSize: 1,
};

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const [estimatorInputs, setEstimatorInputs] = useState<EstimatorInputValues>(initialEstimatorInputs);
  const [effortEstimation, setEffortEstimation] = useState<EffortEstimationOutput | null>(null);
  const [estimatorLoading, setEstimatorLoading] = useState<boolean>(false);
  const [estimatorError, setEstimatorError] = useState<string | null>(null);

  // State for ROI Comparison Table
  const [toolForCol1Id, setToolForCol1Id] = useState<string | null>(null);
  const [toolForCol2Id, setToolForCol2Id] = useState<string | null>(null);
  const [toolForCol3Id, setToolForCol3Id] = useState<string | null>(null);

  // State for ROI Chart Dialog
  const [showRoiChartDialog, setShowRoiChartDialog] = useState(false);


  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleFilterChange = useCallback(<K extends keyof Filters>(filterType: K, value: Filters[K]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
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
      tools = tools.filter(tool => tool.codingLanguages.includes(filters.codingLanguage!) || filters.codingLanguage === "N/A" && tool.codingLanguages.includes("N/A"));
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

  // Effect to update comparison table tools when filters change or topThreeTools change
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


  const handleEstimatorInputChange = useCallback((field: keyof EstimatorInputValues, value: string | number | boolean) => {
    setEstimatorInputs(prevInputs => ({
      ...prevInputs,
      [field]: typeof value === 'string' && (field === 'complexityLow' || field === 'complexityMedium' || field === 'complexityHigh' || field === 'complexityHighlyComplex' || field === 'teamSize')
        ? parseInt(value, 10) || 0
        : value,
    }));
  }, []);
  

  const handleGetEstimate = useCallback(async () => {
    if (estimatorInputs.teamSize <= 0) {
        setEstimatorError("Team size must be greater than 0.");
        setEffortEstimation(null);
        return;
    }
    setEstimatorLoading(true);
    setEstimatorError(null);
    setEffortEstimation(null);
    try {
      const result = await estimateEffortAction(estimatorInputs);
      if ('error' in result) {
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
    return [tool1ForComparison, tool2ForComparison, tool3ForComparison].filter(Boolean) as Tool[];
  }, [tool1ForComparison, tool2ForComparison, tool3ForComparison]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <ToolFilters
              filters={filters}
              filterOptions={filterOptionsData}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
             <TrendSummaryPanel
              selectedTestType={filters.testType}
              trendData={trendDataPerTestType}
            />
            <EffortEstimator
              inputValues={estimatorInputs}
              onInputChange={handleEstimatorInputChange}
              onSubmit={handleGetEstimate}
              estimation={effortEstimation}
              isLoading={estimatorLoading}
              error={estimatorError}
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
            
            {tool1ForComparison && (
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => setShowRoiChartDialog(true)} 
                  variant="default" 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={toolsForChartDialog.length === 0}
                >
                  View ROI Projection Comparison
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Dialog open={showRoiChartDialog} onOpenChange={setShowRoiChartDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">ROI Projection Comparison</DialogTitle>
          </DialogHeader>
          {toolsForChartDialog.length > 0 ? (
              <RoiChart tools={toolsForChartDialog} />
          ) : (
              <p className="text-muted-foreground text-center py-8">No tools selected in the comparison table to display ROI projection.</p>
          )}
        </DialogContent>
      </Dialog>

      <footer className="flex items-center justify-between p-4 text-sm text-muted-foreground border-t border-border/50 mt-auto bg-background/80 backdrop-blur-sm">
        <span>V.1.0</span>
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
  );
}

