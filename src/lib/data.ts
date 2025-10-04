import { BlogPost } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

let posts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a React framework for building full-stack web applications. It provides a rich developer experience with features like server-side rendering, static site generation, and more. This post will guide you through setting up your first Next.js project and exploring its core concepts.',
    author: 'Admin User',
    date: '2024-05-20',
    imageUrl: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint,
  },
  {
    slug: 'a-deep-dive-into-react-hooks',
    title: 'A Deep Dive into React Hooks',
    content: 'React Hooks have revolutionized how we write components. In this article, we will go beyond useState and useEffect to explore lesser-known hooks like useReducer, useCallback, and useMemo. We will look at practical examples to understand when and how to use them effectively to optimize performance and manage complex state.',
    author: 'Admin User',
    date: '2024-05-18',
    imageUrl: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint,
  },
  {
    slug: 'understanding-serverless-architecture',
    title: 'Understanding Serverless Architecture',
    content: 'Serverless computing allows you to build and run applications and services without thinking about servers. This post demystifies serverless architecture, discusses its pros and cons, and explores popular platforms like AWS Lambda and Google Cloud Functions. We will also build a simple serverless API to see it in action.',
    author: 'Admin User',
    date: '2024-05-15',
    imageUrl: PlaceHolderImages[2].imageUrl,
    imageHint: PlaceHolderImages[2].imageHint,
  }
];

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// Simulate async operation
export const getPosts = async (): Promise<BlogPost[]> => {
  return Promise.resolve(posts);
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return Promise.resolve(posts.find(p => p.slug === slug));
};

export const addPost = async (postData: Omit<BlogPost, 'slug' | 'author' | 'date' | 'imageUrl' | 'imageHint'>): Promise<BlogPost> => {
  const newSlug = slugify(postData.title);
  // Check if slug already exists and make it unique if so
  let finalSlug = newSlug;
  let counter = 1;
  while(posts.some(p => p.slug === finalSlug)) {
    finalSlug = `${newSlug}-${counter}`;
    counter++;
  }

  const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

  const newPost: BlogPost = {
    ...postData,
    slug: finalSlug,
    author: 'Admin User',
    date: new Date().toISOString().split('T')[0],
    imageUrl: randomImage.imageUrl,
    imageHint: randomImage.imageHint,
  };
  posts = [newPost, ...posts];
  return Promise.resolve(newPost);
};

export const editPost = async (slug: string, postData: Partial<Omit<BlogPost, 'slug'>>): Promise<BlogPost | undefined> => {
  const postIndex = posts.findIndex(p => p.slug === slug);
  if (postIndex === -1) {
    return Promise.resolve(undefined);
  }
  
  let newSlug = posts[postIndex].slug;
  if(postData.title && postData.title !== posts[postIndex].title) {
    newSlug = slugify(postData.title);
    let finalSlug = newSlug;
    let counter = 1;
    while(posts.some(p => p.slug === finalSlug && finalSlug !== slug)) {
      finalSlug = `${newSlug}-${counter}`;
      counter++;
    }
    newSlug = finalSlug;
  }

  const updatedPost = { ...posts[postIndex], ...postData, slug: newSlug };
  posts[postIndex] = updatedPost;
  return Promise.resolve(updatedPost);
};

export const removePost = async (slug: string): Promise<{ success: boolean }> => {
  const initialLength = posts.length;
  posts = posts.filter(p => p.slug !== slug);
  return Promise.resolve({ success: posts.length < initialLength });
};
