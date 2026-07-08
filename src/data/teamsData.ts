import { TeamMember, PaymentRun } from '../types';

// Conversion rates to USD (approximate mid-market rates)
export const currencyRates: Record<string, number> = {
  USD: 1,
  GHS: 0.064,   // Ghanaian Cedi
  NGN: 0.00062, // Nigerian Naira
  ZAR: 0.054,   // South African Rand
  KES: 0.0077,  // Kenyan Shilling
  XOF: 0.0016,  // West African CFA Franc
};

export const currencySymbols: Record<string, string> = {
  USD: '$',
  GHS: '₵',
  NGN: '₦',
  ZAR: 'R',
  KES: 'KSh',
  XOF: 'CFA',
};

export const countryCurrency: Record<string, string> = {
  Ghana: 'GHS',
  Nigeria: 'NGN',
  'South Africa': 'ZAR',
  Kenya: 'KES',
  Senegal: 'XOF',
};

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm-001',
    fullName: 'Amara Osei',
    email: 'amara.osei@company.com',
    role: 'Frontend Developer',
    country: 'Ghana',
    currency: 'GHS',
    monthlySalary: 8500,
    startDate: '2025-03-15',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'tm-002',
    fullName: 'Chinedu Okafor',
    email: 'chinedu.okafor@company.com',
    role: 'Backend Engineer',
    country: 'Nigeria',
    currency: 'NGN',
    monthlySalary: 950000,
    startDate: '2025-01-10',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'tm-003',
    fullName: 'Thandi Ndlovu',
    email: 'thandi.ndlovu@company.com',
    role: 'UI/UX Designer',
    country: 'South Africa',
    currency: 'ZAR',
    monthlySalary: 42000,
    startDate: '2025-06-01',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'tm-004',
    fullName: 'Brian Kipchoge',
    email: 'brian.kipchoge@company.com',
    role: 'DevOps Engineer',
    country: 'Kenya',
    currency: 'KES',
    monthlySalary: 185000,
    startDate: '2025-04-20',
    status: 'On Leave',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'tm-005',
    fullName: 'Fatou Diallo',
    email: 'fatou.diallo@company.com',
    role: 'Product Manager',
    country: 'Senegal',
    currency: 'XOF',
    monthlySalary: 550000,
    startDate: '2025-08-12',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1589156280159-27a852cc18c4?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'tm-006',
    fullName: 'Kweku Mensah',
    email: 'kweku.mensah@company.com',
    role: 'Mobile Developer',
    country: 'Ghana',
    currency: 'GHS',
    monthlySalary: 7200,
    startDate: '2026-01-05',
    status: 'Probation',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
];

export const mockPaymentHistory: PaymentRun[] = [
  {
    id: 'pr-001',
    period: 'June 2026',
    totalUSD: 4842,
    entries: [
      { memberId: 'tm-001', memberName: 'Amara Osei', grossAmount: 8500, currency: 'GHS', usdEquivalent: 544, status: 'Completed' },
      { memberId: 'tm-002', memberName: 'Chinedu Okafor', grossAmount: 950000, currency: 'NGN', usdEquivalent: 589, status: 'Completed' },
      { memberId: 'tm-003', memberName: 'Thandi Ndlovu', grossAmount: 42000, currency: 'ZAR', usdEquivalent: 2268, status: 'Completed' },
      { memberId: 'tm-004', memberName: 'Brian Kipchoge', grossAmount: 185000, currency: 'KES', usdEquivalent: 1425, status: 'Completed' },
    ],
    status: 'Completed',
    processedAt: '2026-06-28T10:00:00Z',
  },
  {
    id: 'pr-002',
    period: 'May 2026',
    totalUSD: 5722,
    entries: [
      { memberId: 'tm-001', memberName: 'Amara Osei', grossAmount: 8500, currency: 'GHS', usdEquivalent: 544, status: 'Completed' },
      { memberId: 'tm-002', memberName: 'Chinedu Okafor', grossAmount: 950000, currency: 'NGN', usdEquivalent: 589, status: 'Completed' },
      { memberId: 'tm-003', memberName: 'Thandi Ndlovu', grossAmount: 42000, currency: 'ZAR', usdEquivalent: 2268, status: 'Completed' },
      { memberId: 'tm-004', memberName: 'Brian Kipchoge', grossAmount: 185000, currency: 'KES', usdEquivalent: 1425, status: 'Completed' },
      { memberId: 'tm-005', memberName: 'Fatou Diallo', grossAmount: 550000, currency: 'XOF', usdEquivalent: 880, status: 'Completed' },
    ],
    status: 'Completed',
    processedAt: '2026-05-28T10:00:00Z',
  },
  {
    id: 'pr-003',
    period: 'April 2026',
    totalUSD: 4842,
    entries: [
      { memberId: 'tm-001', memberName: 'Amara Osei', grossAmount: 8500, currency: 'GHS', usdEquivalent: 544, status: 'Completed' },
      { memberId: 'tm-002', memberName: 'Chinedu Okafor', grossAmount: 950000, currency: 'NGN', usdEquivalent: 589, status: 'Completed' },
      { memberId: 'tm-003', memberName: 'Thandi Ndlovu', grossAmount: 42000, currency: 'ZAR', usdEquivalent: 2268, status: 'Completed' },
      { memberId: 'tm-004', memberName: 'Brian Kipchoge', grossAmount: 185000, currency: 'KES', usdEquivalent: 1425, status: 'Failed' },
    ],
    status: 'Failed',
    processedAt: '2026-04-28T10:00:00Z',
  },
];
