'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, LogIn } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
      <LogIn className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function LoginForm() {
  const initialState = { message: '', success: false };
  const [state, dispatch] = useFormState(login, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && !state?.success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your admin credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" placeholder="admin" required defaultValue="admin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required defaultValue="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
