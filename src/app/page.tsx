
"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import ToolFilters from '@/components/ToolFilters';
import ToolResults from '@/components/ToolResults';
import RoiChart from '@/components/RoiChart';
import TrendSummaryPanel from '@/components/TrendSummaryPanel';
import EffortEstimator from '@/components/EffortEstimator';
import type { Filters, Tool, EstimatorInputValues, EffortEstimationOutput } from '@/lib/types';
import { mockToolsData, filterOptionsData, trendDataPerTestType } from '@/lib/data';
import { ALL_FILTER_VALUE } from '@/lib/constants';
import { estimateEffort as estimateEffortAction } from '@/actions/aiActions';

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

  // State for Effort Estimator
  const [estimatorInputs, setEstimatorInputs] = useState<EstimatorInputValues>(initialEstimatorInputs);
  const [effortEstimation, setEffortEstimation] = useState<EffortEstimationOutput | null>(null);
  const [estimatorLoading, setEstimatorLoading] = useState<boolean>(false);
  const [estimatorError, setEstimatorError] = useState<string | null>(null);

  // State for Comparison Tools
  const [toolForCol1Id, setToolForCol1Id] = useState<string | null>(null);
  const [toolForCol2Id, setToolForCol2Id] = useState<string | null>(null);
  const [toolForCol3Id, setToolForCol3Id] = useState<string | null>(null);

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
    // Optionally reset comparison tools as well, or let them persist
    // setToolForCol1Id(null); 
    // setToolForCol2Id(null);
    // setToolForCol3Id(null);
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

  useEffect(() => {
    setToolForCol1Id(filteredToolsForDisplay[0]?.id || null);
    setToolForCol2Id(filteredToolsForDisplay[1]?.id || null);
    setToolForCol3Id(filteredToolsForDisplay[2]?.id || null);
  }, [filteredToolsForDisplay]);

  const comparisonTools: Tool[] = useMemo(() => {
    const tools = [];
    if (toolForCol1Id) {
      const tool1 = mockToolsData.find(t => t.id === toolForCol1Id);
      if (tool1) tools.push(tool1);
    }
    if (toolForCol2Id) {
      const tool2 = mockToolsData.find(t => t.id === toolForCol2Id);
      // Ensure not to add the same tool twice if it was already tool1
      if (tool2 && tool2.id !== toolForCol1Id) tools.push(tool2);
      else if (!tool2 && toolForCol1Id !== toolForCol2Id) setToolForCol2Id(null); // Reset if selected tool not found
    }
     if (toolForCol3Id) {
      const tool3 = mockToolsData.find(t => t.id === toolForCol3Id);
      // Ensure not to add the same tool twice if it was already tool1 or tool2
      if (tool3 && tool3.id !== toolForCol1Id && tool3.id !== toolForCol2Id) tools.push(tool3);
      else if (!tool3 && toolForCol1Id !== toolForCol3Id && toolForCol2Id !== toolForCol3Id) setToolForCol3Id(null); // Reset
    }
    return tools;
  }, [toolForCol1Id, toolForCol2Id, toolForCol3Id]);


  const handleEstimatorInputChange = useCallback((field: keyof EstimatorInputValues, value: string | number | boolean) => {
    setEstimatorInputs(prevInputs => ({
      ...prevInputs,
      [field]: value,
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
              allTools={mockToolsData}
              toolForCol1Id={toolForCol1Id}
              toolForCol2Id={toolForCol2Id}
              onToolForCol2Change={setToolForCol2Id}
              toolForCol3Id={toolForCol3Id}
              onToolForCol3Change={setToolForCol3Id}
            />
            {comparisonTools.length > 0 && <RoiChart tools={comparisonTools} />}
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-between p-4 text-sm text-muted-foreground border-t border-border/50 mt-auto bg-background/80 backdrop-blur-sm">
        <span>V.1.0</span>
        <span>Copyright© {currentYear !== null ? currentYear : 'Loading...'} Tao Digital Solutions Inc. All rights reserved</span>
      </footer>
    </div>
  );
}
