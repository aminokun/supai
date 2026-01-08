import { createAuthClient } from "better-auth/react";

// Use localhost for both client and server since API gateway is exposed on host
const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost/api/auth';

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: baseURL,
});

export const { signUp, getSession, signOut, signIn } = authClient;

