import { 
  ProjectTask, LeadAssignment, EscrowTransaction, ZohoContract, 
  ChangeRequestTicket, SandboxStatus, ScraperLog, FiraRemittance, PartnerAffiliate,
  GstLutFiling, InternationalEntity, PrivacyPolicyConfig, DtaaRecord, FreelancerNda, IecRegistration,
  StripeDccRate, PennyDropRecord, SkydoRoutingDetails, SundayPayoutSchedule, SubcontractorTdsRecord, TravelReimbursement,
  FastApiAsgiMetrics, RedisClusterNode, SupabaseClusterTopology, EdgeReplicaMetric, HsmVaultMapping, VaptAuditControl,
  TargetAccount, CollegePipeline, OssRewardContribution, Soc2ControlItem
} from './types';

export const BACKUP_ROSTER: any[] = [];

export const MAANG_JOBS: any[] = [];

export const INITIAL_TASKS: ProjectTask[] = [];

export const INITIAL_LEADS: LeadAssignment[] = [];

export const INITIAL_ESCROW: EscrowTransaction[] = [];

export const STRIPE_RECON_RECORDS: any[] = [];

export const ZOHO_CONTRACTS: ZohoContract[] = [];

export const FIRA_REMITTANCES: FiraRemittance[] = [];

export const PARTNER_AFFILIATES: PartnerAffiliate[] = [];

export const GST_LUT_DATA: GstLutFiling = {
  lutNumber: 'N/A',
  arnNo: 'N/A',
  financialYear: '2026-2027',
  status: 'Renewal Pending',
  expiryDate: 'N/A',
  igstExportRate: '0%'
};

export const INTERNATIONAL_ENTITIES: InternationalEntity[] = [];

export const DTAA_RECORDS: DtaaRecord[] = [];

export const FREELANCER_NDAS: FreelancerNda[] = [];

export const IEC_REGISTRATION: IecRegistration = {
  iecNumber: 'N/A',
  dgftStatus: 'Update Required',
  exporterCategory: 'Software Development Services Export',
  lastFilingDate: 'N/A'
};

export const STRIPE_DCC_RATES: StripeDccRate[] = [];

export const PENNY_DROP_RECORDS: PennyDropRecord[] = [];

export const SKYDO_VIRTUAL_ROUTING: SkydoRoutingDetails = {
  virtualAccountNo: 'N/A',
  routingNo: 'N/A',
  swiftBic: 'N/A',
  currency: 'USD',
  bankName: 'N/A',
  beneficiary: 'N/A'
};

export const SUNDAY_PAYOUT_STATUS: SundayPayoutSchedule = {
  nextPayoutTime: 'N/A',
  totalVolumeInr: 0,
  devBeneficiariesCount: 0,
  scheduledTime: 'Sunday 18:00 IST',
  status: 'SCHEDULED',
  gateway: 'RazorpayX (IMPS/NEFT)'
};

export const SUBCONTRACTOR_TDS_RECORDS: SubcontractorTdsRecord[] = [];

export const TRAVEL_REIMBURSEMENTS: TravelReimbursement[] = [];

export const FASTAPI_ASGI_METRICS: FastApiAsgiMetrics = {
  server: 'Uvicorn ASGI (Managed by Hypercorn/Gunicorn)',
  activeSockets: 0,
  maxSocketCapacity: 50000,
  serverInstances: 0,
  cpuUtilizationPercent: 0,
  memoryUsageMb: 0
};

export const REDIS_CLUSTER_NODES: RedisClusterNode[] = [
  { nodeId: 'node-1-primary', role: 'Master', channelCount: 0, messagesPerSec: 0, pubSubLatencyMs: 0, status: 'HEALTHY' }
];

export const SUPABASE_TOPOLOGY: SupabaseClusterTopology = {
  primaryWriteNode: 'N/A',
  readReplicaNode: 'N/A',
  chatBroadcastReplicaNode: 'N/A',
  replicaLagMs: 0,
  writeQueueDepth: 0
};

export const EDGE_REPLICAS: EdgeReplicaMetric[] = [];

export const HSM_VAULT_DATA: HsmVaultMapping = {
  vaultId: 'N/A',
  encryptedAlias: 'N/A',
  encryptionAlgo: 'AES-256-GCM (Hardware Cryptographic Module)',
  keyRotationDate: 'N/A',
  status: 'HARDWARE_VAULT_LOCKED'
};

export const VAPT_AUDIT_CONTROLS: VaptAuditControl[] = [];

export const TARGET_ACCOUNTS: TargetAccount[] = [];

export const COLLEGE_PIPELINE: CollegePipeline[] = [];

export const OSS_REWARDS: OssRewardContribution[] = [];

export const SOC2_CONTROLS: Soc2ControlItem[] = [];

export const DEFAULT_CHANGE_REQUESTS: ChangeRequestTicket[] = [];

export const REGIONAL_INCOME: any[] = [];

export const PLACEMENT_COMMISSIONS: any[] = [];

export const TRANSPORT_SUBSIDIES: any[] = [];

export const CLINIC_SCRAPER_ROWS: any[] = [];

export const VAPI_DIAGNOSTICS: any[] = [];

export const SHARED_TEMPLATES: any[] = [];

export const WAF_SECURITY_DATA = {
  wafThreatsBlocked: 0,
  cloudflareCacheRatio: '0%',
  sentryErrorRatePercent: 0,
  datadogTracingStatus: 'HEALTHY',
  cdnLatencyMs: 0
};

export const INITIAL_SANDBOXES: SandboxStatus[] = [];
