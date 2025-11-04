"use client";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function useSignup() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    await signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Registered successfully, Welcome 👋");
          router.push("/login");
        },
      }
    );
  };

  return { signup, isPending };
}
