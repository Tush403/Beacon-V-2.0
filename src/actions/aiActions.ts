
"use server";

import { generateTestTypeSummary as generateSummaryFlow } from '@/ai/flows/generate-test-type-summary';
import type { GenerateTestTypeSummaryInput, GenerateTestTypeSummaryOutput } from '@/ai/flows/generate-test-type-summary';

import { estimateEffortFlow as estimateEffortGenkitFlow } from '@/ai/flows/estimate-effort-flow';
import type { EstimateEffortInput, EstimateEffortOutput } from '@/ai/flows/estimate-effort-flow';


export async function generateTestTypeSummary(input: GenerateTestTypeSummaryInput): Promise<GenerateTestTypeSummaryOutput | { error: string }> {
  try {
    const result = await generateSummaryFlow(input);
    return result;
  } catch (error) {
    console.error("Error generating test type summary:", error);
    return { error: "Failed to generate summary. Please try again." };
  }
}

export async function estimateEffort(input: EstimateEffortInput): Promise<EstimateEffortOutput | { error: string }> {
  try {
    // Basic validation, though Zod schema in flow should also catch this
    if (input.teamSize <= 0) {
      return { error: "Team size must be greater than 0." };
    }
    const totalTestCases = input.complexityLow + input.complexityMedium + input.complexityHigh + input.complexityHighlyComplex;
    if (totalTestCases === 0 && !input.usesFramework && !input.usesCiCd) {
       // Optionally handle cases with no work specified to avoid unnecessary AI calls
      // return { estimatedPersonDays: 0, explanation: "No test cases or setup work specified." };
    }

    const result = await estimateEffortGenkitFlow(input);
    return result;
  } catch (error: any) {
    console.error("Error estimating effort:", error);
    // Check if the error is a Zod validation error and format it
    if (error.issues && Array.isArray(error.issues)) {
      const messages = error.issues.map((issue: any) => `${issue.path.join('.')} - ${issue.message}`).join('; ');
      return { error: `Invalid input: ${messages}` };
    }
    return { error: error.message || "Failed to estimate effort. Please try again." };
  }
}
