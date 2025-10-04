'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { createPost, updatePost, suggestTitleAction } from '@/lib/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { BlogPost } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Lightbulb, Loader2, Save } from 'lucide-react';
import { useState } from 'react';

const PostSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
});

type PostFormData = z.infer<typeof PostSchema>;

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="mr-2 h-4 w-4" />
      {pending ? (isEditing ? 'Saving...' : 'Publishing...') : isEditing ? 'Save Changes' : 'Publish Post'}
    </Button>
  );
}

export default function BlogForm({ post }: { post?: BlogPost }) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
    },
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const formAction = post ? updatePost.bind(null, post.slug) : createPost;
  const [state, dispatch] = useFormState(formAction, { message: '', errors: {} });

  const handleSuggest = async () => {
    const content = form.getValues('content');
    if (!content) {
        alert("Please write some content first to get title suggestions.");
        return;
    }
    setIsSuggesting(true);
    const result = await suggestTitleAction(content);
    setSuggestions(result);
    setIsSuggesting(false);
  };
  
  const onSuggestionClick = (title: string) => {
    form.setValue('title', title);
  };

  return (
    <Form {...form}>
      <form action={dispatch}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{post ? 'Edit Blog Post' : 'Create a New Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Input placeholder="Your amazing blog title" {...field} />
                    </FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="outline" onClick={handleSuggest} disabled={isSuggesting}>
                          {isSuggesting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Lightbulb className="mr-2 h-4 w-4" />
                          )}
                          Suggest
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                         <div className="space-y-2">
                           <h4 className="font-medium leading-none">AI Suggestions</h4>
                           <p className="text-sm text-muted-foreground">Click to use a title.</p>
                           {suggestions.length > 0 ? (
                             <div className="flex flex-col gap-2 pt-2">
                               {suggestions.map((s, i) => (
                                 <Button key={i} variant="ghost" className="justify-start text-left h-auto whitespace-normal" onClick={() => onSuggestionClick(s)}>{s}</Button>
                               ))}
                             </div>
                           ) : (
                             <p className="text-sm text-center pt-4 text-muted-foreground">{isSuggesting ? 'Generating...' : 'No suggestions yet.'}</p>
                           )}
                         </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage>{state.errors?.title}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your blog post here..." className="min-h-[400px]" {...field} />
                  </FormControl>
                  <FormMessage>{state.errors?.content}</FormMessage>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='justify-between'>
            <SubmitButton isEditing={!!post} />
             {state?.message && !state.errors && <p className='text-sm text-destructive'>{state.message}</p>}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
