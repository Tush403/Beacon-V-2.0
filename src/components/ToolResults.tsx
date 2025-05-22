
"use client";

import React, { useState, useEffect } from 'react';
import type { Tool } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Star, ExternalLink, Package } from 'lucide-react';
import Link from 'next/link';

interface ToolResultsProps {
  toolsToDisplay: Tool[];
}

const ToolResults: React.FC<ToolResultsProps> = ({
  toolsToDisplay,
}) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(toolsToDisplay[0]?.id);

  useEffect(() => {
    if (toolsToDisplay.length > 0 && !toolsToDisplay.find(t => t.id === activeTab)) {
      setActiveTab(toolsToDisplay[0]?.id);
    } else if (toolsToDisplay.length === 0) {
      setActiveTab(undefined);
    }
  }, [toolsToDisplay, activeTab]);

  if (!toolsToDisplay || toolsToDisplay.length === 0) {
    return (
      <Card className="shadow-xl rounded-lg border-border/50 bg-card text-card-foreground animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />Top Recommended Tools</CardTitle>
          <CardDescription>No tools match your current filter criteria. Try adjusting your filters.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground p-4 text-center">
            Please apply filters to see recommended tools.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card text-card-foreground animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />Top Recommended Tools</CardTitle>
        <CardDescription>Click on a tool to see more details. Results are sorted by overall score.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {toolsToDisplay.map((tool) => (
              <TabsTrigger key={tool.id} value={tool.id} className="text-xs sm:text-sm data-[state=active]:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {tool.name} - {tool.score}/10
              </TabsTrigger>
            ))}
          </TabsList>
          {toolsToDisplay.map((tool) => (
            <TabsContent key={tool.id} value={tool.id} className="mt-0 animate-in fade-in-50 duration-500">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader className="flex flex-row items-start gap-4 p-4 sm:p-6 bg-muted/20 rounded-t-lg">
                  <div className="p-2 rounded-md bg-primary/10 border border-primary/20 shadow-sm">
                     <Package className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-spin-very-slow" data-ai-hint={`${tool.dataAiHint || 'tool icon'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl text-primary">{tool.name}</CardTitle>
                    <CardDescription className="text-base text-accent font-semibold">Overall Score: {tool.score}/10</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold text-md text-positive mb-2 flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" /> Strengths:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                        {tool.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-md text-destructive mb-2 flex items-center">
                        <XCircle className="mr-2 h-5 w-5" /> Weaknesses:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                        {tool.weaknesses.map((weakness, index) => (
                          <li key={index}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm pt-4 border-t border-border/50">
                    <div><strong className="text-foreground/80">Application Types:</strong> {tool.applicationTypes.join(', ')}</div>
                    <div><strong className="text-foreground/80">Test Types:</strong> {tool.testTypes.join(', ')}</div>
                    <div><strong className="text-foreground/80">Operating Systems:</strong> {tool.operatingSystems.join(', ')}</div>
                    <div><strong className="text-foreground/80">Coding Languages:</strong> {tool.codingLanguages.join(', ')}</div>
                    <div><strong className="text-foreground/80">Coding Requirement:</strong> {tool.codingRequirements.join(', ')}</div>
                    <div><strong className="text-foreground/80">Pricing Model:</strong> {tool.pricingModels.join(', ')}</div>
                    <div className="sm:col-span-2"><strong className="text-foreground/80">Reporting & Analytics:</strong> {tool.reportingAnalytics.join(', ')}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6 border-t border-border/50">
                  {tool.websiteUrl && (
                    <Button asChild variant="default" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ToolResults;

    