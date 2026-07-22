import { 
  ProjectTask, LeadAssignment, EscrowTransaction, ZohoContract, 
  ChangeRequestTicket, SandboxStatus, ScraperLog, FiraRemittance, PartnerAffiliate,
  GstLutFiling, InternationalEntity, PrivacyPolicyConfig, DtaaRecord, FreelancerNda, IecRegistration,
  StripeDccRate, PennyDropRecord, SkydoRoutingDetails, SundayPayoutSchedule, SubcontractorTdsRecord, TravelReimbursement,
  FastApiAsgiMetrics, RedisClusterNode, SupabaseClusterTopology, EdgeReplicaMetric, HsmVaultMapping, VaptAuditControl,
  TargetAccount, CollegePipeline, OssRewardContribution, Soc2ControlItem
} from './types';

export const BACKUP_ROSTER = [
  { id: 'UB_BACKUP_01', status: 'Standby - On Demand', speed: '98%', focus: 'Fullstack' },
  { id: 'UB_BACKUP_02', status: 'Standby - Off Cycle', speed: '94%', focus: 'Scrapers' },
  { id: 'UB_BACKUP_03', status: 'Standby - Active', speed: '99%', focus: 'AI Integration' },
  { id: 'UB_BACKUP_04', status: 'Standby - Weekend', speed: '95%', focus: 'NextJS/Tailwind' }
];

export const MAANG_JOBS = [
  { company: 'Meta', title: 'Senior Product Engineer (L6)', location: 'Remote / NYC', pay: '$240k - $310k', matches: ['NextJS', 'Agentic Workflows'] },
  { company: 'Google', title: 'Staff Frontend Engineer (L7)', location: 'Remote / Mountain View', pay: '$280k - $360k', matches: ['Tailwind', 'Web Performance'] },
  { company: 'Netflix', title: 'UI Lead Architect', location: 'Los Gatos / Hybrid', pay: '$300k - $450k', matches: ['TypeScript', 'Design Systems'] },
  { company: 'Apple', title: 'Embedded Agent Developer', location: 'Sunnyvale', pay: '$220k - $290k', matches: ['Scraper Optimization', 'C++ Layer'] }
];

export const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 'TSK-201',
    name: 'Layer-1 Clinic Scraper Pipeline',
    client: 'CardioCare Diagnostics',
    tier: '₹4,999',
    stage: 'Development',
    description: 'Establish secure headless browser scraper to index patient appointment matrices.',
    assignedDev: 'UB_DEV_14',
    prsCount: 3,
    health: 'Stable',
    jestPassed: true,
    typeScriptPassed: true
  },
  {
    id: 'TSK-202',
    name: 'Skydo Global Webhook Handler',
    client: 'Apex Fintech Ltd',
    tier: '₹4,999',
    stage: 'QA',
    description: 'Construct real-time multi-currency remittance clearance handlers and invoice generators.',
    assignedDev: 'UB_DEV_04',
    prsCount: 5,
    health: 'Stable',
    jestPassed: true,
    typeScriptPassed: true
  },
  {
    id: 'TSK-203',
    name: 'Static Portfolio Impulse Page',
    client: 'Local Coffee Roasters',
    tier: '₹499',
    stage: 'Production',
    description: 'High-speed minimalist single-view layout optimized for mobile loads.',
    assignedDev: 'UB_DEV_07',
    prsCount: 1,
    health: 'Stable',
    jestPassed: true,
    typeScriptPassed: true
  },
  {
    id: 'TSK-204',
    name: 'Retell Outreach Audio Endpoint',
    client: 'MedScribe Wellness',
    tier: '₹2,499',
    stage: 'Pipeline',
    description: 'Configuring interactive audio-agent workflows to trigger follow-up patient calls.',
    assignedDev: 'Unassigned',
    prsCount: 0,
    health: 'Warning',
    jestPassed: false,
    typeScriptPassed: true
  },
  {
    id: 'TSK-205',
    name: 'Stripe Escrow Split Manager',
    client: 'HyperMart Logistics',
    tier: '₹4,999',
    stage: 'Development',
    description: 'Integrate automated contractor payouts upon milestone releases.',
    assignedDev: 'UB_DEV_22',
    prsCount: 2,
    health: 'Stable',
    jestPassed: true,
    typeScriptPassed: true
  }
];

