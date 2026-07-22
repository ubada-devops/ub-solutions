import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Terminal as TermIcon, ShieldAlert, Wifi, 
  Send, Code, AlertTriangle, Play, RefreshCw, Copy, Check,
  Zap, Lock, FileText, CheckSquare, Trash2, Radio, Server,
  Sliders, UserX, Coins, Globe, Landmark, Users, ArrowUpRight,
  Database, Activity, Cpu, Layers, ShieldCheck, Eye, EyeOff, Menu, X
} from 'lucide-react';
import { SessionRole } from '../types';
import { FASTAPI_ASGI_METRICS, REDIS_CLUSTER_NODES, SUPABASE_TOPOLOGY, HSM_VAULT_DATA, EDGE_REPLICAS } from '../data';
import { apiService } from '../lib/api';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

interface Message {
  id: string;
  channel_id: string;
  sender_alias: string;
  payload: string;
  timestamp: number;
  isSystem?: boolean;
}

interface AnonymousChatProps {
  activeRole: SessionRole;
  setActiveRole: (role: SessionRole) => void;
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
  escrows?: any[];
}

export const AnonymousChat: React.FC<AnonymousChatProps> = ({
  activeRole,
  setActiveRole,
  addToast,
  escrows = []
}) => {
  const isCSuite = ['CEO', 'CFO', 'COO', 'CTO', 'CAIO', 'CMO', 'CSO'].includes(activeRole);
  // 1. Dual-Channel Layout Router state
  const [activeChannel, setActiveChannel] = useState<'#general-lobby' | '#cto-pipeline' | '#escrow-feed' | 'UB (CEO)' | 'SAM (CFO)' | 'AMMAR (CTO)' | 'UB_DEV_14'>('#general-lobby');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Channels and unread counters
  const [unreads, setUnreads] = useState<Record<string, number>>({
    '#general-lobby': 0,
    '#cto-pipeline': 2,
    '#escrow-feed': 1,
    'UB (CEO)': 0,
    'SAM (CFO)': 0,
    'AMMAR (CTO)': 0,
    'UB_DEV_14': 0,
  });

  // Active message array with sliding window of max 50 items
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', channel_id: '#general-lobby', sender_alias: 'UB', payload: 'Welcome to the UB Solutions secure hub. All communication here is strictly masked.', timestamp: Date.now() - 3600000, isSystem: true },
    { id: '2', channel_id: '#general-lobby', sender_alias: 'SAM', payload: 'Operations are green. All inward wires are routed through Skydo.', timestamp: Date.now() - 3000000 },
    { id: '3', channel_id: '#general-lobby', sender_alias: 'UB_DEV_14', payload: 'Completed the clinical scraper hooks. Standardizing payload sanitizer next.', timestamp: Date.now() - 2400000 },
    { id: '4', channel_id: '#general-lobby', sender_alias: 'AMMAR', payload: 'Make sure to pass all inputs through regex pre-routing filters. Absolute privacy.', timestamp: Date.now() - 1800000 },
    { id: '5', channel_id: '#cto-pipeline', sender_alias: 'UB_DEV_14', payload: '```typescript\n// Secure webhook callback filter\nexport function sanitize(input: string) {\n  return input.replace(/[<>]/g, "");\n}\n```', timestamp: Date.now() - 1200000 },
    { id: '6', channel_id: '#cto-pipeline', sender_alias: 'AMMAR', payload: 'Looks robust. Make sure to commit to branch alpha-sprints.', timestamp: Date.now() - 900000 },
    { id: '7', channel_id: '#escrow-feed', sender_alias: 'SYSTEM', payload: '[SKYDO REMITTANCE] cleared inward ₹4,89,000 corporate retainer from CardioCare Diagnostics.', timestamp: Date.now() - 600000, isSystem: true },
  ]);

  // Input state
  const [inputMessage, setInputMessage] = useState('');
  
  // Custom sender selector
  const [chatSenderIdentity, setChatSenderIdentity] = useState<string>('UB_DEV_14');
  
  // Interactive WebSocket & Long Polling Fallback state
  const [transportMode, setTransportMode] = useState<'WEBSOCKET' | 'HTTP_LONG_POLLING'>('WEBSOCKET');
  const [connectionState, setConnectionState] = useState<'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING'>('CONNECTED');
  const [connectionLogs, setConnectionLogs] = useState<string[]>([
    '[FastAPI ASGI] Established socket pool on port 3000 (10,420 active concurrent connections)',
    '[Redis Pub/Sub] Cluster synchronized across 2 nodes (1.2ms latency)',
    '[Supabase Cluster] Dedicated chat broadcast replica active'
  ]);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  // WebSocket 30s Heartbeat Ping-Pong Protocol
  const [lastPingPongTime, setLastPingPongTime] = useState<number>(Date.now());
  const [pingLatencyMs, setPingLatencyMs] = useState<number>(14);

  // Compliance worker state
  const [infractionCount, setInfractionCount] = useState<Record<string, number>>({
    'UB_DEV_14': 0,
    'UB_DEV_04': 0,
  });
  const [isMuted, setIsMuted] = useState(false);
  const [muteCountdown, setMuteCountdown] = useState(0);
  const [complianceLogs, setComplianceLogs] = useState<string[]>([
    '[Pre-Routing Worker] RegEx policy active (blocking phone, email, websites, LinkedIn, GitHub, Skype, payment bypass).'
  ]);

  // Async batch commit simulator state
  const [pendingBatchCount, setPendingBatchCount] = useState(0);
  const [batchTimer, setBatchTimer] = useState(5);
  const [batchStatus, setBatchStatus] = useState<'IDLE' | 'FLUSHING' | 'SUCCESS'>('IDLE');

  // Typing simulator state with JSON payload inspector
  const [typingPayload, setTypingPayload] = useState<{ alias: string; typing: boolean } | null>(null);
  
  // Real-time typing status broadcast refs
  const chatChannelRef = useRef<any>(null);
  const typingTimeoutRef = useRef<any>(null);

  // HSM Cryptography Vault inspector state
  const [showHsmModal, setShowHsmModal] = useState(false);

  // Code staging attachment states
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('typescript');

  // Voting Poll / Quiz states
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Auto-sync sender mask when activeRole changes
  useEffect(() => {
    switch (activeRole) {
      case 'CEO':
        setChatSenderIdentity('UB');
        break;
      case 'CFO':
      case 'COO':
        setChatSenderIdentity('SAM');
        break;
      case 'CTO':
        setChatSenderIdentity('AMMAR');
        break;
      case 'CAIO':
        setChatSenderIdentity('UB_CAIO');
        break;
      case 'CMO':
        setChatSenderIdentity('UB_CMO');
        break;
      case 'CSO':
        setChatSenderIdentity('UB_CSO');
        break;
      case 'DEV':
        setChatSenderIdentity('UB_DEV_14');
        break;
      case 'CLIENT':
        setChatSenderIdentity('CardioCare Client');
        break;
      default:
        setChatSenderIdentity('UB_DEV_14');
        break;
    }
  }, [activeRole]);

  // Transport Inspector latest packet state
  const [lastTransmittedPacket, setLastTransmittedPacket] = useState<any>({
    "channel_id": "00000000-0000-0000-0000-000000000000",
    "sender_alias": "STANDBY",
    "payload": "SYSTEM_BOOT_SUCCESS",
    "timestamp": Math.floor(Date.now() / 1000)
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  // Load chat messages from Supabase on init & subscribe to real-time updates
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const loadMessages = async () => {
      const dbMsgs = await apiService.fetchChatMessages();
      if (dbMsgs && dbMsgs.length > 0) {
        setMessages(dbMsgs);
      }
    };
    loadMessages();

    // Subscribe to new message inserts in Supabase
    const chatChannel = supabase
      .channel('chat_realtime_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => {
          const newMsg = payload.new as any;
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            const msg: Message = {
              id: newMsg.id,
              channel_id: newMsg.channel_id,
              sender_alias: newMsg.sender_alias,
              payload: newMsg.payload,
              timestamp: Number(newMsg.timestamp),
              isSystem: Boolean(newMsg.issystem || newMsg.isSystem)
            };
            return [...prev, msg].slice(-50);
          });
        }
      )
      .on('broadcast', { event: 'typing_status' }, ({ payload }) => {
        if (payload.alias !== chatSenderIdentity) {
          setTypingPayload(payload.typing ? { alias: payload.alias, typing: true } : null);
        }
      })
      .on('broadcast', { event: 'chat_message' }, ({ payload }) => {
        setMessages(prev => {
          if (prev.some(m => m.id === payload.id)) return prev;
          return [...prev, payload].slice(-50);
        });
      })
      .subscribe();

    chatChannelRef.current = chatChannel;

    return () => {
      supabase.removeChannel(chatChannel);
    };
  }, [chatSenderIdentity]);

  // 30s Heartbeat Ping-Pong Protocol simulator
  useEffect(() => {
    const pingInterval = setInterval(() => {
      if (connectionState === 'CONNECTED') {
        const latency = Math.floor(12 + Math.random() * 8);
        setPingLatencyMs(latency);
        setLastPingPongTime(Date.now());
      }
    }, 30000);
    return () => clearInterval(pingInterval);
  }, [connectionState]);

  // Typing status broadcast handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputMessage(val);

    if (!isSupabaseConfigured) return;

    if (chatChannelRef.current) {
      chatChannelRef.current.send({
        type: 'broadcast',
        event: 'typing_status',
        payload: { alias: chatSenderIdentity, typing: val.trim().length > 0 }
      });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (chatChannelRef.current) {
        chatChannelRef.current.send({
          type: 'broadcast',
          event: 'typing_status',
          payload: { alias: chatSenderIdentity, typing: false }
        });
      }
    }, 3000);
  };

  // 5 Seconds Asynchronous Database Batch Commit simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBatchTimer(prev => {
        if (prev === 1) {
          if (pendingBatchCount > 0) {
            setBatchStatus('FLUSHING');
            setTimeout(() => {
              setBatchStatus('SUCCESS');
              setPendingBatchCount(0);
              const now = new Date().toLocaleTimeString();
              setComplianceLogs(l => [
                ...l,
                `[SQL Batch] flushed queued transactions to PostgreSQL at ${now}`
              ]);
              setTimeout(() => setBatchStatus('IDLE'), 1500);
            }, 800);
          }
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pendingBatchCount]);

  // Infraction Mutex Countdown timer
  useEffect(() => {
    if (muteCountdown > 0) {
      const timer = setTimeout(() => {
        setMuteCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (muteCountdown === 0 && isMuted) {
      setIsMuted(false);
      addToast('24-Hour Infraction Mutex Lockout expired. Transmission restored.', 'info');
    }
  }, [muteCountdown, isMuted]);

  // Client-Facing Redaction Middleware
  const getSenderDisplay = (sender: string) => {
    if (activeRole === 'CLIENT') {
      if (sender.startsWith('UB_DEV_') || sender === 'Anon') {
        return 'UB Technologies Engineer';
      }
    }
    return sender;
  };

  // Expanded RegEx Content Policy Check
  const runPreRoutingComplianceCheck = (text: string): boolean => {
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const socialRegex = /(@[a-zA-Z0-9_]{3,})/g;
    const websiteRegex = /(https?:\/\/(?!staging\.ub\.technology)[^\s]+)/gi;
    const linkedinRegex = /(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/gi;
    const githubRegex = /(github\.com\/[a-zA-Z0-9_-]+)/gi;
    const skypeRegex = /(skype:[a-zA-Z0-9._-]+|live:[a-zA-Z0-9._-]+)/gi;
    const paymentKeywords = [
      'pay me directly', 'invoice outside', 'personal crypto', 'direct bitcoin', 
      'gpay outside', 'poach', 'telegram me', 'my skype', 'whatsapp me'
    ];

    let hasViolation = false;
    let violationReason = '';

    if (phoneRegex.test(text)) {
      hasViolation = true;
      violationReason = 'Contact detail sharing (Phone number pattern)';
    } else if (emailRegex.test(text)) {
      hasViolation = true;
      violationReason = 'Contact detail sharing (Email address pattern)';
    } else if (linkedinRegex.test(text)) {
      hasViolation = true;
      violationReason = 'Personal Profile Bypass (LinkedIn link detected)';
    } else if (githubRegex.test(text)) {
      hasViolation = true;
      violationReason = 'Personal Repository Bypass (GitHub link detected)';
    } else if (skypeRegex.test(text)) {
      hasViolation = true;
      violationReason = 'Personal Handle Bypass (Skype ID detected)';
    } else if (websiteRegex.test(text)) {
      hasViolation = true;
      violationReason = 'External Site Bypass (Personal Website link detected)';
    } else if (socialRegex.test(text)) {
      hasViolation = true;
      violationReason = 'Contact detail sharing (Social handle pattern)';
    } else {
      const lowercase = text.toLowerCase();
      for (const keyword of paymentKeywords) {
        if (lowercase.includes(keyword)) {
          hasViolation = true;
          violationReason = `Direct Payment Pitch Bypass Keyword: "${keyword}"`;
          break;
        }
      }
    }

    if (hasViolation) {
      addToast(`[COMPLIANCE RULE BYPASS BLOCKED] ${violationReason}`, 'error');
      
      const alias = chatSenderIdentity;
      const currentInfractions = (infractionCount[alias] || 0) + 1;
      
      setInfractionCount(prev => ({
        ...prev,
        [alias]: currentInfractions
      }));

      const now = new Date().toLocaleTimeString();
      setComplianceLogs(prev => [
        ...prev,
        `[${now}] VIOLATION ALERT: ${alias} triggered ${violationReason}.`,
        `[${now}] Webhook dispatched to C-suite: [INFRACTIONS: ${currentInfractions}/2]`
      ]);

      const deletePacket = {
        action: 'DELETE_PACKET_BROADCAST',
        target_alias: alias,
        reason: violationReason,
        timestamp: Math.floor(Date.now() / 1000)
      };
      setComplianceLogs(prev => [
        ...prev,
        `[Socket Broadcast] Broadcasted emergency DELETE command: ${JSON.stringify(deletePacket)}`
      ]);

      if (currentInfractions >= 2) {
        setIsMuted(true);
        setMuteCountdown(60); // Simulated 60s mutex countdown
        addToast(`[24-HOUR INFRACTION MUTEX LOCKOUT] ${alias} breached rule twice. Transmission locked.`, 'warn');
      }

      return false;
    }

    return true;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (connectionState !== 'CONNECTED') {
      addToast('ASGI Connection offline. Transmit failed.', 'error');
      return;
    }

    if (isMuted) {
      addToast(`Transmit locked. 24-Hour Infraction Mutex Active (${muteCountdown}s left).`, 'error');
      return;
    }

    const isApproved = runPreRoutingComplianceCheck(inputMessage);
    if (!isApproved) {
      setInputMessage('');
      return;
    }

    const uuid = 'msg_' + Math.random().toString(36).substring(2, 11);
    const packet = {
      "channel_id": activeChannel,
      "sender_alias": chatSenderIdentity,
      "payload": inputMessage,
      "timestamp": Math.floor(Date.now() / 1000),
      "transport": transportMode
    };

    setLastTransmittedPacket(packet);

    const newMsg: Message = {
      id: uuid,
      channel_id: activeChannel,
      sender_alias: chatSenderIdentity,
      payload: inputMessage,
      timestamp: Date.now()
    };

    apiService.sendChatMessage({
      id: uuid,
      channel: activeChannel,
      sender: chatSenderIdentity,
      senderRole: activeRole,
      text: inputMessage
    });

    if (chatChannelRef.current) {
      chatChannelRef.current.send({
        type: 'broadcast',
        event: 'chat_message',
        payload: newMsg
      });
    }

    setMessages(prev => [...prev, newMsg].slice(-50));
    setPendingBatchCount(prev => prev + 1);
    setInputMessage('');
    addToast(`Message sent via ${transportMode === 'WEBSOCKET' ? 'WebSocket' : 'HTTP Long Polling Fallback'}.`, 'success');
  };

  const handleVote = (msgId: string, optionIndex: number) => {
    if (activeRole !== 'DEV') {
      addToast('Voting is restricted to Developers only.', 'error');
      return;
    }

    setMessages(prev => prev.map(msg => {
      if (msg.id !== msgId) return msg;
      
      try {
        const text = msg.payload || '';
        if (!text || !text.startsWith('[POLL_DATA]:')) return msg;
        const poll = JSON.parse(text.substring(12));
        
        if (poll.votedBy.includes(chatSenderIdentity)) {
          addToast('You have already cast your vote on this poll.', 'warn');
          return msg;
        }

        poll.options[optionIndex].votes += 1;
        poll.votedBy.push(chatSenderIdentity);

        addToast(`Vote registered for "${poll.options[optionIndex].text}"`, 'success');

        return {
          ...msg,
          payload: `[POLL_DATA]:${JSON.stringify(poll)}`
        };
      } catch (err) {
        return msg;
      }
    }));
  };

  const handleCreatePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestion.trim()) {
      addToast('Question cannot be empty.', 'error');
      return;
    }
    const filteredOptions = pollOptions.filter(o => o.trim() !== '');
    if (filteredOptions.length < 2) {
      addToast('Please provide at least 2 options.', 'error');
      return;
    }

    const pollObj = {
      question: pollQuestion,
      options: filteredOptions.map(o => ({ text: o, votes: 0 })),
      votedBy: []
    };

    const payload = `[POLL_DATA]:${JSON.stringify(pollObj)}`;
    const uuid = 'msg_' + Math.random().toString(36).substring(2, 11);
    
    const newMsg: Message = {
      id: uuid,
      channel_id: activeChannel,
      sender_alias: chatSenderIdentity,
      payload: payload,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMsg].slice(-50));
    setPollQuestion('');
    setPollOptions(['', '']);
    setIsPollModalOpen(false);
    addToast('Voting poll published to channel.', 'success');
  };

  const handleAttachCode = () => {
    if (!codeSnippet.trim()) {
      addToast('Snippet cannot be empty.', 'error');
      return;
    }
    const formattedPayload = `\`\`\`${codeLanguage}\n${codeSnippet}\n\`\`\``;
    setInputMessage(formattedPayload);
    setIsCodeModalOpen(false);
    setCodeSnippet('');
    addToast('Markdown code vault attachment added.', 'info');
  };

  const handleSimulateDropout = () => {
    setConnectionState('DISCONNECTED');
    setConnectionLogs(prev => [...prev, '[Socket] Connection dropped by client node test.']);
    addToast('Simulating WebSocket connection loss.', 'warn');
    setReconnectAttempt(1);
  };

  const handleToggleFallbackMode = () => {
    const nextMode = transportMode === 'WEBSOCKET' ? 'HTTP_LONG_POLLING' : 'WEBSOCKET';
    setTransportMode(nextMode);
    addToast(`Transport degraded to: ${nextMode}. VPN/Firewall bypass active.`, 'info');
  };

  useEffect(() => {
    if (connectionState === 'DISCONNECTED' && reconnectAttempt > 0) {
      const delay = Math.pow(2, reconnectAttempt) * 1000;
      const timer = setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        setConnectionLogs(prev => [
          ...prev,
          `[${timestamp}] Reconnecting WebSocket... Attempt ${reconnectAttempt} (Wait: ${delay/1000}s)`
        ]);

        if (reconnectAttempt >= 3) {
          setConnectionState('CONNECTED');
          setConnectionLogs(prev => [
            ...prev,
            `[${timestamp}] [SUCCESS] WebSocket re-established on port 3000.`
          ]);
          setReconnectAttempt(0);
          addToast('WebSocket connection recovered.', 'success');
        } else {
          setReconnectAttempt(prev => prev + 1);
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [connectionState, reconnectAttempt]);

  const handleCopyMessage = (payload: string) => {
    navigator.clipboard.writeText(payload);
    addToast('Payload copied to clipboard.', 'success');
  };

  const handleRevokeSocket = (sender: string) => {
    addToast(`C-suite Action: Master WebSocket revoked for ${sender}. Socket disconnected.`, 'error');
    setConnectionLogs(prev => [
      ...prev,
      `[MASTER REVOCATION] Revoked session token and disconnected socket node for ${sender}`
    ]);
  };

  const handleGenerateAISummary = () => {
    const channelMsgs = messages.filter(m => m.channel_id === activeChannel && !m.isSystem);
    if (channelMsgs.length === 0) {
      addToast('No chat history available to analyze.', 'warn');
      return;
    }

    const summary = `### UB SOLUTIONS AUTOMATED PROGRESS BRIEF - ${activeChannel}
- **Analyzed Stream**: ${channelMsgs.length} messages
- **Contributors**: ${Array.from(new Set(channelMsgs.map(m => m.sender_alias))).join(', ')}
- **Technical Status**: Engineering sprint on track. Multi-currency remittance & scraper pipelines validated.`;

    const sysMsg: Message = {
      id: 'ai_' + Date.now(),
      channel_id: activeChannel,
      sender_alias: 'SYSTEM BOT',
      payload: summary,
      timestamp: Date.now(),
      isSystem: true
    };

    setMessages(prev => [...prev, sysMsg].slice(-50));
    addToast('Automated Progress Brief generated cleanly.', 'success');
  };

  const handleWipeSessionMemory = () => {
    addToast('Triggering DOM & Session memory sanitization sweep...', 'warn');
    setMessages([]);
    setConnectionLogs(['[Sanitization Sweep] Zeroized messaging buffer arrays and localStorage cache.']);
    setComplianceLogs(['[Sanitization Sweep] Purged session security logs.']);
    setLastTransmittedPacket({ "status": "SANITY_SWEEPED", "records": 0 });
    setTimeout(() => {
      setActiveRole('CEO');
      addToast('End-of-Session Memory Sanitization complete. Returned to CEO panel.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 font-mono text-zinc-100">
      
      {/* 1. Header with System Architecture Diagnostics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900 border border-zinc-800 p-4 gap-4 rounded">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="text-emerald-500 animate-pulse" size={16} />
            <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
              FastAPI ASGI Pool ({FASTAPI_ASGI_METRICS.activeSockets.toLocaleString()} sockets) | Redis Pub/Sub Healthy
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            UB Solutions Secure Anonymous Chat Hub
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Cryptographically masked chat environment. HSM AES-256-GCM vault active.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* HSM Cryptography Vault button */}
          <button
            onClick={() => setShowHsmModal(true)}
            className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer rounded"
          >
            <ShieldCheck size={12} />
            HSM Vault Mappings
          </button>

          {/* HTTP Long Polling Fallback toggle */}
          <button
            onClick={handleToggleFallbackMode}
            className={`px-3 py-1.5 bg-zinc-950 border text-[10px] uppercase font-bold flex items-center gap-1.5 transition-colors rounded cursor-pointer ${transportMode === 'HTTP_LONG_POLLING' ? 'border-yellow-500 text-yellow-400' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
          >
            <Layers size={12} />
            {transportMode === 'WEBSOCKET' ? 'Fallback: Long Polling' : 'Mode: HTTP Polling'}
          </button>

          {/* Simulate network drop */}
          <button
            onClick={handleSimulateDropout}
            className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-yellow-500/50 text-[10px] text-yellow-500 uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer rounded"
          >
            <Wifi size={12} />
            Drop Socket
          </button>

          {/* End-of-Session Memory Sanitization */}
          <button
            onClick={handleWipeSessionMemory}
            className="px-3 py-1.5 bg-red-950/40 border border-red-900/50 hover:bg-red-900 hover:text-black text-[10px] text-red-400 uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer rounded"
          >
            <Trash2 size={12} />
            Sanitize RAM
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            className="lg:hidden px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-1 cursor-pointer rounded"
          >
            {isMobileDrawerOpen ? <X size={14} /> : <Menu size={14} />}
            Channels
          </button>
        </div>
      </div>

      {/* Real-Time Telemetry Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-950/70 border border-zinc-800 p-3 rounded text-[10px]">
        <div className="space-y-0.5">
          <span className="text-zinc-500 block uppercase font-bold">FastAPI ASGI Pool</span>
          <span className="text-emerald-400 font-bold">{FASTAPI_ASGI_METRICS.activeSockets.toLocaleString()} / 50k Concur. Sockets</span>
        </div>
        <div className="space-y-0.5">
          <span className="text-zinc-500 block uppercase font-bold">Redis Pub/Sub Sync</span>
          <span className="text-emerald-400 font-bold">{REDIS_CLUSTER_NODES[0].messagesPerSec} msg/s ({REDIS_CLUSTER_NODES[0].pubSubLatencyMs}ms)</span>
        </div>
        <div className="space-y-0.5">
          <span className="text-zinc-500 block uppercase font-bold">Supabase Real-Time</span>
          <span className="text-emerald-400 font-bold">Dedicated Broadcast Replica</span>
        </div>
        <div className="space-y-0.5">
          <span className="text-zinc-500 block uppercase font-bold">30s Heartbeat Ping-Pong</span>
          <span className="text-emerald-400 font-bold">{pingLatencyMs}ms Latency (Last ping: {new Date(lastPingPongTime).toLocaleTimeString()})</span>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
        
        {/* Left column: Mobile responsive Channel Drawer */}
        <div className={`lg:block lg:col-span-3 bg-zinc-900/60 border border-zinc-800 p-4 space-y-6 rounded ${isMobileDrawerOpen ? 'block absolute z-50 inset-x-0 top-0 bg-zinc-950 p-6 border-2 border-emerald-500' : 'hidden'}`}>
          
          {/* Active Sender Mask Configurator */}
          <div className="p-3 bg-zinc-950/80 border border-zinc-850 rounded">
            <label className="text-[9px] text-zinc-400 uppercase tracking-widest block font-bold mb-2">Sender Mask Profile</label>
            <select
              value={chatSenderIdentity}
              onChange={(e) => {
                setChatSenderIdentity(e.target.value);
                addToast(`Sender masked as ${e.target.value}`, 'info');
              }}
              className="w-full bg-zinc-900 border border-zinc-800 text-[11px] p-2 outline-none text-emerald-400 font-mono font-bold rounded"
            >
              <option value="UB">UB (CEO)</option>
              <option value="SAM">SAM (CFO/COO)</option>
              <option value="AMMAR">AMMAR (CTO)</option>
              <option value="UB_CAIO">UB_CAIO (Chief AI)</option>
              <option value="UB_CMO">UB_CMO (Chief Marketing)</option>
              <option value="UB_CSO">UB_CSO (Chief Security)</option>
              <option value="UB_DEV_14">UB_DEV_14 (Senior Dev)</option>
              <option value="UB_DEV_04">UB_DEV_04 (Core Dev)</option>
              <option value="CardioCare Client">Client Profile</option>
            </select>
            <span className="text-[8px] text-zinc-500 mt-1 block">HSM Cryptography Masking Active</span>
          </div>

          {/* Group Rooms */}
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest block">Group Rooms</span>
            <div className="space-y-1">
              {[
                { name: '#general-lobby', label: 'Central Lobby Chat' },
                { name: '#cto-pipeline', label: 'CTO Engineering' },
                { name: '#escrow-feed', label: 'Escrow Ledgers' }
              ].map((ch) => (
                <button
                  key={ch.name}
                  onClick={() => {
                    setActiveChannel(ch.name as any);
                    setUnreads(prev => ({ ...prev, [ch.name]: 0 }));
                    setIsMobileDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex justify-between items-center border transition-all rounded cursor-pointer ${activeChannel === ch.name ? 'bg-zinc-900 text-emerald-400 border-zinc-700 font-bold' : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40'}`}
                >
                  <span className="truncate">{ch.name}</span>
                  {unreads[ch.name] > 0 && (
                    <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500 text-zinc-950 font-bold rounded-full">
                      {unreads[ch.name]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Secure DM Channels */}
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest block">Encrypted P2P DMs</span>
            <div className="space-y-1">
              {['UB (CEO)', 'SAM (CFO)', 'AMMAR (CTO)', 'UB_DEV_14'].map((user) => (
                <button
                  key={user}
                  onClick={() => {
                    setActiveChannel(user as any);
                    setUnreads(prev => ({ ...prev, [user]: 0 }));
                    setIsMobileDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex justify-between items-center border transition-all rounded cursor-pointer ${activeChannel === user ? 'bg-zinc-900 text-emerald-400 border-zinc-700 font-bold' : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40'}`}
                >
                  <span className="truncate">{user}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Socket Pool Diagnostics */}
          <div className="p-3 bg-zinc-950/60 border border-zinc-850 space-y-2 rounded">
            <div className="flex justify-between items-center text-[9px] uppercase">
              <span className="text-zinc-500 font-bold">Transport Layer</span>
              <span className={`font-bold ${connectionState === 'CONNECTED' ? 'text-emerald-400' : 'text-yellow-500 animate-pulse'}`}>{transportMode}</span>
            </div>
            <div className="text-[8px] text-zinc-500 font-mono space-y-1 max-h-[100px] overflow-y-auto">
              {connectionLogs.map((log, index) => (
                <div key={index} className="line-clamp-2">{log}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Center column: Active Encrypted Chat Stream */}
        <div className="col-span-1 lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded flex flex-col justify-between min-h-[560px]">
          
          {/* Chat Header */}
          <div className="border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-950/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">{activeChannel}</span>
                <span className="text-[8px] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-zinc-400">AES-256-GCM</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {activeRole === 'CLIENT' ? '🛡️ Client Redaction Middleware Active: All Dev IDs displayed as "UB Technologies Engineer"' : 'Full executive visibility active'}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleGenerateAISummary}
                className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-[9px] text-emerald-400 uppercase font-bold flex items-center gap-1 transition-colors rounded cursor-pointer"
              >
                <FileText size={11} />
                Generate Brief
              </button>
            </div>
          </div>

          {/* Messages view */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[380px] min-h-[380px]">
            {messages.filter(m => m.channel_id === activeChannel).map((msg) => {
              const isMe = msg.sender_alias === chatSenderIdentity;
              const isSys = msg.isSystem || msg.sender_alias === 'SYSTEM' || msg.sender_alias === 'SYSTEM BOT';
              const displaySender = getSenderDisplay(msg.sender_alias);

              if (isSys) {
                return (
                  <div key={msg.id} className="p-3 bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-400 rounded leading-relaxed">
                    <span className="font-bold text-[9px] tracking-widest block uppercase mb-1">⚠️ SYSTEM NOTICE LOG ENTRY</span>
                    {msg.payload}
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-zinc-400 uppercase font-bold">
                      {displaySender}
                    </span>
                    <span className="text-[8px] text-zinc-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    
                    {/* Master C-Suite Revocation Kill-Switch Button */}
                    {(['CEO', 'CFO', 'COO', 'CTO'].includes(activeRole)) && !isMe && (
                      <button
                        onClick={() => handleRevokeSocket(msg.sender_alias)}
                        className="text-[8px] text-red-400 hover:text-red-300 bg-red-950/40 px-1.5 py-0.5 border border-red-900/60 rounded cursor-pointer"
                        title="Master C-Suite One-Click Emergency Revocation"
                      >
                        Disconnect Node
                      </button>
                    )}
                  </div>

                  {(() => {
                    let isPoll = false;
                    let pollObj: any = null;
                    const text = msg.payload || '';
                    if (typeof text === 'string' && text.startsWith('[POLL_DATA]:')) {
                      try {
                        pollObj = JSON.parse(text.substring(12));
                        isPoll = true;
                      } catch (e) {
                        isPoll = false;
                      }
                    }

                    return (
                      <div className={`p-3 max-w-sm rounded text-xs leading-relaxed break-words font-mono ${isMe && !isPoll ? 'bg-emerald-500 text-black font-semibold' : 'bg-zinc-950 border border-zinc-800 text-zinc-200'}`}>
                        {isPoll && pollObj ? (
                          <div className="space-y-2.5 w-[240px] sm:w-[280px]">
                            <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex items-center gap-1.5">
                              <Radio size={12} className="animate-pulse" />
                              Interactive Team Poll
                            </div>
                            <div className="text-xs font-semibold text-white">{pollObj.question}</div>
                            <div className="space-y-1.5">
                              {pollObj.options.map((opt: any, idx: number) => {
                                const totalVotes = pollObj.options.reduce((acc: number, o: any) => acc + o.votes, 0);
                                const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                                const hasVoted = pollObj.votedBy.includes(chatSenderIdentity);
                                
                                return (
                                  <button
                                    type="button"
                                    key={idx}
                                    onClick={() => handleVote(msg.id, idx)}
                                    disabled={hasVoted}
                                    className="w-full text-left p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col relative overflow-hidden group cursor-pointer disabled:cursor-default"
                                  >
                                    <div 
                                      className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 transition-all duration-500" 
                                      style={{ width: `${percentage}%` }}
                                    />
                                    <div className="flex justify-between items-center relative z-10 w-full text-[10px]">
                                      <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">{opt.text}</span>
                                      <span className="text-emerald-400 font-bold">{opt.votes} ({percentage}%)</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            <div className="text-[9px] text-zinc-500 flex justify-between">
                              <span>Total Votes: {pollObj.options.reduce((acc: number, o: any) => acc + o.votes, 0)}</span>
                              {pollObj.votedBy.includes(chatSenderIdentity) && <span className="text-emerald-400 font-bold">✓ Voted</span>}
                            </div>
                          </div>
                        ) : typeof text === 'string' && text.startsWith('```') ? (
                          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[10px] bg-black/50 p-2 rounded border border-zinc-800">
                            {text.replace(/```[a-z]*\n?/g, '')}
                          </pre>
                        ) : (
                          text
                        )}
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => handleCopyMessage(msg.payload || '')}
                    className="text-[8px] text-zinc-500 hover:text-zinc-300 flex items-center gap-0.5 mt-1 cursor-pointer"
                  >
                    <Copy size={8} />
                    Copy Payload
                  </button>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Live Typing Status Stream Payload Inspector */}
          <div className="px-4 py-1.5 border-t border-zinc-850 bg-zinc-950/40 text-[10px] text-zinc-400 min-h-[30px] flex justify-between items-center font-mono">
            <span>
              {typingPayload ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <Activity size={10} className="animate-spin" />
                  Typing payload: <code className="bg-black/60 px-1 rounded text-[9px]">{JSON.stringify(typingPayload)}</code>
                </span>
              ) : (
                'No active typing detected.'
              )}
            </span>
            <span className="text-[8px] text-zinc-500">Buffer Index: {messages.filter(m => m.channel_id === activeChannel).length}/50</span>
          </div>

          {/* Form message sender */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-950/60 flex items-center gap-2">
            {/* Markdown Code Vault attachment */}
            <button
              type="button"
              onClick={() => setIsCodeModalOpen(true)}
              className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all rounded cursor-pointer"
              title="Attach markdown code snippet"
            >
              <Code size={16} />
            </button>

            {/* C-suite Poll / Quiz attachment */}
            {isCSuite && (
              <button
                type="button"
                onClick={() => setIsPollModalOpen(true)}
                className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all rounded cursor-pointer"
                title="Create custom team poll / quiz (C-suite only)"
              >
                <Radio size={16} />
              </button>
            )}

            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              disabled={isMuted}
              placeholder={isMuted ? `INFRACTION MUTEX ACTIVE: Wait ${muteCountdown}s...` : "Transmit payload through secure ASGI gateway..."}
              className="flex-1 bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 outline-none focus:border-emerald-500/50 text-zinc-100 placeholder-zinc-500 rounded"
            />

            <button
              type="submit"
              disabled={isMuted}
              className="p-2.5 bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors rounded cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-600"
            >
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* Right column: Pre-Routing RegEx Inspector, Infraction Mutex & Postgres 5s Flush Queue */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          {/* Compliance & Webhook logs */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-4 space-y-3 rounded">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-white">
                <ShieldAlert size={14} className="text-red-400" />
                Pre-Routing RegEx Scanner
              </span>
              <span className="text-[8px] bg-red-950 text-red-400 px-1.5 py-0.5 border border-red-900/40 font-bold uppercase">Active</span>
            </div>
            
            <p className="text-[10px] text-zinc-400">Blocks phones, emails, personal sites, LinkedIn, GitHub, Skype & payment bypass.</p>

            {/* Infraction Mutex Lockout Ledger */}
            <div className="p-2.5 bg-zinc-950/80 border border-zinc-850 space-y-2 text-[10px] rounded">
              <span className="text-[8px] text-zinc-400 block uppercase font-bold tracking-widest">24-Hr Infraction Ledger</span>
              <div className="flex justify-between items-center text-xs">
                <span>UB_DEV_14</span>
                <span className={`font-bold ${infractionCount['UB_DEV_14'] > 0 ? 'text-red-400' : 'text-zinc-500'}`}>{infractionCount['UB_DEV_14']} / 2 Max</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>UB_DEV_04</span>
                <span className={`font-bold ${infractionCount['UB_DEV_04'] > 0 ? 'text-red-400' : 'text-zinc-500'}`}>{infractionCount['UB_DEV_04']} / 2 Max</span>
              </div>
            </div>

            {/* Compliance Terminal */}
            <div className="bg-zinc-950 border border-zinc-850 p-2 text-[8px] text-zinc-400 font-mono space-y-1.5 h-[140px] overflow-y-auto rounded">
              {complianceLogs.map((log, index) => (
                <div key={index} className="line-clamp-3">{log}</div>
              ))}
            </div>
          </div>

          {/* WebSocket Transport Monitor */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-4 space-y-3 rounded">
            <span className="text-[10px] font-bold uppercase tracking-widest block border-b border-zinc-800 pb-2 text-white">Transport Frame Monitor</span>
            <p className="text-[10px] text-zinc-400">Intersects ASGI socket frames.</p>
            <div className="p-3 bg-zinc-950 border border-zinc-850 text-[9px] text-emerald-400 rounded font-mono overflow-x-auto whitespace-pre">
              {JSON.stringify(lastTransmittedPacket, null, 2)}
            </div>
          </div>

          {/* 5 Seconds PostgreSQL Async Queue Flush */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-4 space-y-3 rounded">
            <span className="text-[10px] font-bold uppercase tracking-widest block border-b border-zinc-800 pb-2 text-white">PostgreSQL 5s Batch Buffer</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-zinc-400">Queue Flush Countdown</span>
                <span className="text-emerald-400 font-bold">{batchTimer}s</span>
              </div>
              <div className="h-2 bg-zinc-950 rounded overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(batchTimer / 5) * 100}%` }} />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-zinc-400">Uncommitted Messages:</span>
              <span className="font-bold text-zinc-100">{pendingBatchCount} queued</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Attachment Modal */}
      {isCodeModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm" onClick={() => setIsCodeModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-zinc-950 border border-zinc-800 p-6 z-[110] font-mono shadow-2xl rounded">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Markdown Code Vault Attachment</h3>
            <p className="text-xs text-zinc-400 mb-4">Formats code snippets cleanly inside markdown wrappers to prevent arbitrary executable code injection.</p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Language</label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 text-emerald-400 outline-none rounded"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python (FastAPI)</option>
                  <option value="sql">PostgreSQL SQL</option>
                  <option value="json">JSON Payload</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Code Contents</label>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="// Paste code snippet here..."
                  rows={6}
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-3 font-mono outline-none text-zinc-100 rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCodeModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 uppercase font-bold rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAttachCode}
                  className="px-4 py-2 bg-emerald-500 text-black text-xs uppercase font-bold hover:bg-emerald-400 rounded cursor-pointer"
                >
                  Attach Snippet
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Poll Creator Modal */}
      {isPollModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm" onClick={() => setIsPollModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-zinc-950 border border-zinc-800 p-6 z-[110] font-mono shadow-2xl rounded text-zinc-100">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Create Team Decision Poll</h3>
            <p className="text-xs text-zinc-400 mb-4">C-suite exclusive feature. Solicit feedback and consensus from developers directly within the encrypted channel.</p>

            <form onSubmit={handleCreatePollSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Question / Decision Topic</label>
                <input
                  type="text"
                  required
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Which framework should we use for the new client project?"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 text-zinc-100 outline-none rounded focus:border-emerald-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 uppercase font-bold block">Options (At least 2)</label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      required={idx < 2}
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...pollOptions];
                        newOpts[idx] = e.target.value;
                        setPollOptions(newOpts);
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 bg-zinc-900 border border-zinc-800 text-xs p-2 text-zinc-100 outline-none rounded focus:border-emerald-500/50"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))}
                        className="px-2 text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[10px] text-emerald-400 hover:underline uppercase font-bold block mt-1"
                  >
                    + Add Option
                  </button>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={() => setIsPollModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 uppercase font-bold rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-black text-xs uppercase font-bold hover:bg-emerald-400 rounded cursor-pointer"
                >
                  Publish Poll
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* HSM Cryptography Vault Modal */}
      {showHsmModal && (
        <>
          <div className="fixed inset-0 bg-black/85 z-[100] backdrop-blur-sm" onClick={() => setShowHsmModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-zinc-950 border-2 border-emerald-500/60 p-6 z-[110] font-mono shadow-2xl rounded">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={20} />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Hardware Security Module (HSM) Cryptography</h3>
              </div>
              <button onClick={() => setShowHsmModal(false)} className="text-zinc-500 hover:text-white text-sm">✕</button>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <p className="leading-relaxed">
                The mapping table connecting Real User IDs to Anonymous Aliases is encrypted inside a physical Hardware Security Module using AES-256-GCM.
              </p>

              <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-2 rounded text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">HSM Vault Identifier:</span>
                  <span className="font-bold text-emerald-400">{HSM_VAULT_DATA.vaultId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Encryption Standard:</span>
                  <span className="font-bold text-white">{HSM_VAULT_DATA.encryptionAlgo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Last Key Rotation:</span>
                  <span className="text-zinc-400">{HSM_VAULT_DATA.keyRotationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Vault Security State:</span>
                  <span className="text-emerald-400 font-bold uppercase">{HSM_VAULT_DATA.status}</span>
                </div>
              </div>

              <div className="p-3 bg-black/60 border border-zinc-850 text-[10px] text-zinc-400 space-y-1 rounded">
                <span className="text-zinc-500 block uppercase font-bold">Encrypted Alias Hash Token:</span>
                <code className="text-emerald-400 break-all block font-bold">{HSM_VAULT_DATA.encryptedAlias}</code>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowHsmModal(false)}
                  className="px-5 py-2 bg-emerald-500 text-black font-bold uppercase text-xs rounded hover:bg-emerald-400 cursor-pointer"
                >
                  Close Vault Inspector
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default AnonymousChat;
