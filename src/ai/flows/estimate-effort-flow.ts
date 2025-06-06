
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

Base your estimation on the type of tool and common industry heuristics.

IF the 'automationToolName' is one of the AI-Powered/Low-Code tools known for significantly reducing manual scripting effort (e.g., "Functionize", "Testim", "Mabl", "ACCELQ", "TestCraft", "ZapTest", "Maestro"), apply the following significantly REDUCED effort multipliers per test case:
- Low complexity (AI/Low-Code Tool): 0.05 - 0.15 person-days (target around 0.1 for tools like Functionize)
- Medium complexity (AI/Low-Code Tool): 0.1 - 0.25 person-days (target around 0.175 for tools like Functionize)
- High complexity (AI/Low-Code Tool): 0.2 - 0.4 person-days (target around 0.3 for tools like Functionize)
- Highly Complex (AI/Low-Code Tool): 0.3 - 0.6 person-days (target around 0.45 for tools like Functionize)
For these tools, the use of a framework might be inherent or less impactful on the base effort, but CI/CD integration still adds value.

ELSE (for traditional scripting tools like Selenium, Playwright, Cypress when used with significant custom scripting, or if no specific tool is selected, or if the tool is not in the AI/Low-Code list above), use the following STANDARD effort multipliers per test case:
- Low complexity (Standard Tool): 0.25-0.5 person-days
- Medium complexity (Standard Tool): 0.5-1 person-day
- High complexity (Standard Tool): 1-2 person-days
- Highly Complex (Standard Tool): 2-4 person-days
For these tools, using a framework generally speeds up development and maintenance, while not using one might increase initial setup and scripting time.

General Considerations for all tools:
- CI/CD integration adds some initial setup effort but improves long-term efficiency (this might be a small fixed addition or slightly influence the per-test-case effort if not already factored in by the tool's nature).
- Team size influences overall timeline but the primary output should be total person-days of effort.

IMPORTANT CALIBRATION NOTE:
A user has provided a real-world example:
- Low Complexity TCs: ~159
- Medium Complexity TCs: ~322
- High Complexity TCs: ~145
- Highly Complex TCs: ~45
- Automation Tool: "Functionize"
- Uses Standard Framework: Yes
- Uses CI/CD: Yes
- Team Size: 8 engineers
This configuration resulted in an estimated 90 person-days.
Use this information as a STRONG CALIBRATION POINT. When "Functionize" (or similarly advanced AI-powered tools) is selected with comparable test case counts and supporting factors (framework, CI/CD), your total estimated person-days should be in the vicinity of 90 person-days. Adjust your weighting of factors to align with this benchmark for such tools.

Calculate the total estimated person-days.
Provide a concise explanation for your estimate, mentioning how the key factors (especially the tool type and the calibration note if applicable) influenced it.
Be realistic. If total test cases are zero, estimate should be minimal (e.g., for setup).
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


    