import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPosts } from "@/lib/data";
import Link from "next/link";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import DeleteBlogButton from "@/components/delete-blog-button";

export default async function AdminDashboard() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/edit/${post.slug}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteBlogButton slug={post.slug} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
