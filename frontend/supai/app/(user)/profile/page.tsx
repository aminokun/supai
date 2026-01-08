import React from "react";
import { getServerSession } from "@/lib/auth-server";
import { SignOutButton } from "@/components/ui/signOutButton";
import { ReturnButton } from "@/components/ui/return-botton";
import { AccountDeletionSection } from "@/components/account-deletion-section";

// Export as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export default async function Profile() {
  const session = await getServerSession();

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <ReturnButton href="/dashboard" label="Home" />
      <SignOutButton />
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{session?.user?.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{session?.user?.email}</p>
        </div>
        <AccountDeletionSection userEmail={session?.user?.email} />
      </div>
    </div>
  );
}