export const INITIAL_LEADS: LeadAssignment[] = [
  { id: 'LD-401', name: 'Premium Healthcare API Engine', value: '₹4,999/mo', region: 'North America', suggestedTier: '₹4,999' },
  { id: 'LD-402', name: 'Realestate Micro-Impulse Site', value: '₹499/mo', region: 'Europe', suggestedTier: '₹499' },
  { id: 'LD-403', name: 'E-commerce Pipeline Upgrade', value: '₹2,499/mo', region: 'Middle East', suggestedTier: '₹2,499' },
  { id: 'LD-404', name: 'Clinic Scheduling Webhook Adapter', value: '₹4,999/mo', region: 'North America', suggestedTier: '₹4,999' }
];

export const INITIAL_ESCROW: EscrowTransaction[] = [
  { id: 'ESC-901', client: 'CardioCare Diagnostics', project: 'Layer-1 Clinic Scraper Pipeline', amount: 4999, status: 'Escrowed', txHash: '0x8f3a...91d2', timestamp: '2026-07-20 14:10' },
  { id: 'ESC-902', client: 'Apex Fintech Ltd', project: 'Skydo Global Webhook Handler', amount: 4999, status: 'Released', txHash: '0x7e2b...44c1', timestamp: '2026-07-19 18:00' },
  { id: 'ESC-903', client: 'MedScribe Wellness', project: 'Retell Outreach Audio Endpoint', amount: 2499, status: 'Escrowed', txHash: '0x1c9d...33e4', timestamp: '2026-07-18 11:30' },
  { id: 'ESC-904', client: 'HyperMart Logistics', project: 'Stripe Escrow Split Manager', amount: 4999, status: 'Escrowed', txHash: '0x9a8f...22b8', timestamp: '2026-07-17 09:45' }
];

export const STRIPE_RECON_RECORDS = [
  { id: 'STR-4421', desc: 'Subscription Clear - ₹4,999 Enterprise', fee: '₹145', net: '₹4,854', gate: 'Stripe Global', date: '2026-07-19' },
  { id: 'SKY-2204', desc: 'Direct Inward Wire - USD $120.00', fee: '₹80', net: '₹9,840', gate: 'Skydo Remit', date: '2026-07-18' },
  { id: 'STR-4420', desc: 'Subscription Clear - ₹499 Impulse', fee: '₹15', net: '₹484', gate: 'Stripe Global', date: '2026-07-17' },
  { id: 'SKY-2203', desc: 'Direct Inward Wire - USD $60.00', fee: '₹40', net: '₹4,920', gate: 'Skydo Remit', date: '2026-07-16' }
];

export const ZOHO_CONTRACTS: ZohoContract[] = [
  { id: 'ZOHO-001', party: 'UB_DEV_14 (Anon Profile)', role: 'Senior Developer', type: 'NDA', status: 'Signed', date: '2026-07-02', ipTransferClause: true },
  { id: 'ZOHO-002', party: 'UB_DEV_04 (Anon Profile)', role: 'Core Architect', type: 'Contractor Agreement', status: 'Signed', date: '2026-07-05', ipTransferClause: true },
  { id: 'ZOHO-003', party: 'CardioCare Diagnostics', role: 'Corporate Client', type: 'Master Services Agreement (MSA)', status: 'Signed', date: '2026-07-14', ipTransferClause: true },
  { id: 'ZOHO-004', party: 'UB_DEV_22 (Anon Profile)', role: 'Junior Builder', type: 'NDA', status: 'Signed', date: '2026-07-18', ipTransferClause: true },
  { id: 'ZOHO-005', party: 'MedScribe Wellness', role: 'Corporate Client', type: 'Statement of Work (SOW)', status: 'Review', date: '2026-07-19', ipTransferClause: true }
];

export const FIRA_REMITTANCES: FiraRemittance[] = [
  { id: 'FIRA-228', ref: 'BOM-2204-98', client: 'CardioCare Diagnostics', amount: '$120.00', status: 'Validated', date: '2026-07-14', adBank: 'HDFC AD Cat-1 / Skydo', gstInvoiceMatched: true },
  { id: 'FIRA-229', ref: 'BOM-2204-99', client: 'HyperMart Logistics', amount: '$240.00', status: 'Pending Verification', date: '2026-07-19', adBank: 'ICICI AD Cat-1 / Skydo', gstInvoiceMatched: false },
  { id: 'FIRA-230', ref: 'BOM-2204-100', client: 'MedScribe Wellness', amount: '$60.00', status: 'Validated', date: '2026-07-19', adBank: 'HDFC AD Cat-1 / Skydo', gstInvoiceMatched: true }
];

