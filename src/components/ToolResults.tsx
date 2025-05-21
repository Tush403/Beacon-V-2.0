
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import type { Tool } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, FileText, Star, Users, TrendingUp, Brain, Briefcase, ArrowRightCircle } from 'lucide-react';

interface ToolResultsProps {
  tools: Tool[];
}

const ToolResults: React.FC<ToolResultsProps> = ({ tools }) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(tools.length > 0 ? tools[0].id : undefined);

  if (tools.length === 0) {
    return (
      <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary">No Tools Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Try adjusting your filters to find matching tools or select broader categories.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center"><Star className="mr-2 h-6 w-6 text-accent" />Top Recommended Tools</CardTitle>
        <CardDescription>Click on a tool to see more details. Results are sorted by overall score.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4 bg-muted/50 p-1 rounded-md">
            {tools.map((tool) => (
              <TabsTrigger 
                key={tool.id} 
                value={tool.id} 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-sm transition-all duration-150 ease-in-out hover:bg-primary/10"
              >
                {tool.name} – Score: {tool.score}/10
              </TabsTrigger>
            ))}
          </TabsList>
          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <Card className="border-primary/50 bg-background/70 shadow-inner rounded-md">
                <CardHeader className="flex flex-col sm:flex-row items-start gap-4 p-4">
                  {tool.logoUrl && (
                     <Image 
                        src={tool.logoUrl} 
                        alt={`${tool.name} logo`} 
                        width={60} 
                        height={60} 
                        className="rounded-md border-2 border-accent p-0.5 shadow-md object-contain"
                        data-ai-hint="logo tech futuristic"
                      />
                  )}
                  <div className="flex-grow">
                    <CardTitle className="text-2xl text-primary">{tool.name}</CardTitle>
                    <CardDescription className="text-md text-accent font-semibold">Overall Score: {tool.score}/10</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-md mb-2 flex items-center text-green-400"><CheckCircle2 className="h-5 w-5 mr-2" />Strengths:</h4>
                      <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-muted-foreground">
                        {tool.strengths.map((strength, index) => <li key={index}>{strength}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-md mb-2 flex items-center text-red-400"><XCircle className="h-5 w-5 mr-2" />Weaknesses:</h4>
                      <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-muted-foreground">
                        {tool.weaknesses.map((weakness, index) => <li key={index}>{weakness}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3 pt-3 border-t border-border/30">
                    <p><strong className="text-foreground/80">Application Types:</strong> {tool.applicationTypes.join(', ')}</p>
                    <p><strong className="text-foreground/80">Test Types:</strong> {tool.testTypes.join(', ')}</p>
                    <p><strong className="text-foreground/80">Operating Systems:</strong> {tool.operatingSystems.join(', ')}</p>
                    <p><strong className="text-foreground/80">Coding Requirement:</strong> {tool.codingRequirements.join(', ')}</p>
                    <p><strong className="text-foreground/80">Coding Languages:</strong> {tool.codingLanguages.join(', ')}</p>
                    <p><strong className="text-foreground/80">Pricing Model:</strong> {tool.pricingModels.join(', ')}</p>
                    <p><strong className="text-foreground/80">Reporting & Analytics:</strong> {tool.reportingAnalytics.join(', ')}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-md shadow-md hover:shadow-lg transition-shadow">
                    <a href={tool.pdfLink} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" /> Open Guide (PDF)
                      <ArrowRightCircle className="ml-2 h-4 w-4" />
                    </a>
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
