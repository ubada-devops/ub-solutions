import React, { useState, useEffect } from 'react';
import { GlobalShell } from './components/GlobalShell';
import { LandingPage } from './components/LandingPage';
import { CEOPanel } from './components/CEOPanel';
import { CFOPanel } from './components/CFOPanel';
import { COOPanel } from './components/COOPanel';
import { CTOPanel } from './components/CTOPanel';
import { DeveloperPanel } from './components/DeveloperPanel';
import { ClientPanel } from './components/ClientPanel';
import { AnonymousChat } from './components/AnonymousChat';
import { CAIOPanel } from './components/CAIOPanel';
import { CMOPanel } from './components/CMOPanel';
import { CSOPanel } from './components/CSOPanel';
import { 
  ProjectTask, LeadAssignment, EscrowTransaction, 
  ZohoContract, ChangeRequestTicket, SandboxStatus, ToastMessage, SessionRole 
} from './types';
import { 
  INITIAL_TASKS, INITIAL_LEADS, INITIAL_ESCROW, 
  ZOHO_CONTRACTS, INITIAL_SANDBOXES, DEFAULT_CHANGE_REQUESTS 
} from './data';
import { apiService } from './lib/api';

export default function App() {
  // Landing Page Gate — show landing page first, login only on demand
  const [showLanding, setShowLanding] = useState(true);

  // Global Session Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Dashboard states
  const [activeRole, setActiveRole] = useState<SessionRole>('CEO');
  const [systemStatus, setSystemStatus] = useState<'SECURE_SESSION' | 'LOCKOUT'>('SECURE_SESSION');
  const [selectedEntity, setSelectedEntity] = useState<'UB Technologies' | 'UB CLUB'>('UB Technologies');
  const [founderFocus, setFounderFocus] = useState<'In Studio' | 'In Sprints' | 'Strategic' | 'Standby'>('In Studio');
  
  // Interactive finance & compute states shared across views
  const [adSpend, setAdSpend] = useState<number>(45000);
  const [developerSlots, setDeveloperSlots] = useState<number>(24);

  // Core Data models
  const [tasks, setTasks] = useState<ProjectTask[]>(INITIAL_TASKS);
  const [leads, setLeads] = useState<LeadAssignment[]>(INITIAL_LEADS);
  const [escrows, setEscrows] = useState<EscrowTransaction[]>(INITIAL_ESCROW);
  const [contracts, setContracts] = useState<ZohoContract[]>(ZOHO_CONTRACTS);
  const [sandboxes, setSandboxes] = useState<SandboxStatus[]>(INITIAL_SANDBOXES);
  const [changeRequests, setChangeRequests] = useState<ChangeRequestTicket[]>(DEFAULT_CHANGE_REQUESTS);

  // Toast Alerts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToast = (message: string, type: 'success' | 'error' | 'warn' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    const timestamp = new Date().toLocaleTimeString();
    setToasts(prev => [...prev, { id, message, type, timestamp }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Initial live API fetch & real-time WebSocket subscription
  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const liveTasks = await apiService.fetchTasks();
        if (liveTasks && liveTasks.length > 0) setTasks(liveTasks);

        const liveEscrows = await apiService.fetchEscrows();
        if (liveEscrows && liveEscrows.length > 0) setEscrows(liveEscrows);

        const liveTickets = await apiService.fetchChangeRequests();
        if (liveTickets && liveTickets.length > 0) setChangeRequests(liveTickets);
      } catch (e) {
        console.error('Failed to load live backend data:', e);
      }
    };

    loadBackendData();

    // Subscribe to live WebSocket updates from backend
    const unsubscribe = apiService.subscribe((event) => {
      if (event.type === 'TASK_CREATED') {
        setTasks(prev => [event.payload, ...prev]);
        addToast(`New Task synced from backend: ${event.payload.name}`, 'info');
      } else if (event.type === 'ESCROW_UPDATED') {
        setEscrows(prev => [event.payload, ...prev]);
        addToast(`Escrow transaction updated: ₹${event.payload.amount}`, 'success');
      } else if (event.type === 'CHANGE_REQUEST_CREATED') {
        setChangeRequests(prev => [event.payload, ...prev]);
        addToast(`Change Request ticket logged: ${event.payload.id}`, 'info');
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-remove toasts after 4 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Simulate skeleton loaders upon role changes
  useEffect(() => {
    setIsLoading(true);
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(delay);
  }, [activeRole]);

  // Session Logins & Logouts
  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
    addToast('Welcome back. Secure session handshake complete.', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    addToast('Secure session terminated cleanly.', 'info');
  };

  const renderSkeleton = () => {
    return (
      <div className="space-y-6 animate-pulse font-mono text-zinc-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-zinc-900 border border-zinc-800 rounded-sm p-4 flex flex-col justify-between">
              <div className="h-2 w-1/3 bg-zinc-850 rounded" />
              <div className="h-4 w-2/3 bg-zinc-850 rounded" />
              <div className="h-2 w-1/2 bg-zinc-850 rounded" />
            </div>
          ))}
        </div>
        <div className="h-96 bg-zinc-900 border border-zinc-800 rounded-sm p-6 flex flex-col justify-between">
          <div className="h-4 w-1/4 bg-zinc-850 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-zinc-950/60 rounded" />
            ))}
          </div>
          <div className="h-4 w-1/3 bg-zinc-850 rounded" />
        </div>
      </div>
    );
  };

  // If landing page is showing, render the public storefront
  if (showLanding && !isAuthenticated) {
    return <LandingPage onNavigateToLogin={() => setShowLanding(false)} />;
  }

  return (
    <GlobalShell
      isAuthenticated={isAuthenticated}
      onLogin={handleLogin}
      onLogout={handleLogout}
      activeRole={activeRole}
      setActiveRole={setActiveRole}
      selectedEntity={selectedEntity}
      setSelectedEntity={setSelectedEntity}
      toasts={toasts}
      removeToast={removeToast}
      addToast={addToast}
      onBackToLanding={() => { setShowLanding(true); }}
    >
      {isLoading ? (
        renderSkeleton()
      ) : (
        <>
          {activeRole === 'CEO' && (
            <CEOPanel 
              founderFocus={founderFocus}
              setFounderFocus={setFounderFocus}
              adSpend={adSpend}
              developerSlots={developerSlots}
              tasks={tasks}
              systemStatus={systemStatus}
              setSystemStatus={setSystemStatus}
              addToast={addToast}
            />
          )}

          {activeRole === 'CFO' && (
            <CFOPanel 
              escrows={escrows}
              setEscrows={setEscrows}
              tasks={tasks}
              addToast={addToast}
            />
          )}

          {activeRole === 'COO' && (
            <COOPanel 
              tasks={tasks}
              setTasks={setTasks}
              leads={leads}
              setLeads={setLeads}
              contracts={contracts}
              setContracts={setContracts}
              adSpend={adSpend}
              setAdSpend={setAdSpend}
              developerSlots={developerSlots}
              setDeveloperSlots={setDeveloperSlots}
              systemStatus={systemStatus}
              addToast={addToast}
            />
          )}

          {activeRole === 'CTO' && (
            <CTOPanel 
              tasks={tasks}
              setTasks={setTasks}
              contracts={contracts}
              sandboxes={sandboxes}
              setSandboxes={setSandboxes}
              addToast={addToast}
            />
          )}

          {activeRole === 'DEV' && (
            <DeveloperPanel 
              tasks={tasks}
              setTasks={setTasks}
              leads={leads}
              setLeads={setLeads}
              addToast={addToast}
            />
          )}

          {activeRole === 'CLIENT' && (
            <ClientPanel 
              tasks={tasks}
              escrows={escrows}
              sandboxes={sandboxes}
              changeRequests={changeRequests}
              setChangeRequests={setChangeRequests}
              addToast={addToast}
            />
          )}

          {activeRole === 'CHAT' && (
            <AnonymousChat 
              activeRole={activeRole}
              setActiveRole={setActiveRole}
              addToast={addToast}
              escrows={escrows}
            />
          )}

          {activeRole === 'CAIO' && (
            <CAIOPanel addToast={addToast} />
          )}

          {activeRole === 'CMO' && (
            <CMOPanel addToast={addToast} />
          )}

          {activeRole === 'CSO' && (
            <CSOPanel addToast={addToast} />
          )}
        </>
      )}
    </GlobalShell>
  );
}
