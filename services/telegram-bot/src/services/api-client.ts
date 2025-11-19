import axios, { AxiosInstance } from 'axios';

interface LinkVerificationResult {
  success: boolean;
  userId?: string;
  error?: string;
}

interface LinkedUser {
  userId: string;
  telegramChatId: string;
  telegramUsername?: string;
  linkedAt: Date;
}

interface Wallet {
  id: string;
  address: string;
  name: string;
  groupName?: string;
  isActive: boolean;
  createdAt: Date;
}

interface UserStats {
  totalWallets: number;
  activeWallets: number;
  groups: number;
  recentTransactions?: number;
}

export class ApiClient {
  private userServiceClient: AxiosInstance;
  private walletServiceClient: AxiosInstance;
  private apiGatewayClient: AxiosInstance;

  constructor() {
    // Direct user service client (for linking)
    this.userServiceClient = axios.create({
      baseURL: process.env.USER_SERVICE_URL || 'http://localhost:3002',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Wallet tracking service (through API gateway)
    this.walletServiceClient = axios.create({
      baseURL: `${process.env.API_GATEWAY_URL || 'http://localhost:3000'}/api/wallet-tracking`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || 'telegram-bot-service-key'
      }
    });

    // General API gateway client
    this.apiGatewayClient = axios.create({
      baseURL: process.env.API_GATEWAY_URL || 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || 'telegram-bot-service-key'
      }
    });

    // Add response interceptors for error handling
    [this.userServiceClient, this.walletServiceClient, this.apiGatewayClient].forEach(client => {
      client.interceptors.response.use(
        response => response,
        error => {
          if (error.response) {
            console.error('[ApiClient] Request failed:', {
              status: error.response.status,
              data: error.response.data
            });
          } else {
            console.error('[ApiClient] Network error:', error.message);
          }
          return Promise.reject(error);
        }
      );
    });
  }

  // User service methods
  async verifyLinkCode(code: string, chatId: string, username?: string): Promise<LinkVerificationResult> {
    try {
      const response = await this.userServiceClient.post('/api/telegram/link', {
        code,
        chatId,
        username
      });

      return {
        success: true,
        userId: response.data.userId
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Verification failed'
      };
    }
  }

  async unlinkTelegram(chatId: string): Promise<boolean> {
    try {
      await this.userServiceClient.post('/api/telegram/unlink', { chatId });
      return true;
    } catch (error) {
      console.error('[ApiClient] Unlink error:', error);
      return false;
    }
  }

  async getUserByChatId(chatId: string): Promise<LinkedUser | null> {
    try {
      const response = await this.userServiceClient.get(`/api/telegram/user/${chatId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Wallet tracking methods
  async getUserWallets(userId: string): Promise<Wallet[]> {
    try {
      const response = await this.walletServiceClient.get('/wallets', {
        headers: {
          'x-user-id': userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('[ApiClient] Get wallets error:', error);
      return [];
    }
  }

  async addWallet(userId: string, address: string, name: string, groupName?: string): Promise<Wallet | null> {
    try {
      const response = await this.walletServiceClient.post(
        '/wallets',
        { address, name, groupName },
        {
          headers: {
            'x-user-id': userId
          }
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('[ApiClient] Add wallet error:', error.response?.data || error);
      throw new Error(error.response?.data?.error || 'Failed to add wallet');
    }
  }

  async removeWallet(userId: string, address: string): Promise<boolean> {
    try {
      await this.walletServiceClient.delete(`/wallets/${address}`, {
        headers: {
          'x-user-id': userId
        }
      });
      return true;
    } catch (error) {
      console.error('[ApiClient] Remove wallet error:', error);
      return false;
    }
  }

  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      const response = await this.walletServiceClient.get('/stats', {
        headers: {
          'x-user-id': userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('[ApiClient] Get stats error:', error);
      return null;
    }
  }

  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      const [userHealth, walletHealth] = await Promise.all([
        this.userServiceClient.get('/health').catch(() => ({ status: 0 })),
        this.walletServiceClient.get('/health').catch(() => ({ status: 0 }))
      ]);

      return userHealth.status === 200 && walletHealth.status === 200;
    } catch (error) {
      console.error('[ApiClient] Health check error:', error);
      return false;
    }
  }
}

export const apiClient = new ApiClient();