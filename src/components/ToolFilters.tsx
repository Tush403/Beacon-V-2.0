
"use client";

import React from 'react';
import type { Filters, FilterOptions, FilterOption } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, RotateCcw } from 'lucide-react';
import { ALL_FILTER_VALUE } from '@/lib/constants';

interface ToolFiltersProps {
  filters: Filters;
  filterOptions: FilterOptions;
  onFilterChange: <K extends keyof Filters>(filterType: K, value: Filters[K]) => void;
  onResetFilters: () => void;
}

const ToolFilters: React.FC<ToolFiltersProps> = ({ filters, filterOptions, onFilterChange, onResetFilters }) => {
  
  const renderSelect = <K extends keyof Filters>(
    filterKey: K,
    label: string,
    options: FilterOption[] // Changed type here
  ) => (
    <div className="space-y-1">
      <label htmlFor={filterKey} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <Select
        value={filters[filterKey] === "" ? ALL_FILTER_VALUE : filters[filterKey]}
        onValueChange={(valueFromSelect) => {
          const actualValue = valueFromSelect === ALL_FILTER_VALUE ? "" : valueFromSelect;
          onFilterChange(filterKey, actualValue as Filters[K]);
        }}
      >
        <SelectTrigger id={filterKey} className="w-full bg-background text-foreground">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center">
          <Filter className="mr-2 h-6 w-6 text-primary" />
          Filter Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {renderSelect("applicationType", "Application Under Test", filterOptions.applicationTypes)}
          {renderSelect("testType", "Test Type", filterOptions.testTypes)}
          {renderSelect("operatingSystem", "Operating System", filterOptions.operatingSystems)}
          {renderSelect("codingRequirement", "Coding Requirement", filterOptions.codingRequirements)}
          {renderSelect("codingLanguage", "Coding Language", filterOptions.codingLanguages)}
          {renderSelect("pricingModel", "Pricing Model", filterOptions.pricingModels)}
          {renderSelect("reportingAnalytics", "Reporting Analytics", filterOptions.reportingAnalytics)}
        </div>
        <Button onClick={onResetFilters} variant="outline" className="w-full md:w-auto">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolFilters;
