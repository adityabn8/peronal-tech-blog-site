import BlogForm from "@/components/blog-form";
import { getPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";

type EditPageProps = {
  params: {
    slug: string;
  };
};

export default async function EditBlogPage({ params }: EditPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-6">Edit Post</h2>
      <BlogForm post={post} />
    </div>
  );
}
