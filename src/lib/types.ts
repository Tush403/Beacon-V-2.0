
import type { GenerateTestTypeSummaryInput as AiTrendSummaryInput } from '@/ai/flows/generate-test-type-summary';
import type { ElementType } from 'react';

export type ApplicationType = "__ALL__"|"Web" | "Mobile" | "API" | "Desktop" | "Backend";
export type TestType = "__ALL__"|"UI Testing" | "API Testing" | "Performance Testing" | "Security Testing" | "Unit Testing" | "DB Testing";
export type OperatingSystem = "Windows" | "macOS" | "Linux" | "Android" | "iOS" | "Cross-Platform"| "__ALL__";
export type CodingRequirement = "__ALL__"|"No-Code" | "Low-Code" | "Scripting" | "AI/ML";
export type CodingLanguage = "__ALL__"|"JavaScript" | "Python" | "Java" | "C#" | "Ruby" | "Go" | "Swift" | "Kotlin" | "PHP" | "VBScript"| "JScript" | "DelphiScript" | "VB.NET"| "C" | "N/A";
export type PricingModel = "__ALL__"|"Free" | "Freemium" | "Subscription" | "One-time Purchase" | "Open Source";
export type ReportingAnalytics = "__ALL__"|"Basic" | "Advanced" | "Customizable" | "Integration-friendly" | "Real-time";

export interface RoiTimePoint {
  month: number;
  roi: number;
}

export interface Tool {
  id: string;
  name: string;
  score: number;
  logoUrl?: string;
  dataAiHint?: string;
  applicationTypes: ApplicationType[];
  testTypes: TestType[];
  operatingSystems: OperatingSystem[];
  codingRequirements: CodingRequirement[];
  codingLanguages: CodingLanguage[];
  pricingModels: PricingModel[];
  reportingAnalytics: ReportingAnalytics[];

  strengths: string[];
  weaknesses: string[];
  pdfLink: string;
  websiteUrl: string;

  roiProjection: RoiTimePoint[];

  initialSetupTime: string;
  maintenanceOverhead: string;
  testCreationSpeed: string;
  scriptReusability: string;
  parallelExecutionSupport: string;
  testCaseCreationEffort: string;
  skillRequirement: string;
  overallAutomationCoverage: string;
  totalCostOfOwnership: string;
}

export interface Filters {
  applicationType: ApplicationType |"";
  testType: TestType |"";
  operatingSystem: OperatingSystem |"";
  codingRequirement: CodingRequirement |"";
  codingLanguage: CodingLanguage |"";
  pricingModel: PricingModel |"";
  reportingAnalytics: ReportingAnalytics |"";
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOptions {
  applicationTypes: FilterOption[];
  testTypes: FilterOption[];
  operatingSystems: FilterOption[];
  codingRequirements: FilterOption[];
  codingLanguages: FilterOption[];
  pricingModels: FilterOption[];
  reportingAnalytics: FilterOption[];
}

export type TrendSummaryInput = AiTrendSummaryInput;

export interface TrendData {
  [key: string]: TrendSummaryInput;
}

export interface EstimatorInputValues {
  complexityLow: number;
  complexityMedium: number;
  complexityHigh: number;
  complexityHighlyComplex: number;
  usesFramework: boolean;
  usesCiCd: boolean;
  teamSize: number;
}

export interface EffortEstimationOutput {
  estimatedPersonDays: number;
  explanation: string;
}

export interface ComparisonParameter {
  key: keyof Tool;
  label: string;
}

// ChatMessage type for feedback bot
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  quickReplies?: never; // Quick replies are not used for the feedback bot
  avatarIcon?: ElementType;
  senderName?: string;
  isError?: boolean;
}

// Input for the feedback submission action
export interface SubmitFeedbackInput {
  message: string;
}

// Output for the feedback submission action
export interface SubmitFeedbackOutput {
  success: boolean;
  error?: string;
}
