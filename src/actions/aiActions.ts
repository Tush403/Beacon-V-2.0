
"use server";

import { generateTestTypeSummary as generateSummaryFlow } from '@/ai/flows/generate-test-type-summary';
import type { GenerateTestTypeSummaryInput, GenerateTestTypeSummaryOutput } from '@/ai/flows/generate-test-type-summary';

import { estimateEffortFlow as estimateEffortGenkitFlow } from '@/ai/flows/estimate-effort-flow';
import type { EstimateEffortInput, EstimateEffortOutput } from '@/ai/flows/estimate-effort-flow';
import { z } from 'zod';
import type { SubmitFeedbackInput, SubmitFeedbackOutput } from '@/lib/types';

import fs from 'fs/promises';
import path from 'path';

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

const FeedbackSchema = z.object({
  message: z.string().min(1, "Feedback message cannot be empty.").max(250, "Feedback message cannot exceed 250 characters."),
});

const FEEDBACK_DIR = path.join(process.cwd(), 'data');
const FEEDBACK_FILE_PATH = path.join(FEEDBACK_DIR, 'feedback_log.jsonl');

async function ensureFeedbackLogExists() {
  try {
    await fs.mkdir(FEEDBACK_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create feedback directory:", error);
    // We can still proceed, appendFile will create the file if dir exists
  }
}

export async function submitFeedback(input: SubmitFeedbackInput): Promise<SubmitFeedbackOutput> {
  try {
    FeedbackSchema.parse(input); // Validate input

    const feedbackText = input.message;
    const recipientEmail = "tushardshinde21@gmail.com"; // Intended recipient
    const subject = "Beacon App Feedback";

    // --- Console Logging (as before) ---
    console.log("--- FEEDBACK SUBMISSION (MOCK EMAIL) ---");
    console.log(`Intended Recipient: ${recipientEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${feedbackText}`);
    console.log("---------------------------------------");
    console.log("NOTE: This is a mock email logging. To send actual emails, integrate an email service in this Server Action.");
    console.log("DEVELOPMENT NOTE: Feedback is also being logged to data/feedback_log.jsonl");

    // --- Append to Local File (for easier dev access) ---
    // IMPORTANT: This file-based logging is for development/local use ONLY.
    // It's not suitable for production environments.
    await ensureFeedbackLogExists();
    const feedbackEntry = {
      timestamp: new Date().toISOString(),
      message: feedbackText,
      intendedRecipient: recipientEmail,
      subject: subject
    };
    try {
      await fs.appendFile(FEEDBACK_FILE_PATH, JSON.stringify(feedbackEntry) + '\n');
    } catch (fileError) {
      console.error("Failed to write feedback to local file:", fileError);
      // Don't fail the whole operation for this, but log the error.
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
  } catch (error: any) {
    console.error("Error in submitFeedback action:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(' ') };
    }
    return { success: false, error: "Failed to submit feedback. Please try again." };
  }
}