export const PARTNER_AFFILIATES: PartnerAffiliate[] = [
  { partner: 'GeekForce Institute', traffic: '2,400 hits', clicks: 1420, conversion: '6.2%', payoutObligation: '₹14,500', referralCode: 'UB-GEEK-2026' },
  { partner: 'Developer Guild Kerala', traffic: '1,800 hits', clicks: 940, conversion: '4.8%', payoutObligation: '₹8,400', referralCode: 'UB-KERALA-DEV' },
  { partner: 'BuildSpace Referral Node', traffic: '850 hits', clicks: 430, conversion: '9.1%', payoutObligation: '₹12,000', referralCode: 'UB-BUILD-NODE' }
];

// -------------------------------------------------------------
// Data for 50-Point Pillars
// -------------------------------------------------------------

export const GST_LUT_DATA: GstLutFiling = {
  lutNumber: 'AD2703260019283',
  arnNo: 'ARN-AA27032609123',
  financialYear: 'FY 2026-2027',
  status: 'Active (0% IGST Export)',
  expiryDate: '2027-03-31',
  igstExportRate: '0% Zero-Rated Supply (Under Section 16 of IGST Act)'
};

export const INTERNATIONAL_ENTITIES: InternationalEntity[] = [
  {
    entityName: 'UB Technologies Inc. (Delaware C-Corp)',
    jurisdiction: 'Delaware C-Corp (USA)',
    role: 'Client Contracting Sub',
    status: 'Active & Verified',
    einOrTaxId: 'DE-88-9182371',
    regAddress: '1209 North Orange St, Wilmington, DE 19801'
  },
  {
    entityName: 'UB Technologies Pte. Ltd. (Singapore)',
    jurisdiction: 'Singapore Pte Ltd',
    role: 'Global Treasury',
    status: 'Active & Verified',
    einOrTaxId: 'UEN-202619823K',
    regAddress: '68 Circular Road, #02-01, Singapore 049422'
  },
  {
    entityName: 'UB Technologies Private Limited (India)',
    jurisdiction: 'India Pvt Ltd (Parent)',
    role: 'Engineering Headquarters',
    status: 'Active & Verified',
    einOrTaxId: 'CIN-U72900KA2026PTC19823',
    regAddress: 'HSR Layout Sector 1, Bengaluru, KA 560102'
  }
];

export const DTAA_RECORDS: DtaaRecord[] = [
  { id: 'DTAA-01', client: 'CardioCare Diagnostics', country: 'United States', form10FStatus: 'Verified', trcCertificateNo: 'US-IRS-TRC-9921', whtRateAtSource: '0% (DTAA Applied)', validUntil: '2026-12-31' },
  { id: 'DTAA-02', client: 'Apex Fintech Ltd', country: 'United Kingdom', form10FStatus: 'Verified', trcCertificateNo: 'UK-HMRC-TRC-4410', whtRateAtSource: '0% (DTAA Applied)', validUntil: '2026-12-31' }
];

