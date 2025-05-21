
import type { GenerateTestTypeSummaryInput as AiTrendSummaryInput } from '@/ai/flows/generate-test-type-summary';

export type ApplicationType = "Web" | "Mobile" | "API" | "Desktop" | "Backend";
export type TestType = "UI Testing" | "API Testing" | "Performance Testing" | "Security Testing" | "Unit Testing" | "E2E Testing";
export type OperatingSystem = "Windows" | "macOS" | "Linux" | "Android" | "iOS" | "Cross-Platform";
export type CodingRequirement = "No-Code" | "Low-Code" | "Scripting" | "AI/ML";
export type CodingLanguage = "JavaScript" | "Python" | "Java" | "C#" | "Ruby" | "Go" | "Swift" | "Kotlin" | "PHP" | "N/A";
export type PricingModel = "Free" | "Freemium" | "Subscription" | "One-time Purchase" | "Open Source";
export type ReportingAnalytics = "Basic" | "Advanced" | "Customizable" | "Integration-friendly" | "Real-time";

export interface RoiTimePoint {
  month: number; // Representing the period, e.g., 1 for Month 1
  roi: number;   // The ROI value for that period
}

export interface Tool {
  id: string;
  name: string;
  score: number; // e.g., 8.9
  logoUrl?: string; // URL for the tool's logo
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
  roiProjection: RoiTimePoint[]; // Changed from single roi to an array of time points
}

export interface Filters {
  applicationType: ApplicationType | "";
  testType: TestType | "";
  operatingSystem: OperatingSystem | "";
  codingRequirement: CodingRequirement | "";
  codingLanguage: CodingLanguage | "";
  pricingModel: PricingModel | "";
  reportingAnalytics: ReportingAnalytics | "";
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
