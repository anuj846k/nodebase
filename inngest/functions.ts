// src/inngest/functions.ts
import { generateText } from 'ai';
import { inngest } from './client';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI();
export const executeAi = inngest.createFunction(
  { id: 'execute-ai', triggers: { event: 'execute/ai' } },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap('gemini-gemini-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'You are a helpful assistant',
      prompt: 'what is the capital of france?',
    });
  },
);
