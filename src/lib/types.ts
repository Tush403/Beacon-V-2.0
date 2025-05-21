
import type { GenerateTestTypeSummaryInput as AiTrendSummaryInput } from '@/ai/flows/generate-test-type-summary';

export type ApplicationType = "Web" | "Mobile" | "API" | "Desktop" | "Backend";
export type TestType = "UI Testing" | "API Testing" | "Performance Testing" | "Security Testing" | "Unit Testing" | "E2E Testing";
export type OperatingSystem = "Windows" | "macOS" | "Linux" | "Android" | "iOS" | "Cross-Platform";
export type CodingRequirement = "No-Code" | "Low-Code" | "Scripting" | "AI/ML";
export type CodingLanguage = "JavaScript" | "Python" | "Java" | "C#" | "Ruby" | "Go" | "Swift" | "Kotlin" | "PHP" | "N/A";
export type PricingModel = "Free" | "Freemium" | "Subscription" | "One-time Purchase" | "Open Source";
export type ReportingAnalytics = "Basic" | "Advanced" | "Customizable" | "Integration-friendly" | "Real-time";

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
  roi: number; // percentage, e.g., 85
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

export interface FilterOption<TValue extends string> {
  value: TValue | "";
  label: string;
}

export interface FilterOptions {
  applicationTypes: FilterOption<ApplicationType>[];
  testTypes: FilterOption<TestType>[];
  operatingSystems: FilterOption<OperatingSystem>[];
  codingRequirements: FilterOption<CodingRequirement>[];
  codingLanguages: FilterOption<CodingLanguage>[];
  pricingModels: FilterOption<PricingModel>[];
  reportingAnalytics: FilterOption<ReportingAnalytics>[];
}

export type TrendSummaryInput = AiTrendSummaryInput;

export interface TrendData {
  [key: string]: TrendSummaryInput;
}
