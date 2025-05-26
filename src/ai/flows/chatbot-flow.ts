
'use server';
/**
 * @fileOverview A conversational AI flow for the Beacon Assistant chatbot.
 *
 * - chatbotFlow - A function that handles generating responses for the chatbot.
 * - ChatbotFlowInput - The input type for the chatbotFlow function.
 * - ChatbotFlowOutput - The return type for the chatbotFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  sender: z.enum(['user', 'bot']),
  text: z.string(),
});

const ChatbotFlowInputSchema = z.object({
  currentUserInput: z.string().describe("The user's most recent message."),
  history: z.array(ChatMessageSchema).optional().describe("The conversation history up to this point, with older messages first."),
});
export type ChatbotFlowInput = z.infer<typeof ChatbotFlowInputSchema>;

const ChatbotFlowOutputSchema = z.object({
  responseText: z.string().describe("The bot's response to the user."),
});
export type ChatbotFlowOutput = z.infer<typeof ChatbotFlowOutputSchema>;

// Exported wrapper function
export async function chatbotFlow(input: ChatbotFlowInput): Promise<ChatbotFlowOutput> {
  return internalChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotFlowInputSchema },
  output: { schema: ChatbotFlowOutputSchema },
  prompt: `You are Beacon Assistant, a friendly and highly knowledgeable AI specializing in test automation tools and software quality assurance.
Your goal is to assist users with their questions about test automation, help them understand different tools, and guide them in using the Beacon application (which is a tool picker for test automation).

Keep your responses concise, helpful, and conversational.
If the user asks a general question about test automation, provide an accurate and informative answer.
If the user asks about a specific tool, share what you know (you can draw upon general knowledge about popular tools like Selenium, Playwright, Cypress, Postman, JMeter, Katalon, Appium, Testim, Functionize etc.).
If the user asks about the Beacon app itself, explain its features (tool filtering, comparison, ROI projection, effort estimation) and how it can help them find the best test automation tools.
If you don't know the answer, it's okay to say so politely. Avoid making up information.
Do not offer financial, legal, or medical advice.
Keep your answers relatively short and to the point.

Conversation History (if any):
{{#if history}}
{{#each history}}
{{this.sender}}: {{this.text}}
{{/each}}
{{else}}
No previous conversation history.
{{/if}}

User's current message: {{{currentUserInput}}}

Your response:`,
});

const internalChatbotFlow = ai.defineFlow(
  {
    name: 'internalChatbotFlow',
    inputSchema: ChatbotFlowInputSchema,
    outputSchema: ChatbotFlowOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to get a response from the AI for chatbot.");
    }
    return output;
  }
);
