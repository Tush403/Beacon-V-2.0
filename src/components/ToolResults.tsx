
"use client";

import React from 'react';
import type { Tool, ComparisonParameter } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';

interface ToolResultsProps {
  allTools: Tool[];
  toolForCol1Id: string | null;
  toolForCol2Id: string | null;
  onToolForCol2Change: (id: string | null) => void;
  toolForCol3Id: string | null;
  onToolForCol3Change: (id: string | null) => void;
}

const comparisonParameters: ComparisonParameter[] = [
  { key: 'initialSetupTime', label: 'Initial Setup Time' },
  { key: 'maintenanceOverhead', label: 'Maintenance Overhead' },
  { key: 'testCreationSpeed', label: 'Test Creation Speed' },
  { key: 'scriptReusability', label: 'Script Reusability' },
  { key: 'parallelExecutionSupport', label: 'Parallel Execution Support' },
  { key: 'testCaseCreationEffort', label: 'Test Case Creation Effort' },
  { key: 'skillRequirement', label: 'Skill Requirement' },
  { key: 'overallAutomationCoverage', label: 'Overall Automation Coverage' },
  { key: 'totalCostOfOwnership', label: 'Total Cost of Ownership' },
];

const CLEAR_TOOL_VALUE = "--clear-selection--";

const ToolResults: React.FC<ToolResultsProps> = ({
  allTools,
  toolForCol1Id,
  toolForCol2Id,
  onToolForCol2Change,
  toolForCol3Id,
  onToolForCol3Change,
}) => {
  const tool1 = allTools.find(t => t.id === toolForCol1Id);
  const tool2 = allTools.find(t => t.id === toolForCol2Id);
  const tool3 = allTools.find(t => t.id === toolForCol3Id);

  const renderToolColumnHeader = (tool: Tool | undefined, selectedValue: string | null, onChange: (id: string | null) => void, isFixed: boolean = false) => {
    if (isFixed) {
      return tool ? (
        <div className="p-2 text-center border-b border-border">
          <h3 className="font-semibold text-primary">{tool.name}</h3>
          <p className="text-sm text-accent">{tool.score}/10</p>
        </div>
      ) : (
        <div className="p-2 text-center text-muted-foreground border-b border-border">N/A</div>
      );
    }

    return (
      <div className="p-2 border-b border-border space-y-1">
        <Select
          value={selectedValue || ""}
          onValueChange={(value) => {
            if (value === CLEAR_TOOL_VALUE) {
              onChange(null);
            } else {
              onChange(value);
            }
          }}
        >
          <SelectTrigger className="w-full bg-input/80 text-sm">
            <SelectValue placeholder="Select Tool..." />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value={CLEAR_TOOL_VALUE}>Clear Selection</SelectItem>
            {allTools.map(t => (
              <SelectItem key={t.id} value={t.id} disabled={t.id === toolForCol1Id || (selectedValue !== t.id && (t.id === toolForCol2Id || t.id === toolForCol3Id))}>
                {t.name} - {t.score}/10
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {tool && (
           <div className="text-center">
             <h3 className="font-semibold text-primary text-sm truncate">{tool.name}</h3>
             <p className="text-xs text-accent">{tool.score}/10</p>
           </div>
        )}
      </div>
    );
  };

  if (!tool1 && !toolForCol1Id) { 
     return (
      <Card className="shadow-lg rounded-lg border-border/50 bg-card/90 backdrop-blur-sm animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />ROI Comparison Table</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground p-4 text-center">
            Please apply filters to select a primary tool for comparison, or select tools using the dropdowns.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card text-card-foreground animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />ROI Comparison Table</CardTitle>
        <CardDescription>Compare tools side-by-side. The first tool is based on your filters.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-2 lg:p-4 overflow-x-auto">
        <div className="min-w-[800px] md:min-w-full">
          <Table className="border-collapse border border-border">
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-1/4 font-bold text-foreground p-2 border border-border">Parameters</TableHead>
                <TableHead className="w-1/4 p-0 border border-border">{renderToolColumnHeader(tool1, toolForCol1Id, () => {}, true)}</TableHead>
                <TableHead className="w-1/4 p-0 border border-border">{renderToolColumnHeader(tool2, toolForCol2Id, onToolForCol2Change)}</TableHead>
                <TableHead className="w-1/4 p-0 border border-border">{renderToolColumnHeader(tool3, toolForCol3Id, onToolForCol3Change)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonParameters.map(param => (
                <TableRow key={param.key} className="hover:bg-muted/10">
                  <TableCell className="font-semibold text-sm text-foreground/90 p-2 border border-border">{param.label}</TableCell>
                  <TableCell className="text-sm p-2 border border-border">{tool1 ? (tool1[param.key] as string || 'N/A') : <span className="text-muted-foreground italic">N/A</span>}</TableCell>
                  <TableCell className="text-sm p-2 border border-border">{tool2 ? (tool2[param.key] as string || 'N/A') : <span className="text-muted-foreground italic">N/A</span>}</TableCell>
                  <TableCell className="text-sm p-2 border border-border">{tool3 ? (tool3[param.key] as string || 'N/A') : <span className="text-muted-foreground italic">N/A</span>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolResults;
