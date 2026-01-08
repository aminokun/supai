-- Add GDPR fields for user deletion
ALTER TABLE "user" ADD COLUMN "deleteRequestedAt" TIMESTAMP(3);
ALTER TABLE "user" ADD COLUMN "deletionScheduledAt" TIMESTAMP(3);

-- Create index for deletionScheduledAt for efficient querying of scheduled deletions
CREATE INDEX "user_deletionScheduledAt_idx" ON "user"("deletionScheduledAt");