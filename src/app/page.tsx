
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
              toolsToDisplay={topThreeTools}
            />
            {topThreeTools.length > 0 && <RoiChart tools={topThreeTools} />}
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

    