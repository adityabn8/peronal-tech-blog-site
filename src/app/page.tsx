import BlogCard from '@/components/blog-card';
import { getPosts } from '@/lib/data';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Aditya's Learning Diary</h1>
        <p className="text-muted-foreground mt-2">Insights and tutorials on modern web development.</p>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No posts yet</h2>
          <p className="text-muted-foreground mt-2">Check back later for new content!</p>
        </div>
      )}
    </div>
  );
}
