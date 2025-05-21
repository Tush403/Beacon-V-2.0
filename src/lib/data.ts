
import type { Tool, FilterOptions, TrendData, ApplicationType, TestType, OperatingSystem, CodingRequirement, CodingLanguage, PricingModel, ReportingAnalytics } from './types';

export const ALL_APPLICATION_TYPES: ApplicationType[] = ["Web", "Mobile", "API", "Desktop", "Backend"];
export const ALL_TEST_TYPES: TestType[] = ["UI Testing", "API Testing", "Performance Testing", "Security Testing", "Unit Testing", "E2E Testing"];
export const ALL_OPERATING_SYSTEMS: OperatingSystem[] = ["Windows", "macOS", "Linux", "Android", "iOS", "Cross-Platform"];
export const ALL_CODING_REQUIREMENTS: CodingRequirement[] = ["No-Code", "Low-Code", "Scripting", "AI/ML"];
export const ALL_CODING_LANGUAGES: CodingLanguage[] = ["JavaScript", "Python", "Java", "C#", "Ruby", "Go", "Swift", "Kotlin", "PHP", "N/A"];
export const ALL_PRICING_MODELS: PricingModel[] = ["Free", "Freemium", "Subscription", "One-time Purchase", "Open Source"];
export const ALL_REPORTING_ANALYTICS: ReportingAnalytics[] = ["Basic", "Advanced", "Customizable", "Integration-friendly", "Real-time"];


export const filterOptionsData: FilterOptions = {
  applicationTypes: [{ value: "", label: "All Applications" }, ...ALL_APPLICATION_TYPES.map(val => ({ value: val, label: val }))],
  testTypes: [{ value: "", label: "All Test Types" }, ...ALL_TEST_TYPES.map(val => ({ value: val, label: val }))],
  operatingSystems: [{ value: "", label: "All OS" }, ...ALL_OPERATING_SYSTEMS.map(val => ({ value: val, label: val }))],
  codingRequirements: [{ value: "", label: "Any Requirement" }, ...ALL_CODING_REQUIREMENTS.map(val => ({ value: val, label: val }))],
  codingLanguages: [{ value: "", label: "Any Language" }, ...ALL_CODING_LANGUAGES.map(val => ({ value: val, label: val }))],
  pricingModels: [{ value: "", label: "Any Model" }, ...ALL_PRICING_MODELS.map(val => ({ value: val, label: val }))],
  reportingAnalytics: [{ value: "", label: "Any Analytics" }, ...ALL_REPORTING_ANALYTICS.map(val => ({ value: val, label: val }))],
};

