
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-test-type-summary.ts';
import '@/ai/flows/estimate-effort-flow.ts';
import '@/ai/flows/chatbot-flow.ts'; // Register the new chatbot flow