export const FREELANCER_NDAS: FreelancerNda[] = [
  { id: 'NDA-DEV-14', alias: 'UB_DEV_14', legalHashVerification: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', ndaStatus: 'Executed & Cryptographically Signed', signedDate: '2026-07-02' },
  { id: 'NDA-DEV-04', alias: 'UB_DEV_04', legalHashVerification: '8792070f80874e0f4955743a6d4590c29ab9cf879e602497fb293c66f567b494', ndaStatus: 'Executed & Cryptographically Signed', signedDate: '2026-07-05' }
];

export const IEC_REGISTRATION: IecRegistration = {
  iecNumber: '0719001928',
  dgftStatus: 'Active & Verified',
  exporterCategory: 'Software Development Services Export',
  lastFilingDate: '2026-06-30'
};

export const STRIPE_DCC_RATES: StripeDccRate[] = [
  { currency: 'USD', rateToInr: 83.50, symbol: '$', dccEnabled: true },
  { currency: 'EUR', rateToInr: 91.20, symbol: '€', dccEnabled: true },
  { currency: 'GBP', rateToInr: 108.40, symbol: '£', dccEnabled: true },
  { currency: 'SGD', rateToInr: 62.10, symbol: 'S$', dccEnabled: true }
];

export const PENNY_DROP_RECORDS: PennyDropRecord[] = [
  { id: 'PD-101', devAlias: 'UB_DEV_14', bankAccountMask: 'XXXXXX4892', ifscCode: 'HDFC0000240', verificationStatus: 'VERIFIED', pennyAmountSent: '₹1.00', timestamp: '2026-07-19 10:15' },
  { id: 'PD-102', devAlias: 'UB_DEV_04', bankAccountMask: 'XXXXXX9104', ifscCode: 'ICIC0001092', verificationStatus: 'VERIFIED', pennyAmountSent: '₹1.00', timestamp: '2026-07-19 10:16' }
];

export const SKYDO_VIRTUAL_ROUTING: SkydoRoutingDetails = {
  virtualAccountNo: '882901928301',
  routingNo: '021000021',
  swiftBic: 'SKYDUS33XXX',
  currency: 'USD',
  bankName: 'Community Federal Savings Bank (Via Skydo AD Cat-1)',
  beneficiary: 'UB Technologies Inc. Treasury'
};

export const SUNDAY_PAYOUT_STATUS: SundayPayoutSchedule = {
  nextPayoutTime: 'Sunday 18:00 IST',
  totalVolumeInr: 142000,
  devBeneficiariesCount: 6,
  scheduledTime: '2026-07-26T18:00:00+05:30',
  status: 'SCHEDULED',
  gateway: 'RazorpayX (IMPS/NEFT)'
};

export const SUBCONTRACTOR_TDS_RECORDS: SubcontractorTdsRecord[] = [
  { id: 'TDS-801', devAlias: 'UB_DEV_14', panMasked: 'ABCDE1234F', section: 'Section 194J (Professional Tech Services)', grossPayout: 45000, tdsRate: '10%', tdsDeducted: 4500, netDisbursed: 40500, form16AStatus: 'Generated & Dispatched' },
  { id: 'TDS-802', devAlias: 'UB_DEV_04', panMasked: 'XYZPS9876K', section: 'Section 194J (Professional Tech Services)', grossPayout: 38000, tdsRate: '10%', tdsDeducted: 3800, netDisbursed: 34200, form16AStatus: 'Generated & Dispatched' }
];

export const TRAVEL_REIMBURSEMENTS: TravelReimbursement[] = [
  { id: 'TRV-301', devAlias: 'UB_DEV_14', merchant: 'IndiGo Airlines', category: 'Flight', amount: 4850, ocrConfidence: 0.98, status: 'Approved by CFO', receiptName: 'flight_ticket_blr_del.pdf', timestamp: '2026-07-18 14:20' },
  { id: 'TRV-302', devAlias: 'UB_DEV_04', merchant: 'AWS Server Cloud', category: 'SaaS Tool', amount: 2400, ocrConfidence: 0.95, status: 'Approved by CFO', receiptName: 'aws_invoice_july.pdf', timestamp: '2026-07-19 16:10' }
];

export const FASTAPI_ASGI_METRICS: FastApiAsgiMetrics = {
  server: 'Uvicorn ASGI (Managed by Hypercorn/Gunicorn)',
  activeSockets: 10420,
  maxSocketCapacity: 50000,
  serverInstances: 8,
  cpuUtilizationPercent: 24.5,
  memoryUsageMb: 512
};

export const REDIS_CLUSTER_NODES: RedisClusterNode[] = [
  { nodeId: 'redis-node-01', role: 'Master', channelCount: 42, messagesPerSec: 1240, pubSubLatencyMs: 1.2, status: 'HEALTHY' },
  { nodeId: 'redis-node-02', role: 'Replica', channelCount: 42, messagesPerSec: 1240, pubSubLatencyMs: 1.5, status: 'HEALTHY' }
];

export const SUPABASE_TOPOLOGY: SupabaseClusterTopology = {
  primaryWriteNode: 'db-primary-us-east.supabase.co',
  readReplicaNode: 'db-read-replica-01.supabase.co',
  chatBroadcastReplicaNode: 'db-realtime-broadcast-replica.supabase.co',
  replicaLagMs: 4,
  writeQueueDepth: 0
};

export const EDGE_REPLICAS: EdgeReplicaMetric[] = [
  { region: 'US-East (N. Virginia)', cloudRunStatus: 'Active Edge', latencyMs: 42 },
  { region: 'EU-Central (Frankfurt)', cloudRunStatus: 'Active Edge', latencyMs: 68 },
  { region: 'AP-South (Mumbai)', cloudRunStatus: 'Active Edge', latencyMs: 18 }
];

export const HSM_VAULT_DATA: HsmVaultMapping = {
  vaultId: 'HSM-VAULT-AWS-KMS-009',
  encryptedAlias: 'AES256GCM:a7b8c9d0e1f234567890abcdef123456',
  encryptionAlgo: 'AES-256-GCM (Hardware Cryptographic Module)',
  keyRotationDate: '2026-07-01',
  status: 'HARDWARE_VAULT_LOCKED'
};

export const VAPT_AUDIT_CONTROLS: VaptAuditControl[] = [
  { controlId: 'VAPT-01', name: 'FastAPI WebSocket Token Authentication & Disconnect Handshake', category: 'WebSocket Controllers', status: 'Passed Audit', grade: 'A+' },
  { controlId: 'VAPT-02', name: 'Supabase RLS Anonymous Alias Separation', category: 'Supabase RLS Rules', status: 'Passed Audit', grade: 'A+' },
  { controlId: 'VAPT-03', name: 'AES-256-GCM HSM Real ID Decryption Isolation', category: 'HSM Vault', status: 'Passed Audit', grade: 'A+' },
  { controlId: 'VAPT-04', name: 'Centralized Reverse Proxy Physical Host IP Masking', category: 'Reverse Proxy', status: 'Passed Audit', grade: 'A+' }
];

export const TARGET_ACCOUNTS: TargetAccount[] = [
  { id: 'TAL-001', companyName: 'Aether Health AI', sector: 'HealthTech', headquarters: 'San Francisco, CA', requiredCapacity: '4x Fullstack Team', outreachStage: 'MSA Signed' },
  { id: 'TAL-002', companyName: 'Pulse Ledger US', sector: 'FinTech', headquarters: 'New York, NY', requiredCapacity: '2x L6+ Engineers', outreachStage: 'Meeting Booked' },
  { id: 'TAL-003', companyName: 'Genomics Flow Inc', sector: 'AI-First Startup', headquarters: 'Boston, MA', requiredCapacity: '1x Lead Architect', outreachStage: 'Cold Sequence Sent' }
];

export const COLLEGE_PIPELINE: CollegePipeline[] = [
  { institution: 'IIT Bombay (Computer Science Dept)', tier: 'Tier-1 Engineering', qualifiedStudents: 18, recruitmentStatus: 'MoU Active' },
  { institution: 'BITS Pilani (Software Engineering Lab)', tier: 'Premier Tech Institute', qualifiedStudents: 24, recruitmentStatus: 'Sprints Assessment' }
];

export const OSS_REWARDS: OssRewardContribution[] = [
  { id: 'OSS-101', devAlias: 'UB_DEV_14', repository: 'ub-club/fastapi-websocket-sanitizer', starsCount: 340, rewardAmount: 5000, disbursementStatus: 'Disbursed' },
  { id: 'OSS-102', devAlias: 'UB_DEV_04', repository: 'ub-club/react-memory-sweep-hook', starsCount: 520, rewardAmount: 7500, disbursementStatus: 'Disbursed' }
];

export const SOC2_CONTROLS: Soc2ControlItem[] = [
  { section: 'CC6.1 - Logical Access Controls', description: 'Real User identity masked via Hardware HSM AES-256-GCM vault.', status: 'COMPLIANT' },
  { section: 'CC6.6 - Boundary Protection', description: 'IP reverse-proxy masks physical developer staging host locations.', status: 'COMPLIANT' },
  { section: 'CC7.2 - Infrastructure Monitoring', description: 'FastAPI ASGI socket pool & 30s Heartbeat Ping-Pong monitoring.', status: 'COMPLIANT' }
];

export const DEFAULT_CHANGE_REQUESTS: ChangeRequestTicket[] = [
  {
    id: 'CR-101',
    clientName: 'CardioCare Diagnostics',
    type: 'UI Adjustment',
    description: 'Add real-time filter by location in patient appointment grid on clinical staging portal.',
    priority: 'Medium',
    status: 'In Progress',
    timestamp: '2026-07-20 01:12'
  },
  {
    id: 'CR-102',
    clientName: 'Apex Fintech Ltd',
    type: 'API Modification',
    description: 'Provide payload backup encryption keys inside response headers of Skydo verification callbacks.',
    priority: 'High',
    status: 'Open',
    timestamp: '2026-07-20 02:22'
  }
];

export const REGIONAL_INCOME = [
  { region: 'North America (US/CA)', volume: '₹48,20,000', ratio: '48%', clientsCount: 64 },
  { region: 'Europe (UK/DE)', volume: '₹28,10,000', ratio: '28%', clientsCount: 38 },
  { region: 'Middle East (UAE/SA)', volume: '₹24,10,000', ratio: '24%', clientsCount: 40 }
];

export const PLACEMENT_COMMISSIONS = [
  { id: 'PLC-101', candidate: 'Rohan Sharma', institute: 'GeekForce Institute', amount: '₹12,500 (50% Split)', status: 'Approved', clearanceDate: '2026-07-25' },
  { id: 'PLC-102', candidate: 'Nikhil Nair', institute: 'Developer Guild Kerala', amount: '₹7,500 (50% Split)', status: 'Disbursing', clearanceDate: '2026-07-25' }
];

export const TRANSPORT_SUBSIDIES = [
  { id: 'SUB-401', dev: 'UB_DEV_14', trip: 'Studio Hub ↔ Bangalore Core', cost: '₹1,200', type: 'Travel Allowance', date: '2026-07-19' },
  { id: 'SUB-402', dev: 'UB_DEV_04', trip: 'Onsite Client Run - CardioCare', cost: '₹1,850', type: 'Car Rental', date: '2026-07-20' },
  { id: 'SUB-403', dev: 'UB_DEV_22', trip: 'Studio Run - Weekend Sprint', cost: '₹850', type: 'Travel Allowance', date: '2026-07-20' }
];

export const CLINIC_SCRAPER_ROWS = [
  { patientId: 'PID-9021', status: 'Cleaned', timestamp: '02:30:14', parameters: 'BP: 120/80, HR: 72bpm' },
  { patientId: 'PID-9022', status: 'Cleaned', timestamp: '02:31:05', parameters: 'BP: 135/85, HR: 88bpm' },
  { patientId: 'PID-9023', status: 'Sanitized', timestamp: '02:32:41', parameters: 'BP: 110/70, HR: 65bpm' },
  { patientId: 'PID-9024', status: 'Cleaned', timestamp: '02:35:19', parameters: 'BP: 128/82, HR: 74bpm' }
];

export const VAPI_DIAGNOSTICS = [
  { callId: 'VAPI-99402', endpoint: 'vapi-alpha-us', duration: '2m 14s', latency: '142ms', status: 'Stable' },
  { callId: 'VAPI-99403', endpoint: 'vapi-beta-eu', duration: '1m 05s', latency: '198ms', status: 'Warning' },
  { callId: 'VAPI-99404', endpoint: 'vapi-alpha-us', duration: '3m 41s', latency: '135ms', status: 'Stable' }
];

export const SHARED_TEMPLATES = [
  { name: 'Headless Scraper Wrapper', file: 'scraper.ts', lines: 140, usageCount: 14 },
  { name: 'Skydo Remittance Webhook Hook', file: 'skydo-webhook.ts', lines: 95, usageCount: 22 },
  { name: 'Meta Pixel Conversion Proxy', file: 'meta-pixel.ts', lines: 60, usageCount: 8 }
];

export const WAF_SECURITY_DATA = {
  wafThreatsBlocked: 4210,
  cloudflareCacheRatio: '99.4%',
  sentryErrorRatePercent: 0.01,
  datadogTracingStatus: 'HEALTHY' as const,
  cdnLatencyMs: 8
};

export const INITIAL_SANDBOXES: SandboxStatus[] = [
  { id: 'SND-ALPHA', url: 'https://staging.alpha.ub.technology', status: 'Online', healthScore: 99, proxyMasked: true, hostIp: '10.0.4.12 (Masked via Reverse Proxy)' },
  { id: 'SND-BETA', url: 'https://staging.beta.ub.technology', status: 'Online', healthScore: 94, proxyMasked: true, hostIp: '10.0.4.15 (Masked via Reverse Proxy)' },
  { id: 'SND-GAMMA', url: 'https://staging.gamma.ub.technology', status: 'Online', healthScore: 100, proxyMasked: true, hostIp: '10.0.4.18 (Masked via Reverse Proxy)' }
];
