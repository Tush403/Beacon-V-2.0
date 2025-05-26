
"use server";

import { generateTestTypeSummary as generateSummaryFlow } from '@/ai/flows/generate-test-type-summary';
import type { GenerateTestTypeSummaryInput, GenerateTestTypeSummaryOutput } from '@/ai/flows/generate-test-type-summary';

import { estimateEffortFlow as estimateEffortGenkitFlow } from '@/ai/flows/estimate-effort-flow';
import type { EstimateEffortInput, EstimateEffortOutput } from '@/ai/flows/estimate-effort-flow';

import { chatbotFlow as beaconChatbotFlow } from '@/ai/flows/chatbot-flow';
import type { ChatbotFlowInput, ChatbotFlowOutput } from '@/ai/flows/chatbot-flow';


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

export async function askBeaconAssistant(input: ChatbotFlowInput): Promise<ChatbotFlowOutput | { error: string }> {
  try {
    if (!input.currentUserInput.trim()) {
      return { error: "Message cannot be empty." };
    }
    const result = await beaconChatbotFlow(input);
    return result;
  } catch (error: any) {
    console.error("Error asking Beacon Assistant:", error);
     if (error.issues && Array.isArray(error.issues)) {
      const messages = error.issues.map((issue: any) => `${issue.path.join('.')} - ${issue.message}`).join('; ');
      return { error: `Invalid input for chatbot: ${messages}` };
    }
    return { error: error.message || "Failed to get a response from the assistant. Please try again." };
  }
}
