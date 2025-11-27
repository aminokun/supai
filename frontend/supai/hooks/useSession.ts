"use client";

import { useState, useEffect } from "react";
import { getSession } from "@/lib/auth-client";

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Session {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const sessionData = await getSession();

        if (sessionData?.data) {
          setSession(sessionData.data as Session);
        } else {
          setSession(null);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch session");
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Optional: Set up polling or event listener for session changes
    const interval = setInterval(fetchSession, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  const refreshSession = async () => {
    try {
      const sessionData = await getSession();
      if (sessionData?.data) {
        setSession(sessionData.data as Session);
      } else {
        setSession(null);
      }
    } catch (err) {
      console.error("Failed to refresh session:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh session");
    }
  };

  return {
    session,
    loading,
    error,
    isAuthenticated: !!session?.user,
    refreshSession,
  };
}