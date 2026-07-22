import React, { useState } from 'react';
import { 
  Landmark, FileText, Send, ShieldCheck, Calendar, 
  TrendingUp, Users, Award, Receipt, Coins, ArrowUpRight, CheckSquare,
  Clock, DollarSign, CreditCard, RefreshCw, Upload, CheckCircle2, ShieldAlert, FileCheck
} from 'lucide-react';
import { ProjectTask, EscrowTransaction, TravelReimbursement } from '../types';
import { 
  STRIPE_RECON_RECORDS, FIRA_REMITTANCES, PARTNER_AFFILIATES, 
  PLACEMENT_COMMISSIONS, TRANSPORT_SUBSIDIES, GST_LUT_DATA, DTAA_RECORDS,
  STRIPE_DCC_RATES, PENNY_DROP_RECORDS, SKYDO_VIRTUAL_ROUTING, SUNDAY_PAYOUT_STATUS,
  SUBCONTRACTOR_TDS_RECORDS, TRAVEL_REIMBURSEMENTS
} from '../data';

interface CFOPanelProps {
  tasks: ProjectTask[];
  escrows: EscrowTransaction[];
  setEscrows: React.Dispatch<React.SetStateAction<EscrowTransaction[]>>;
  addToast: (msg: string, type: 'success' | 'error' | 'warn' | 'info') => void;
}

