import React, { useState } from 'react';
import { 
  TrendingUp, Users, Award, AlertTriangle, AlertOctagon, HelpCircle, Activity,
  Globe, Landmark, ShieldAlert, Sparkles, Database, LayoutGrid, Eye, FileText,
  ShieldCheck, CheckCircle2, DollarSign, Building, Search, Briefcase, Zap
} from 'lucide-react';
import { ProjectTask } from '../types';
import { 
  BACKUP_ROSTER, MAANG_JOBS, REGIONAL_INCOME, INTERNATIONAL_ENTITIES,
  TARGET_ACCOUNTS, VAPT_AUDIT_CONTROLS, SOC2_CONTROLS 
} from '../data';

interface CEOPanelProps {
  tasks: ProjectTask[];
  adSpend: number;
  developerSlots: number;
  founderFocus: 'In Studio' | 'In Sprints' | 'Strategic' | 'Standby';
  setFounderFocus: (focus: 'In Studio' | 'In Sprints' | 'Strategic' | 'Standby') => void;
  systemStatus: 'SECURE_SESSION' | 'LOCKOUT';
  setSystemStatus: (status: 'SECURE_SESSION' | 'LOCKOUT') => void;
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
}

export const CEOPanel: React.FC<CEOPanelProps> = ({
  tasks,
  adSpend,
  developerSlots,
  founderFocus,
  setFounderFocus,
  systemStatus,
  setSystemStatus,
  addToast
}) => {
  const [showKillModal, setShowKillModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'essentials' | 'tal_gtm' | 'security_soc2'>('essentials');

  // TAL Filter & Search state
  const [talSearch, setTalSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<'ALL' | 'HealthTech' | 'FinTech' | 'AI-First Startup'>('ALL');

  // Dynamic calculations
  const activeClients = tasks.length;
  const totalDevPayout = tasks.filter(t => t.assignedDev !== 'Unassigned').length * 2800;
  const targetRevenue = 10000000;
  const currentRevenue = 6840000;
  const revenuePercent = (currentRevenue / targetRevenue) * 100;
  const actualWeeklyRunRate = tasks.reduce((sum, t) => {
    const val = t.tier === '₹4,999' ? 4999 : t.tier === '₹2,499' ? 2499 : 499;
    return sum + val;
  }, 0) * 30;

  const marketingROI = adSpend > 0 ? (1200000 / adSpend).toFixed(2) : '4.82';

  const handleTriggerKillSwitch = () => {
    if (systemStatus === 'LOCKOUT') {
      setSystemStatus('SECURE_SESSION');
      addToast('System lockout terminated. Master WebSocket nodes and database connections restored.', 'success');
    } else {
      setSystemStatus('LOCKOUT');
      addToast('C-SUITE EMERGENCY MASTER KILL-SWITCH ENGAGED! Sessions revoked across all developer nodes.', 'error');
    }
    setShowKillModal(false);
  };

  const handleGenerateExecutiveProgressBrief = () => {
    addToast('Automated Project Progress Brief generated. Translated dev timelines into executive client report.', 'success');
  };

  const filteredTal = TARGET_ACCOUNTS.filter(acc => {
    const matchesSearch = acc.companyName.toLowerCase().includes(talSearch.toLowerCase()) || acc.headquarters.toLowerCase().includes(talSearch.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || acc.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 font-mono text-zinc-100">
      {/* Critical Warning Banner */}
      {systemStatus === 'LOCKOUT' && (
        <div className="bg-red-950/60 border-2 border-red-500 text-red-200 p-6 rounded flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse shadow-lg">
          <div className="flex items-center gap-4">
            <AlertOctagon className="text-red-500 shrink-0" size={32} />
            <div>
              <div className="font-bold text-lg">C-SUITE MASTER KILL-SWITCH ENGAGED</div>
              <div className="text-sm text-red-300">All external developer WebSocket nodes force-disconnected. DB access suspended.</div>
            </div>
          </div>
          <button 
            onClick={() => { setSystemStatus('SECURE_SESSION'); addToast('Database & WebSockets restored.', 'success'); }}
            className="bg-red-500 hover:bg-red-600 text-black font-bold uppercase text-xs px-5 py-3 rounded shadow-md transition-colors w-full md:w-auto cursor-pointer"
          >
            De-activate Master Kill-Switch
          </button>
        </div>
      )}

      {/* Tab Switcher across 3 Executive Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-900 border border-zinc-800 p-1 rounded gap-1">
        <button
          onClick={() => setActiveTab('essentials')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'essentials' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <LayoutGrid size={15} />
          Executive Focus & Entities
        </button>
        <button
          onClick={() => setActiveTab('tal_gtm')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'tal_gtm' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Briefcase size={15} />
          Target Account List & MAANG
        </button>
        <button
          onClick={() => setActiveTab('security_soc2')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'security_soc2' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <ShieldCheck size={15} />
          SOC-2 Type II & VAPT Matrix
        </button>
      </div>

      {/* TAB 1: Essentials, Founder Focus & International Entities */}
      {activeTab === 'essentials' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-emerald-400" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 font-mono">Executive Command Suite</span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">CEO Strategic Control Overview</h1>
              <p className="text-sm text-zinc-400 mt-1">High-level growth targets, international subsidiary entities, and master session controls.</p>
            </div>
            <button
              onClick={handleGenerateExecutiveProgressBrief}
              className="px-4 py-2.5 bg-emerald-500 text-black font-bold uppercase text-xs rounded hover:bg-emerald-400 flex items-center gap-1.5 cursor-pointer shadow"
            >
              <FileText size={14} />
              1-Click Project Progress Brief
            </button>
          </div>

          {/* Core Target Revenue Progress */}
          <div className="space-y-4 bg-zinc-950/50 p-6 border border-zinc-850 rounded">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
              <div>
                <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider block">Annual Revenue Target Progress</span>
                <span className="text-2xl font-bold text-zinc-100">₹68,40,000 completed</span>
              </div>
              <div className="text-right">
                <span className="text-lg text-emerald-400 font-bold font-mono">Target: ₹1,00,00,000 ({revenuePercent.toFixed(1)}%)</span>
              </div>
            </div>
            
            <div className="h-6 bg-zinc-900 border border-zinc-800 rounded-full p-1 relative overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] transition-all duration-1000"
                style={{ width: `${revenuePercent}%` }}
              />
            </div>
          </div>

          {/* Simple Core Numbers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 uppercase block font-bold">Clients on Retainer</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{activeClients} accounts</span>
              </div>
              <Users size={32} className="text-emerald-500/80" />
            </div>

            <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 uppercase block font-bold">Weekly Income Velocity</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">₹{actualWeeklyRunRate.toLocaleString('en-IN')}</span>
              </div>
              <TrendingUp size={32} className="text-emerald-500/80" />
            </div>

            <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 uppercase block font-bold">Weekly Developer Payout</span>
                <span className="text-2xl font-bold font-mono text-red-400 mt-1 block">₹{totalDevPayout.toLocaleString()}</span>
              </div>
              <Landmark size={32} className="text-red-400/80" />
            </div>
          </div>

          {/* Establish International Entity */}
          <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
            <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
              <Building size={16} className="text-emerald-400" />
              International Subsidiary Entities
            </h3>
            <p className="text-[11px] text-zinc-400">Delaware C-Corp and Singapore Pte Ltd entities easing contracting with US/EU corporate clients who avoid direct Indian vendor onboarding.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INTERNATIONAL_ENTITIES.map((ent, i) => (
                <div key={i} className="p-4 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                  <div className="font-bold text-white">{ent.entityName}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">{ent.jurisdiction}</div>
                  <div className="text-[10px] text-zinc-400">Role: {ent.role}</div>
                  <div className="text-[9px] text-zinc-500 font-mono pt-1">{ent.einOrTaxId} | {ent.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder Status Selector */}
          <div className="pt-4 border-t border-zinc-850">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Founder Active Focus Mode</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['In Studio', 'In Sprints', 'Strategic', 'Standby'] as const).map(focus => (
                <button
                  key={focus}
                  onClick={() => {
                    setFounderFocus(focus);
                    addToast(`Founder status updated: ${focus}.`, 'success');
                  }}
                  className={`p-4 text-center rounded transition-all duration-200 border cursor-pointer ${founderFocus === focus ? 'bg-emerald-500 text-black border-emerald-500 font-bold shadow' : 'bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}`}
                >
                  <div className="text-xs font-bold uppercase font-mono">{focus}</div>
                </button>
              ))}
            </div>
          </div>

          {/* C-Suite One-Click Master WebSocket Kill-Switch */}
          <div className="pt-6 border-t border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-4 bg-red-950/10 p-6 border border-red-950/40 rounded">
            <div className="space-y-1">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">C-Suite Master Revocation Kill-Switch</span>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                Equip Global Shell with master WebSocket kill-switch that force-disconnects and revokes active session tokens for developer nodes instantly.
              </p>
            </div>
            <button
              onClick={() => setShowKillModal(true)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider rounded border transition-all w-full md:w-auto shadow-md cursor-pointer ${systemStatus === 'LOCKOUT' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400' : 'bg-red-950 border-red-500 text-red-200 hover:bg-red-900/60'}`}
            >
              {systemStatus === 'LOCKOUT' ? 'De-activate Lockout Mode' : 'C-Suite Master WebSocket Kill-Switch'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Target Account List (TAL 500) & MAANG Benchmarking */}
      {activeTab === 'tal_gtm' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Go-to-Market Strategy</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Target Account List & MAANG Benchmarks</h1>
            <p className="text-sm text-zinc-400 mt-1">Target CRM directory of 500 US tech startups and comparative pricing index proving value over SV salaries.</p>
          </div>

          {/* TAL Generation CRM */}
          <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">500 Target Account List (TAL) CRM</h3>
              <div className="flex gap-2 w-full md:w-auto">
                <input 
                  type="text" 
                  value={talSearch}
                  onChange={(e) => setTalSearch(e.target.value)}
                  placeholder="Search company or city..."
                  className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-1.5 outline-none text-zinc-100 rounded"
                />
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value as any)}
                  className="bg-zinc-900 border border-zinc-800 text-xs px-2 py-1.5 text-emerald-400 outline-none rounded"
                >
                  <option value="ALL">All Sectors</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="FinTech">FinTech</option>
                  <option value="AI-First Startup">AI-First Startups</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTal.map((acc) => (
                <div key={acc.id} className="p-4 bg-zinc-900 border border-zinc-850 rounded text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">{acc.companyName}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{acc.sector} | HQ: {acc.headquarters}</div>
                    <div className="text-[9px] text-emerald-400 font-bold mt-1">Capacity: {acc.requiredCapacity}</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 font-bold uppercase rounded">
                    {acc.outreachStage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MAANG Benchmarking Indexation */}
          <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
            <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">MAANG Benchmarking Indexation</h3>
            <p className="text-[11px] text-zinc-400">Live market pricing comparative indices continuously proving that UB Solutions offers exceptional value over Silicon Valley salaries.</p>
            
            <div className="space-y-3">
              {MAANG_JOBS.map((job, i) => (
                <div key={i} className="p-3.5 bg-zinc-900 border border-zinc-850 rounded text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white">{job.company} - {job.title}</span>
                    <div className="text-[10px] text-zinc-400 mt-0.5">SV Market Rate: {job.pay}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block text-sm">UB Solutions: ₹4,999/mo ($60/mo)</span>
                    <span className="text-[9px] text-zinc-500 uppercase font-bold">98% Savings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOC-2 Type II Compliance & VAPT Security Audit Matrix */}
      {activeTab === 'security_soc2' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Enterprise Security & Certification</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">SOC-2 Type II Compliance & VAPT Penetration Audit Matrix</h1>
            <p className="text-sm text-zinc-400 mt-1">Third-party vulnerability security audits of WebSocket controllers and Supabase RLS security rules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vulnerability Assessment & Penetration Testing (VAPT) */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">VAPT Penetration Audit Matrix</h3>
              <p className="text-[11px] text-zinc-400">Audits of WebSocket controllers, Supabase rules, and HSM encryption vault.</p>
              
              <div className="space-y-3">
                {VAPT_AUDIT_CONTROLS.map((vapt) => (
                  <div key={vapt.controlId} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                     <div className="flex justify-between font-bold">
                      <span className="text-white">{vapt.name}</span>
                      <span className="text-emerald-400 font-mono">{vapt.grade}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Category: {vapt.category}</span>
                      <span className="text-emerald-400 font-bold">{vapt.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global SOC-2 Type II Compliance Certification */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">SOC-2 Type II Certification Controls</h3>
              <p className="text-[11px] text-zinc-400">Full organizational audit controls matrix for closing large enterprise contracts.</p>
              
              <div className="space-y-3">
                {SOC2_CONTROLS.map((soc, i) => (
                  <div key={i} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-white">{soc.section}</span>
                      <span className="text-emerald-400 font-mono text-[10px]">{soc.status}</span>
                    </div>
                    <p className="text-[10px] text-zinc-400">{soc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kill Switch Trigger Confirmation Modal */}
      {showKillModal && (
        <>
          <div className="fixed inset-0 bg-black/85 z-[150] backdrop-blur-sm" onClick={() => setShowKillModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-950 border-2 border-red-500 p-8 z-[160] font-mono shadow-2xl rounded">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle size={24} className="animate-bounce" />
              <h2 className="text-lg font-bold tracking-tighter uppercase">C-SUITE MASTER REVOCATION</h2>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed mb-6 uppercase">
              Engaging Master WebSocket Kill-Switch will force-disconnect and revoke active session tokens across all developer nodes instantly.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowKillModal(false)}
                className="flex-1 bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 py-3 uppercase font-bold rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerKillSwitch}
                className="flex-1 bg-red-500 text-black text-xs py-3 font-bold uppercase hover:bg-red-400 rounded cursor-pointer"
              >
                {systemStatus === 'LOCKOUT' ? 'Restore DB access' : 'CONFIRM REVOCATION'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CEOPanel;
