export type SessionRole = 'CEO' | 'CFO' | 'COO' | 'CTO' | 'DEV' | 'CLIENT' | 'CHAT';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warn' | 'info';
  timestamp: string;
}

export interface ProjectTask {
  id: string;
  name: string;
  client: string;
  tier: '₹499' | '₹2,499' | '₹4,999';
  stage: 'Pipeline' | 'Development' | 'QA' | 'Production';
  description: string;
  assignedDev: string; // e.g., 'UB_DEV_14' or 'Unassigned'
  prsCount: number;
  health: 'Stable' | 'Warning' | 'Error';
  jestPassed?: boolean;
  typeScriptPassed?: boolean;
}

export interface LeadAssignment {
  id: string;
  name: string;
  value: string;
  region: string;
  suggestedTier: string;
}

export interface EscrowTransaction {
  id: string;
  client: string;
  project: string;
  amount: number;
  status: 'Escrowed' | 'Released' | 'Refused';
  txHash?: string;
  timestamp?: string;
}

export interface ZohoContract {
  id: string;
  party: string;
  role: string;
  type: 'NDA' | 'Contractor Agreement' | 'IP Assignment' | 'Master Services Agreement (MSA)' | 'Statement of Work (SOW)';
  status: 'Signed' | 'Pending' | 'Review';
  date: string;
  ipTransferClause?: boolean;
}

