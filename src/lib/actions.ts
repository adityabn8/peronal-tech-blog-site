'use server';

import { signIn as authSignIn, signOut as authSignOut } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addPost, editPost, removePost } from './data';
import { suggestTitleFlow } from '@/ai/flows/suggest-title';
import { z } from 'zod';

export async function login(formData: FormData) {
  const result = await authSignIn(formData);
  if (result.success) {
    redirect('/admin');
  }
  return result;
}

export async function logout() {
  await authSignOut();
  redirect('/admin/login');
}

const PostSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
});

export async function createPost(prevState: any, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  try {
    await addPost(validatedFields.data);
  } catch (error) {
    return { message: 'Database Error: Failed to Create Post.' };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}

export async function updatePost(slug: string, prevState: any, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  try {
    await editPost(slug, validatedFields.data);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Post.' };
  }

  revalidatePath(`/admin`);
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/');
  redirect('/admin');
}

export async function deletePost(slug: string) {
  try {
    await removePost(slug);
    revalidatePath('/admin');
    revalidatePath('/');
    return { message: 'Post deleted successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Post.' };
  }
}

export async function suggestTitleAction(content: string): Promise<string[]> {
  if (!content || content.length < 20) {
    return [];
  }
  try {
    const suggestions = await suggestTitleFlow({ content });
    return suggestions;
  } catch (error) {
    console.error('AI title suggestion failed:', error);
    return [];
  }
}
