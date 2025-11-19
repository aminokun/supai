import NodeCache from 'node-cache';
import { apiClient } from './api-client.js';

interface Session {
  userId?: string;
  isLinked: boolean;
  lastActivity: Date;
}

interface LinkingState {
  waitingForCode: boolean;
  startedAt: Date;
}

export class SessionManager {
  private sessions: NodeCache;
  private linkingStates: NodeCache;
  private sessionTimeout: number;

  constructor() {
    this.sessionTimeout = parseInt(process.env.SESSION_TIMEOUT_MINUTES || '60') * 60;

    // Session cache with TTL
    this.sessions = new NodeCache({
      stdTTL: this.sessionTimeout,
      checkperiod: 120,
      useClones: false
    });

    // Temporary linking states (5 minutes TTL)
    this.linkingStates = new NodeCache({
      stdTTL: 300,
      checkperiod: 60,
      useClones: false
    });
  }

  async initialize(): Promise<void> {
    // Load existing linked users from database if needed
    try {
      // This would load from user service in production
      console.log('[SessionManager] Initialized');
    } catch (error) {
      console.error('[SessionManager] Initialization error:', error);
    }
  }

  async getSession(chatId: string): Promise<Session | undefined> {
    let session = this.sessions.get<Session>(chatId);

    if (!session) {
      // Check if user is linked via API
      try {
        const linkedUser = await apiClient.getUserByChatId(chatId);

        if (linkedUser) {
          session = {
            userId: linkedUser.userId,
            isLinked: true,
            lastActivity: new Date()
          };
          this.sessions.set(chatId, session);
        }
      } catch (error) {
        console.error('[SessionManager] Error checking linked user:', error);
      }
    }

    return session;
  }

  async updateSession(chatId: string, session: Session): Promise<void> {
    this.sessions.set(chatId, session, this.sessionTimeout);
  }

  async removeSession(chatId: string): Promise<void> {
    this.sessions.del(chatId);
  }

  // Linking state management
  setLinkingState(chatId: string): void {
    this.linkingStates.set(chatId, {
      waitingForCode: true,
      startedAt: new Date()
    });
  }

  getLinkingState(chatId: string): LinkingState | undefined {
    return this.linkingStates.get<LinkingState>(chatId);
  }

  clearLinkingState(chatId: string): void {
    this.linkingStates.del(chatId);
  }

  // Get all active sessions (for admin/monitoring)
  getActiveSessions(): number {
    return this.sessions.keys().length;
  }

  // Clean up expired sessions
  cleanup(): void {
    // NodeCache handles this automatically
    console.log('[SessionManager] Cleanup performed');
  }
}

export const sessionManager = new SessionManager();