export const CFOPanel: React.FC<CFOPanelProps> = ({
  tasks,
  escrows,
  setEscrows,
  addToast
}) => {
  const [activeTab, setActiveTab] = useState<'clearing' | 'global_remit' | 'tax_compliance' | 'travel_tds'>('clearing');
  
  // Invoice form states
  const [invoiceClient, setInvoiceClient] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceTier, setInvoiceTier] = useState<'₹499' | '₹2,499' | '₹4,999'>('₹4,999');

  // Multi-Currency DCC simulator state
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'SGD'>('USD');
  const [foreignAmountInput, setForeignAmountInput] = useState<number>(100);

  // Penny Drop state
  const [pennyDropList, setPennyDropList] = useState(PENNY_DROP_RECORDS);
  const [newDevAlias, setNewDevAlias] = useState('');
  const [newDevIfsc, setNewDevIfsc] = useState('');
  const [newDevAccount, setNewDevAccount] = useState('');

  // OCR Travel state
  const [reimbursements, setReimbursements] = useState<TravelReimbursement[]>(TRAVEL_REIMBURSEMENTS);
  const [ocrScanning, setOcrScanning] = useState(false);

  // Dynamic calculations
  const totalRevenue = 6840000;
  const escrowLocked = escrows.filter(e => e.status === 'Escrowed').reduce((sum, e) => sum + e.amount, 0);
  const weeklyIncomeVelocity = tasks.reduce((sum, t) => {
    const val = t.tier === '₹4,999' ? 4999 : t.tier === '₹2,499' ? 2499 : 499;
    return sum + val;
  }, 0) * 30;
  const weeklyDevPayout = tasks.filter(t => t.assignedDev !== 'Unassigned').length * 2800;

  const handleReleasePayment = (escrowId: string) => {
    setEscrows(prev => prev.map(esc => {
      if (esc.id === escrowId) {
        addToast(`CFO Authorization: Milestone payout of ₹${esc.amount.toLocaleString()} disbursed.`, 'success');
        return { ...esc, status: 'Released' };
      }
      return esc;
    }));
  };

  const handleDispatchInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceClient.trim() || !invoiceAmount.trim()) {
      addToast('Invoice fields cannot be blank.', 'error');
      return;
    }
    addToast(`Automated GST Export Invoice matching FIRA cert dispatched to ${invoiceClient} for ₹${Number(invoiceAmount).toLocaleString()}.`, 'success');
    setInvoiceClient('');
    setInvoiceAmount('');
  };

  const handleRunPennyDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevAlias || !newDevAccount || !newDevIfsc) {
      addToast('Please enter developer alias, account number, and IFSC.', 'error');
      return;
    }
    const record = {
      id: `PD-${Math.floor(100 + Math.random() * 900)}`,
      devAlias: newDevAlias,
      bankAccountMask: `XXXXXX${newDevAccount.slice(-4)}`,
      ifscCode: newDevIfsc.toUpperCase(),
      verificationStatus: 'VERIFIED' as const,
      pennyAmountSent: '₹1.00',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setPennyDropList(prev => [record, ...prev]);
    addToast(`Penny Drop API verified bank account for ${newDevAlias}. Ready for Sunday payout routing.`, 'success');
    setNewDevAlias('');
    setNewDevAccount('');
    setNewDevIfsc('');
  };

  const handleTriggerSundayPayout = () => {
    addToast(`Sunday 18:00 IST Payout Scheduler triggered! Executing bulk IMPS/NEFT wires via RazorpayX.`, 'success');
  };

  const handleSimulateOcrUpload = () => {
    setOcrScanning(true);
    setTimeout(() => {
      setOcrScanning(false);
      const newClaim: TravelReimbursement = {
        id: `TRV-${Math.floor(400 + Math.random() * 900)}`,
        devAlias: 'UB_DEV_14',
        merchant: 'Uber Business',
        category: 'Hardware',
        amount: 1450,
        ocrConfidence: 0.99,
        status: 'Pending CFO Approval',
        receiptName: 'uber_receipt_ocr_scanned.jpg',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
      setReimbursements(prev => [newClaim, ...prev]);
      addToast('OCR Receipt Scanner processed receipt. Confidence: 99%. Routed to CFO panel for approval.', 'success');
    }, 1500);
  };

  const handleApproveReimbursement = (id: string) => {
    setReimbursements(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved by CFO' } : r));
    addToast('Travel reimbursement claim approved by CFO.', 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 font-mono text-zinc-100">
      {/* 1. CFO Header Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Total Company Revenue</span>
            <TrendingUp size={14} className="text-emerald-500" />
          </div>
          <div className="text-lg font-bold text-emerald-400 mt-1">₹68,40,000</div>
          <span className="text-[9px] text-zinc-500 uppercase block mt-1">Stripe + Skydo Cleared</span>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Escrow Vault Locked</span>
            <Coins size={14} className="text-yellow-500" />
          </div>
          <div className="text-lg font-bold text-zinc-100 mt-1">₹{escrowLocked.toLocaleString()}</div>
          <span className="text-[9px] text-zinc-500 uppercase block mt-1">Pending Milestone Authorize</span>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Weekly Income Velocity</span>
            <ArrowUpRight size={14} className="text-emerald-500" />
          </div>
          <div className="text-lg font-bold text-white mt-1">₹{weeklyIncomeVelocity.toLocaleString()}</div>
          <span className="text-[9px] text-zinc-500 uppercase block mt-1">Based on retainer clients</span>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Sunday Payout Wire Queue</span>
            <Landmark size={14} className="text-red-400" />
          </div>
          <div className="text-lg font-bold text-red-400 mt-1">₹{SUNDAY_PAYOUT_STATUS.totalVolumeInr.toLocaleString()}</div>
          <span className="text-[9px] text-zinc-500 uppercase block mt-1">{SUNDAY_PAYOUT_STATUS.nextPayoutTime}</span>
        </div>
      </div>

      {/* 2. Sub-tab switcher across 4 CFO pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-zinc-900 border border-zinc-800 p-1 rounded gap-1">
        <button
          onClick={() => setActiveTab('clearing')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'clearing' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Receipt size={14} />
          Invoicing & Escrow
        </button>
        <button
          onClick={() => setActiveTab('global_remit')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'global_remit' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <DollarSign size={14} />
          Global Stripe & Skydo
        </button>
        <button
          onClick={() => setActiveTab('tax_compliance')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'tax_compliance' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <FileCheck size={14} />
          GST LUT & DTAA Tax
        </button>
        <button
          onClick={() => setActiveTab('travel_tds')}
          className={`py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all rounded ${activeTab === 'travel_tds' ? 'bg-emerald-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <CreditCard size={14} />
          TDS & OCR Travel
        </button>
      </div>

      {/* TAB 1: Invoicing & Escrow */}
      {activeTab === 'clearing' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Receipt size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Global Financial Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Weekly Invoicing & Escrow Reserve Engine</h1>
            <p className="text-sm text-zinc-400 mt-1">Dispatches GST-compliant export invoices paired with FIRA certs, manages escrow reserves, and controls dispute holds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Automated Invoice Form */}
            <form onSubmit={handleDispatchInvoice} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-emerald-500" />
                Automated Weekly Invoicing Engine
              </h3>
              <p className="text-[11px] text-zinc-400">Auto-generates GST-compliant export invoices matching foreign deposits with FIRA certificates.</p>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">Client Corporate Node</label>
                  <input 
                    type="text"
                    value={invoiceClient}
                    onChange={(e) => setInvoiceClient(e.target.value)}
                    placeholder="e.g. CardioCare Diagnostics..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 outline-none focus:border-emerald-500 text-zinc-100 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">Value (INR)</label>
                    <input 
                      type="number"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(e.target.value)}
                      placeholder="e.g. 4999..."
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 outline-none focus:border-emerald-500 text-zinc-100 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">Tier</label>
                    <select
                      value={invoiceTier}
                      onChange={(e) => setInvoiceTier(e.target.value as any)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 outline-none focus:border-emerald-500 text-zinc-300 rounded"
                    >
                      <option value="₹499">₹499 Impulse</option>
                      <option value="₹2,499">₹2,499 Standard</option>
                      <option value="₹4,999">₹4,999 Enterprise</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-3 text-xs flex items-center justify-center gap-2 transition-colors rounded cursor-pointer"
                >
                  <Send size={12} />
                  Auto-Generate GST Export Invoice
                </button>
              </div>
            </form>

            {/* Escrow Reserve & Dispute Management Engine */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Coins size={16} className="text-yellow-500" />
                Escrow Reserve & Dispute Engine
              </h3>
              <p className="text-[11px] text-zinc-400">Escrow reserve rules in Stripe/Skydo to handle corporate dispute holds without affecting active developer payouts.</p>
              
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {escrows.map((esc) => (
                  <div key={esc.id} className="p-3 bg-zinc-900 border border-zinc-850 flex justify-between items-center rounded text-xs">
                    <div>
                      <span className="text-[8px] text-zinc-500 uppercase font-bold">TX Hash: {esc.txHash || '0x...'}</span>
                      <div className="text-xs font-bold text-zinc-200">{esc.client}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Value: ₹{esc.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      {esc.status === 'Released' ? (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 font-bold uppercase rounded">
                          Disbursed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReleasePayment(esc.id)}
                          className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase text-[9px] rounded transition-colors"
                        >
                          Release
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Multi-Currency Stripe DCC, Skydo, Penny Drop & Sunday Payout */}
      {activeTab === 'global_remit' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Global Financial Infrastructure</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Multi-Currency Gateways & Sunday Payout Automation</h1>
            <p className="text-sm text-zinc-400 mt-1">Configures Stripe DCC in USD/EUR/GBP/SGD, Skydo virtual routing, bank penny drops, and automated Sunday wires.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Multi-Currency Stripe DCC Simulator */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Multi-Currency Stripe DCC</h3>
              <p className="text-[11px] text-zinc-400">Localized card checkouts in USD, EUR, GBP, SGD using Stripe Dynamic Currency Conversion.</p>
              
              <div className="space-y-3 text-xs">
                <div className="flex gap-2">
                  {STRIPE_DCC_RATES.map((rate) => (
                    <button
                      key={rate.currency}
                      onClick={() => setSelectedCurrency(rate.currency)}
                      className={`flex-1 py-2 text-xs font-bold uppercase border rounded transition-all ${selectedCurrency === rate.currency ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
                    >
                      {rate.currency} ({rate.symbol})
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-850 rounded space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Selected Currency Rate:</span>
                    <span className="text-emerald-400 font-bold">1 {selectedCurrency} = ₹{STRIPE_DCC_RATES.find(r => r.currency === selectedCurrency)?.rateToInr} INR</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Checkout Conversion:</span>
                    <span className="text-white font-bold">${foreignAmountInput} {selectedCurrency} ➜ ₹{(foreignAmountInput * (STRIPE_DCC_RATES.find(r => r.currency === selectedCurrency)?.rateToInr || 83.5)).toLocaleString()} INR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skydo API Virtual Accounts */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Skydo Virtual Routing Details</h3>
              <p className="text-[11px] text-zinc-400">Local US/UK/EU bank routing details provided directly to international corporate clients.</p>
              
              <div className="p-4 bg-zinc-900 border border-zinc-850 rounded space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-zinc-500">Virtual Bank:</span><span className="text-zinc-200 font-bold">{SKYDO_VIRTUAL_ROUTING.bankName}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Virtual Account #:</span><span className="text-emerald-400 font-bold font-mono">{SKYDO_VIRTUAL_ROUTING.virtualAccountNo}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Routing #:</span><span className="text-zinc-200 font-mono">{SKYDO_VIRTUAL_ROUTING.routingNo}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">SWIFT BIC:</span><span className="text-zinc-200 font-mono">{SKYDO_VIRTUAL_ROUTING.swiftBic}</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Automated Bank Validation - Penny Drops */}
            <form onSubmit={handleRunPennyDrop} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Automated Penny Drop Validation</h3>
              <p className="text-[11px] text-zinc-400">Instant bank account verification for new developer accounts via penny-drop APIs before Sunday payout routing.</p>
              
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={newDevAlias}
                  onChange={(e) => setNewDevAlias(e.target.value)}
                  placeholder="Developer Alias (e.g. UB_DEV_09)"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 outline-none text-zinc-100 rounded"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={newDevAccount}
                    onChange={(e) => setNewDevAccount(e.target.value)}
                    placeholder="Account Number"
                    className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 outline-none text-zinc-100 rounded"
                  />
                  <input 
                    type="text" 
                    value={newDevIfsc}
                    onChange={(e) => setNewDevIfsc(e.target.value)}
                    placeholder="IFSC Code"
                    className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 outline-none text-zinc-100 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer"
                >
                  Run Penny-Drop Validation (₹1.00 Wire)
                </button>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {pennyDropList.map(rec => (
                  <div key={rec.id} className="p-2.5 bg-zinc-900 border border-zinc-850 flex justify-between text-xs rounded">
                    <div>
                      <span className="font-bold text-white">{rec.devAlias}</span>
                      <span className="text-[10px] text-zinc-500 block">{rec.bankAccountMask} | {rec.ifscCode}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[10px] uppercase bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
                      {rec.verificationStatus}
                    </span>
                  </div>
                ))}
              </div>
            </form>

            {/* Sunday Payout Automation Scheduler */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Clock className="text-emerald-400" size={16} />
                Sunday Payout Automation Scheduler
              </h3>
              <p className="text-[11px] text-zinc-400">Connects RazorpayX / Cashfree payout API to execute bulk IMPS/NEFT wires precisely at Sunday 18:00 IST.</p>
              
              <div className="p-4 bg-zinc-900 border border-zinc-850 rounded space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-zinc-500">Scheduled Trigger:</span><span className="text-emerald-400 font-bold">{SUNDAY_PAYOUT_STATUS.nextPayoutTime}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Beneficiary Dev Pool:</span><span className="text-zinc-200">{SUNDAY_PAYOUT_STATUS.devBeneficiariesCount} verified dev accounts</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Total Volume Queue:</span><span className="text-white font-bold">₹{SUNDAY_PAYOUT_STATUS.totalVolumeInr.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">API Gateway:</span><span className="text-zinc-400">{SUNDAY_PAYOUT_STATUS.gateway}</span></div>
              </div>

              <button
                onClick={handleTriggerSundayPayout}
                className="w-full bg-red-950/80 border border-red-500 hover:bg-red-900 text-red-200 font-bold uppercase py-3 text-xs rounded transition-colors cursor-pointer"
              >
                Manual Trigger Sunday Payout (RazorpayX API)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GST LUT & DTAA Double Taxation Compliance */}
      {activeTab === 'tax_compliance' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Cross-Border Regulatory Compliance</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">GST LUT Filing & DTAA Double Taxation Engine</h1>
            <p className="text-sm text-zinc-400 mt-1">Maintains annual zero-tax LUT filing for 0% IGST software export and manages Form 10F / TRC documents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GST LUT Filing Card */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">GST LUT Export Status</h3>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 font-bold uppercase rounded">
                  0% IGST Active
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Renew zero-tax Letter of Undertaking annually on GST portal to legally export software development services with 0% tax under IGST.</p>
              
              <div className="p-4 bg-zinc-900 border border-zinc-850 rounded space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-zinc-500">LUT ARN #:</span><span className="text-emerald-400 font-bold font-mono">{GST_LUT_DATA.arnNo}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">LUT Registration #:</span><span className="text-zinc-200 font-mono">{GST_LUT_DATA.lutNumber}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Financial Year:</span><span className="text-zinc-200">{GST_LUT_DATA.financialYear}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Valid Until:</span><span className="text-white font-bold">{GST_LUT_DATA.expiryDate}</span></div>
              </div>

              <button
                onClick={() => addToast('Annual GST LUT Renewal filing payload prepared for GST Portal.', 'success')}
                className="w-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500 text-emerald-400 font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer"
              >
                Trigger Annual GST LUT Renewal Filing
              </button>
            </div>

            {/* DTAA Form 10F & TRC Manager */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">DTAA Form 10F & TRC Repository</h3>
              <p className="text-[11px] text-zinc-400">Secures Form 10F and Tax Residency Certificates (TRC) from intl clients to prevent tax withholding (WHT) at source.</p>
              
              <div className="space-y-3">
                {DTAA_RECORDS.map((dtaa) => (
                  <div key={dtaa.id} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-white">{dtaa.client} ({dtaa.country})</span>
                      <span className="text-emerald-400">{dtaa.whtRateAtSource}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 flex justify-between">
                      <span>TRC #: {dtaa.trcCertificateNo}</span>
                      <span>Form 10F: {dtaa.form10FStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Subcontractor TDS Section 194J & OCR Travel Reimbursements */}
      {activeTab === 'travel_tds' && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-8 space-y-8 backdrop-blur-md">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} className="text-emerald-400" />
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-widest">Sub-contractor TDS & Travel Expenses</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">TDS Withholding & OCR Receipt Scanner</h1>
            <p className="text-sm text-zinc-400 mt-1">Automates 1%/10% Section 194J TDS deductions with Form 16A and processes OCR travel receipt approvals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sub-contractor Tax Deducted at Source (TDS) */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Sub-contractor TDS (Sec 194J)</h3>
              <p className="text-[11px] text-zinc-400">Auto-withholding mechanism of 1% or 10% TDS under Section 194J for Indian devs, dispatching Form 16As.</p>
              
              <div className="space-y-3">
                {SUBCONTRACTOR_TDS_RECORDS.map((tds) => (
                  <div key={tds.id} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-white">{tds.devAlias} (PAN: {tds.panMasked})</span>
                      <span className="text-red-400">TDS {tds.tdsRate}: -₹{tds.tdsDeducted.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Gross: ₹{tds.grossPayout.toLocaleString()}</span>
                      <span>Net: ₹{tds.netDisbursed.toLocaleString()}</span>
                    </div>
                    <div className="text-[9px] text-emerald-400 uppercase font-bold">
                      Form 16A: {tds.form16AStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Travel & Cost Reimbursement OCR Scanner */}
            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded space-y-4">
              <h3 className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Dynamic Travel OCR Scanner</h3>
              <p className="text-[11px] text-zinc-400">Optical character recognition (OCR) scanner for developers to upload travel receipts, with auto-routing to CFO panel.</p>
              
              <button
                onClick={handleSimulateOcrUpload}
                disabled={ocrScanning}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-2.5 text-xs rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload size={14} />
                {ocrScanning ? 'Scanning Receipt via OCR...' : 'Simulate Developer OCR Receipt Upload'}
              </button>

              <div className="space-y-3 max-h-[220px] overflow-y-auto">
                {reimbursements.map((r) => (
                  <div key={r.id} className="p-3 bg-zinc-900 border border-zinc-850 rounded text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">{r.devAlias} - {r.merchant}</span>
                      <span className="text-[10px] text-zinc-400 block">{r.category} | OCR Confidence: {(r.ocrConfidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">₹{r.amount.toLocaleString()}</div>
                      {r.status === 'Pending CFO Approval' ? (
                        <button
                          onClick={() => handleApproveReimbursement(r.id)}
                          className="px-2 py-0.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-[8px] rounded mt-1"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-[8px] text-emerald-400 block font-bold uppercase mt-1">Approved</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CFOPanel;
