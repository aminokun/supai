"use client";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    await signIn.email(
      { email, password },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Login successful, Welcome back 👋");
          router.push("/profile");
        },
      }
    );
  };

  return { login, isPending };
}