export const mockToolsData: Tool[] = [
  {
    id: "1",
    name: "Selenium",
    score: 8.7,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Web"],
    testTypes: ["UI Testing", "E2E Testing"],
    operatingSystems: ["Windows", "macOS", "Linux", "Cross-Platform"],
    codingRequirements: ["Scripting"],
    codingLanguages: ["Java", "Python", "C#", "Ruby", "JavaScript"],
    pricingModels: ["Open Source"],
    reportingAnalytics: ["Basic", "Integration-friendly"],
    strengths: ["Highly flexible and extensible", "Large community support", "Supports multiple languages"],
    weaknesses: ["Steep learning curve", "Requires coding knowledge", "Setup can be complex"],
    pdfLink: "/pdfs/selenium-guide.pdf",
    roi: 75,
  },
  {
    id: "2",
    name: "Playwright",
    score: 9.2,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Web"],
    testTypes: ["UI Testing", "API Testing", "E2E Testing"],
    operatingSystems: ["Windows", "macOS", "Linux", "Cross-Platform"],
    codingRequirements: ["Scripting"],
    codingLanguages: ["JavaScript", "Python", "Java", "C#"],
    pricingModels: ["Open Source"],
    reportingAnalytics: ["Advanced", "Integration-friendly"],
    strengths: ["Modern architecture", "Auto-waits and rich selectors", "Cross-browser and cross-language"],
    weaknesses: ["Younger community than Selenium", "Can be resource-intensive"],
    pdfLink: "/pdfs/playwright-guide.pdf",
    roi: 88,
  },
  {
    id: "3",
    name: "Cypress",
    score: 9.0,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Web"],
    testTypes: ["UI Testing", "E2E Testing"],
    operatingSystems: ["Windows", "macOS", "Linux"],
    codingRequirements: ["Scripting"],
    codingLanguages: ["JavaScript"],
    pricingModels: ["Open Source", "Subscription"], // Core is open source, dashboard is subscription
    reportingAnalytics: ["Advanced", "Real-time"],
    strengths: ["Fast and reliable test execution", "Excellent debugging tools", "Easy to set up"],
    weaknesses: ["Only supports JavaScript", "Limited cross-origin support in some cases"],
    pdfLink: "/pdfs/cypress-guide.pdf",
    roi: 85,
  },
  {
    id: "4",
    name: "Testim",
    score: 8.5,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Web"],
    testTypes: ["UI Testing", "E2E Testing"],
    operatingSystems: ["Cross-Platform"],
    codingRequirements: ["AI/ML", "Low-Code"],
    codingLanguages: ["JavaScript", "N/A"],
    pricingModels: ["Subscription"],
    reportingAnalytics: ["Advanced", "Customizable"],
    strengths: ["AI-powered locators for stability", "Fast authoring with record & playback", "Good for agile teams"],
    weaknesses: ["Can be expensive for large teams", "Some advanced scenarios may still require code"],
    pdfLink: "/pdfs/testim-guide.pdf",
    roi: 92,
  },
  {
    id: "5",
    name: "Postman",
    score: 9.1,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["API"],
    testTypes: ["API Testing"],
    operatingSystems: ["Windows", "macOS", "Linux", "Cross-Platform"],
    codingRequirements: ["Low-Code", "Scripting"],
    codingLanguages: ["JavaScript", "N/A"],
    pricingModels: ["Freemium", "Subscription"],
    reportingAnalytics: ["Advanced", "Integration-friendly"],
    strengths: ["User-friendly interface for API development and testing", "Collaboration features", "Extensive integrations"],
    weaknesses: ["Performance testing capabilities are basic", "Can become slow with large collections"],
    pdfLink: "/pdfs/postman-guide.pdf",
    roi: 80,
  },
  {
    id: "6",
    name: "JMeter",
    score: 8.3,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Web", "API", "Backend"],
    testTypes: ["Performance Testing"],
    operatingSystems: ["Windows", "macOS", "Linux", "Cross-Platform"],
    codingRequirements: ["Scripting", "Low-Code"],
    codingLanguages: ["Java", "N/A"], // Plugins can be Java, scripts can be Groovy
    pricingModels: ["Open Source"],
    reportingAnalytics: ["Advanced", "Customizable"],
    strengths: ["Powerful and versatile for load testing", "Supports various protocols", "Extensible with plugins"],
    weaknesses: ["UI can be intimidating for beginners", "Requires significant resources for large tests"],
    pdfLink: "/pdfs/jmeter-guide.pdf",
    roi: 70,
  },
  {
    id: "7",
    name: "Katalon Studio",
    score: 8.6,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Web", "Mobile", "API", "Desktop"],
    testTypes: ["UI Testing", "API Testing", "E2E Testing"],
    operatingSystems: ["Windows", "macOS", "Linux"],
    codingRequirements: ["Low-Code", "Scripting"],
    codingLanguages: ["Groovy", "Java"],
    pricingModels: ["Freemium", "Subscription"],
    reportingAnalytics: ["Advanced", "Integration-friendly"],
    strengths: ["Comprehensive feature set", "Supports multiple application types", "Good for beginners and experienced testers"],
    weaknesses: ["Can be slower than some specialized tools", "Enterprise features are paid"],
    pdfLink: "/pdfs/katalon-guide.pdf",
    roi: 78,
  },
   {
    id: "8",
    name: "Appium",
    score: 8.8,
    logoUrl: "https://placehold.co/40x40.png",
    applicationTypes: ["Mobile"],
    testTypes: ["UI Testing", "E2E Testing"],
    operatingSystems: ["Android", "iOS", "Cross-Platform"],
    codingRequirements: ["Scripting"],
    codingLanguages: ["Java", "Python", "JavaScript", "Ruby", "C#"],
    pricingModels: ["Open Source"],
    reportingAnalytics: ["Basic", "Integration-friendly"],
    strengths: ["Cross-platform mobile testing", "Supports native, hybrid, and mobile web apps", "Large community"],
    weaknesses: ["Setup can be challenging", "Execution speed can vary"],
    pdfLink: "/pdfs/appium-guide.pdf",
    roi: 82,
  },
];

export const trendDataPerTestType: TrendData = {
  "UI Testing": {
    testType: "UI Testing",
    mostWidelyUsedTool: "Selenium",
    trendingTool: "Playwright",
    topRatedTool: "Cypress",
    aiPoweredTool: "Testim",
    enterpriseReadyTool: "Katalon Studio",
  },
  "API Testing": {
    testType: "API Testing",
    mostWidelyUsedTool: "Postman",
    trendingTool: "Playwright", // Playwright also has API testing capabilities
    topRatedTool: "Rest Assured", // Example, assuming this tool is top-rated
    aiPoweredTool: "APIsec", // Example AI tool for API security testing
    enterpriseReadyTool: "SoapUI Pro", // Example enterprise tool
  },
  "Performance Testing": {
    testType: "Performance Testing",
    mostWidelyUsedTool: "JMeter",
    trendingTool: "k6",
    topRatedTool: "LoadRunner",
    aiPoweredTool: "Neoload", // Neoload has AI features
    enterpriseReadyTool: "LoadRunner",
  },
  // Add more test types as needed
  "Default": { // Fallback if specific test type not found
    testType: "General Testing",
    mostWidelyUsedTool: "Selenium",
    trendingTool: "Playwright",
    topRatedTool: "Cypress",
    aiPoweredTool: "Testim",
    enterpriseReadyTool: "Katalon Studio",
  }
};
