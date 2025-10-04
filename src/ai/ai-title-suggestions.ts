'use server';

/**
 * @fileOverview Provides AI-powered title suggestions for blog posts.
 *
 * - generateTitleSuggestions - A function that generates title suggestions based on blog post content.
 * - TitleSuggestionsInput - The input type for the generateTitleSuggestions function.
 * - TitleSuggestionsOutput - The return type for the generateTitleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TitleSuggestionsInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post for which to generate title suggestions.'),
});
export type TitleSuggestionsInput = z.infer<typeof TitleSuggestionsInputSchema>;

const TitleSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested titles for the blog post.'),
});
export type TitleSuggestionsOutput = z.infer<typeof TitleSuggestionsOutputSchema>;

export async function generateTitleSuggestions(
  input: TitleSuggestionsInput
): Promise<TitleSuggestionsOutput> {
  return titleSuggestionsFlow(input);
}

const titleSuggestionsPrompt = ai.definePrompt({
  name: 'titleSuggestionsPrompt',
  input: {schema: TitleSuggestionsInputSchema},
  output: {schema: TitleSuggestionsOutputSchema},
  prompt: `You are an expert blog title generator. Given the content of a blog post, you will generate a list of catchy and effective titles.

Blog Post Content: {{{blogPostContent}}}

Please provide 5 title suggestions for the above blog post content.`,
});

const titleSuggestionsFlow = ai.defineFlow(
  {
    name: 'titleSuggestionsFlow',
    inputSchema: TitleSuggestionsInputSchema,
    outputSchema: TitleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await titleSuggestionsPrompt(input);
    return output!;
  }
);
