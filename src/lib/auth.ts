import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'tech_blog_session';
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'password';

type Session = {
  isLoggedIn: boolean;
};

export async function getSession(): Promise<Session | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  if (sessionCookie) {
    try {
      // In a real app, you'd verify a JWT here.
      // For this mock, we just check if the cookie value is 'true'.
      const sessionData = JSON.parse(sessionCookie.value);
      if (sessionData.isLoggedIn) {
        return { isLoggedIn: true };
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function signIn(credentials: FormData): Promise<{ success: boolean; message: string }> {
  const username = credentials.get('username');
  const password = credentials.get('password');

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    const sessionData = JSON.stringify({ isLoggedIn: true });
    cookies().set(SESSION_COOKIE_NAME, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true, message: 'Login successful' };
  }

  return { success: false, message: 'Invalid username or password' };
}

export async function signOut() {
  cookies().delete(SESSION_COOKIE_NAME);
}
