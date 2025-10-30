import React from "react";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth-client";
import { SignOutButton } from "@/components/ui/signOutButton";
import { ReturnButton } from "@/components/ui/return-botton";

export default async function Profile() {
  const { data: session } = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <ReturnButton href="/dashboard" label="Home" />
      <SignOutButton />
      <div className="w-full max-w-sm">Profile {session?.user?.name}</div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
