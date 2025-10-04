import { logout } from "@/lib/actions";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action={logout} className="w-full">
      <Button type="submit" variant="destructive" className="w-full justify-start gap-2">
        <LogOut />
        <span>Logout</span>
      </Button>
    </form>
  );
}
