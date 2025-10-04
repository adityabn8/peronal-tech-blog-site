'use server';

import { z } from 'zod';
import {ai} from '../genkit';

const SuggestTitleInputSchema = z.object({content: z.string()});
const SuggestTitleOutputSchema = z.array(z.string());

export const suggestTitleFlow = ai.defineFlow(
  {
    name: 'suggestTitleFlow',
    inputSchema: SuggestTitleInputSchema,
    outputSchema: SuggestTitleOutputSchema,
  },
  async ({content}) => {
    const llmResponse = await ai.generate({
      prompt: `Based on the following blog post content, suggest 5 catchy and SEO-friendly titles.

Content:
${content}`,
      config: {
        temperature: 0.8,
      },
      output: {
        format: 'json',
        schema: z.object({
          titles: z.array(z.string()).length(5, 'You must provide exactly 5 titles.'),
        }),
      },
    });

    const result = llmResponse.output();
    if (!result || !result.titles) {
      return [];
    }
    return result.titles;
  }
);
