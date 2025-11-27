import crypto from 'crypto';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

export class AlchemyService {
  private authToken: string;
  private appId: string;
  private webhookId: string;
  private signingKey: string;
  private webhookUrl: string;

  constructor() {
    this.authToken = process.env.ALCHEMY_AUTH_TOKEN || '';
    this.appId = process.env.ALCHEMY_APP_ID || '';
    this.webhookId = process.env.ALCHEMY_WEBHOOK_ID || '';
    this.signingKey = process.env.ALCHEMY_WEBHOOK_SIGNING_KEY || '';
    this.webhookUrl = process.env.ALCHEMY_WEBHOOK_URL || 'http://localhost:3003/webhooks/alchemy';

    if (!this.authToken || !this.appId || !this.webhookId) {
      console.warn('[AlchemyService] Missing Alchemy configuration');
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(body: string, signature: string): boolean {
    if (!this.signingKey) {
      console.warn('[AlchemyService] No signing key configured, skipping verification');
      return true;
    }

    const hmac = crypto.createHmac('sha256', this.signingKey);
    hmac.update(body, 'utf8');
    const digest = hmac.digest('hex');

    return digest === signature;
  }

  /**
   * Sync addresses with Alchemy webhook
   */
  async syncWebhookAddresses(addresses: string[]): Promise<void> {
    try {
      // Skip Alchemy sync if no webhook ID configured
      if (!this.webhookId) {
        console.warn('[AlchemyService] No webhook ID configured, skipping Alchemy sync');
        // Still store addresses locally for later sync
        for (const address of addresses) {
          await prisma.webhookAddress.upsert({
            where: {
              webhookId_address: {
                webhookId: 'local',
                address: address.toLowerCase()
              }
            },
            update: {},
            create: {
              webhookId: 'local',
              address: address.toLowerCase()
            }
          });
        }
        return;
      }

      const url = `https://dashboard.alchemyapi.io/api/update-webhook-addresses`;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Alchemy-Token': this.authToken
        },
        body: JSON.stringify({
          webhook_id: this.webhookId,
          addresses_to_add: addresses.map(a => a.toLowerCase()),
          addresses_to_remove: []
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`[AlchemyService] Alchemy sync failed: ${error}`);
        // Don't throw, just log and continue - still store locally
        console.log('[AlchemyService] Storing addresses locally despite Alchemy sync failure');
      } else {
        console.log(`[AlchemyService] Synced ${addresses.length} addresses to webhook`);
      }

      // Store addresses in database
      for (const address of addresses) {
        await prisma.webhookAddress.upsert({
          where: {
            webhookId_address: {
              webhookId: this.webhookId,
              address: address.toLowerCase()
            }
          },
          update: {},
          create: {
            webhookId: this.webhookId,
            address: address.toLowerCase()
          }
        });
      }
    } catch (error) {
      console.error('[AlchemyService] Error syncing addresses:', error);
      throw error;
    }
  }

  /**
   * Add addresses to webhook monitoring
   */
  async addAddresses(addresses: string[]): Promise<void> {
    if (!addresses.length) return;

    try {
      // First check existing addresses
      const existing = await prisma.webhookAddress.findMany({
        where: {
          webhookId: this.webhookId,
          address: { in: addresses.map(a => a.toLowerCase()) }
        }
      });

      const existingAddresses = existing.map(e => e.address);
      const newAddresses = addresses.filter(a => !existingAddresses.includes(a.toLowerCase()));

      if (newAddresses.length > 0) {
        await this.syncWebhookAddresses(newAddresses);
      }

      console.log(`[AlchemyService] Added ${newAddresses.length} new addresses, ${existingAddresses.length} already tracked`);
    } catch (error) {
      console.error('[AlchemyService] Error adding addresses:', error);
      // Don't throw - addresses are still stored locally
      console.log('[AlchemyService] Addresses stored locally, but Alchemy sync may have failed');
    }
  }

  /**
   * Remove addresses from webhook monitoring
   */
  async removeAddresses(addresses: string[]): Promise<void> {
    if (!addresses.length) return;

    try {
      const url = `https://dashboard.alchemyapi.io/api/update-webhook-addresses`;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Alchemy-Token': this.authToken
        },
        body: JSON.stringify({
          webhook_id: this.webhookId,
          addresses_to_add: [],
          addresses_to_remove: addresses.map(a => a.toLowerCase())
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to remove addresses: ${error}`);
      }

      // Remove from database
      await prisma.webhookAddress.deleteMany({
        where: {
          webhookId: this.webhookId,
          address: { in: addresses.map(a => a.toLowerCase()) }
        }
      });

      console.log(`[AlchemyService] Removed ${addresses.length} addresses from webhook`);
    } catch (error) {
      console.error('[AlchemyService] Error removing addresses:', error);
      throw error;
    }
  }

  /**
   * Get all tracked addresses
   */
  async getTrackedAddresses(): Promise<string[]> {
    const addresses = await prisma.webhookAddress.findMany({
      where: { webhookId: this.webhookId }
    });
    return addresses.map(a => a.address);
  }

  /**
   * Update webhook URL if needed
   */
  async updateWebhookUrl(newUrl?: string): Promise<void> {
    const url = newUrl || this.webhookUrl;

    try {
      const response = await fetch(`https://dashboard.alchemy.com/api/update-webhook`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Alchemy-Token': this.authToken
        },
        body: JSON.stringify({
          webhook_id: this.webhookId,
          url: url
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update webhook URL: ${error}`);
      }

      // Update webhook info in database
      await prisma.alchemyWebhook.upsert({
        where: { webhookId: this.webhookId },
        update: {
          webhookUrl: url,
          lastSyncedAt: new Date()
        },
        create: {
          webhookId: this.webhookId,
          webhookUrl: url,
          signingKey: this.signingKey,
          isActive: true
        }
      });

      console.log(`[AlchemyService] Updated webhook URL to: ${url}`);
    } catch (error) {
      console.error('[AlchemyService] Error updating webhook URL:', error);
      throw error;
    }
  }
}

export const alchemyService = new AlchemyService();