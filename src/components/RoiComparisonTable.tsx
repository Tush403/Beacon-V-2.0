
"use client";

import React from 'react';
import type { Tool, ComparisonParameter } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoiComparisonTableProps {
  allTools: Tool[];
  tool1: Tool | null;
  tool2: Tool | null;
  tool3: Tool | null;
  onTool2Change: (toolId: string | null) => void;
  onTool3Change: (toolId: string | null) => void;
  comparisonParameters: ComparisonParameter[];
}

const CLEAR_TOOL_VALUE = "--clear-selection--"; // Special value for clearing selection

const RoiComparisonTable: React.FC<RoiComparisonTableProps> = ({
  allTools,
  tool1,
  tool2,
  tool3,
  onTool2Change,
  onTool3Change,
  comparisonParameters,
}) => {
  const renderToolColumnHeader = (
    selectedTool: Tool | null,
    onChange: (toolId: string | null) => void,
    columnLabel: string,
    isFixed: boolean = false
  ) => (
    <div className="p-3 bg-muted/50 border-b border-border">
      {isFixed ? (
        <>
          <h4 className="font-semibold text-primary text-center">{selectedTool?.name || 'N/A'}</h4>
          <p className="text-xs text-muted-foreground text-center">Score: {selectedTool?.score?.toFixed(1) || 'N/A'}/10</p>
        </>
      ) : (
        <Select
          value={selectedTool?.id || CLEAR_TOOL_VALUE}
          onValueChange={(value) => onChange(value === CLEAR_TOOL_VALUE ? null : value)}
        >
          <SelectTrigger className="w-full bg-card text-card-foreground text-xs sm:text-sm border-border/70 focus:ring-accent focus:border-accent">
            <SelectValue placeholder={`Select ${columnLabel}`} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/70 text-popover-foreground rounded-md shadow-xl backdrop-blur-sm">
            <SelectItem value={CLEAR_TOOL_VALUE} className="text-muted-foreground italic focus:bg-accent/20 hover:bg-accent/10">
              Clear Selection
            </SelectItem>
            {allTools.map(tool => (
              <SelectItem key={tool.id} value={tool.id} className="focus:bg-accent/20 hover:bg-accent/10">
                {tool.name} - {tool.score.toFixed(1)}/10
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );

  const renderToolDataCell = (tool: Tool | null, parameterKey: keyof Tool) => {
    const value = tool ? tool[parameterKey] : 'N/A';
    const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
    return (
      <div className={cn(
        "p-3 border-b border-border text-sm",
        !tool && "text-muted-foreground italic"
      )}>
        {displayValue}
      </div>
    );
  };

  if (!tool1) {
    return (
        <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm text-card-foreground animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-200 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />ROI Comparison Table</CardTitle>
          <CardDescription>Select tools using filters to see comparison data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No primary tool selected. Please refine your filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm text-card-foreground animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-150 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center">
          <Star className="mr-2 h-6 w-6 text-accent" />
          ROI Comparison Table
        </CardTitle>
        <CardDescription>
          Compare tools side-by-side. The first tool is based on your filters.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <div className="grid grid-cols-[minmax(150px,1fr)_repeat(3,minmax(150px,1fr))] border-t border-l border-border rounded-b-lg">
          {/* Headers */}
          <div className="p-3 font-semibold bg-muted/50 border-b border-r border-border text-primary">Parameters</div>
          <div className="border-r border-border">{renderToolColumnHeader(tool1, () => {}, "Tool 1", true)}</div>
          <div className="border-r border-border">{renderToolColumnHeader(tool2, onTool2Change, "Tool 2")}</div>
          <div>{renderToolColumnHeader(tool3, onTool3Change, "Tool 3")}</div>

          {/* Data Rows */}
          {comparisonParameters.map((param) => (
            <React.Fragment key={param.key}>
              <div className="p-3 font-medium bg-muted/20 border-b border-r border-border text-foreground/80 whitespace-nowrap">{param.label}</div>
              <div className="border-r border-border">{renderToolDataCell(tool1, param.key)}</div>
              <div className="border-r border-border">{renderToolDataCell(tool2, param.key)}</div>
              <div>{renderToolDataCell(tool3, param.key)}</div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoiComparisonTable;
