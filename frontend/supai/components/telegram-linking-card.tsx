"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTelegram } from '@/hooks/useTelegram';
import { MessageSquare, Copy, Unlink, Check, Loader2, Clock } from 'lucide-react';

export function TelegramLinkingCard() {
  const {
    isLinked,
    telegramUsername,
    linkingCode,
    isLoading,
    generateCode,
    unlinkTelegram,
    copyCode,
    getTimeRemaining,
    isCodeExpired,
  } = useTelegram();

  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Update countdown timer
  useEffect(() => {
    if (!linkingCode) return;

    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining === '0:00') {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [linkingCode, getTimeRemaining]);

  // Handle copy with feedback
  const handleCopy = async () => {
    await copyCode();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Telegram Integration
        </CardTitle>
        <CardDescription>
          Connect your Telegram account to receive real-time notifications for wallet transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLinked ? (
          // Linked state
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 dark:text-green-500" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Connected to Telegram
                  </p>
                  {telegramUsername && (
                    <p className="text-sm text-green-700 dark:text-green-400">
                      @{telegramUsername}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={unlinkTelegram}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Unlink className="h-4 w-4" />
                )}
                Unlink
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive notifications in Telegram when transactions occur on your tracked wallets.
            </p>
          </div>
        ) : (
          // Unlinked state
          <div className="space-y-4">
            {!linkingCode ? (
              // No code generated yet
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect your Telegram account to receive instant notifications when transactions
                  occur on your tracked wallets.
                </p>
                <Button
                  onClick={generateCode}
                  disabled={isLoading}
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                  Connect Telegram
                </Button>
              </div>
            ) : (
              // Code generated - show instructions
              <div className="space-y-4">
                {!isCodeExpired() ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Your Linking Code</label>
                        {timeRemaining && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Expires in {timeRemaining}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg border">
                          <code className="text-2xl font-mono tracking-wider flex-1 text-center">
                            {linkingCode.split('').join(' ')}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopy}
                            className="gap-2"
                          >
                            {copied ? (
                              <>
                                <Check className="h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                      <h4 className="font-medium text-sm">How to link:</h4>
                      <ol className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="font-medium text-blue-600 dark:text-blue-400">1.</span>
                          <span>Open Telegram on your phone or desktop</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-medium text-blue-600 dark:text-blue-400">2.</span>
                          <span>
                            Search for{' '}
                            <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                              @{process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'supai_wallet_bot'}
                            </code>
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-medium text-blue-600 dark:text-blue-400">3.</span>
                          <span>Start the bot and send the command:</span>
                        </li>
                      </ol>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded border">
                        <code className="text-sm font-mono">/link {linkingCode}</code>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateCode}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Generate New Code'
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  // Code expired
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                      <p className="text-sm text-yellow-900 dark:text-yellow-100">
                        Your linking code has expired. Please generate a new one.
                      </p>
                    </div>
                    <Button
                      onClick={generateCode}
                      disabled={isLoading}
                      className="w-full gap-2"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                      Generate New Code
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}