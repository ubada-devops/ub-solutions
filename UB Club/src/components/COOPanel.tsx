import React, { useState } from 'react';
import { 
  Sliders, AlertCircle, Cpu, Users, Calendar, 
  FileText, ShieldCheck, CheckSquare, Settings, Globe, Award, Mail, ExternalLink, ShieldAlert, FileSignature
} from 'lucide-react';
import { ProjectTask, LeadAssignment, ZohoContract } from '../types';
import { 
  PARTNER_AFFILIATES, IEC_REGISTRATION, FREELANCER_NDAS, COLLEGE_PIPELINE 
} from '../data';

interface COOPanelProps {
  tasks: ProjectTask[];
  setTasks: React.Dispatch<React.SetStateAction<ProjectTask[]>>;
  leads: LeadAssignment[];
  setLeads: React.Dispatch<React.SetStateAction<LeadAssignment[]>>;
  contracts: ZohoContract[];
  setContracts: React.Dispatch<React.SetStateAction<ZohoContract[]>>;
  adSpend: number;
  setAdSpend: (val: number) => void;
  developerSlots: number;
  setDeveloperSlots: (val: number) => void;
  systemStatus: 'SECURE_SESSION' | 'LOCKOUT';
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
}

export const COOPanel: React.FC<COOPanelProps> = ({
  tasks,
  setTasks,
  leads,
  setLeads,
  contracts,
  setContracts,
  adSpend,
  setAdSpend,
  developerSlots,
  setDeveloperSlots,
  systemStatus,
  addToast
}) => {
  const [hardwareKillActive, setHardwareKillActive] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'leads' | 'legal_contracts' | 'recruitment_affiliates' | 'outreach'>('leads');

  // Custom Freelancer NDA Generator state (Req #7)
  const [newNdaAlias, setNewNdaAlias] = useState('');

  // Zero-Trust Cold Outreach State (Req #46)
  const [outreachAudience, setOutreachAudience] = useState<'HealthTech' | 'FinTech' | 'AI Startups'>('HealthTech');
  const [outreachRunning, setOutreachRunning] = useState(false);

  const handleAssignLead = (leadId: string, devAlias: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    setLeads(prev => prev.filter(l => l.id !== leadId));
    
    const newTask: ProjectTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      name: lead.name,
      client: `${lead.name.split(' ')[0]} Corp`,
      tier: lead.suggestedTier as any,
      stage: 'Pipeline',
      description: `Dispatched assignment from COO lead pool. Suggested value: ${lead.value}`,
      assignedDev: devAlias,
      prsCount: 0,
      health: 'Stable',
      jestPassed: true,
      typeScriptPassed: true
    };

    setTasks(prev => [...prev, newTask]);
    addToast(`Lead successfully matched! Assigned ${lead.name} to ${devAlias}.`, 'success');
  };

  const handleGenerateFreelancerNda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNdaAlias.trim()) {
      addToast('Alias required to generate NDA.', 'error');
      return;
    }
    const newContract: ZohoContract = {
      id: `ZOHO-${Math.floor(100 + Math.random() * 900)}`,
      party: `${newNdaAlias} (Anon Profile)`,
      role: 'Freelance Builder',
      type: 'NDA',
      status: 'Signed',
      date: new Date().toISOString().slice(0, 10),
      ipTransferClause: true
    };
    setContracts(prev => [...prev, newContract]);
    addToast(`Custom Anonymous Freelancer NDA executed for ${newNdaAlias} with cryptographic hash verification.`, 'success');
    setNewNdaAlias('');
  };

  const handleRunZeroTrustOutreach = () => {
    setOutreachRunning(true);
    setTimeout(() => {
      setOutreachRunning(false);
      addToast(`Zero-Trust Cold Outreach Campaign dispatched to 120 US ${outreachAudience} prospects highlighting IP isolation framework.`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 font-mono text-zinc-100">
      {/* Warning Banner */}
      {hardwareKillActive && (
        <div className="bg-yellow-950/60 border-2 border-yellow-500 text-yellow-200 p-6 rounded flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse shadow-md">
          <div className="flex items-center gap-4">
            <AlertCircle className="text-yellow-500 shrink-0" size={32} />
            <div>
              <div className="font-bold text-base">CLIENT REVERSE-PROXY STAGING ACCESS SUSPENDED</div>
              <div className="text-sm text-zinc-300">Centralized reverse proxy layers have frozen staging preview hosts.</div>
            </div>
          </div>
          <button 
            onClick={() => { setHardwareKillActive(false); addToast('Reverse-proxy staging nodes restored.', 'success'); }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold uppercase text-xs px-5 py-3 rounded shadow-md transition-colors w-full md:w-auto cursor-pointer"
          >
            Unfreeze Proxy Access
          </button>
        </div>
      )}

      {/* Subtab Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-zinc-900 border border-zinc-800 p-1 rounded gap-1">
        <button
          onClick={() => setActiveSubTab('leads')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeSubTab === 'leads' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Sliders size={14} />
          Leads & Compute
        </button>
        <button
          onClick={() => setActiveSubTab('legal_contracts')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeSubTab === 'legal_contracts' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <FileSignature size={14} />
          Zoho MSA/SOW & NDAs
        </button>
        <button
          onClick={() => setActiveSubTab('recruitment_affiliates')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeSubTab === 'recruitment_affiliates' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Award size={14} />
          Recruitment & Affiliates
        </button>
        <button
          onClick={() => setActiveSubTab('outreach')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeSubTab === 'outreach' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Mail size={14} />
          Zero-Trust Outreach
        </button>
      </div>

      {/* MAIN CONTENT VIEW */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 shadow-2xl backdrop-blur-md">
        
        {/* SUBTAB 1: Leads & Compute */}
        {activeSubTab === 'leads' && (
          <>
            <div className="border-b border-zinc-800 pb-6">
              <div className="flex items-center gap-2.5 mb-2">
                <Sliders size={24} className="text-emerald-400" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 font-mono">Operations Command Gate</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">COO Operations & Staging Proxy Hub</h1>
              <p className="text-sm text-zinc-400 mt-1">Manage computing slot allocations, dispatch client project leads, and control reverse-proxy staging isolation.</p>
            </div>

            {/* Core Dynamic Controllers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
                <div>
                  <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider block">Marketing Budget Allocation</span>
                  <span className="text-sm text-zinc-400">Routes dynamic funds directly to Meta traffic conversion campaigns.</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">Monthly Budget allocation:</span>
                    <span className="text-emerald-400 font-bold">₹{adSpend.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range"
                    min="5000"
                    max="150000"
                    step="5000"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
                <div>
                  <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider block">Compute Resource Slots</span>
                  <span className="text-sm text-zinc-400">Adjust active sandbox CPU allocations supporting developer staging testing.</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">Allocated CPU Node Slots:</span>
                    <span className="text-emerald-400 font-bold">{developerSlots} Cores</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={developerSlots}
                    onChange={(e) => setDeveloperSlots(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Lead Dispatch Center */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Lead Dispatch Override Center</h3>
              <p className="text-xs text-zinc-400">Unassigned client project leads awaiting builder assignments.</p>
              
              {leads.length === 0 ? (
                <div className="text-center py-6 text-zinc-500 text-xs uppercase font-mono">No unassigned leads in queue</div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded">
                      <div>
                        <div className="text-sm font-bold text-white">{lead.name}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">Suggested: {lead.suggestedTier} ({lead.value}) | Origin: {lead.region}</div>
                      </div>
                      <div className="flex gap-2">
                        {['UB_DEV_14', 'UB_DEV_04'].map((dev) => (
                          <button
                            key={dev}
                            onClick={() => handleAssignLead(lead.id, dev)}
                            className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-emerald-500 text-[10px] text-emerald-400 hover:text-white uppercase font-mono transition-colors rounded cursor-pointer"
                          >
                            Assign {dev}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* IP Proxy Staging Isolation Controller (Req #29) */}
            <div className="pt-6 border-t border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/40 p-6 border border-zinc-800 rounded">
              <div className="space-y-1">
                <span className="text-xs text-zinc-300 uppercase font-bold flex items-center gap-1.5">
                  <ShieldAlert size={16} className="text-emerald-400" />
                  IP Proxy Staging Sandbox Isolation (Req #29)
                </span>
                <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                  Route all client staging URL previews through a centralized reverse-proxy layer to mask physical developer host locations.
                </p>
              </div>
              <button
                onClick={() => {
                  setHardwareKillActive(!hardwareKillActive);
                  addToast(hardwareKillActive ? 'Restored client workspace staging access.' : 'Client reverse-proxy staging isolation active.', hardwareKillActive ? 'success' : 'warn');
                }}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded border transition-all cursor-pointer ${hardwareKillActive ? 'bg-zinc-950 border-yellow-500 text-yellow-400' : 'bg-zinc-950 border-emerald-500 text-emerald-400 hover:bg-emerald-950/30'}`}
              >
                {hardwareKillActive ? 'Staging Suspended' : 'Proxy Isolation Active'}
              </button>
            </div>
          </>
        )}

        {/* SUBTAB 2: Zoho Templates, Freelancer NDAs & IEC DGFT Registration */}
        {activeSubTab === 'legal_contracts' && (
          <>
            <div className="border-b border-zinc-800 pb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Pillar 1: Legal Compliance</span>
              <h1 className="text-2xl font-bold text-white tracking-tight">Zoho Sign MSA/SOW Templates & Anonymous NDAs</h1>
              <p className="text-sm text-zinc-400 mt-1">Authorizes legal dual-jurisdiction MSAs and SOWs with IP transfer clauses and generates anonymous developer NDAs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Standardized Zoho Sign Templates (Req #5) */}
              <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
                <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Standardized Zoho Sign Templates (Req #5)</h3>
                <p className="text-[11px] text-zinc-400">Dual-jurisdiction MSA and SOW templates clearly delineating IP ownership transfer upon milestone clearance.</p>
                
                <div className="space-y-3">
                  {contracts.map((con, i) => (
                    <div key={i} className="p-3 bg-zinc-900 border border-zinc-850 flex justify-between items-center rounded text-xs">
                      <div>
                        <div className="font-bold text-zinc-200">{con.party}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{con.type} ({con.role})</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase rounded">
                          {con.status} (IP Transferred)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom NDA Engine for Freelancers (Req #7) & IEC Code (Req #8) */}
              <div className="space-y-6">
                <form onSubmit={handleGenerateFreelancerNda} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
                  <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Custom NDA Engine for Freelancers (Req #7)</h3>
                  <p className="text-[11px] text-zinc-400">Generates legally binding NDAs for freelance builders operating under anonymous alias verification.</p>
                  
                  <div className="space-y-2">
                    <input 
                      type="text"
                      value={newNdaAlias}
                      onChange={(e) => setNewNdaAlias(e.target.value)}
                      placeholder="Developer Alias (e.g. UB_DEV_31)"
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 text-zinc-100 outline-none rounded"
                    />
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer"
                    >
                      Generate Cryptographic Alias NDA
                    </button>
                  </div>
                </form>

                {/* IEC Registration Tracker (Req #8) */}
                <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-3">
                  <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">IEC Registration & DGFT Export (Req #8)</h3>
                  <div className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-zinc-500">DGFT IEC #:</span><span className="text-emerald-400 font-bold font-mono">{IEC_REGISTRATION.iecNumber}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">DGFT Status:</span><span className="text-emerald-400 font-bold">{IEC_REGISTRATION.dgftStatus}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">Export Category:</span><span className="text-zinc-300">{IEC_REGISTRATION.exporterCategory}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SUBTAB 3: Affiliate Commissions & College Recruitment */}
        {activeSubTab === 'recruitment_affiliates' && (
          <>
            <div className="border-b border-zinc-800 pb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Pillar 6: Growth & Recruitment</span>
              <h1 className="text-2xl font-bold text-white tracking-tight">Affiliate Commission Dashboard & College Pipeline</h1>
              <p className="text-sm text-zinc-400 mt-1">Manages partner referral commission payouts and premier Indian engineering college recruitment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Affiliate Partner Commission Dashboard (Req #44) */}
              <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
                <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Affiliate Partner Commissions (Req #44)</h3>
                <p className="text-[11px] text-zinc-400">Public referral system enabling developers or consultancies to earn automated commissions.</p>
                
                <div className="space-y-3">
                  {PARTNER_AFFILIATES.map((part, i) => (
                    <div key={i} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs flex justify-between items-center">
                      <div>
                        <div className="font-bold text-zinc-200">{part.partner}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">Code: {part.referralCode} | Conv: {part.conversion}</div>
                      </div>
                      <div className="text-right font-bold text-emerald-400">
                        {part.payoutObligation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institute Recruitment Pipeline (Req #45) */}
              <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
                <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Institute Recruitment Pipeline (Req #45)</h3>
                <p className="text-[11px] text-zinc-400">Partnership pipeline with premier Indian engineering colleges (IITs, NITs, BITS) to recruit junior builder talent.</p>
                
                <div className="space-y-3">
                  {COLLEGE_PIPELINE.map((col, i) => (
                    <div key={i} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">{col.institution}</span>
                        <span className="text-emerald-400">{col.qualifiedStudents} Talent Pool</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>{col.tier}</span>
                        <span className="text-zinc-300 font-bold">{col.recruitmentStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* SUBTAB 4: Zero-Trust Cold Outreach Campaigns */}
        {activeSubTab === 'outreach' && (
          <>
            <div className="border-b border-zinc-800 pb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Pillar 6: Go-To-Market Scaling</span>
              <h1 className="text-2xl font-bold text-white tracking-tight">Zero-Trust Cold Outreach Campaigns</h1>
              <p className="text-sm text-zinc-400 mt-1">High-intensity outbound campaigns emphasizing absolute IP isolation and strict anonymous security of UB CLUB.</p>
            </div>

            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Outbound Campaign Builder (Req #46)</h3>
              <p className="text-[11px] text-zinc-400">Target US-based tech startups looking for L6+ engineering capacity with guaranteed IP isolation.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Target Sector</label>
                  <select
                    value={outreachAudience}
                    onChange={(e) => setOutreachAudience(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 text-emerald-400 outline-none rounded font-bold"
                  >
                    <option value="HealthTech">US HealthTech Startups (HIPAA / GDPR Compliance Focus)</option>
                    <option value="FinTech">US FinTech Startups (PCI-DSS & Remittance Focus)</option>
                    <option value="AI Startups">AI-First Startups (L6+ Engineering Capacity Focus)</option>
                  </select>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-2">
                  <span className="text-zinc-500 font-bold block uppercase">Email Template Sequence Preview:</span>
                  <p className="text-zinc-300 italic">
                    "Subject: Zero-Trust Engineering Capacity for {outreachAudience} Startups
                    <br/><br/>
                    Hi Team, UB CLUB provides elite L6+ Indian software engineers operating under cryptographically masked aliases, hardware HSM vaults, and total IP isolation..."
                  </p>
                </div>

                <button
                  onClick={handleRunZeroTrustOutreach}
                  disabled={outreachRunning}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-3 text-xs rounded transition-colors cursor-pointer"
                >
                  {outreachRunning ? 'Dispatching Zero-Trust Outreach Sequence...' : 'Launch Zero-Trust Outbound Campaign'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
