import LoginForm from "@/components/login-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-headline font-bold text-center mb-6">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
