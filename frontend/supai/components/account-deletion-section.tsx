"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { api } from "@/lib/api-client";

interface DeletionStatus {
  isPendingDeletion: boolean;
  deleteRequestedAt: string | null;
  deletionScheduledAt: string | null;
  daysRemaining: number;
  canCancel: boolean;
  message: string;
}

interface AccountDeletionSectionProps {
  userEmail?: string;
}

export function AccountDeletionSection({ userEmail }: AccountDeletionSectionProps) {
  const [status, setStatus] = useState<DeletionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isForceDeleting, setIsForceDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await api.get<DeletionStatus>("/users/account/deletion-status");
      setStatus(response);
    } catch (error) {
      console.error("Failed to fetch deletion status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestDeletion = async () => {
    // Verify email confirmation
    if (emailConfirm !== userEmail) {
      toast.error("Email confirmation doesn't match", {
        description: "Please type your email address correctly to confirm.",
      });
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete("/users/account", {
        confirmEmail: emailConfirm,
        reason: "User requested deletion",
      });
      toast.success("Account deletion requested", {
        description: "Your account will be permanently deleted in 30 days.",
      });
      await fetchStatus();
      setShowConfirm(false);
      setEmailConfirm("");
    } catch (error: any) {
      toast.error("Failed to request deletion", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeletion = async () => {
    setIsCancelling(true);
    try {
      await api.post("/users/account/cancel-deletion", {});
      toast.success("Deletion cancelled", {
        description: "Your account is now active again.",
      });
      await fetchStatus();
    } catch (error: any) {
      toast.error("Failed to cancel deletion", {
        description: error.response?.data?.error || "Please try again",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const forceDelete = async () => {
    // Show confirmation dialog
    if (!confirm("This will PERMANENTLY delete your account immediately. This action CANNOT be undone. Continue?")) {
      return;
    }

    // Second confirmation for safety
    if (!confirm("Are you REALLY sure? Your account and all data will be gone forever!")) {
      return;
    }

    setIsForceDeleting(true);
    try {
      await api.post("/users/account/force-delete", {});
      toast.success("Account deleted", {
        description: "Your account has been permanently deleted.",
      });
      // Sign out and redirect to home
      await fetch("/api/auth/sign-out", { method: "POST" });
      router.push("/");
    } catch (error: any) {
      toast.error("Failed to delete account", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsForceDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">Loading account status...</p>
        </CardContent>
      </Card>
    );
  }

  if (status?.isPendingDeletion) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Account Deletion Pending</CardTitle>
          <CardDescription>
            {status.message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Requested:</span>{" "}
              {new Date(status.deleteRequestedAt!).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Deletion date:</span>{" "}
              {new Date(status.deletionScheduledAt!).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Days remaining:</span>{" "}
              {status.daysRemaining}
            </p>
          </div>
        </CardContent>
        {status.canCancel && (
          <CardFooter className="flex-col gap-3">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={cancelDeletion}
                disabled={isCancelling || isForceDeleting}
                className="flex-1"
              >
                {isCancelling ? "Cancelling..." : "Cancel Deletion"}
              </Button>
              <Button
                variant="destructive"
                onClick={forceDelete}
                disabled={isForceDeleting || isCancelling}
                className="flex-1"
              >
                {isForceDeleting ? "Deleting..." : "Force Deletion Now"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Warning: Force deletion will permanently delete your account immediately.
            </p>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>When you delete your account:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Your profile information will be anonymized immediately</li>
            <li>All tracked wallets will be removed from your account</li>
            <li>Telegram account will be unlinked</li>
            <li>You have 30 days to cancel this request</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        {!showConfirm ? (
          <Button
            variant="destructive"
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
          >
            Delete Account
          </Button>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            <p className="text-sm text-muted-foreground">
              To confirm deletion, please type your email address:
            </p>
            <Input
              type="email"
              placeholder={userEmail || "your@email.com"}
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              disabled={isDeleting}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirm(false);
                  setEmailConfirm("");
                }}
                disabled={isDeleting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={requestDeletion}
                disabled={isDeleting || !emailConfirm}
                className="flex-1"
              >
                {isDeleting ? "Requesting..." : "Confirm Deletion"}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
