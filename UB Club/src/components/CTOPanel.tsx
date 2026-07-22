import React, { useState, useEffect } from 'react';
import { 
  GitBranch, GitPullRequest, Eye, CheckCircle2, XCircle, Play, 
  Cpu, Key, Database, RefreshCw, FolderGit2, FolderOpen,
  ClipboardCheck, BarChart2, Radio, Server, AlertTriangle, FileCode, LayoutGrid, RadioTower,
  Globe, ShieldCheck, Activity, Terminal, Star, Layers, ExternalLink, Code2
} from 'lucide-react';
import { 
  ProjectTask, SandboxStatus, ScraperLog, ZohoContract 
} from '../types';
import { 
  CLINIC_SCRAPER_ROWS, VAPI_DIAGNOSTICS, SHARED_TEMPLATES, FASTAPI_ASGI_METRICS,
  REDIS_CLUSTER_NODES, SUPABASE_TOPOLOGY, EDGE_REPLICAS, OSS_REWARDS 
} from '../data';

interface CTOPanelProps {
  tasks: ProjectTask[];
  setTasks: React.Dispatch<React.SetStateAction<ProjectTask[]>>;
  contracts: ZohoContract[];
  sandboxes: SandboxStatus[];
  setSandboxes: React.Dispatch<React.SetStateAction<SandboxStatus[]>>;
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
}

