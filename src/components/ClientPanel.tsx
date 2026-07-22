import React, { useState } from 'react';
import { 
  Milestone, ShieldCheck, UploadCloud, MessageSquare, Landmark, 
  HelpCircle, CheckCircle2, Sliders, Key, Gift, Lock, Globe,
  Star, MessageCircle, AlertCircle, ArrowUpRight, Check,
  Download, LayoutGrid, Eye, BellRing, ChevronRight, Clock, ShieldAlert, FileText, Search
} from 'lucide-react';
import { 
  ProjectTask, ChangeRequestTicket, ZohoContract, 
  EscrowTransaction, SandboxStatus 
} from '../types';
import { DashboardVisual } from './DashboardVisual';

interface ClientPanelProps {
  tasks: ProjectTask[];
  escrows: EscrowTransaction[];
  sandboxes: SandboxStatus[];
  changeRequests: ChangeRequestTicket[];
  setChangeRequests: React.Dispatch<React.SetStateAction<ChangeRequestTicket[]>>;
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
}

export const ClientPanel: React.FC<ClientPanelProps> = ({
  tasks,
  escrows,
  sandboxes,
  changeRequests,
  setChangeRequests,
  addToast
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'timezone_escrow' | 'privacy_gsc'>('roadmap');

  // Timezone Scheduler State
  const [clientTimezone, setClientTimezone] = useState<'EST (UTC-5)' | 'GMT (UTC+0)' | 'PST (UTC-8)'>('EST (UTC-5)');
  const [clientBookingTime, setClientBookingTime] = useState('10:00 AM');

  // Data Privacy Engine state
  const [piiLogs, setPiiLogs] = useState<string[]>([
    '[DPDP Engine] IP Address 198.51.100.42 classified as PII & masked.',
    '[GDPR Engine] Chat log payload encrypted at rest.',
    '[CCPA Engine] Client data retention set to 30 days max.'
  ]);

  // Change Request state
  const [ticketType, setTicketType] = useState<'UI Adjustment' | 'Logic Bug' | 'API Modification'>('UI Adjustment');
  const [ticketPriority, setTicketPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [ticketDesc, setTicketDesc] = useState('');

  // Client Redacted Display Helper
  const redactedDevName = "UB Technologies Engineer";

  const isEscrowCleared = escrows.find(esc => esc.client === 'CardioCare Diagnostics')?.status === 'Released';

  const handleBookMilestoneMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const istTime = clientTimezone === 'EST (UTC-5)' ? '8:30 PM IST' : clientTimezone === 'GMT (UTC+0)' ? '3:30 PM IST' : '11:30 PM IST';
    addToast(`Milestone Session booked for ${clientBookingTime} ${clientTimezone} (Translates cleanly to ${istTime}).`, 'success');
  };

  const handleTriggerPiiDataPurge = () => {
    addToast('GDPR/CCPA Data Erasure Request submitted. PII logs zeroized cleanly.', 'warn');
    setPiiLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] USER_ERASURE_REQUEST executed. PII wiped.`]);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDesc.trim()) {
      addToast('Ticket description cannot be empty.', 'error');
      return;
    }
    const newTicket: ChangeRequestTicket = {
      id: `CR-${Math.floor(100 + Math.random() * 900)}`,
      clientName: 'CardioCare Diagnostics',
      type: ticketType,
      description: ticketDesc,
      priority: ticketPriority,
      status: 'Open',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setChangeRequests(prev => [newTicket, ...prev]);
    addToast('Change-Request ticket logged securely. Assigned to Dev pipeline.', 'success');
    setTicketDesc('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 font-mono text-zinc-100">
      <DashboardVisual image="/images/dash_client.png" title="Client Transparency Gateway" subtitle="Project Timeline • Deliverables • Compliance" />
      
      {/* Tab Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-900 border border-zinc-800 p-1 rounded gap-1">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'roadmap' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <LayoutGrid size={15} />
          Roadmap & Handovers
        </button>
        <button
          onClick={() => setActiveTab('timezone_escrow')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'timezone_escrow' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Clock size={15} />
          Multi-Timezone & Escrow Ledger
        </button>
        <button
          onClick={() => setActiveTab('privacy_gsc')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'privacy_gsc' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <ShieldAlert size={15} />
          Data Privacy & GSC Search Index
        </button>
      </div>

      {/* TAB 1: Roadmap, Redacted Dev & Code Handover */}
      {activeTab === 'roadmap' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Milestone size={24} className="text-emerald-400" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 font-mono">Portal UI & Localization</span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">CardioCare Diagnostics Client Portal</h1>
              <p className="text-sm text-zinc-400 mt-1">Real-time delivery progress, masked developer identity, and final repository handover.</p>
            </div>
            
            {/* Client-Enforced Redaction Middleware Pill */}
            <div className="bg-zinc-950 p-4 border border-zinc-800 flex items-center gap-3 rounded shrink-0">
              <ShieldCheck className="text-emerald-400" size={20} />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">Assigned Engineering Capacity</span>
                <span className="text-sm font-bold text-emerald-400 block font-mono">{redactedDevName}</span>
                <span className="text-[9px] text-zinc-500 block uppercase font-mono">Client Middleware Identity Redaction Active</span>
              </div>
            </div>
          </div>

          {/* Delivery Roadmap */}
          <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider font-mono">Real-Time Delivery Roadmap</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2">
              {[
                { label: 'Contract Signed', desc: 'NDA & IP terms authorized.' },
                { label: 'Architecture LLD', desc: 'Low-level schema verified.' },
                { label: 'Core Scraper Dev', desc: 'Headless browser indexing.' },
                { label: 'Staging Sandbox', desc: 'Access active on preview.' },
                { label: 'Compliance Audit', desc: 'Middleware sanitization.' },
                { label: 'Production Handover', desc: 'Unlock final repository zip.' }
              ].map((step, i) => (
                <div key={i} className="p-3 bg-zinc-900 border border-zinc-850 text-center rounded">
                  <div className="font-mono text-xs font-bold text-emerald-400">0{i+1}</div>
                  <div className="text-[11px] font-bold uppercase text-white mt-1">{step.label}</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Handover & Upgrades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <Lock size={16} className="text-emerald-500" />
                  Final Repository Handover Node
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Unlocks codebase download once milestone payment is released from escrow.</p>
              </div>

              {isEscrowCleared ? (
                <button
                  onClick={() => addToast('Downloading consolidated repository ZIP bundle...', 'success')}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-3 text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  Download Complete Repository ZIP
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-zinc-800 border border-zinc-700 text-zinc-500 font-bold uppercase py-3 text-xs rounded cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock size={14} />
                  Handover Locked (Awaiting Escrow Release)
                </button>
              )}
            </div>

            {/* Log Change Request Form */}
            <form onSubmit={handleSubmitTicket} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-3">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Log Change-Request Ticket</h3>
              <div className="space-y-2">
                <input 
                  type="text"
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Describe requested change..."
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 outline-none text-zinc-100 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2.5 text-xs rounded font-bold cursor-pointer"
                >
                  Log Ticket to Dev Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: Multi-Timezone Scheduling & Escrow Audit Feed */}
      {activeTab === 'timezone_escrow' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Localization & Escrow Hashing</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Multi-Timezone Scheduler & Escrow Audit Feed</h1>
            <p className="text-sm text-zinc-400 mt-1">Book milestones in EST/GMT with clean conversion to IST and verify transaction-hash-linked escrow disbursements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Multi-Timezone Scheduling Dashboard */}
            <form onSubmit={handleBookMilestoneMeeting} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                Multi-Timezone Milestone Scheduler
              </h3>
              <p className="text-[11px] text-zinc-400">Allows clients in EST/GMT to book milestones that translate clearly to India Standard Time (IST).</p>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">Client Timezone</label>
                  <select
                    value={clientTimezone}
                    onChange={(e) => setClientTimezone(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 text-emerald-400 outline-none rounded font-bold"
                  >
                    <option value="EST (UTC-5)">EST (US East Coast - UTC-5)</option>
                    <option value="GMT (UTC+0)">GMT (London / Europe - UTC+0)</option>
                    <option value="PST (UTC-8)">PST (US West Coast - UTC-8)</option>
                  </select>
                </div>

                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Selected Booking Time:</span>
                    <span className="text-white font-bold">{clientBookingTime} {clientTimezone}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>India Standard Time (IST):</span>
                    <span className="text-emerald-400 font-bold font-mono">
                      {clientTimezone === 'EST (UTC-5)' ? '8:30 PM IST' : clientTimezone === 'GMT (UTC+0)' ? '3:30 PM IST' : '11:30 PM IST'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer"
                >
                  Book Translated Milestone Session
                </button>
              </div>
            </form>

            {/* Escrow Locked/Released Audit Feeds */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Landmark size={16} className="text-emerald-400" />
                Transaction-Hash Escrow Audit Feed
              </h3>
              <p className="text-[11px] text-zinc-400">Public ledger feeds outputting uneditable, transaction-hash-linked logs when milestones are cleared and disbursed.</p>
              
              <div className="space-y-3">
                {escrows.map((esc) => (
                  <div key={esc.id} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-white">{esc.project}</span>
                      <span className="text-emerald-400">₹{esc.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-[9px] text-zinc-400 flex justify-between font-mono">
                      <span>TX Hash: {esc.txHash || '0x...'}</span>
                      <span className="text-emerald-400 font-bold uppercase">{esc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GDPR, CCPA & DPDP Privacy Engine & GSC Search Index */}
      {activeTab === 'privacy_gsc' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Compliance & Diagnostics</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Data Privacy Engine & Google Search Console Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1">Dynamic GDPR/CCPA/DPDP privacy controls and real-time GSC indexing diagnostic reports.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GDPR, CCPA, & DPDP Alignment Privacy Engine */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">GDPR, CCPA & DPDP Privacy Engine</h3>
              <p className="text-[11px] text-zinc-400">Treats IP addresses and chat logs as Personally Identifiable Information (PII) to comply with European, Californian, and Indian data protection acts.</p>
              
              <div className="space-y-2">
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1 font-mono">
                  <div className="flex justify-between"><span className="text-zinc-500">GDPR Compliance (EU):</span><span className="text-emerald-400 font-bold">ACTIVE & ENFORCED</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">CCPA Compliance (US):</span><span className="text-emerald-400 font-bold">ACTIVE & ENFORCED</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">DPDP Compliance (IN):</span><span className="text-emerald-400 font-bold">ACTIVE & ENFORCED</span></div>
                </div>

                <button
                  onClick={handleTriggerPiiDataPurge}
                  className="w-full bg-red-950/80 border border-red-500 hover:bg-red-900 text-red-200 font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer"
                >
                  Request Right-to-Be-Forgotten (PII Data Erasure)
                </button>
              </div>
            </div>

            {/* Search Index Scanner Dashboard */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Search size={16} className="text-emerald-400" />
                GSC Search Index Scanner
              </h3>
              <p className="text-[11px] text-zinc-400">Diagnostic progress reports directly in client panel showing real-time indexation alerts from Google Search Console (GSC).</p>
              
              <div className="p-4 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-2 font-mono">
                <div className="flex justify-between"><span className="text-zinc-500">Scanned Domain:</span><span className="text-white font-bold">cardiocare.com</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Google Index Score:</span><span className="text-emerald-400 font-bold">98 / 100</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Index Status:</span><span className="text-emerald-400 font-bold">FULLY INDEXED ONLINE</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ClientPanel;
