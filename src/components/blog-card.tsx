import type { BlogPost } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={post.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <CardTitle className="font-headline text-2xl mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <div className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
          <CalendarDays size={14} />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        <p className="text-muted-foreground line-clamp-3">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
