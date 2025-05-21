'use server';
/**
 * @fileOverview Generates a summary insight for a given test type, selecting the most relevant information.
 *
 * - generateTestTypeSummary - A function that generates the test type summary.
 * - GenerateTestTypeSummaryInput - The input type for the generateTestTypeSummary function.
 * - GenerateTestTypeSummaryOutput - The return type for the generateTestTypeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestTypeSummaryInputSchema = z.object({
  testType: z.string().describe('The type of testing (e.g., UI Testing, API Testing, Performance Testing).'),
  mostWidelyUsedTool: z.string().describe('The most widely used tool for the test type.'),
  trendingTool: z.string().describe('The trending tool for the test type.'),
  topRatedTool: z.string().describe('The top-rated tool for the test type.'),
  aiPoweredTool: z.string().describe('The AI-powered tool for the test type.'),
  enterpriseReadyTool: z.string().describe('The enterprise-ready tool for the test type.'),
});
export type GenerateTestTypeSummaryInput = z.infer<typeof GenerateTestTypeSummaryInputSchema>;

const GenerateTestTypeSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary insight for the specified test type, combining the tool information.'),
});
export type GenerateTestTypeSummaryOutput = z.infer<typeof GenerateTestTypeSummaryOutputSchema>;

export async function generateTestTypeSummary(input: GenerateTestTypeSummaryInput): Promise<GenerateTestTypeSummaryOutput> {
  return generateTestTypeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestTypeSummaryPrompt',
  input: {schema: GenerateTestTypeSummaryInputSchema},
  output: {schema: GenerateTestTypeSummaryOutputSchema},
  prompt: `Given the following information about tools for the {{testType}} test type, generate a concise and informative summary insight. Focus on highlighting the most relevant tool or trend for a user trying to select an automation tool.

Most Widely Used Tool: {{mostWidelyUsedTool}}
Trending Tool: {{trendingTool}}
Top Rated Tool: {{topRatedTool}}
AI-Powered Tool: {{aiPoweredTool}}
Enterprise-Ready Tool: {{enterpriseReadyTool}}`,
});

const generateTestTypeSummaryFlow = ai.defineFlow(
  {
    name: 'generateTestTypeSummaryFlow',
    inputSchema: GenerateTestTypeSummaryInputSchema,
    outputSchema: GenerateTestTypeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
