
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import ToolFilters from '@/components/ToolFilters';
import ToolResults from '@/components/ToolResults';
import RoiChart from '@/components/RoiChart';
import TrendSummaryPanel from '@/components/TrendSummaryPanel';
import type { Filters, Tool } from '@/lib/types';
import { mockToolsData, filterOptionsData, trendDataPerTestType } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialFilters: Filters = {
  applicationType: "",
  testType: "",
  operatingSystem: "",
  codingRequirement: "",
  codingLanguage: "",
  pricingModel: "",
  reportingAnalytics: "",
};

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = useCallback(<K extends keyof Filters>(filterType: K, value: Filters[K]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredTools = useMemo(() => {
    let tools = mockToolsData;

    if (filters.applicationType) {
      tools = tools.filter(tool => tool.applicationTypes.includes(filters.applicationType!));
    }
    if (filters.testType) {
      tools = tools.filter(tool => tool.testTypes.includes(filters.testType!));
    }
    if (filters.operatingSystem) {
      tools = tools.filter(tool => tool.operatingSystems.includes(filters.operatingSystem!));
    }
    if (filters.codingRequirement) {
      tools = tools.filter(tool => tool.codingRequirements.includes(filters.codingRequirement!));
    }
    if (filters.codingLanguage) {
      tools = tools.filter(tool => tool.codingLanguages.includes(filters.codingLanguage!) || filters.codingLanguage === "N/A" && tool.codingLanguages.includes("N/A"));
    }
    if (filters.pricingModel) {
      tools = tools.filter(tool => tool.pricingModels.includes(filters.pricingModel!));
    }
    if (filters.reportingAnalytics) {
      tools = tools.filter(tool => tool.reportingAnalytics.includes(filters.reportingAnalytics!));
    }
    
    // Sort by score descending and take top 3
    return tools.sort((a, b) => b.score - a.score).slice(0, 3);
  }, [filters]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Left Column / Filters and Trends */}
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
          </div>

          {/* Right Column / Results and ROI */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <ToolResults tools={filteredTools} />
            {filteredTools.length > 0 && <RoiChart tools={filteredTools} />}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t border-border mt-auto">
        ToolWise &copy; {new Date().getFullYear()} - Empowering Your Tool Selection.
      </footer>
    </div>
  );
}
