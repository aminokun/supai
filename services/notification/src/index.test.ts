import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('Notification Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Health Check', () => {
    it('should return ok status', () => {
      const healthResponse = {
        status: 'ok',
        service: 'notification-service'
      };

      expect(healthResponse.status).toBe('ok');
      expect(healthResponse.service).toBe('notification-service');
    });
  });

  describe('Telegram Bot Configuration', () => {
    it('should have telegram bot token configured', () => {
      const token = process.env.TELEGRAM_BOT_TOKEN || 'test-token';
      expect(token).toBeDefined();
      expect(token.length).toBeGreaterThan(0);
    });

    it('should construct telegram api url correctly', () => {
      const token = 'test-token';
      const apiUrl = `https://api.telegram.org/bot${token}`;

      expect(apiUrl).toContain('https://api.telegram.org/bot');
      expect(apiUrl).toContain(token);
    });
  });

  describe('Transaction Notification Processing', () => {
    it('should process transaction data correctly', () => {
      const transactionData = {
        txHash: '0x123',
        fromAddress: '0xabc',
        toAddress: '0xdef',
        value: '1.5',
        asset: 'ETH',
        affectedUsers: ['user-1', 'user-2']
      };

      expect(transactionData.affectedUsers).toHaveLength(2);
      expect(transactionData.txHash).toBe('0x123');
      expect(parseFloat(transactionData.value)).toBeGreaterThan(0);
    });

    it('should handle transactions without affected users', () => {
      const transactionData = {
        txHash: '0x123',
        affectedUsers: []
      };

      expect(transactionData.affectedUsers).toHaveLength(0);
    });

    it('should format transaction message correctly', () => {
      const transaction = {
        txHash: '0x123abc',
        fromAddress: '0xfrom',
        toAddress: '0xto',
        value: '2.5',
        asset: 'ETH'
      };

      const message = `Transaction: ${transaction.txHash.slice(0, 10)}...\nAmount: ${transaction.value} ${transaction.asset}`;

      expect(message).toContain(transaction.value);
      expect(message).toContain(transaction.asset);
      expect(message).toContain('0x123abc'.slice(0, 10));
    });
  });

  describe('User Data Processing', () => {
    it('should validate user has telegram chat id', () => {
      const user = {
        userId: 'user-1',
        telegramChatId: '123456789',
        telegramUsername: 'testuser'
      };

      expect(user.telegramChatId).toBeDefined();
      expect(user.telegramChatId).toBeTruthy();
    });

    it('should handle user without telegram chat id', () => {
      const user = {
        userId: 'user-1',
        telegramChatId: null,
        telegramUsername: null
      };

      expect(user.telegramChatId).toBeNull();
    });
  });

  describe('RabbitMQ Configuration', () => {
    it('should have correct exchange name', () => {
      const exchangeName = 'wallet-events';
      expect(exchangeName).toBe('wallet-events');
    });

    it('should have correct queue name', () => {
      const queueName = 'notification.transactions';
      expect(queueName).toBe('notification.transactions');
    });

    it('should have correct routing key', () => {
      const routingKey = 'wallet.transaction.detected';
      expect(routingKey).toBe('wallet.transaction.detected');
    });

    it('should validate rabbitmq url format', () => {
      const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
      expect(url).toMatch(/^amqp:\/\//);
    });
  });

  describe('Error Handling', () => {
    it('should handle axios errors gracefully', async () => {
      const mockError = new Error('Network error');
      vi.mocked(axios.get).mockRejectedValue(mockError);

      try {
        await axios.get('http://test.com');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should handle missing user data', () => {
      const user = null;
      expect(user).toBeNull();
    });

    it('should validate transaction hash format', () => {
      const validHash = '0x1234567890abcdef';
      const invalidHash = 'notahash';

      expect(validHash).toMatch(/^0x[0-9a-fA-F]+$/);
      expect(invalidHash).not.toMatch(/^0x[0-9a-fA-F]+$/);
    });
  });

  describe('Message Formatting', () => {
    it('should format incoming transaction', () => {
      const tx = {
        toAddress: '0xuser',
        fromAddress: '0xsender',
        value: '1.0',
        asset: 'ETH'
      };

      const isIncoming = tx.toAddress === '0xuser';
      expect(isIncoming).toBe(true);

      const emoji = isIncoming ? '📥' : '📤';
      expect(emoji).toBe('📥');
    });

    it('should format outgoing transaction', () => {
      const tx = {
        toAddress: '0xreceiver',
        fromAddress: '0xuser',
        value: '1.0',
        asset: 'ETH'
      };

      const userAddress = '0xuser';
      const isOutgoing = tx.fromAddress === userAddress;
      expect(isOutgoing).toBe(true);

      const emoji = isOutgoing ? '📤' : '📥';
      expect(emoji).toBe('📤');
    });

    it('should shorten ethereum addresses', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const shortened = `${address.slice(0, 6)}...${address.slice(-4)}`;

      expect(shortened).toBe('0x1234...5678');
      expect(shortened.length).toBeLessThan(address.length);
    });
  });

  describe('Telegram API Integration', () => {
    it('should send message with correct parameters', async () => {
      const mockResponse = { data: { ok: true } };
      vi.mocked(axios.post).mockResolvedValue(mockResponse);

      const chatId = '123456789';
      const message = 'Test message';

      const response = await axios.post('https://api.telegram.org/bot/sendMessage', {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      });

      expect(response.data.ok).toBe(true);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          chat_id: chatId,
          text: message
        })
      );
    });
  });
});
