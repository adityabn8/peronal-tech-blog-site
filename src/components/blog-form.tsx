'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost, updatePost } from '@/lib/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { BlogPost } from '@/types';
import { Save } from 'lucide-react';

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

  const formAction = post ? updatePost.bind(null, post.slug) : createPost;
  const [state, dispatch] = useActionState(formAction, { message: '', errors: {} });

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
                  <FormControl>
                    <Input placeholder="Your amazing blog title" {...field} />
                  </FormControl>
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
