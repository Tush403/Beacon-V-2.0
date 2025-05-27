
'use server';
/**
 * @fileOverview A conversational AI flow for the Beacon Assistant.
 *
 * - chatbotFlow - Handles the chatbot conversation logic.
 * - ChatbotInput - The input type for the chatbotFlow.
 * - ChatbotOutput - The return type for the chatbotFlow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Simplified message structure for history
const ChatMessageHistoryItemSchema = z.object({
  role: z.enum(['user', 'model']), // 'model' for bot messages
  content: z.string(),
});

const ChatbotInputSchema = z.object({
  userMessage: z.string().describe('The latest message from the user.'),
  history: z.array(ChatMessageHistoryItemSchema).optional().describe('A brief history of the conversation.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  botResponse: z.string().describe('The chatbot\'s response to the user.'),
  // We can add quick replies generation here later if needed
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;


// This is the actual flow function that will be called by the server action
const chatbotGenkitFlow = ai.defineFlow(
  {
    name: 'chatbotGenkitFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    // Construct the prompt with history
    const messages = [];
    if (input.history) {
      input.history.forEach(item => {
        messages.push({ role: item.role, parts: [{ text: item.content }] });
      });
    }
    messages.push({ role: 'user', parts: [{ text: input.userMessage }] });
    
    // System prompt to guide the AI
    const systemInstruction = `You are Beacon Assistant, a friendly, helpful, and knowledgeable AI specializing in test automation tools and the Beacon application.
Your primary goal is to assist users with their queries about finding the right test automation tools, understanding test automation concepts, or navigating the Beacon app.
Be concise and informative. If a user asks a question you cannot answer, politely state that you are still learning or suggest they consult the app's documentation or contact support.
Do not make up information. If you don't know the answer, say so.
Keep responses relatively short and easy to read in a chat interface.
If appropriate, you can suggest users try specific filters in the Beacon app.
Example query: "What's good for UI testing on web?"
Example good response: "For UI testing on the web, Playwright and Cypress are excellent choices. Playwright offers great cross-browser support, while Cypress is known for its fast test execution and debugging tools. You can filter for these in the Beacon app under 'Test Type' and 'Application Under Test'!"
`;

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', // Using a capable model, with provider prefix
        system: systemInstruction,
        messages: messages,
        // Consider adding safety settings if sensitive topics might arise
        // config: {
        //   safetySettings: [
        //     { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        //   ],
        // },
      });

      const responseText = result.text; // Correct for Genkit v1.x
      
      if (!responseText) {
        throw new Error("AI did not return a text response.");
      }
      return { botResponse: responseText };

    } catch (error) {
      console.error("Error in chatbotGenkitFlow:", error);
      // Provide a generic error response if the AI fails
      return { botResponse: "I'm sorry, I encountered an issue and can't respond right now. Please try again later." };
    }
  }
);

// Exported wrapper function
export async function chatbotFlow(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotGenkitFlow(input);
}
