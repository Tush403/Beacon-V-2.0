
"use client";

import React, { useState, useEffect } from 'react';
import type { Tool } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Star, ExternalLink, Eye, SearchX } from 'lucide-react'; // Added SearchX
import Link from 'next/link';
import Image from 'next/image';

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
      <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />Top Recommended Tools</CardTitle>
          <CardDescription>No tools match your current filter criteria.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground/90 mb-1">No Tools Found</p>
            <p className="text-sm text-muted-foreground">
              No tools match your current selection. Try adjusting your filters or resetting them to discover suitable options.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-top-12 duration-700 ease-out delay-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
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
                  <div
                    className="p-1 rounded-md bg-card border border-border shadow-sm flex-shrink-0"
                  >
                     <Image
                        src={tool.logoUrl || "https://placehold.co/60x60.png"}
                        alt={`${tool.name} logo`}
                        width={48}
                        height={48}
                        className="rounded-md object-contain"
                        data-ai-hint={tool.dataAiHint || "tool logo"}
                      />
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
                        {tool.strengths.slice(0, 3).map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                        {tool.strengths.length > 3 && <li className="italic text-muted-foreground">...and more (see details)</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-md text-destructive mb-2 flex items-center">
                        <XCircle className="mr-2 h-5 w-5" /> Weaknesses:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                        {tool.weaknesses.slice(0, 3).map((weakness, index) => (
                          <li key={index}>{weakness}</li>
                        ))}
                        {tool.weaknesses.length > 3 && <li className="italic text-muted-foreground">...and more (see details)</li>}
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm pt-4 border-t border-border/50">
                    <div><strong className="text-foreground/80">Application Types:</strong> {tool.applicationTypes.join(', ')}</div>
                    <div><strong className="text-foreground/80">Test Types:</strong> {tool.testTypes.join(', ')}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6 border-t border-border/50 flex flex-wrap gap-2 justify-between">
                  {tool.websiteUrl && (
                    <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground">
                      <Link href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href={`/tool/${tool.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> View Full Details
                    </Link>
                  </Button>
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
