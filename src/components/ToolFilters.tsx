
"use client";

import React from 'react';
import type { Filters, FilterOptions, FilterOption } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Filter, RotateCcw, XCircle } from 'lucide-react'; // Added XCircle
import { ALL_FILTER_VALUE } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ToolFiltersProps {
  filters: Filters;
  filterOptions: FilterOptions;
  onFilterChange: <K extends keyof Filters>(filterType: K, value: Filters[K]) => void;
  onResetFilters: () => void;
}

const CLEAR_THIS_FILTER_VALUE = "__CLEAR_THIS__"; // Value for the explicit clear option

const ToolFilters: React.FC<ToolFiltersProps> = ({ filters, filterOptions, onFilterChange, onResetFilters }) => {
  
  const renderSelect = <K extends keyof Filters>(
    filterKey: K,
    label: string,
    options: FilterOption[] 
  ) => {
    const isDisabled = filterKey === 'codingLanguage' && filters.codingRequirement === 'AI/ML';
    const isFilterActive = filters[filterKey] !== "";
    
    return (
      <div className="space-y-1.5">
        <label htmlFor={filterKey} className="block text-sm font-medium text-foreground/80">
          {label}
        </label>
        <Select
          value={filters[filterKey] === "" ? ALL_FILTER_VALUE : filters[filterKey]}
          onValueChange={(valueFromSelect) => {
            let actualValue: Filters[K] | "" = ""; // Default to clearing
            if (valueFromSelect === CLEAR_THIS_FILTER_VALUE) {
              actualValue = "";
            } else if (valueFromSelect === ALL_FILTER_VALUE) {
              actualValue = "";
            } else {
              actualValue = valueFromSelect as Filters[K];
            }
            onFilterChange(filterKey, actualValue);
          }}
          disabled={isDisabled}
        >
          <SelectTrigger 
            id={filterKey} 
            className={cn(
              "w-full bg-input/80 text-foreground placeholder:text-muted-foreground rounded-md border-border/70 focus:ring-accent focus:border-accent",
              isDisabled && "cursor-not-allowed opacity-50"
            )}
          >
            <SelectValue placeholder={`Any ${label}`} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/70 text-popover-foreground rounded-md shadow-xl backdrop-blur-sm">
            {isFilterActive && (
              <SelectItem
                key={CLEAR_THIS_FILTER_VALUE}
                value={CLEAR_THIS_FILTER_VALUE}
                className="italic text-destructive hover:bg-destructive/10 hover:text-destructive-foreground focus:bg-destructive/10 focus:text-destructive-foreground data-[state=highlighted]:text-destructive-foreground data-[state=highlighted]:bg-destructive/10"
              >
                <XCircle className="mr-2 h-4 w-4" /> Clear filter for {label}
              </SelectItem>
            )}
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-accent/20 focus:text-accent-foreground hover:bg-accent/10 rounded-sm"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-left-12 duration-700 ease-out hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center text-primary">
          <Filter className="mr-2 h-6 w-6 text-accent" />
          Filter Tools
        </CardTitle>
        <CardDescription>Narrow down your search by specific criteria.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {renderSelect("applicationType", "Application Under Test", filterOptions.applicationTypes)}
          {renderSelect("testType", "Test Type", filterOptions.testTypes)}
          {renderSelect("operatingSystem", "Operating System", filterOptions.operatingSystems)}
          {renderSelect("codingRequirement", "Coding Requirement", filterOptions.codingRequirements)}
          {renderSelect("codingLanguage", "Coding Language", filterOptions.codingLanguages)}
          {renderSelect("pricingModel", "Pricing Model", filterOptions.pricingModels)}
          {renderSelect("reportingAnalytics", "Reporting & Analytics", filterOptions.reportingAnalytics)}
        </div>
        <Button 
          onClick={onResetFilters} 
          variant="outline" 
          className="w-full md:w-auto border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 rounded-md shadow-sm hover:shadow-md"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolFilters;
