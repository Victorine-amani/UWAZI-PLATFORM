// Comprehensive mock data for Uwazi Platform
// 14 entities as specified in the requirements

export interface User {
  user_id: string;
  name: string;
  role: 'citizen' | 'official' | 'auditor' | 'contractor' | 'panel_member' | 'admin';
  county: string;
  auth_id: string;
  verification_status: 'verified' | 'pending' | 'rejected';
  created_at: string;
  contact_info?: {
    email?: string;
    phone?: string;
  };
}

export interface Project {
  project_id: string;
  title: string;
  county: string;
  ward: string;
  sector: 'Health' | 'Education' | 'Infrastructure' | 'Water' | 'Agriculture' | 'Security' | 'Housing' | 'Energy';
  description: string;
  start_date: string;
  planned_end: string;
  actual_end?: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Suspended' | 'Delayed' | 'Cancelled';
  funding_type: 'Budget' | 'Loan' | 'Grant' | 'PPP' | 'Development Partner';
  loan_id?: string;
  assigned_official_id: string;
  created_at: string;
  updated_at: string;
  budget: number;
  spent: number;
  progress: number;
  image?: string;
  contractor_id?: string;
  tender_id?: string;
}

export interface Milestone {
  milestone_id: string;
  project_id: string;
  title: string;
  planned_start: string;
  planned_end: string;
  actual_start?: string;
  actual_end?: string;
  evidence_refs: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  description?: string;
  progress_percentage?: number;
}

export interface Contractor {
  contractor_id: string;
  name: string;
  company_reg_no: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  blacklisted_flag: boolean;
  specializations: string[];
  performance_rating: number;
  projects_completed: number;
  established_year: number;
}

export interface Tender {
  tender_id: string;
  project_id: string;
  published_date: string;
  closing_date: string;
  docs_ref: string[];
  panel_id: string;
  title: string;
  estimated_value: number;
  requirements: string[];
  status: 'open' | 'closed' | 'awarded' | 'cancelled';
  awarded_bid_id?: string;
}

export interface Bid {
  bid_id: string;
  tender_id: string;
  contractor_id: string;
  bid_amount: number;
  documents_ref: string[];
  score: number;
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'withdrawn';
  submitted_date: string;
  technical_score?: number;
  financial_score?: number;
  compliance_status: 'compliant' | 'non_compliant' | 'pending_review';
}

