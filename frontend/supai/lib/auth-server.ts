import { headers } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost/api/auth';

interface Session {
  session: {
    id: string;
    expiresAt: string;
    token: string;
    userId: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Get session on the server side by forwarding cookies from the request headers.
 * Use this in Server Components, Server Actions, and Route Handlers.
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";

    // For server-side requests inside Docker, use the internal service URL
    const serverAuthUrl = process.env.API_URL_FOR_SERVER_SIDE
      ? `${process.env.API_URL_FOR_SERVER_SIDE}/auth`
      : AUTH_URL;

    const response = await fetch(`${serverAuthUrl}/get-session`, {
      method: "GET",
      headers: {
        cookie,
      },
      cache: "no-store", // Don't cache session requests
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // better-auth returns null if no session
    if (!data || !data.session) {
      return null;
    }

    return data as Session;
  } catch (error) {
    console.error("Failed to get server session:", error);
    return null;
  }
}
