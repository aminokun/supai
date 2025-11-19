"use client";

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api-client';

interface TelegramStatus {
  linked: boolean;
  telegramUsername?: string;
}

interface GenerateCodeResponse {
  code: string;
  expiresIn: string;
  instruction: string;
}

interface TelegramState {
  isLinked: boolean;
  telegramUsername: string | null;
  linkingCode: string | null;
  codeExpiresAt: Date | null;
  isLoading: boolean;
  error: string | null;
}

export function useTelegram() {
  const [state, setState] = useState<TelegramState>({
    isLinked: false,
    telegramUsername: null,
    linkingCode: null,
    codeExpiresAt: null,
    isLoading: false,
    error: null,
  });

  // Check Telegram link status
  const checkStatus = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await api.get<TelegramStatus>('/api/users/telegram-status');

      setState(prev => ({
        ...prev,
        isLinked: data.linked,
        telegramUsername: data.telegramUsername || null,
        isLoading: false,
        // Clear code if linked
        linkingCode: data.linked ? null : prev.linkingCode,
        codeExpiresAt: data.linked ? null : prev.codeExpiresAt,
      }));

      return data;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to check Telegram status';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));

      // Don't show toast for initial status check
      return null;
    }
  }, []);

  // Generate linking code
  const generateCode = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await api.post<GenerateCodeResponse>('/api/users/telegram/generate-code');

      // Calculate expiration time (5 minutes from now)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 5);

      setState(prev => ({
        ...prev,
        linkingCode: data.code,
        codeExpiresAt: expiresAt,
        isLoading: false,
      }));

      toast.success('Linking code generated! It will expire in 5 minutes.');

      // Start polling for status updates
      startPolling();

      return data.code;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to generate linking code';

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));

      if (error instanceof ApiError && error.message.includes('already linked')) {
        toast.error('Telegram is already linked to your account');
        // Refresh status
        checkStatus();
      } else {
        toast.error(errorMessage);
      }

      return null;
    }
  }, [checkStatus]);

  // Unlink Telegram account
  const unlinkTelegram = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await api.delete('/api/users/telegram');

      setState(prev => ({
        ...prev,
        isLinked: false,
        telegramUsername: null,
        linkingCode: null,
        codeExpiresAt: null,
        isLoading: false,
      }));

      toast.success('Telegram account unlinked successfully');

      return true;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to unlink Telegram';

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));

      toast.error(errorMessage);

      return false;
    }
  }, []);

  // Copy code to clipboard
  const copyCode = useCallback(async () => {
    if (!state.linkingCode) return;

    try {
      await navigator.clipboard.writeText(state.linkingCode);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  }, [state.linkingCode]);

  // Polling for status updates after code generation
  const startPolling = useCallback(() => {
    let pollCount = 0;
    const maxPolls = 60; // Poll for 5 minutes (every 5 seconds)

    const pollInterval = setInterval(async () => {
      pollCount++;

      // Stop polling after max attempts or if code expired
      if (pollCount >= maxPolls || !state.linkingCode) {
        clearInterval(pollInterval);
        return;
      }

      const status = await checkStatus();

      // Stop polling if linked
      if (status?.linked) {
        clearInterval(pollInterval);
        toast.success(`Telegram linked successfully! Welcome @${status.telegramUsername}`);
      }
    }, 5000); // Poll every 5 seconds

    // Clean up on unmount
    return () => clearInterval(pollInterval);
  }, [state.linkingCode, checkStatus]);

  // Check if code is expired
  const isCodeExpired = useCallback(() => {
    if (!state.codeExpiresAt) return false;
    return new Date() > state.codeExpiresAt;
  }, [state.codeExpiresAt]);

  // Calculate time remaining for code
  const getTimeRemaining = useCallback(() => {
    if (!state.codeExpiresAt) return null;

    const now = new Date();
    const diff = state.codeExpiresAt.getTime() - now.getTime();

    if (diff <= 0) return '0:00';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [state.codeExpiresAt]);

  // Check status on mount
  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // Clear expired code
  useEffect(() => {
    if (state.linkingCode && isCodeExpired()) {
      setState(prev => ({
        ...prev,
        linkingCode: null,
        codeExpiresAt: null,
      }));
      toast.info('Linking code has expired. Please generate a new one.');
    }
  }, [state.linkingCode, isCodeExpired]);

  return {
    ...state,
    generateCode,
    checkStatus,
    unlinkTelegram,
    copyCode,
    isCodeExpired,
    getTimeRemaining,
  };
}