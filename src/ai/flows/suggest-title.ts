import { defineFlow } from 'genkit';
import { z } from 'zod';
import { ai } from '../genkit';

export const suggestTitleFlow = defineFlow(
  {
    name: 'suggestTitleFlow',
    inputSchema: z.object({ content: z.string() }),
    outputSchema: z.array(z.string()),
  },
  async ({ content }) => {
    const llmResponse = await ai.generate({
      prompt: `Based on the following blog post content, suggest 5 catchy and SEO-friendly titles. Return them as a JSON array of strings, like ["Title 1", "Title 2", ...].

Content:
${content}`,
      config: {
        temperature: 0.8,
      },
      format: 'json',
      output: {
          schema: z.object({
              titles: z.array(z.string()).length(5, "You must provide exactly 5 titles."),
          })
      }
    });

    const result = llmResponse.output();
    if (!result || !result.titles) {
        return [];
    }
    return result.titles;
  }
);
