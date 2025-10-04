import Link from "next/link";
import { BookMarked } from "lucide-react";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <BookMarked className="text-primary" size={28} />
          <span className="text-xl font-headline font-bold">Tech Blog Central</span>
        </Link>
        <nav>
          {session ? (
            <Button asChild>
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Admin Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
