
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import type { Tool } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, FileText, Star, Users, TrendingUp, Brain, Briefcase } from 'lucide-react';

interface ToolResultsProps {
  tools: Tool[];
}

const ToolResults: React.FC<ToolResultsProps> = ({ tools }) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(tools.length > 0 ? tools[0].id : undefined);

  if (tools.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl">No Tools Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Try adjusting your filters to find matching tools.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">Top Recommended Tools</CardTitle>
        <CardDescription>Click on a tool to see more details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {tools.map((tool) => (
              <TabsTrigger key={tool.id} value={tool.id} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
                {tool.name} – {tool.score}/10
              </TabsTrigger>
            ))}
          </TabsList>
          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <Card className="border-primary">
                <CardHeader className="flex flex-row items-start gap-4">
                  {tool.logoUrl && (
                     <Image 
                        src={tool.logoUrl} 
                        alt={`${tool.name} logo`} 
                        width={60} 
                        height={60} 
                        className="rounded-md border p-1"
                        data-ai-hint="logo company"
                      />
                  )}
                  <div>
                    <CardTitle className="text-2xl text-primary">{tool.name}</CardTitle>
                    <CardDescription className="text-lg">{tool.score}/10 Score</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-md mb-2 flex items-center"><CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />Strengths:</h4>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-muted-foreground">
                      {tool.strengths.map((strength, index) => <li key={index}>{strength}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-md mb-2 flex items-center"><XCircle className="h-5 w-5 mr-2 text-red-500" />Weaknesses:</h4>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-muted-foreground">
                      {tool.weaknesses.map((weakness, index) => <li key={index}>{weakness}</li>)}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                    <p><strong className="text-foreground">Application Types:</strong> {tool.applicationTypes.join(', ')}</p>
                    <p><strong className="text-foreground">Test Types:</strong> {tool.testTypes.join(', ')}</p>
                    <p><strong className="text-foreground">Operating Systems:</strong> {tool.operatingSystems.join(', ')}</p>
                    <p><strong className="text-foreground">Coding:</strong> {tool.codingRequirements.join(', ')} ({tool.codingLanguages.join(', ')})</p>
                    <p><strong className="text-foreground">Pricing:</strong> {tool.pricingModels.join(', ')}</p>
                    <p><strong className="text-foreground">Reporting:</strong> {tool.reportingAnalytics.join(', ')}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href={tool.pdfLink} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" /> Open Guide (PDF)
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