export const CTOPanel: React.FC<CTOPanelProps> = ({
  tasks,
  setTasks,
  contracts,
  sandboxes,
  setSandboxes,
  addToast
}) => {
  const [activeTab, setActiveTab] = useState<'engineering' | 'architecture_cluster' | 'oss_rewards'>('engineering');

  // Pull Requests mock state
  const [pendingPRs, setPendingPRs] = useState([
    { id: 'PR-901', title: 'feat: add headless clinical appointment pipeline', dev: 'UB_DEV_14', file: 'scraper.ts', changes: '+142 -20 lines', targetTask: 'TSK-201', jestPassed: true, typeScriptPassed: true },
    { id: 'PR-902', title: 'fix: restrict wire callback verification protocols', dev: 'UB_DEV_04', file: 'skydo-webhook.ts', changes: '+40 -5 lines', targetTask: 'TSK-202', jestPassed: true, typeScriptPassed: true }
  ]);

  // Private API Token Generator state
  const [selectedDevKey, setSelectedDevKey] = useState('UB_DEV_14');
  const [generatedKey, setGeneratedKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  // System Build Failure Toggle State
  const [buildFailureActive, setBuildFailureActive] = useState(false);

  // Gated Sandbox Preview Modal State (Req #49)
  const [activeIframeSandbox, setActiveIframeSandbox] = useState<SandboxStatus | null>(null);

  // Self-Healing Script Logs state
  const [selfHealLogs, setSelfHealLogs] = useState<string[]>([
    '[FastAPI ASGI] Cluster running on 8 workers supporting 10,420 concurrent sockets.',
    '[Redis Pub/Sub] 2 Nodes synchronized (1.2ms latency).',
    '[Supabase Topology] Dedicated chat broadcast replica node active.',
    '[Edge Latency] US-East 42ms | EU-Central 68ms | AP-South 18ms'
  ]);

  useEffect(() => {
    const intervals = [
      'Scanning middleware sanitized collections: clear.',
      'Analyzing Retell AI audio endpoint logs: stable.',
      'Re-routing edge compute node to secondary region: successful.',
      'Validating central Stripe webhook listener: verified.'
    ];
    let count = 0;
    const timer = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setSelfHealLogs(prev => [
        ...prev.slice(-8), 
        `[${now}] ${intervals[count % intervals.length]}`
      ]);
      count++;
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMergePR = (prId: string, taskId: string) => {
    setPendingPRs(prev => prev.filter(pr => pr.id !== prId));
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        addToast(`PR ${prId} verified via Jest/TypeScript suites & merged to Staging.`, 'success');
        return { ...t, prsCount: Math.max(0, t.prsCount - 1), stage: 'QA', jestPassed: true, typeScriptPassed: true };
      }
      return t;
    }));
  };

  const handleGenerateToken = () => {
    const keyStr = `ub_sec_token_${Math.random().toString(36).substring(2, 10)}_${selectedDevKey.toLowerCase()}`;
    setGeneratedKey(keyStr);
    setCopiedKey(false);
    addToast(`Private API credentials generated for ${selectedDevKey}.`, 'success');
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopiedKey(true);
    addToast('Credentials copied to clipboard securely.', 'success');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 font-mono text-zinc-100">
      
      {/* Build Failure Banner */}
      {buildFailureActive && (
        <div className="bg-red-950/60 border-2 border-red-500 text-red-200 p-6 rounded flex flex-col md:flex-row items-center justify-between gap-4 animate-bounce shadow-lg">
          <div className="flex items-center gap-4">
            <XCircle className="text-red-500 shrink-0 animate-spin" size={32} />
            <div>
              <div className="font-bold text-base">BUILD PIPELINE FAILING [STAGING]</div>
              <div className="text-xs text-zinc-300">Webpack module compiling failed on dependency resolution. Rollback initialized automatically.</div>
            </div>
          </div>
          <button 
            onClick={() => { setBuildFailureActive(false); addToast('Staging build pipeline restored to STABLE.', 'success'); }}
            className="bg-red-500 hover:bg-red-600 text-black font-bold uppercase text-xs px-5 py-3 rounded shadow-md transition-colors w-full md:w-auto cursor-pointer"
          >
            Acknowledge & Restore Build
          </button>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-900 border border-zinc-800 p-1 rounded gap-1">
        <button
          onClick={() => setActiveTab('engineering')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'engineering' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <GitPullRequest size={15} />
          Jest/TS PR Verification & Sandboxes
        </button>
        <button
          onClick={() => setActiveTab('architecture_cluster')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'architecture_cluster' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <RadioTower size={15} />
          FastAPI, Redis & Multi-Region Cluster
        </button>
        <button
          onClick={() => setActiveTab('oss_rewards')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'oss_rewards' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Star size={15} />
          Open-Source Rewards & API Keys
        </button>
      </div>

      {/* TAB 1: Jest/TS Verification Pipelines & Gated Sandboxes */}
      {activeTab === 'engineering' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Pillar 5: Developer Verification Pipelines</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Code Sandbox Verification & Gated Sandboxes</h1>
            <p className="text-sm text-zinc-400 mt-1">Inspect Jest & TypeScript compilation checkmarks inside PR reviews and launch gated beta sandboxes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Developer Code Sandbox Verification Pipelines (Req #35) */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Jest/TypeScript CI/CD Checkmarks (Req #35)</h3>
              <p className="text-[11px] text-zinc-400">Visual compilation checkmarks inside CTO pipeline indicating developer commits have passed Jest & TypeScript test suites.</p>
              
              <div className="space-y-3">
                {pendingPRs.map((pr) => (
                  <div key={pr.id} className="p-4 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-white">{pr.title} ({pr.dev})</span>
                      <span className="text-emerald-400 font-mono text-[10px]">{pr.id}</span>
                    </div>
                    
                    {/* Visual Checkmarks (Req #35) */}
                    <div className="flex gap-3 text-[10px]">
                      <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
                        <CheckCircle2 size={12} /> Jest Test Suite Passed
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
                        <CheckCircle2 size={12} /> TypeScript NoEmit Passed
                      </span>
                    </div>

                    <button
                      onClick={() => handleMergePR(pr.id, pr.targetTask)}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2 text-xs rounded transition-colors cursor-pointer mt-2"
                    >
                      Merge Verified Commit to Staging
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gating Public Staging Sandboxes (Req #49) */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Gated Public Staging Sandboxes (Req #49)</h3>
              <p className="text-[11px] text-zinc-400">Allows clients to interact with beta software staging versions inside isolated frames without exposing source repositories.</p>
              
              <div className="space-y-3">
                {sandboxes.map((box) => (
                  <div key={box.id} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-zinc-200">{box.id}</div>
                      <div className="text-[10px] text-zinc-500">{box.url}</div>
                      <div className="text-[9px] text-emerald-400 font-mono mt-0.5">{box.hostIp}</div>
                    </div>
                    <button
                      onClick={() => setActiveIframeSandbox(box)}
                      className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-emerald-500 text-emerald-400 text-[10px] uppercase font-bold rounded flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink size={12} /> Launch Gated Frame
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Real-time Architecture Cluster (Pillar 3) */}
      {activeTab === 'architecture_cluster' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <RadioTower size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Pillar 3: Real-Time Architecture Scaling</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">FastAPI ASGI, Redis Pub/Sub & Edge Replication Topology</h1>
            <p className="text-sm text-zinc-400 mt-1">Live metrics for 10,000+ socket ASGI pool, Redis horizontal scaling, Supabase cluster split, and multi-region edge latency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FastAPI ASGI Deployment (Req #17) */}
            <div className="p-5 bg-zinc-950/50 border border-zinc-800 rounded space-y-3">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Server size={16} className="text-emerald-400" />
                FastAPI ASGI Deployment (Req #17)
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between"><span className="text-zinc-500">Server Manager:</span><span className="text-zinc-200 text-[10px]">Hypercorn / Gunicorn</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Active Socket Pool:</span><span className="text-emerald-400 font-bold">{FASTAPI_ASGI_METRICS.activeSockets.toLocaleString()} / 50k</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">ASGI Worker Pool:</span><span className="text-zinc-200">{FASTAPI_ASGI_METRICS.serverInstances} Instances</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">CPU Usage:</span><span className="text-emerald-400 font-bold">{FASTAPI_ASGI_METRICS.cpuUtilizationPercent}%</span></div>
              </div>
            </div>

            {/* Redis Pub/Sub Horizontal Scaling (Req #18) */}
            <div className="p-5 bg-zinc-950/50 border border-zinc-800 rounded space-y-3">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Radio size={16} className="text-emerald-400" />
                Redis Pub/Sub Scaling (Req #18)
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between"><span className="text-zinc-500">Master Node:</span><span className="text-emerald-400 font-bold">{REDIS_CLUSTER_NODES[0].nodeId}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Messages/sec:</span><span className="text-zinc-200">{REDIS_CLUSTER_NODES[0].messagesPerSec} msg/s</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Pub/Sub Latency:</span><span className="text-emerald-400 font-bold">{REDIS_CLUSTER_NODES[0].pubSubLatencyMs}ms</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Cluster Status:</span><span className="text-emerald-400 font-bold">HEALTHY SYNC</span></div>
              </div>
            </div>

            {/* Supabase Real-time Cluster Separation (Req #19) */}
            <div className="p-5 bg-zinc-950/50 border border-zinc-800 rounded space-y-3">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Database size={16} className="text-emerald-400" />
                Supabase Cluster Separation (Req #19)
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between"><span className="text-zinc-500">Write Master:</span><span className="text-zinc-300 text-[9px]">Primary Node</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Chat Replica:</span><span className="text-emerald-400 font-bold text-[9px]">Dedicated Broadcast</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Replica Lag:</span><span className="text-emerald-400 font-bold">{SUPABASE_TOPOLOGY.replicaLagMs}ms</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Write Locks:</span><span className="text-emerald-400 font-bold">0 Prev. Locks</span></div>
              </div>
            </div>
          </div>

          {/* Multi-Region Database Replication Map (Req #24) */}
          <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
            <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
              <Globe className="text-emerald-400" size={16} />
              Multi-Region Edge Database Replication Latency Map (Req #24)
            </h3>
            <p className="text-[11px] text-zinc-400">Globally distributed edge servers via Cloud Run / AWS Lambda keeping latency below 100ms for US and European corporate clients.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {EDGE_REPLICAS.map((replica, i) => (
                <div key={i} className="p-4 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                  <div className="font-bold text-white">{replica.region}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{replica.cloudRunStatus}</div>
                  <div className="text-emerald-400 font-bold font-mono text-sm pt-1">
                    Latency: {replica.latencyMs}ms (&lt;100ms SLA)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Open-Source Contribution Rewards & API Key System */}
      {activeTab === 'oss_rewards' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Star size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Pillar 6: Open-Source Contribution Rewards</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">UB CLUB Open-Source Ecosystem Rewards</h1>
            <p className="text-sm text-zinc-400 mt-1">Incentivizes developers to create open-source software libraries under the UB CLUB brand driving organic traffic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Open-Source Contribution Rewards (Req #48) */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Open-Source Rewards Program (Req #48)</h3>
              <p className="text-[11px] text-zinc-400">Rewarding developers for open-source library commits under UB CLUB brand.</p>
              
              <div className="space-y-3">
                {OSS_REWARDS.map((oss) => (
                  <div key={oss.id} className="p-3.5 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-emerald-400 font-mono">{oss.repository}</span>
                      <span className="text-white">★ {oss.starsCount} Stars</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Developer: {oss.devAlias}</span>
                      <span className="text-emerald-400 font-bold">Reward: ₹{oss.rewardAmount.toLocaleString()} ({oss.disbursementStatus})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Security API Key Allocator */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Private API Credential Allocator</h3>
              <p className="text-[11px] text-zinc-400">Issues sandboxed API tokens directly to verified developer profiles.</p>
              
              <div className="space-y-3">
                <select
                  value={selectedDevKey}
                  onChange={(e) => setSelectedDevKey(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 text-emerald-400 outline-none rounded font-bold"
                >
                  <option value="UB_DEV_14">UB_DEV_14 (Senior Dev)</option>
                  <option value="UB_DEV_04">UB_DEV_04 (Core Architect)</option>
                </select>

                <button
                  onClick={handleGenerateToken}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer"
                >
                  Generate Private Sandbox Key
                </button>

                {generatedKey && (
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs space-y-1">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">Generated Token:</span>
                    <div className="font-mono text-emerald-400 break-all select-all">{generatedKey}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gated Sandbox Preview Modal (Req #49) */}
      {activeIframeSandbox && (
        <>
          <div className="fixed inset-0 bg-black/85 z-[100] backdrop-blur-sm" onClick={() => setActiveIframeSandbox(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-zinc-950 border-2 border-emerald-500/60 p-6 z-[110] font-mono shadow-2xl rounded">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Gated Public Staging Sandbox Preview ({activeIframeSandbox.id})</h3>
                <span className="text-[10px] text-emerald-400 font-mono">{activeIframeSandbox.url}</span>
              </div>
              <button onClick={() => setActiveIframeSandbox(null)} className="text-zinc-500 hover:text-white text-sm">✕</button>
            </div>

            <div className="border border-zinc-800 rounded h-72 bg-black flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="absolute top-2 left-2 text-[9px] bg-zinc-900 text-emerald-400 border border-zinc-800 px-2 py-0.5 rounded font-mono">
                🛡️ Gated Isolated Frame Mode (Source Code Masked)
              </div>
              <Activity className="text-emerald-500 animate-pulse" size={32} />
              <span className="text-xs text-zinc-300 font-bold uppercase">Staging Application Live Beta View</span>
              <p className="text-[10px] text-zinc-500 max-w-md text-center">
                Client is interacting with live compiled UI build. Code repository access blocked.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