export interface ChangeRequestTicket {
  id: string;
  clientName: string;
  type: 'UI Adjustment' | 'Logic Bug' | 'API Modification';
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export interface SandboxStatus {
  id: string;
  url: string;
  status: 'Online' | 'Offline' | 'Staging';
  healthScore: number;
  proxyMasked?: boolean;
  hostIp?: string;
}

export interface ScraperLog {
  timestamp: string;
  targetNode: string;
  status: 'Success' | 'Parsing' | 'Timeout';
  payloadSize: string;
}

export interface FiraRemittance {
  id: string;
  ref: string;
  client: string;
  amount: string;
  status: 'Validated' | 'Pending Verification';
  date: string;
  adBank?: string;
  gstInvoiceMatched?: boolean;
}

export interface PartnerAffiliate {
  partner: string;
  traffic: string;
  clicks: number;
  conversion: string;
  payoutObligation: string;
  referralCode?: string;
}

export interface SystemState {
  isAuthenticated: boolean;
  activeRole: SessionRole;
  systemStatus: 'SECURE_SESSION' | 'LOCKOUT';
  selectedEntity: 'UB Technologies' | 'UB CLUB';
  founderFocus: 'In Studio' | 'In Sprints' | 'Strategic' | 'Standby';
  adSpend: number;
  developerSlots: number;
  systemUptime: string;
  edgeSpeed: string;
}

// -------------------------------------------------------------
// Pillar 1: Legal & Cross-Border Regulatory Compliance (1–8)
// -------------------------------------------------------------
export interface GstLutFiling {
  lutNumber: string;
  arnNo: string;
  financialYear: string;
  status: 'Active (0% IGST Export)' | 'Renewal Pending' | 'Expired';
  expiryDate: string;
  igstExportRate: string;
}

export interface InternationalEntity {
  entityName: string;
  jurisdiction: 'Delaware C-Corp (USA)' | 'Singapore Pte Ltd' | 'India Pvt Ltd (Parent)';
  role: 'Client Contracting Sub' | 'Global Treasury' | 'Engineering Headquarters';
  status: 'Active & Verified' | 'Incorporation Pending';
  einOrTaxId: string;
  regAddress: string;
}

export interface PrivacyPolicyConfig {
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  dpdpCompliant: boolean;
  ipPiiClassification: boolean;
  chatLogPiiClassification: boolean;
  retentionDays: number;
}

export interface DtaaRecord {
  id: string;
  client: string;
  country: string;
  form10FStatus: 'Verified' | 'Pending Upload';
  trcCertificateNo: string;
  whtRateAtSource: '0% (DTAA Applied)' | '10%' | '20%';
  validUntil: string;
}

export interface FreelancerNda {
  id: string;
  alias: string;
  legalHashVerification: string;
  ndaStatus: 'Executed & Cryptographically Signed' | 'Pending';
  signedDate: string;
}

export interface IecRegistration {
  iecNumber: string;
  dgftStatus: 'Active & Verified' | 'Update Required';
  exporterCategory: 'Software Development Services Export';
  lastFilingDate: string;
}

// -------------------------------------------------------------
// Pillar 2: Global Financial & Remittance Infrastructure (9–16)
// -------------------------------------------------------------
export interface StripeDccRate {
  currency: 'USD' | 'EUR' | 'GBP' | 'SGD';
  rateToInr: number;
  symbol: string;
  dccEnabled: boolean;
}

export interface PennyDropRecord {
  id: string;
  devAlias: string;
  bankAccountMask: string;
  ifscCode: string;
  verificationStatus: 'VERIFIED' | 'FAILED' | 'PENDING';
  pennyAmountSent: string;
  timestamp: string;
}

export interface SkydoRoutingDetails {
  virtualAccountNo: string;
  routingNo: string;
  swiftBic: string;
  currency: 'USD' | 'GBP' | 'EUR';
  bankName: string;
  beneficiary: string;
}

export interface SundayPayoutSchedule {
  nextPayoutTime: string;
  totalVolumeInr: number;
  devBeneficiariesCount: number;
  scheduledTime: string; // e.g. "Sunday 18:00 IST"
  status: 'SCHEDULED' | 'EXECUTING' | 'COMPLETED';
  gateway: 'RazorpayX (IMPS/NEFT)' | 'Cashfree AutoWire';
}

export interface SubcontractorTdsRecord {
  id: string;
  devAlias: string;
  panMasked: string;
  section: 'Section 194J (Professional Tech Services)';
  grossPayout: number;
  tdsRate: '1%' | '10%';
  tdsDeducted: number;
  netDisbursed: number;
  form16AStatus: 'Generated & Dispatched' | 'Queued';
}

export interface TravelReimbursement {
  id: string;
  devAlias: string;
  merchant: string;
  category: 'Flight' | 'Hotel' | 'SaaS Tool' | 'Hardware';
  amount: number;
  ocrConfidence: number;
  status: 'Approved by CFO' | 'Pending CFO Approval' | 'Rejected';
  receiptName: string;
  timestamp: string;
}

// -------------------------------------------------------------
// Pillar 3: Real-Time Architecture Scaling (17–24)
// -------------------------------------------------------------
export interface FastApiAsgiMetrics {
  server: 'Uvicorn ASGI (Managed by Hypercorn/Gunicorn)';
  activeSockets: number;
  maxSocketCapacity: number;
  serverInstances: number;
  cpuUtilizationPercent: number;
  memoryUsageMb: number;
}

export interface RedisClusterNode {
  nodeId: string;
  role: 'Master' | 'Replica';
  channelCount: number;
  messagesPerSec: number;
  pubSubLatencyMs: number;
  status: 'HEALTHY' | 'SYNCING';
}

export interface SupabaseClusterTopology {
  primaryWriteNode: string;
  readReplicaNode: string;
  chatBroadcastReplicaNode: string;
  replicaLagMs: number;
  writeQueueDepth: number;
}

export interface EdgeReplicaMetric {
  region: 'US-East (N. Virginia)' | 'EU-Central (Frankfurt)' | 'AP-South (Mumbai)';
  cloudRunStatus: 'Active Edge' | 'Standby';
  latencyMs: number;
}

// -------------------------------------------------------------
// Pillar 4 & 5 & 6 Models
// -------------------------------------------------------------
export interface HsmVaultMapping {
  vaultId: string;
  encryptedAlias: string; // Anonymous alias
  encryptionAlgo: 'AES-256-GCM (Hardware Cryptographic Module)';
  keyRotationDate: string;
  status: 'HARDWARE_VAULT_LOCKED';
}

export interface VaptAuditControl {
  controlId: string;
  name: string;
  category: 'WebSocket Controllers' | 'Supabase RLS Rules' | 'HSM Vault' | 'Reverse Proxy';
  status: 'Passed Audit' | 'Remediated';
  grade: 'A+' | 'A' | 'B';
}

export interface TargetAccount {
  id: string;
  companyName: string;
  sector: 'HealthTech' | 'FinTech' | 'AI-First Startup' | 'SaaS Platform';
  headquarters: string;
  requiredCapacity: '2x L6+ Engineers' | '4x Fullstack Team' | '1x Lead Architect';
  outreachStage: 'TAL Identified' | 'Cold Sequence Sent' | 'Meeting Booked' | 'MSA Signed';
}

export interface CollegePipeline {
  institution: string;
  tier: 'Tier-1 Engineering' | 'Premier Tech Institute';
  qualifiedStudents: number;
  recruitmentStatus: 'MoU Active' | 'Sprints Assessment';
}

export interface OssRewardContribution {
  id: string;
  devAlias: string;
  repository: string;
  starsCount: number;
  rewardAmount: number;
  disbursementStatus: 'Disbursed' | 'Review';
}

export interface Soc2ControlItem {
  section: string;
  description: string;
  status: 'COMPLIANT' | 'IN_AUDIT';
}

export interface WafSecurityMetrics {
  wafThreatsBlocked: number;
  cloudflareCacheRatio: string;
  sentryErrorRatePercent: number;
  datadogTracingStatus: 'HEALTHY' | 'SYNCING';
  cdnLatencyMs: number;
}
