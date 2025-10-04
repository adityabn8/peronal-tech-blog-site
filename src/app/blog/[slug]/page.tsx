import { getPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { Calendar, User } from "lucide-react";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </div>
      </header>

      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image 
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          data-ai-hint={post.imageHint}
          priority
        />
      </div>

      <div className="prose dark:prose-invert max-w-none text-lg text-foreground/90 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>
    </article>
  );
}
