
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
//import { mockToolsData } from '@/lib/data';
import type { Tool } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle2, XCircle, Star, ExternalLink, Users, BarChart3, TrendingUp, Briefcase, ShieldCheck, Zap, Code2, DollarSign, FileText, Clock, Tool as ToolIconLucide, Recycle, Cpu, Users2, Gauge, Coverage, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

// This is a client component, so we can use useParams
export default function ToolDetailPage() {
  const params = useParams();
  const toolId = typeof params.toolId === 'string' ? params.toolId : undefined;
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  const tool = React.useMemo(() => {
    if (!toolId) return null;
    return mockToolsData.find(t => t.id === toolId);
  }, [toolId]);

  const similarTools = React.useMemo(() => {
    if (!tool) return [];
    return mockToolsData
      .filter(
        t =>
          t.id !== tool.id &&
          (t.applicationTypes.some(at => tool.applicationTypes.includes(at)) ||
           t.testTypes.some(tt => tool.testTypes.includes(tt)))
      )
      .sort((a,b) => b.score - a.score) // Sort by score
      .slice(0, 3);
  }, [tool]);

  if (!toolId) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Tool ID is missing. Cannot display tool details.</AlertDescription>
          </Alert>
           <Button asChild className="mt-6">
            <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>
        </main>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
           <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Tool not found. It might have been removed or the ID is incorrect.</AlertDescription>
          </Alert>
          <Button asChild className="mt-6">
            <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>
        </main>
      </div>
    );
  }
  const detailItems = [
    { icon: Briefcase, label: "Application Types", value: tool.applicationTypes.join(', ') },
    { icon: ShieldCheck, label: "Test Types", value: tool.testTypes.join(', ') },
    { icon: Cpu, label: "Operating Systems", value: tool.operatingSystems.join(', ') },
    { icon: Code2, label: "Coding Requirement", value: tool.codingRequirements.join(', ') },
    { icon: Zap, label: "Coding Languages", value: tool.codingLanguages.join(', ') },
    { icon: DollarSign, label: "Pricing Models", value: tool.pricingModels.join(', ') },
    { icon: FileText, label: "Reporting & Analytics", value: tool.reportingAnalytics.join(', ') },
    { icon: Clock, label: "Initial Setup Time", value: tool.initialSetupTime },
    { icon: ToolIconLucide, label: "Maintenance Overhead", value: tool.maintenanceOverhead },
    { icon: Gauge, label: "Test Creation Speed", value: tool.testCreationSpeed },
    { icon: Recycle, label: "Script Reusability", value: tool.scriptReusability },
    { icon: Users2, label: "Parallel Execution Support", value: tool.parallelExecutionSupport },
    { icon: Users, label: "Test Case Creation Effort", value: tool.testCaseCreationEffort },
    { icon: BookOpen, label: "Skill Requirement", value: tool.skillRequirement },
    { icon: Coverage, label: "Overall Automation Coverage", value: tool.overallAutomationCoverage },
    { icon: BarChart3, label: "Total Cost of Ownership", value: tool.totalCostOfOwnership },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild className="text-sm">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <Card className="shadow-2xl rounded-xl border-border/30 overflow-hidden bg-card/90 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 p-6 border-b border-border/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Image
                src={tool.logoUrl || "https://placehold.co/80x80.png"}
                alt={`${tool.name} logo`}
                width={80}
                height={80}
                className="rounded-lg border border-border shadow-md object-contain"
                data-ai-hint={tool.dataAiHint || "tool logo"}
              />
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">{tool.name}</h1>
                <div className="flex items-center gap-2 mt-1 text-lg text-accent font-semibold">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  Overall Score: {tool.score}/10
                </div>
              </div>
              {tool.websiteUrl && (
                <Button asChild variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4 sm:mt-0 self-start sm:self-center">
                  <Link href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" /> Visit Website
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Key Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-positive mb-2 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Strengths
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-foreground/90 pl-2 text-sm">
                    {tool.strengths.map((strength, index) => (
                      <li key={`strength-${index}`}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-destructive mb-2 flex items-center">
                    <XCircle className="mr-2 h-5 w-5" /> Weaknesses
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-foreground/90 pl-2 text-sm">
                    {tool.weaknesses.map((weakness, index) => (
                      <li key={`weakness-${index}`}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-6">Detailed Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                {detailItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg border border-border/20">
                    <item.icon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      <p className="text-sm text-foreground/90 font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {tool.roiProjection && tool.roiProjection.length > 0 && (
              <>
                <Separator className="my-8" />
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                    <TrendingUp className="mr-2 h-6 w-6" /> ROI Projection
                  </h2>
                  <div className="overflow-x-auto p-1">
                    <div className="flex space-x-4 pb-2">
                    {tool.roiProjection.map((point) => (
                      <div key={point.month} className="flex-shrink-0 w-32 p-3 bg-primary/10 rounded-lg text-center border border-primary/20 shadow-sm">
                        <p className="text-sm font-medium text-primary">Month {point.month}</p>
                        <p className="text-xl font-bold text-accent">{point.roi}%</p>
                      </div>
                    ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">Note: ROI projections are estimates and can vary.</p>
                </section>
              </>
            )}
          </CardContent>

          {tool.pdfLink && (
             <CardFooter className="bg-muted/30 p-6 border-t border-border/30">
                <Button asChild variant="secondary" className="w-full sm:w-auto">
                  <Link href={tool.pdfLink} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" /> Download PDF Guide
                  </Link>
                </Button>
            </CardFooter>
          )}
        </Card>

        {similarTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-primary mb-6">Similar Tools You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarTools.map(similarTool => (
                <Card key={similarTool.id} className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={similarTool.logoUrl || "https://placehold.co/40x40.png"}
                        alt={`${similarTool.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-md border border-border object-contain"
                         data-ai-hint={similarTool.dataAiHint || "tool logo"}
                      />
                      <div>
                        <CardTitle className="text-lg text-primary">{similarTool.name}</CardTitle>
                        <CardDescription className="text-xs text-accent">Score: {similarTool.score}/10</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 text-sm">
                    <p className="text-muted-foreground line-clamp-2">
                      Primary for: {similarTool.applicationTypes[0]} & {similarTool.testTypes[0]}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 border-t border-border/20">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/tool/${similarTool.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer className="flex items-center justify-between p-4 text-sm text-muted-foreground border-t border-border/50 mt-auto bg-background/80 backdrop-blur-sm">
          <span>V.2.0</span>
          <div className="flex items-center gap-x-3 sm:gap-x-4">
              <Link href="https://www.taodigitalsolutions.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  Privacy Policy
              </Link>
              <span className="select-none">|</span>
              <Link href="https://www.taodigitalsolutions.com/terms-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  Terms of Service
              </Link>
          </div>
          <span className="text-right">
              Copyright© {currentYear !== null ? currentYear : '....'} Tao Digital Solutions Inc. All rights reserved
          </span>
        </footer>
    </div>
  );
}

// It's good practice to define generateMetadata if you want dynamic titles/descriptions
// For client components that use `useParams`, you can't directly export `generateMetadata`
// from the same file. You'd typically have this in a layout.tsx for the segment or handle
// title updates via `useEffect` and `document.title` if simple, or a more complex client-side
// metadata management strategy if needed.
// For now, we'll rely on the RootLayout's default title.
// A more advanced setup might involve a server component wrapper for this page to use generateMetadata.