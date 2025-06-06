
'use server';
/**
 * @fileOverview Estimates project effort based on complexity, team size, technical factors, and selected automation tool.
 *
 * - estimateEffortFlow - A function that handles the effort estimation.
 * - EstimateEffortInput - The input type for the estimateEffortFlow function.
 * - EstimateEffortOutput - The return type for the estimateEffortFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { EstimatorInputValues as EstimateEffortInputType, EffortEstimationOutput as EstimateEffortOutputType } from '@/lib/types';

// Define Zod schema for input, matching EstimatorInputValues
const EstimateEffortInputSchema = z.object({
  complexityLow: z.number().min(0).describe('Number of low complexity test cases.'),
  complexityMedium: z.number().min(0).describe('Number of medium complexity test cases.'),
  complexityHigh: z.number().min(0).describe('Number of high complexity test cases.'),
  complexityHighlyComplex: z.number().min(0).describe('Number of highly complex test cases.'),
  usesFramework: z.boolean().describe('Whether a standard test automation framework is being used (e.g., Selenium, Playwright, Cypress).'),
  usesCiCd: z.boolean().describe('Whether a CI/CD pipeline is integrated for automated testing.'),
  teamSize: z.number().min(1).describe('Number of QA engineers dedicated to test automation.'),
  automationToolName: z.string().describe('The name of the primary automation tool planned for the project. Empty if no specific tool is selected yet.'),
});
export type EstimateEffortInput = z.infer<typeof EstimateEffortInputSchema>;

// Define Zod schema for output, matching EffortEstimationOutput
const EstimateEffortOutputSchema = z.object({
  estimatedPersonDays: z.number().describe('The total estimated effort in person-days.'),
  explanation: z.string().describe('A brief explanation of how the estimate was derived, considering the inputs.'),
});
export type EstimateEffortOutput = z.infer<typeof EstimateEffortOutputSchema>;


// This is the actual flow function that will be called by the server action
const estimateEffortGenkitFlow = ai.defineFlow(
  {
    name: 'estimateEffortGenkitFlow',
    inputSchema: EstimateEffortInputSchema,
    outputSchema: EstimateEffortOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
        name: 'estimateEffortPrompt',
        input: { schema: EstimateEffortInputSchema },
        output: { schema: EstimateEffortOutputSchema },
        prompt: `You are an expert Test Automation Lead. Your task is to estimate the effort required for a test automation project based on the provided parameters.
Provide the total estimated effort in person-days and a brief explanation.

Consider these factors:
- Number of test cases by complexity:
  - Low: {{complexityLow}}
  - Medium: {{complexityMedium}}
  - High: {{complexityHigh}}
  - Highly Complex: {{complexityHighlyComplex}}
- Is a standard test automation framework (e.g., Selenium, Playwright, Cypress) being used? {{#if usesFramework}}Yes{{else}}No{{/if}}
- Is a CI/CD pipeline integrated for automated testing? {{#if usesCiCd}}Yes{{else}}No{{/if}}
- QA Team Size (dedicated to automation): {{teamSize}} engineers
- Primary Automation Tool: {{#if automationToolName}}{{automationToolName}}{{else}}Not specified{{/if}}

Base your estimation on common industry heuristics. For example:
- Low complexity: 0.25-0.5 person-days per test case
- Medium complexity: 0.5-1 person-day per test case
- High complexity: 1-2 person-days per test case
- Highly Complex: 2-4 person-days per test case
- Using a framework generally speeds up development and maintenance.
- Not using a framework might increase initial setup and scripting time.
- CI/CD integration adds some initial setup effort but improves long-term efficiency.
- Team size influences overall timeline but the primary output should be total person-days of effort.
- The choice of automation tool ({{#if automationToolName}}{{automationToolName}}{{else}}if not specified{{/if}}) can also influence effort. For instance, a mature and widely-adopted tool might offer more readily available resources and pre-built functionalities, potentially reducing effort compared to a newer or less common tool. If 'Not specified', provide a general estimate.

Calculate the total estimated person-days.
Provide a concise explanation for your estimate, mentioning how the key factors influenced it.
Be realistic. If total test cases are zero, estimate should be minimal (e.g., for setup).
Ensure teamSize is positive; if not, this prompt should ideally not be called, but acknowledge if it's an invalid input for context.
The team size is primarily for context on how the effort might be distributed over time, but the core request is for total person-days.
Focus on providing a numerical estimate for 'estimatedPersonDays' and a textual 'explanation'.`,
      });

    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to get a response from the AI for effort estimation.");
    }
    return output;
  }
);

// Exported wrapper function
export async function estimateEffortFlow(input: EstimateEffortInputType): Promise<EstimateEffortOutputType> {
  // Zod validation, including teamSize constraint and automationToolName, is handled by estimateEffortGenkitFlow
  return estimateEffortGenkitFlow(input);
}
