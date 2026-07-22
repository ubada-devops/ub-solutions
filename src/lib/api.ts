import { ProjectTask, EscrowTransaction, ChangeRequestTicket } from '../types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const API_BASE = 'http://localhost:5000/api';
const WS_BASE = 'ws://localhost:5000/ws';

export interface ChatMessagePayload {
  id?: string;
  channel: string;
  sender: string;
  senderRole: string;
  text: string;
  timestamp?: string;
  type?: 'text' | 'code' | 'system';
  codeSnippet?: string;
  codeLanguage?: string;
}

class ApiService {
  private socket: WebSocket | null = null;
  private wsListeners: Array<(event: { type: string; payload: any }) => void> = [];

  constructor() {
    this.connectWebSocket();
    this.connectSupabaseRealtime();
  }

  private connectSupabaseRealtime() {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      supabase
        .channel('ub_club_realtime')
        .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
          this.wsListeners.forEach(listener => listener({ type: 'SUPABASE_CHANGE', payload }));
        })
        .subscribe();

      console.log('[Supabase] Live PostgreSQL Realtime channel connected.');
    } catch (err) {
      console.error('[Supabase] Realtime error:', err);
    }
  }

  public connectWebSocket() {
    try {
      this.socket = new WebSocket(WS_BASE);

      this.socket.onopen = () => {
        console.log('[UB CLUB API Client] Connected to backend WebSocket socket pool.');
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.wsListeners.forEach(listener => listener(data));
        } catch (e) {
          console.error('[API Client] WS message parse error:', e);
        }
      };

      this.socket.onclose = () => {
        setTimeout(() => this.connectWebSocket(), 5000);
      };

      this.socket.onerror = () => {};
    } catch (e) {
      console.log('[API Client] Operating in offline mode with local fallback.');
    }
  }

  public subscribe(listener: (event: { type: string; payload: any }) => void) {
    this.wsListeners.push(listener);
    return () => {
      this.wsListeners = this.wsListeners.filter(l => l !== listener);
    };
  }

  // Tasks
  public async fetchTasks(): Promise<ProjectTask[] | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as ProjectTask[];
    }
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }

  public async createTask(task: Partial<ProjectTask>): Promise<ProjectTask | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('tasks').insert([task]).select().single();
      if (!error && data) return data as ProjectTask;
    }
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }

  // Escrows
  public async fetchEscrows(): Promise<EscrowTransaction[] | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('escrows').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as EscrowTransaction[];
    }
    try {
      const res = await fetch(`${API_BASE}/escrow`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }

  // Change Requests
  public async fetchChangeRequests(): Promise<ChangeRequestTicket[] | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('change_requests').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as ChangeRequestTicket[];
    }
    try {
      const res = await fetch(`${API_BASE}/change-requests`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }

  // Chat Messages
  public async fetchChatMessages(): Promise<any[] | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(100);
      
      if (!error && data) {
        // Map database columns to Message format expected by client
        return data.map(item => ({
          id: item.id,
          channel_id: item.channel_id,
          sender_alias: item.sender_alias,
          payload: item.payload,
          timestamp: Number(item.timestamp),
          isSystem: Boolean(item.issystem || item.isSystem)
        }));
      }
    }
    try {
      const res = await fetch(`${API_BASE}/chat`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }

  public async sendChatMessage(msg: ChatMessagePayload) {
    if (isSupabaseConfigured && supabase) {
      const dbMsg = {
        id: msg.id || 'msg_' + Math.random().toString(36).substring(2, 11),
        channel_id: msg.channel,
        sender_alias: msg.sender,
        payload: msg.text,
        timestamp: Date.now(),
        issystem: msg.type === 'system'
      };
      const { error } = await supabase.from('chat_messages').insert([dbMsg]);
      if (error) {
        console.error('[Supabase] Chat insert error:', error);
      }
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'SEND_MESSAGE', payload: msg }));
    } else {
      fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      }).catch(() => {});
    }
  }

  public broadcastTyping(alias: string, typing: boolean) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'TYPING_STATUS', payload: { alias, typing } }));
    }
  }
}

export const apiService = new ApiService();
export default apiService;
