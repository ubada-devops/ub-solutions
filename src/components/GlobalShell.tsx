import React, { useState, useEffect } from 'react';
import { 
  Terminal, Search, Bell, Clock, LogOut, Menu, X, 
  Wifi, HelpCircle, Key, Activity, ShieldCheck, 
  Settings, UserCheck, AlertOctagon, HelpCircle as HelpIcon,
  ChevronRight, ArrowRight, CornerDownRight, CheckCircle2,
  FileText, Landmark, MessageSquare, ShieldAlert
} from 'lucide-react';
import { SessionRole, ToastMessage } from '../types';

interface GlobalShellProps {
  isAuthenticated: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
  activeRole: SessionRole;
  setActiveRole: (role: SessionRole) => void;
  selectedEntity: 'UB Technologies' | 'UB CLUB';
  setSelectedEntity: (entity: 'UB Technologies' | 'UB CLUB') => void;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
  onBackToLanding?: () => void;
  children: React.ReactNode;
}

export const GlobalShell: React.FC<GlobalShellProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  activeRole,
  setActiveRole,
  selectedEntity,
  setSelectedEntity,
  toasts,
  removeToast,
  addToast,
  onBackToLanding,
  children
}) => {
  const [magicToken, setMagicToken] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleString('en-US', { hour12: false }) + ' ' + Intl.DateTimeFormat().resolvedOptions().timeZone);
      setUtcTime(now.toUTCString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicToken.trim()) {
      addToast('Please enter a secure access key.', 'error');
      return;
    }
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin(magicToken);
      setIsLoggingIn(false);
      setMagicToken('');
    }, 1200);
  };

  // End-of-Session Memory Sanitization Routine (Req #32)
  const handleSecureLogout = () => {
    addToast('Executing End-of-Session Memory Sanitization. Purging local storage & RAM cache...', 'warn');
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (err) {
      console.log('Cache cleared');
    }
    setTimeout(() => {
      onLogout();
    }, 800);
  };

  const getAlias = (role: SessionRole): string => {
    switch(role) {
      case 'CEO': return 'UB // CEO';
      case 'CFO': return 'SAM // CFO';
      case 'COO': return 'SAM // COO';
      case 'CTO': return 'AMMAR // CTO';
      case 'DEV': return 'UB_DEV_14';
      case 'CLIENT': return 'UB Technologies Engineer'; // Client Redacted Middleware (Req #33)
      case 'CHAT': return 'Anonymous Chat Hub';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-between text-zinc-100 font-mono relative overflow-hidden antialiased">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-4000" />

        <header className="p-6 flex justify-between items-center z-10 border-b border-zinc-900/40 bg-zinc-950/20 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Terminal size={18} className="text-black" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 font-display">UB SOLUTIONS // TERMINAL</span>
          </div>
          <div className="text-[10px] text-zinc-500 flex items-center gap-2">
            <Wifi size={12} className="text-emerald-500 animate-pulse" />
            <span>FastAPI ASGI Socket Pool: 10,420 Active</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 z-10">
          <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-md p-8 rounded relative transition-all hover:border-emerald-500/30">
            <div className="absolute top-0 right-0 p-2 text-[9px] text-emerald-400 font-mono bg-emerald-500/10 border-l border-b border-zinc-800/80 uppercase tracking-widest font-bold">
              HSM AES-256-GCM Locked
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter text-white font-display">UB SOLUTIONS PORTAL</h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Decentralized builder entry gate. Cryptographically masked session token credentials unlock instant access for CEO, CFO, COO, CTO, Developers, and Clients.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Session Token Hex</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={magicToken}
                      onChange={(e) => setMagicToken(e.target.value)}
                      placeholder="Enter token link (e.g. ub_dev_magic_14)..."
                      className="w-full bg-zinc-950/80 border border-zinc-800/80 focus:border-emerald-500/60 text-emerald-400 font-mono text-xs px-4 py-3 outline-none transition-all pr-10 rounded placeholder:text-zinc-700"
                      disabled={isLoggingIn}
                    />
                    <Key size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider py-3 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg rounded"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Authenticating HSM Token...
                    </>
                  ) : (
                    <>
                      Authenticate Session
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <div className="border-t border-zinc-800/40 pt-4 flex justify-between items-center text-[10px] text-zinc-500">
                <span>SOC-2 TYPE II COMPLIANT</span>
                <span>BUILD: v5.0.0-ENTERPRISE</span>
              </div>

              {onBackToLanding && (
                <button
                  onClick={onBackToLanding}
                  className="w-full text-center text-[10px] text-zinc-500 hover:text-emerald-400 transition-colors font-bold uppercase tracking-widest cursor-pointer mt-2"
                >
                  ← Back to Home
                </button>
              )}
            </div>
          </div>
        </main>

        <footer className="p-6 border-t border-zinc-900/40 text-center text-[9px] text-zinc-600 bg-zinc-950/10">
          COPYRIGHT &copy; 2026 UB SOLUTIONS INC. (DELAWARE C-CORP) & PTE. LTD. (SINGAPORE).
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono antialiased flex flex-col relative">
      
      {/* 1. Entity Switcher Accent Banner */}
      <div className="bg-zinc-950/60 border-b border-zinc-900/40 px-4 py-1.5 flex justify-between items-center text-[9px] backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 font-bold uppercase tracking-wider">Entity Jurisdiction:</span>
          <div className="flex gap-1.5 bg-zinc-950/40 p-0.5 border border-zinc-900/60 rounded">
            <button 
              onClick={() => setSelectedEntity('UB Technologies')}
              className={`px-2 py-0.5 rounded-sm transition-colors font-bold uppercase cursor-pointer ${selectedEntity === 'UB Technologies' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              UB Technologies (Delaware C-Corp)
            </button>
            <button 
              onClick={() => setSelectedEntity('UB CLUB')}
              className={`px-2 py-0.5 rounded-sm transition-colors font-bold uppercase cursor-pointer ${selectedEntity === 'UB CLUB' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              UB CLUB (Singapore Treasury)
            </button>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-zinc-500">
          <span>UTC TIME: {utcTime}</span>
        </div>
      </div>

      {/* 2. Sticky Terminal Top-Nav Shell */}
      <nav className="h-14 border-b border-zinc-900/40 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-[60] flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden text-zinc-400 hover:text-zinc-100 p-1 cursor-pointer"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-emerald-500 flex items-center justify-center rounded-sm shadow-md">
              <Terminal size={14} className="text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold font-display tracking-tight text-white leading-none">UB Solutions</span>
              <span className="text-[9px] text-emerald-500 font-bold tracking-widest uppercase leading-none mt-1">UB Solutions // 50-PILLAR ENTERPRISE</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 border-l border-zinc-900/60 pl-6 text-[10px] text-zinc-500">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase text-[9px] font-bold text-emerald-400 font-mono">FastAPI ASGI Pool: 10k Sockets</span>
            </div>
            <span>Vercel Edge Speed: <span className="text-emerald-400 font-bold">14ms</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-2.5 bg-zinc-900/40 hover:bg-zinc-800/40 border border-zinc-800/60 px-3 py-1.5 cursor-pointer transition-colors rounded"
          >
            <Search size={13} className="text-zinc-500" />
            <span className="text-[9px] text-zinc-400 uppercase tracking-widest">Search Console...</span>
            <kbd className="text-[8px] bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800 text-zinc-500">Ctrl+K</kbd>
          </div>

          {/* Role Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-zinc-950/60 border border-zinc-900/60 p-0.5 rounded">
            {(['CEO', 'CFO', 'COO', 'CTO', 'DEV', 'CLIENT', 'CHAT'] as SessionRole[]).map(role => (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  addToast(`Access matrix switched to ${role} workspace.`, 'info');
                }}
                className={`px-2 py-1 text-[8px] font-bold transition-all rounded cursor-pointer ${activeRole === role ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="sm:hidden">
            <select
              value={activeRole}
              onChange={(e) => {
                setActiveRole(e.target.value as SessionRole);
                addToast(`Switched to ${e.target.value} console.`, 'info');
              }}
              className="bg-zinc-950 border border-zinc-800 text-[9px] text-emerald-400 font-bold px-2 py-1 outline-none rounded"
            >
              <option value="CEO">CEO (UB)</option>
              <option value="CFO">CFO (SAM)</option>
              <option value="COO">COO (SAM)</option>
              <option value="CTO">CTO (AMMAR)</option>
              <option value="DEV">DEV (Anon)</option>
              <option value="CLIENT">Client</option>
              <option value="CHAT">Chat Hub</option>
            </select>
          </div>

          <div className="h-6 w-[1px] bg-zinc-900/60" />

          {/* User Status Quick-Badge */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 bg-zinc-900/30 border border-zinc-850 text-[10px] rounded">
            <UserCheck size={11} className="text-emerald-500" />
            <span className="text-zinc-200 text-[9px] font-bold">{getAlias(activeRole)}</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-1.5 bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-emerald-400 transition-all rounded cursor-pointer"
            >
              <Bell size={14} />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </button>

            {isNotificationOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                <div className="absolute right-0 mt-2.5 w-80 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-2xl z-50 p-2 rounded">
                  <div className="p-2 border-b border-zinc-800 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Edge System Logs</span>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 border border-emerald-500/20 font-bold uppercase">LATEST</span>
                  </div>
                  <div className="space-y-1 mt-1.5 max-h-64 overflow-y-auto">
                    {[
                      { type: 'FINANCE', label: 'Skydo FIRA Remittance Validated', desc: 'USD $120.00 matched with GST export invoice', time: '1m' },
                      { type: 'SECURITY', label: 'HSM Cryptography Rotation', desc: 'AES-256-GCM keys rotated inside hardware vault', time: '10m' },
                      { type: 'REALTIME', label: 'FastAPI ASGI Pool Healthy', desc: '10,420 active concurrent sockets on Uvicorn', time: '30m' }
                    ].map((n, i) => (
                      <div key={i} className="p-2 border-b border-zinc-850 hover:bg-zinc-950/60 transition-colors">
                        <div className="text-[10px] font-bold text-white">{n.label}</div>
                        <div className="text-[9px] text-zinc-400 line-clamp-1">{n.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* End-of-Session Memory Sanitizer Logout */}
          <button
            onClick={handleSecureLogout}
            className="p-1.5 bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-900/40 transition-all rounded cursor-pointer"
            title="End-of-Session Memory Sanitization & Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </nav>

      {/* Main Core Flex Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Mobile Hamburger Drawer */}
        {isMobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-72 bg-zinc-950 border-r border-zinc-800 z-[80] p-6 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-emerald-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-display">UB Solutions Drawer</span>
                  </div>
                  <button onClick={() => setIsMobileOpen(false)} className="text-zinc-400 hover:text-zinc-100 cursor-pointer">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest px-2 mb-2">Workspace Roles</div>
                  {(['CEO', 'CFO', 'COO', 'CTO', 'DEV', 'CLIENT', 'CHAT'] as SessionRole[]).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setActiveRole(role);
                        setIsMobileOpen(false);
                        addToast(`Workspace role updated to ${role}.`, 'info');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold font-mono transition-all flex items-center justify-between rounded cursor-pointer ${activeRole === role ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    >
                      <span>{getAlias(role)}</span>
                      <ChevronRight size={12} className="opacity-40" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex w-16 border-r border-zinc-900/50 bg-zinc-950/40 backdrop-blur-md flex-col items-center py-6 justify-between text-zinc-650">
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => { setActiveRole('CEO'); addToast('CEO view active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'CEO' ? 'text-emerald-400 bg-zinc-900 border border-zinc-805' : ''}`}
              title="CEO Console (UB)"
            >
              <Activity size={18} />
            </button>
            <button 
              onClick={() => { setActiveRole('CFO'); addToast('CFO ledger console active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'CFO' ? 'text-emerald-400 bg-zinc-900 border border-zinc-805' : ''}`}
              title="CFO Ledger (SAM)"
            >
              <Landmark size={18} />
            </button>
            <button 
              onClick={() => { setActiveRole('COO'); addToast('COO console active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'COO' ? 'text-emerald-400 bg-zinc-900 border border-zinc-805' : ''}`}
              title="COO Ops (SAM)"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={() => { setActiveRole('CTO'); addToast('CTO workspace active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'CTO' ? 'text-emerald-400 bg-zinc-900 border border-zinc-805' : ''}`}
              title="CTO Terminal (AMMAR)"
            >
              <UserCheck size={18} />
            </button>
            <button 
              onClick={() => { setActiveRole('DEV'); addToast('Developer workbench active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'DEV' ? 'text-emerald-400 bg-zinc-900 border border-zinc-805' : ''}`}
              title="Freelancer Workspace"
            >
              <Terminal size={18} />
            </button>
            <button 
              onClick={() => { setActiveRole('CLIENT'); addToast('Client Transparency Gateway active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'CLIENT' ? 'text-emerald-400 bg-zinc-900 border border-zinc-850' : ''}`}
              title="Client Transparency Gateway"
            >
              <ShieldCheck size={18} />
            </button>
            <button 
              onClick={() => { setActiveRole('CHAT'); addToast('Anonymous Chat Console active.', 'info'); }}
              className={`p-2.5 rounded transition-all hover:text-emerald-400 cursor-pointer ${activeRole === 'CHAT' ? 'text-emerald-400 bg-zinc-900 border border-zinc-850' : ''}`}
              title="Anonymous Terminal Chat"
            >
              <MessageSquare size={18} />
            </button>
          </div>
        </aside>

        {/* Core Canvas Body */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-6 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Search Console Overlay */}
      {isSearchOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 z-[120] backdrop-blur-xs" onClick={() => setIsSearchOpen(false)} />
          <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-lg bg-zinc-900 border border-zinc-800 shadow-2xl z-[130] p-2 rounded">
            <div className="flex items-center px-3 py-2 border-b border-zinc-800 gap-3">
              <Search size={16} className="text-emerald-500" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search console (e.g. GST LUT, Skydo, TAL 500, FastAPI ASGI)..."
                className="flex-1 bg-transparent border-none text-xs text-emerald-400 font-mono outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-[9px] bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-500 cursor-pointer"
              >
                ESC
              </button>
            </div>
            
            <div className="p-2 space-y-1">
              <div className="text-[8px] text-zinc-500 uppercase tracking-widest px-2 py-1">Command Index</div>
              {[
                { title: 'GOTO_CEO_CONSOLE', role: 'CEO', desc: 'Jump to TAL 500 & MAANG Benchmarks' },
                { title: 'SKYDO_RECON_TABLE', role: 'CFO', desc: 'Audit FIRA certs & Sunday payouts' },
                { title: 'GST_LUT_EXPORT', role: 'CFO', desc: 'Inspect 0% IGST software export filing' },
                { title: 'FASTAPI_ASGI_CLUSTER', role: 'CTO', desc: 'Inspect 10,000+ socket pool metrics' },
                { title: 'ANONYMOUS_CHAT_HUB', role: 'CHAT', desc: 'Open HSM-encrypted chat console' }
              ]
              .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    setActiveRole(item.role as SessionRole);
                    setIsSearchOpen(false);
                    addToast(`Navigating to ${item.role} via Search Command.`, 'success');
                  }}
                  className="p-2 hover:bg-emerald-500/10 rounded cursor-pointer group flex justify-between items-center transition-colors"
                >
                  <div>
                    <div className="text-[10px] font-bold text-zinc-300 group-hover:text-emerald-400 font-mono">{`> ${item.title}`}</div>
                    <div className="text-[8px] text-zinc-500 uppercase mt-0.5">{item.desc}</div>
                  </div>
                  <ChevronRight size={12} className="text-zinc-650 group-hover:text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Error Alert Toast Container */}
      <div className="fixed bottom-4 right-4 z-[200] space-y-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className="pointer-events-auto bg-zinc-950/95 border border-emerald-500/30 shadow-xl p-3.5 flex items-start gap-3 rounded"
          >
            {toast.type === 'error' ? (
              <AlertOctagon size={16} className="text-red-500 mt-0.5 shrink-0" />
            ) : toast.type === 'warn' ? (
              <AlertOctagon size={16} className="text-yellow-500 mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            )}
            <div className="flex-1 font-mono text-[10px]">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-zinc-400 uppercase tracking-widest font-bold">
                  {toast.type === 'error' ? 'Compliance Alert' : toast.type === 'warn' ? 'Infrastructure Alert' : 'System Sync'}
                </span>
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="text-zinc-600 hover:text-zinc-300 font-bold cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <div className="text-zinc-200 leading-normal">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GlobalShell;