export interface Audit {
  audit_id: string;
  project_id: string;
  quarter: string;
  findings: {
    id: string;
    type: 'financial' | 'technical' | 'compliance' | 'quality' | 'safety';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    evidence: string[];
  }[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'follow_up_required';
  actions_taken: {
    action: string;
    date: string;
    responsible_party: string;
    status: 'pending' | 'in_progress' | 'completed';
  }[];
  auditor_id: string;
  audit_date: string;
  overall_rating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'unsatisfactory';
}

export interface Transaction {
  tx_id: string;
  project_id: string;
  amount: number;
  recipient: string;
  invoice_ref: string;
  date: string;
  payment_proof: string[];
  description: string;
  category: 'materials' | 'labor' | 'equipment' | 'services' | 'overhead' | 'other';
  approval_status: 'approved' | 'pending' | 'rejected';
  approved_by?: string;
}

export interface FlagReport {
  flag_id: string;
  project_id: string;
  user_id: string | 'anonymous';
  description: string;
  evidence_refs: string[];
  geotag?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  status: 'open' | 'investigating' | 'resolved' | 'rejected' | 'escalated';
  escalations: {
    level: number;
    date: string;
    escalated_to: string;
    reason: string;
  }[];
  category: 'quality' | 'corruption' | 'delay' | 'safety' | 'environmental' | 'financial' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  resolved_at?: string;
}

export interface PerformanceRecord {
  record_id: string;
  official_id: string;
  project_ids: string[];
  quarter: string;
  metrics: {
    projects_on_time: number;
    projects_on_budget: number;
    citizen_satisfaction: number;
    transparency_score: number;
    responsiveness_score: number;
  };
  score: number;
  action: 'continue' | 'improvement_plan' | 'probation' | 'recommended_removal';
  evaluation_date: string;
  evaluator_id: string;
  comments?: string;
}

export interface Loan {
  loan_id: string;
  lender: string;
  amount: number;
  purpose: string;
  terms: {
    interest_rate: string;
    duration_years: number;
    grace_period_months?: number;
    payment_frequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
  };
  repayment_schedule: {
    payment_date: string;
    principal: number;
    interest: number;
    balance: number;
    status: 'upcoming' | 'paid' | 'overdue';
  }[];
  linked_projects: string[];
  disbursed: number;
  status: 'approved' | 'disbursing' | 'active' | 'completed' | 'defaulted';
  signed_date: string;
  first_disbursement: string;
}

export interface TaxpayerFund {
  fund_id: string;
  source: 'income_tax' | 'vat' | 'excise_duty' | 'import_duty' | 'county_rates' | 'other';
  amount: number;
  allocated_to_project_id?: string;
  date_collected: string;
  usage_purpose: string;
  spent_amount: number;
  remaining_balance: number;
  fiscal_year: string;
  collection_method: 'kra' | 'county' | 'parastatals' | 'other';
  allocation_status: 'allocated' | 'unallocated' | 'reserved';
}

export interface PanelMember {
  panel_id: string;
  member_id: string;
  member_name: string;
  expertise: string[];
  appointed_by: string;
  appointment_date: string;
  term_end_date: string;
  status: 'active' | 'inactive' | 'suspended';
  conflicts_of_interest: string[];
  evaluations_completed: number;
}

export interface ChangeLog {
  log_id: string;
  entity: 'user' | 'project' | 'milestone' | 'contractor' | 'tender' | 'bid' | 'audit' | 'transaction' | 'flag' | 'performance' | 'loan' | 'fund' | 'panel';
  entity_id: string;
  change: {
    action: 'create' | 'update' | 'delete' | 'status_change';
    field?: string;
    old_value?: any;
    new_value?: any;
    reason?: string;
  };
  timestamp: string;
  user_id: string;
  user_role: string;
  hash: string;
  ip_address?: string;
  user_agent?: string;
}

// Mock Data

export const mockUsers: User[] = [
  {
    user_id: 'USR-001',
    name: 'Dr. Sarah Mwangi',
    role: 'official',
    county: 'National',
    auth_id: 'AUTH-001',
    verification_status: 'verified',
    created_at: '2025-01-01T00:00:00Z',
    contact_info: { email: 'sarah.mwangi@health.go.ke', phone: '+254712345678' }
  },
  {
    user_id: 'USR-002',
    name: 'James Ochieng',
    role: 'official',
    county: 'Kisumu',
    auth_id: 'AUTH-002',
    verification_status: 'verified',
    created_at: '2025-01-01T00:00:00Z',
    contact_info: { email: 'james.ochieng@kisumu.go.ke', phone: '+254723456789' }
  },
  {
    user_id: 'USR-003',
    name: 'Mary Wanjiku',
    role: 'citizen',
    county: 'Nakuru',
    auth_id: 'AUTH-003',
    verification_status: 'verified',
    created_at: '2025-02-15T00:00:00Z',
    contact_info: { email: 'mary.wanjiku@gmail.com', phone: '+254734567890' }
  },
  {
    user_id: 'USR-004',
    name: 'Peter Kimani',
    role: 'auditor',
    county: 'National',
    auth_id: 'AUTH-004',
    verification_status: 'verified',
    created_at: '2025-01-10T00:00:00Z',
    contact_info: { email: 'peter.kimani@oag.go.ke', phone: '+254745678901' }
  }
];

export const mockContractors: Contractor[] = [
  {
    contractor_id: 'CTR-001',
    name: 'ABC Health Infrastructure Ltd.',
    company_reg_no: 'CPR/2020/123456',
    contact: {
      email: 'info@abchealth.co.ke',
      phone: '+254701234567',
      address: 'Westlands, Nairobi'
    },
    blacklisted_flag: false,
    specializations: ['Healthcare Construction', 'Medical Equipment Installation'],
    performance_rating: 4.2,
    projects_completed: 15,
    established_year: 2018
  },
  {
    contractor_id: 'CTR-002',
    name: 'Nyanza Construction Co.',
    company_reg_no: 'CPR/2015/789012',
    contact: {
      email: 'projects@nyanzaconstruction.co.ke',
      phone: '+254720123456',
      address: 'Milimani, Kisumu'
    },
    blacklisted_flag: false,
    specializations: ['Education Infrastructure', 'Residential Construction'],
    performance_rating: 4.5,
    projects_completed: 32,
    established_year: 2015
  },
  {
    contractor_id: 'CTR-003',
    name: 'China Roads & Bridges Corp.',
    company_reg_no: 'CPR/2010/345678',
    contact: {
      email: 'kenya@crbc.com',
      phone: '+254711234567',
      address: 'Upper Hill, Nairobi'
    },
    blacklisted_flag: false,
    specializations: ['Highway Construction', 'Bridge Engineering', 'Infrastructure Development'],
    performance_rating: 3.8,
    projects_completed: 8,
    established_year: 2010
  }
];

export const mockProjects: Project[] = [
  {
    project_id: 'PROJECT-NKR-CTC-001',
    title: 'Nakuru Cancer Treatment Center',
    county: 'Nakuru',
    ward: 'Nakuru Town Ward',
    sector: 'Health',
    description: 'Construction of a state-of-the-art cancer treatment facility with 200-bed capacity, including chemotherapy units, radiation therapy, and surgical suites.',
    start_date: '2026-01-15',
    planned_end: '2028-12-31',
    status: 'In Progress',
    funding_type: 'Loan',
    loan_id: 'LOAN-2026-WB-002',
    assigned_official_id: 'USR-001',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-08-15T10:30:00Z',
    budget: 5000000000,
    spent: 3250000000,
    progress: 65,
    image: 'https://images.unsplash.com/photo-1658864544841-411ed9738373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGNvbnN0cnVjdGlvbiUyMG1lZGljYWx8ZW58MXx8fHwxNzU2NjE5OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    contractor_id: 'CTR-001',
    tender_id: 'TND-001'
  },
  {
    project_id: 'PROJECT-KSM-SCH-045',
    title: 'Kisumu Primary School Expansion',
    county: 'Kisumu',
    ward: 'Central Kisumu Ward',
    sector: 'Education',
    description: 'Expansion of Kisumu Primary School with 12 new classrooms, science laboratory, library, and improved sanitation facilities.',
    start_date: '2025-06-01',
    planned_end: '2026-05-31',
    actual_end: '2026-06-15',
    status: 'Completed',
    funding_type: 'Budget',
    assigned_official_id: 'USR-002',
    created_at: '2025-05-01T00:00:00Z',
    updated_at: '2026-06-15T16:45:00Z',
    budget: 45000000,
    spent: 43500000,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1636367393690-1f07c7413851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NTY2MTk5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    contractor_id: 'CTR-002',
    tender_id: 'TND-002'
  },
  {
    project_id: 'PROJECT-NRB-RD-078',
    title: 'Thika Highway Upgrade Phase 2',
    county: 'Nairobi',
    ward: 'Multiple Wards',
    sector: 'Infrastructure',
    description: 'Upgrade of Thika Highway Phase 2 including dual carriageway expansion, improved interchanges, and smart traffic management systems.',
    start_date: '2025-10-01',
    planned_end: '2028-09-30',
    status: 'Delayed',
    funding_type: 'Loan',
    loan_id: 'LOAN-2025-JICA-105',
    assigned_official_id: 'USR-001',
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2026-07-20T14:20:00Z',
    budget: 12000000000,
    spent: 2400000000,
    progress: 25,
    image: 'https://images.unsplash.com/photo-1629471723167-0babf0b1cda1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NjYxOTkxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    contractor_id: 'CTR-003',
    tender_id: 'TND-003'
  }
];

export const mockMilestones: Milestone[] = [
  // Nakuru Cancer Center milestones
  {
    milestone_id: 'MLS-001',
    project_id: 'PROJECT-NKR-CTC-001',
    title: 'Foundation Work Completion',
    planned_start: '2026-01-15',
    planned_end: '2026-03-01',
    actual_start: '2026-01-18',
    actual_end: '2026-03-05',
    evidence_refs: ['evidence-001.pdf', 'photo-foundation-001.jpg'],
    status: 'completed',
    progress_percentage: 100
  },
  {
    milestone_id: 'MLS-002',
    project_id: 'PROJECT-NKR-CTC-001',
    title: 'Structural Framework',
    planned_start: '2026-03-05',
    planned_end: '2026-06-15',
    actual_start: '2026-03-08',
    actual_end: '2026-06-20',
    evidence_refs: ['structural-report-001.pdf', 'progress-photos-q2.zip'],
    status: 'completed',
    progress_percentage: 100
  },
  {
    milestone_id: 'MLS-003',
    project_id: 'PROJECT-NKR-CTC-001',
    title: 'Roofing and External Works',
    planned_start: '2026-06-20',
    planned_end: '2026-09-30',
    actual_start: '2026-06-25',
    evidence_refs: [],
    status: 'in-progress',
    progress_percentage: 75
  },
  // Kisumu School milestones
  {
    milestone_id: 'MLS-004',
    project_id: 'PROJECT-KSM-SCH-045',
    title: 'Site Preparation and Clearance',
    planned_start: '2025-06-01',
    planned_end: '2025-06-15',
    actual_start: '2025-06-01',
    actual_end: '2025-06-14',
    evidence_refs: ['site-clearance-report.pdf'],
    status: 'completed',
    progress_percentage: 100
  },
  {
    milestone_id: 'MLS-005',
    project_id: 'PROJECT-KSM-SCH-045',
    title: 'Construction Completion',
    planned_start: '2025-08-01',
    planned_end: '2026-05-15',
    actual_start: '2025-08-05',
    actual_end: '2026-05-20',
    evidence_refs: ['completion-certificate.pdf', 'final-inspection.pdf'],
    status: 'completed',
    progress_percentage: 100
  }
];

export const mockTenders: Tender[] = [
  {
    tender_id: 'TND-001',
    project_id: 'PROJECT-NKR-CTC-001',
    published_date: '2025-10-01',
    closing_date: '2025-11-15',
    docs_ref: ['tender-doc-001.pdf', 'technical-specs-001.pdf', 'contract-terms-001.pdf'],
    panel_id: 'PNL-001',
    title: 'Construction of Nakuru Cancer Treatment Center',
    estimated_value: 5000000000,
    requirements: ['ISO 9001 Certification', 'Healthcare Construction Experience', 'Minimum 5 years experience'],
    status: 'awarded',
    awarded_bid_id: 'BID-001'
  },
  {
    tender_id: 'TND-002',
    project_id: 'PROJECT-KSM-SCH-045',
    published_date: '2025-03-01',
    closing_date: '2025-04-15',
    docs_ref: ['tender-doc-002.pdf', 'education-specs-002.pdf'],
    panel_id: 'PNL-002',
    title: 'Kisumu Primary School Expansion',
    estimated_value: 45000000,
    requirements: ['Educational Construction Experience', 'Local Contractor Preference'],
    status: 'awarded',
    awarded_bid_id: 'BID-002'
  },
  {
    tender_id: 'TND-003',
    project_id: 'PROJECT-NRB-RD-078',
    published_date: '2025-07-01',
    closing_date: '2025-08-30',
    docs_ref: ['tender-doc-003.pdf', 'highway-specs-003.pdf', 'environmental-impact.pdf'],
    panel_id: 'PNL-003',
    title: 'Thika Highway Upgrade Phase 2',
    estimated_value: 12000000000,
    requirements: ['Highway Construction Experience', 'International Standards Compliance'],
    status: 'awarded',
    awarded_bid_id: 'BID-003'
  }
];

export const mockBids: Bid[] = [
  {
    bid_id: 'BID-001',
    tender_id: 'TND-001',
    contractor_id: 'CTR-001',
    bid_amount: 4800000000,
    documents_ref: ['bid-001-technical.pdf', 'bid-001-financial.pdf'],
    score: 88,
    status: 'accepted',
    submitted_date: '2025-11-10',
    technical_score: 85,
    financial_score: 92,
    compliance_status: 'compliant'
  },
  {
    bid_id: 'BID-002',
    tender_id: 'TND-002',
    contractor_id: 'CTR-002',
    bid_amount: 42000000,
    documents_ref: ['bid-002-technical.pdf', 'bid-002-financial.pdf'],
    score: 91,
    status: 'accepted',
    submitted_date: '2025-04-10',
    technical_score: 90,
    financial_score: 93,
    compliance_status: 'compliant'
  },
  {
    bid_id: 'BID-003',
    tender_id: 'TND-003',
    contractor_id: 'CTR-003',
    bid_amount: 11500000000,
    documents_ref: ['bid-003-technical.pdf', 'bid-003-financial.pdf'],
    score: 82,
    status: 'accepted',
    submitted_date: '2025-08-25',
    technical_score: 80,
    financial_score: 85,
    compliance_status: 'compliant'
  }
];

export const mockLoans: Loan[] = [
  {
    loan_id: 'LOAN-2026-WB-002',
    lender: 'World Bank',
    amount: 20000000000,
    purpose: 'Healthcare Infrastructure Development',
    terms: {
      interest_rate: '2.5%',
      duration_years: 25,
      grace_period_months: 24,
      payment_frequency: 'semi_annual'
    },
    repayment_schedule: [
      {
        payment_date: '2028-06-30',
        principal: 200000000,
        interest: 125000000,
        balance: 19800000000,
        status: 'upcoming'
      },
      {
        payment_date: '2028-12-31',
        principal: 210000000,
        interest: 120000000,
        balance: 19590000000,
        status: 'upcoming'
      }
    ],
    linked_projects: ['PROJECT-NKR-CTC-001'],
    disbursed: 8000000000,
    status: 'disbursing',
    signed_date: '2025-12-15',
    first_disbursement: '2026-01-15'
  },
  {
    loan_id: 'LOAN-2025-JICA-105',
    lender: 'Japan International Cooperation Agency',
    amount: 15000000000,
    purpose: 'Transport Infrastructure Modernization',
    terms: {
      interest_rate: '1.8%',
      duration_years: 30,
      grace_period_months: 36,
      payment_frequency: 'annual'
    },
    repayment_schedule: [
      {
        payment_date: '2028-12-31',
        principal: 150000000,
        interest: 81000000,
        balance: 14850000000,
        status: 'upcoming'
      }
    ],
    linked_projects: ['PROJECT-NRB-RD-078'],
    disbursed: 3000000000,
    status: 'disbursing',
    signed_date: '2025-08-20',
    first_disbursement: '2025-10-01'
  }
];

export const mockAudits: Audit[] = [
  {
    audit_id: 'AUD-001',
    project_id: 'PROJECT-NKR-CTC-001',
    quarter: 'Q2 2026',
    findings: [
      {
        id: 'FIND-001',
        type: 'quality',
        severity: 'medium',
        description: 'Some concrete work does not meet specified standards',
        evidence: ['quality-report-001.pdf', 'concrete-test-results.pdf']
      },
      {
        id: 'FIND-002',
        type: 'financial',
        severity: 'low',
        description: 'Minor discrepancies in material procurement costs',
        evidence: ['financial-review-001.pdf']
      }
    ],
    status: 'completed',
    actions_taken: [
      {
        action: 'Remedial concrete work ordered',
        date: '2026-07-15',
        responsible_party: 'CTR-001',
        status: 'completed'
      }
    ],
    auditor_id: 'USR-004',
    audit_date: '2026-06-15',
    overall_rating: 'satisfactory'
  }
];

export const mockTransactions: Transaction[] = [
  {
    tx_id: 'TXN-001',
    project_id: 'PROJECT-NKR-CTC-001',
    amount: 150000000,
    recipient: 'ABC Health Infrastructure Ltd.',
    invoice_ref: 'INV-001-2026',
    date: '2026-02-15',
    payment_proof: ['payment-001.pdf', 'bank-confirmation-001.pdf'],
    description: 'Foundation work milestone payment',
    category: 'materials',
    approval_status: 'approved',
    approved_by: 'USR-001'
  },
  {
    tx_id: 'TXN-002',
    project_id: 'PROJECT-KSM-SCH-045',
    amount: 12000000,
    recipient: 'Nyanza Construction Co.',
    invoice_ref: 'INV-002-2025',
    date: '2025-08-30',
    payment_proof: ['payment-002.pdf'],
    description: 'Classroom construction payment',
    category: 'labor',
    approval_status: 'approved',
    approved_by: 'USR-002'
  }
];

export const mockFlags: FlagReport[] = [
  {
    flag_id: 'FLG-001',
    project_id: 'PROJECT-NRB-RD-078',
    user_id: 'USR-003',
    description: 'Construction has been halted for over 2 months without official explanation',
    evidence_refs: ['photo-001.jpg', 'site-visit-report.pdf'],
    geotag: {
      latitude: -1.2864,
      longitude: 36.8172,
      accuracy: 10
    },
    status: 'investigating',
    escalations: [
      {
        level: 1,
        date: '2026-07-20',
        escalated_to: 'County Engineer',
        reason: 'No response to initial flag'
      }
    ],
    category: 'delay',
    priority: 'high',
    created_at: '2026-07-01T09:30:00Z'
  },
  {
    flag_id: 'FLG-002',
    project_id: 'PROJECT-NKR-CTC-001',
    user_id: 'anonymous',
    description: 'Quality of concrete work appears substandard',
    evidence_refs: ['anonymous-photos.zip'],
    status: 'resolved',
    escalations: [],
    category: 'quality',
    priority: 'medium',
    created_at: '2026-06-10T14:15:00Z',
    resolved_at: '2026-07-15T10:00:00Z'
  }
];

export const mockPerformanceRecords: PerformanceRecord[] = [
  {
    record_id: 'PRF-001',
    official_id: 'USR-001',
    project_ids: ['PROJECT-NKR-CTC-001', 'PROJECT-NRB-RD-078'],
    quarter: 'Q2 2026',
    metrics: {
      projects_on_time: 1,
      projects_on_budget: 2,
      citizen_satisfaction: 78,
      transparency_score: 85,
      responsiveness_score: 82
    },
    score: 78,
    action: 'continue',
    evaluation_date: '2026-07-31',
    evaluator_id: 'USR-004',
    comments: 'Generally good performance with room for improvement in project timeline management'
  },
  {
    record_id: 'PRF-002',
    official_id: 'USR-002',
    project_ids: ['PROJECT-KSM-SCH-045'],
    quarter: 'Q2 2026',
    metrics: {
      projects_on_time: 1,
      projects_on_budget: 1,
      citizen_satisfaction: 92,
      transparency_score: 88,
      responsiveness_score: 90
    },
    score: 90,
    action: 'continue',
    evaluation_date: '2026-07-31',
    evaluator_id: 'USR-004',
    comments: 'Excellent performance, project delivered on time and under budget'
  }
];

export const mockTaxpayerFunds: TaxpayerFund[] = [
  {
    fund_id: 'FUND-001',
    source: 'income_tax',
    amount: 2000000000,
    allocated_to_project_id: 'PROJECT-KSM-SCH-045',
    date_collected: '2025-04-30',
    usage_purpose: 'Education infrastructure development',
    spent_amount: 45000000,
    remaining_balance: 1955000000,
    fiscal_year: '2025-2026',
    collection_method: 'kra',
    allocation_status: 'allocated'
  },
  {
    fund_id: 'FUND-002',
    source: 'vat',
    amount: 5000000000,
    date_collected: '2026-01-31',
    usage_purpose: 'General county development fund',
    spent_amount: 0,
    remaining_balance: 5000000000,
    fiscal_year: '2025-2026',
    collection_method: 'kra',
    allocation_status: 'unallocated'
  }
];

export const mockPanelMembers: PanelMember[] = [
  {
    panel_id: 'PNL-001',
    member_id: 'PM-001',
    member_name: 'Dr. Grace Mutiso',
    expertise: ['Healthcare Architecture', 'Medical Equipment Procurement'],
    appointed_by: 'Ministry of Health',
    appointment_date: '2025-01-15',
    term_end_date: '2027-01-15',
    status: 'active',
    conflicts_of_interest: [],
    evaluations_completed: 3
  },
  {
    panel_id: 'PNL-002',
    member_id: 'PM-002',
    member_name: 'Prof. John Mutua',
    expertise: ['Education Infrastructure', 'Civil Engineering'],
    appointed_by: 'Ministry of Education',
    appointment_date: '2024-06-01',
    term_end_date: '2026-06-01',
    status: 'active',
    conflicts_of_interest: [],
    evaluations_completed: 8
  },
  {
    panel_id: 'PNL-003',
    member_id: 'PM-003',
    member_name: 'Eng. Faith Wanjala',
    expertise: ['Highway Engineering', 'Transport Infrastructure'],
    appointed_by: 'Ministry of Transport',
    appointment_date: '2025-03-01',
    term_end_date: '2027-03-01',
    status: 'active',
    conflicts_of_interest: ['Former employee of China Roads & Bridges Corp.'],
    evaluations_completed: 1
  }
];

export const mockChangeLogs: ChangeLog[] = [
  {
    log_id: 'LOG-001',
    entity: 'project',
    entity_id: 'PROJECT-NKR-CTC-001',
    change: {
      action: 'status_change',
      field: 'status',
      old_value: 'Planning',
      new_value: 'In Progress',
      reason: 'Construction officially started'
    },
    timestamp: '2026-01-15T08:00:00Z',
    user_id: 'USR-001',
    user_role: 'official',
    hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    ip_address: '197.232.65.10'
  },
  {
    log_id: 'LOG-002',
    entity: 'milestone',
    entity_id: 'MLS-001',
    change: {
      action: 'status_change',
      field: 'status',
      old_value: 'in-progress',
      new_value: 'completed',
      reason: 'Foundation work completed and approved'
    },
    timestamp: '2026-03-05T16:30:00Z',
    user_id: 'USR-001',
    user_role: 'official',
    hash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',
    ip_address: '197.232.65.10'
  },
  {
    log_id: 'LOG-003',
    entity: 'transaction',
    entity_id: 'TXN-001',
    change: {
      action: 'create',
      reason: 'Milestone payment approved'
    },
    timestamp: '2026-02-15T11:45:00Z',
    user_id: 'USR-001',
    user_role: 'official',
    hash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
    ip_address: '197.232.65.10'
  }
];

// Utility functions for data relationships
export const getProjectsByOfficialId = (officialId: string): Project[] => {
  return mockProjects.filter(p => p.assigned_official_id === officialId);
};

export const getMilestonesByProjectId = (projectId: string): Milestone[] => {
  return mockMilestones.filter(m => m.project_id === projectId);
};

export const getTransactionsByProjectId = (projectId: string): Transaction[] => {
  return mockTransactions.filter(t => t.project_id === projectId);
};

export const getFlagsByProjectId = (projectId: string): FlagReport[] => {
  return mockFlags.filter(f => f.project_id === projectId);
};

export const getAuditsByProjectId = (projectId: string): Audit[] => {
  return mockAudits.filter(a => a.project_id === projectId);
};

export const getContractorById = (contractorId: string): Contractor | undefined => {
  return mockContractors.find(c => c.contractor_id === contractorId);
};

export const getLoanById = (loanId: string): Loan | undefined => {
  return mockLoans.find(l => l.loan_id === loanId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(u => u.user_id === userId);
};

// Format currency utility
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `KSh ${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `KSh ${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `KSh ${(amount / 1000).toFixed(1)}K`;
  }
  return `KSh ${amount.toLocaleString()}`;
};

// Status color utility
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'In Progress':
    case 'in-progress':
    case 'active':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Delayed':
    case 'delayed':
    case 'overdue':
      return 'bg-red-200 text-red-900 border-red-300';
    case 'Planning':
    case 'pending':
    case 'upcoming':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Suspended':
    case 'Cancelled':
    case 'cancelled':
      return 'bg-red-300 text-red-900 border-red-400';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};