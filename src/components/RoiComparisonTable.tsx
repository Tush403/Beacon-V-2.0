
"use client";

import React from 'react';
import type { Tool, ComparisonParameter } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface RoiComparisonTableProps {
  allTools: Tool[];
  tool1: Tool | null;
  tool2: Tool | null;
  tool3: Tool | null;
  onTool2Change: (toolId: string | null) => void;
  onTool3Change: (toolId: string | null) => void;
  comparisonParameters: ComparisonParameter[];
}

const CLEAR_TOOL_VALUE = "--clear-selection--";

const getToolDisplayValue = (tool: Tool | null, parameterKey: keyof Tool): string => {
  if (!tool) return 'N/A';
  const value = tool[parameterKey];
  if (parameterKey === 'strengths' || parameterKey === 'weaknesses') {
    return Array.isArray(value) ? value.join('; ') : String(value); // Use semicolon for better readability
  }
  return Array.isArray(value) ? value.join(', ') : String(value);
};

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
    <div className="p-3 bg-muted/50 border-b border-border min-h-[70px] flex flex-col justify-center">
      {isFixed && selectedTool ? (
        <Link href={`/tool/${selectedTool.id}`} className="hover:underline text-primary font-semibold text-center group">
          {selectedTool.name}
          <LinkIcon className="inline-block ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
        </Link>
      ) : selectedTool?.name ? (
         <Link href={`/tool/${selectedTool.id}`} className="hover:underline text-primary font-semibold text-center mb-1 group">
            {selectedTool.name}
             <LinkIcon className="inline-block ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Link>
      ): <span className="font-semibold text-primary text-center mb-1">{selectedTool?.name || 'N/A'}</span>
      }

      {isFixed ? (
         selectedTool && <p className="text-xs text-muted-foreground text-center">Score: {selectedTool?.score?.toFixed(1) || 'N/A'}/10</p>
      ) : (
        <Select
          value={selectedTool?.id || CLEAR_TOOL_VALUE}
          onValueChange={(value) => onChange(value === CLEAR_TOOL_VALUE ? null : value)}
        >
          <SelectTrigger className="w-full bg-card text-card-foreground text-xs sm:text-sm border-border/70 focus:ring-accent focus:border-accent h-8">
            <SelectValue placeholder={`Select ${columnLabel}`} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/70 text-popover-foreground rounded-md shadow-xl backdrop-blur-sm">
            <SelectItem value={CLEAR_TOOL_VALUE} className="text-muted-foreground italic focus:bg-accent/20 hover:bg-accent/10">
              Clear Selection
            </SelectItem>
            {allTools.filter(tool => tool.id !== tool1?.id && tool.id !== (isFixed ? null : (columnLabel === "Tool 2" ? tool3?.id : tool2?.id) ) ).map(tool => (
              <SelectItem key={tool.id} value={tool.id} className="focus:bg-accent/20 hover:bg-accent/10">
                {tool.name} - {tool.score.toFixed(1)}/10
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );

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
          Compare tools side-by-side. The first tool is based on your filters. Click tool names to see more details.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <div className="grid grid-cols-[minmax(200px,1.2fr)_repeat(3,minmax(150px,1fr))] border-t border-l border-border rounded-b-lg">
          {/* Headers */}
          <div className="p-3 font-semibold bg-muted/50 border-b border-r border-border text-primary flex items-center min-h-[70px]">Parameters</div>
          <div className="border-r border-border">{renderToolColumnHeader(tool1, () => {}, "Tool 1", true)}</div>
          <div className="border-r border-border">{renderToolColumnHeader(tool2, onTool2Change, "Tool 2")}</div>
          <div>{renderToolColumnHeader(tool3, onTool3Change, "Tool 3")}</div>

          {/* Data Rows */}
          {comparisonParameters.map((param) => (
            <React.Fragment key={param.key}>
              <div className="p-3 font-medium bg-muted/20 border-b border-r border-border text-foreground/80 whitespace-nowrap flex items-start text-sm">
                {param.label}
              </div>
              {[tool1, tool2, tool3].map((currentTool, index) => (
                 <div 
                  key={`${param.key}-${currentTool?.id || index}`} 
                  className={cn(
                    "p-3 border-b text-sm flex items-start min-h-[50px]", // Ensure min height for data cells
                    index < 2 && "border-r border-border", // Add right border for first two tool columns
                    !currentTool && "text-muted-foreground italic"
                  )}
                >
                  <span>{getToolDisplayValue(currentTool, param.key)}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoiComparisonTable;
