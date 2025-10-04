import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { BookMarked, LayoutDashboard, PlusCircle } from "lucide-react";
import LogoutButton from "@/components/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="bg-background">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <BookMarked className="text-primary size-7" />
              <span className="font-headline text-lg font-semibold text-sidebar-foreground">Tech Blog Central</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/create">
                    <PlusCircle />
                    New Post
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <LogoutButton />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-headline font-bold">Admin Dashboard</h1>
                <SidebarTrigger className="md:hidden" />
            </div>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
