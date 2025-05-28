
"use server";

import { generateTestTypeSummary as generateSummaryFlow } from '@/ai/flows/generate-test-type-summary';
import type { GenerateTestTypeSummaryInput, GenerateTestTypeSummaryOutput } from '@/ai/flows/generate-test-type-summary';

import { estimateEffortFlow as estimateEffortGenkitFlow } from '@/ai/flows/estimate-effort-flow';
import type { EstimateEffortInput, EstimateEffortOutput } from '@/ai/flows/estimate-effort-flow';

// Chatbot flow and types are removed as it's being replaced by a feedback bot

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
    if (input.teamSize <= 0) {
      return { error: "Team size must be greater than 0." };
    }
    const result = await estimateEffortGenkitFlow(input);
    return result;
  } catch (error: any) {
    console.error("Error estimating effort:", error);
    if (error.issues && Array.isArray(error.issues)) {
      const messages = error.issues.map((issue: any) => `${issue.path.join('.')} - ${issue.message}`).join('; ');
      return { error: `Invalid input: ${messages}` };
    }
    return { error: error.message || "Failed to estimate effort. Please try again." };
  }
}

// askBeaconAssistant function is removed
