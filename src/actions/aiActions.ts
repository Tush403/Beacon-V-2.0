
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
    // The Genkit flow (estimateEffortGenkitFlow) includes Zod validation.
    // If input.teamSize <= 0 (or other Zod validation fails), the flow itself will throw an error.
    const result = await estimateEffortGenkitFlow(input);
    return result;
  } catch (error: any) {
    console.error("Error estimating effort:", error);
    // Provide a generic error message. Zod errors from the flow will be caught here.
    // e.g., error.message could be "Input validation failed: teamSize: Number must be greater than 0"
    return { error: error.message || "Failed to estimate effort. Please try again." };
  }
}
