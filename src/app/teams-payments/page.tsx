'use client';

import React, { useState, useMemo } from 'react';
import { TeamMember, TeamMemberStatus, PaymentRun } from '../../types';
import {
  mockTeamMembers,
  mockPaymentHistory,
  currencyRates,
  currencySymbols,
  countryCurrency,
} from '../../data/teamsData';

// ─── Helpers ───────────────────────────────────────────────────────────────
const fmt = (n: number, currency: string) => {
  const sym = currencySymbols[currency] || currency;
  return `${sym}${n.toLocaleString()}`;
};

const toUSD = (amount: number, currency: string) =>
  Math.round(amount * (currencyRates[currency] || 1));

const statusColor = (s: string) => {
  switch (s) {
    case 'Active':
    case 'Completed':
      return 'var(--color-accent)';
    case 'On Leave':
    case 'Processing':
      return 'var(--color-accent-secondary)';
    case 'Probation':
    case 'Failed':
      return 'var(--color-danger)';
    default:
      return 'var(--color-text-tertiary)';
  }
};

// ─── Page Component ────────────────────────────────────────────────────────
export default function TeamsPaymentsPage() {
  // ─ Team member state (local, mutable) ───────────────────────────────────
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRun[]>(mockPaymentHistory);

  // ─ UI state ──────────────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'All' | TeamMemberStatus>('All');
  const [activeTab, setActiveTab] = useState<'team' | 'payroll' | 'history'>('team');

  // ─ Modal state ───────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    country: 'Ghana',
    monthlySalary: '',
    startDate: '',
    status: 'Active' as TeamMemberStatus,
  });

  // ─ Payroll state ─────────────────────────────────────────────────────────
  const [selectedPeriod, setSelectedPeriod] = useState('July 2026');
  const [payrollProcessing, setPayrollProcessing] = useState(false);
  const [payrollSuccess, setPayrollSuccess] = useState(false);

  // ─ Payment history expand state ──────────────────────────────────────────
  const [expandedRun, setExpandedRun] = useState<string | null>(null);

  // ─── Derived data ────────────────────────────────────────────────────────
  const countries = useMemo(() => {
    const set = new Set(members.map((m) => m.country));
    return ['All', ...Array.from(set).sort()];
  }, [members]);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.fullName.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = filterCountry === 'All' || m.country === filterCountry;
      const matchesStatus = filterStatus === 'All' || m.status === filterStatus;
      return matchesSearch && matchesCountry && matchesStatus;
    });
  }, [members, search, filterCountry, filterStatus]);

  const activeMembers = members.filter((m) => m.status === 'Active');
  const uniqueCountries = new Set(members.map((m) => m.country)).size;
  const totalMonthlyUSD = members
    .filter((m) => m.status !== 'On Leave')
    .reduce((acc, m) => acc + toUSD(m.monthlySalary, m.currency), 0);

  // ─── Modal handlers ─────────────────────────────────────────────────────
  const openAddModal = () => {
    setEditingMember(null);
    setFormData({ fullName: '', email: '', role: '', country: 'Ghana', monthlySalary: '', startDate: '', status: 'Active' });
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      fullName: member.fullName,
      email: member.email,
      role: member.role,
      country: member.country,
      monthlySalary: String(member.monthlySalary),
      startDate: member.startDate,
      status: member.status,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.email || !formData.role || !formData.monthlySalary) return;

    const currency = countryCurrency[formData.country] || 'USD';
    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? { ...m, ...formData, monthlySalary: Number(formData.monthlySalary), currency }
            : m
        )
      );
    } else {
      const newMember: TeamMember = {
        id: `tm-${Date.now()}`,
        ...formData,
        monthlySalary: Number(formData.monthlySalary),
        currency,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=22C55E&color=fff&size=200`,
      };
      setMembers((prev) => [...prev, newMember]);
    }
    setModalOpen(false);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // ─── Payroll runner ──────────────────────────────────────────────────────
  const payrollMembers = members.filter((m) => m.status !== 'On Leave');
  const payrollTotal = payrollMembers.reduce((acc, m) => acc + toUSD(m.monthlySalary, m.currency), 0);

  const handleRunPayroll = () => {
    setPayrollProcessing(true);
    setTimeout(() => {
      const newRun: PaymentRun = {
        id: `pr-${Date.now()}`,
        period: selectedPeriod,
        totalUSD: payrollTotal,
        entries: payrollMembers.map((m) => ({
          memberId: m.id,
          memberName: m.fullName,
          grossAmount: m.monthlySalary,
          currency: m.currency,
          usdEquivalent: toUSD(m.monthlySalary, m.currency),
          status: 'Completed' as const,
        })),
        status: 'Completed',
        processedAt: new Date().toISOString(),
      };
      setPaymentHistory((prev) => [newRun, ...prev]);
      setPayrollProcessing(false);
      setPayrollSuccess(true);
      setTimeout(() => setPayrollSuccess(false), 4000);
    }, 2000);
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div className="tp-page">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="tp-hero">
        <div className="container">
          <span className="feature-tag" style={{ color: 'var(--color-accent)' }}>
            TEAMS & PAYMENTS
          </span>
          <h1 className="tp-hero-title">
            Manage Your African Teams.{' '}
            <span style={{ color: 'var(--color-accent)' }}>Pay Anywhere.</span>
          </h1>
          <p className="tp-hero-sub">
            One dashboard to manage distributed teams across the continent. Process
            payroll in local currencies — GHS, NGN, ZAR, KES, XOF — with transparent
            conversion rates and instant settlement.
          </p>
          <div className="tp-hero-actions">
            <button className="btn btn-primary" onClick={openAddModal} style={{ borderRadius: '8px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600 }}>
              + Add Team Member
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('payroll')} style={{ borderRadius: '8px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600 }}>
              Run Payments
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────── */}
      <section className="tp-stats-bar">
        <div className="container">
          <div className="tp-stats-grid">
            <div className="tp-stat-card">
              <div className="tp-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div className="tp-stat-value">{members.length}</div>
              <div className="tp-stat-label">Team Members</div>
            </div>
            <div className="tp-stat-card">
              <div className="tp-stat-icon" style={{ color: 'var(--color-accent-secondary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div className="tp-stat-value">{uniqueCountries}</div>
              <div className="tp-stat-label">Countries</div>
            </div>
            <div className="tp-stat-card">
              <div className="tp-stat-icon" style={{ color: 'var(--color-accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div className="tp-stat-value">${totalMonthlyUSD.toLocaleString()}</div>
              <div className="tp-stat-label">Monthly (USD equiv.)</div>
            </div>
            <div className="tp-stat-card">
              <div className="tp-stat-icon" style={{ color: 'var(--color-danger)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div className="tp-stat-value">28th</div>
              <div className="tp-stat-label">Next Pay Date</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Switcher ───────────────────────────────────────────────── */}
      <section className="tp-content">
        <div className="container">
          <div className="tp-tabs">
            <button className={`tp-tab ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Team Roster
            </button>
            <button className={`tp-tab ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Run Payments
            </button>
            <button className={`tp-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Payment History
            </button>
          </div>

          {/* ─── TEAM ROSTER TAB ──────────────────────────────────────── */}
          {activeTab === 'team' && (
            <div className="tp-panel">
              {/* Filters */}
              <div className="tp-filters">
                <div className="tp-search-wrapper">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, role, or email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="tp-search-input"
                  />
                </div>
                <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className="tp-select">
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="tp-select">
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Probation">Probation</option>
                </select>
                <button className="btn btn-primary tp-add-btn" onClick={openAddModal}>
                  + Add Member
                </button>
              </div>

              {/* Table */}
              <div className="tp-table-wrap">
                <table className="tp-table">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Role</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Monthly Salary</th>
                      <th>USD Equiv.</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-tertiary)' }}>
                          No team members found.
                        </td>
                      </tr>
                    )}
                    {filtered.map((m) => (
                      <tr key={m.id}>
                        <td>
                          <div className="tp-member-cell">
                            <img src={m.avatarUrl} alt={m.fullName} className="tp-member-avatar" />
                            <div>
                              <div className="tp-member-name">{m.fullName}</div>
                              <div className="tp-member-email">{m.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{m.role}</td>
                        <td>
                          <span className="tp-country-badge">{m.country}</span>
                        </td>
                        <td>
                          <span className="tp-status-badge" style={{ color: statusColor(m.status), borderColor: statusColor(m.status), backgroundColor: `${statusColor(m.status)}15` }}>
                            {m.status}
                          </span>
                        </td>
                        <td className="tp-salary">{fmt(m.monthlySalary, m.currency)}</td>
                        <td className="tp-salary" style={{ color: 'var(--color-accent)' }}>${toUSD(m.monthlySalary, m.currency).toLocaleString()}</td>
                        <td>
                          <div className="tp-actions">
                            <button onClick={() => openEditModal(m)} className="tp-action-btn" title="Edit">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button onClick={() => removeMember(m.id)} className="tp-action-btn tp-action-danger" title="Remove">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── PAYROLL TAB ──────────────────────────────────────────── */}
          {activeTab === 'payroll' && (
            <div className="tp-panel">
              <div className="tp-payroll-header">
                <div>
                  <h3 className="tp-payroll-title">Process Payments</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Review and process payments for your team. Members on leave are excluded.
                  </p>
                </div>
                <div className="tp-payroll-period">
                  <label style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>Pay Period</label>
                  <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="tp-select">
                    <option>July 2026</option>
                    <option>August 2026</option>
                    <option>September 2026</option>
                  </select>
                </div>
              </div>

              <div className="tp-table-wrap">
                <table className="tp-table">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Country</th>
                      <th>Gross Amount</th>
                      <th>Currency</th>
                      <th>USD Equivalent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollMembers.map((m) => (
                      <tr key={m.id}>
                        <td>
                          <div className="tp-member-cell">
                            <img src={m.avatarUrl} alt={m.fullName} className="tp-member-avatar" />
                            <span className="tp-member-name">{m.fullName}</span>
                          </div>
                        </td>
                        <td><span className="tp-country-badge">{m.country}</span></td>
                        <td className="tp-salary">{fmt(m.monthlySalary, m.currency)}</td>
                        <td><span className="tp-currency-tag">{m.currency}</span></td>
                        <td className="tp-salary" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>${toUSD(m.monthlySalary, m.currency).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'right', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                        Total Payroll (USD)
                      </td>
                      <td style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-accent)' }}>
                        ${payrollTotal.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="tp-payroll-footer">
                {payrollSuccess && (
                  <div className="tp-toast tp-toast-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Payment processed successfully for {selectedPeriod}!
                  </div>
                )}
                <button
                  className="btn btn-primary tp-process-btn"
                  onClick={handleRunPayroll}
                  disabled={payrollProcessing}
                  style={{ borderRadius: '8px', padding: '14px 36px', fontSize: '1rem', fontWeight: 700 }}
                >
                  {payrollProcessing ? (
                    <span className="tp-spinner-text">
                      <span className="tp-spinner" />
                      Processing…
                    </span>
                  ) : (
                    <>Process ${payrollTotal.toLocaleString()} Payment</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ─── HISTORY TAB ──────────────────────────────────────────── */}
          {activeTab === 'history' && (
            <div className="tp-panel">
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                Payment History
              </h3>
              {paymentHistory.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-tertiary)' }}>
                  No payment history yet. Run your first payment from the "Run Payments" tab.
                </div>
              )}
              <div className="tp-history-list">
                {paymentHistory.map((run) => (
                  <div key={run.id} className="tp-history-card">
                    <div className="tp-history-row" onClick={() => setExpandedRun(expandedRun === run.id ? null : run.id)} style={{ cursor: 'pointer' }}>
                      <div className="tp-history-left">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedRun === run.id ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{run.period}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{new Date(run.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        </div>
                      </div>
                      <div className="tp-history-right">
                        <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '1rem' }}>${run.totalUSD.toLocaleString()}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{run.entries.length} members</span>
                        <span className="tp-status-badge" style={{ color: statusColor(run.status), borderColor: statusColor(run.status), backgroundColor: `${statusColor(run.status)}15` }}>
                          {run.status}
                        </span>
                      </div>
                    </div>
                    {expandedRun === run.id && (
                      <div className="tp-history-detail">
                        <table className="tp-table tp-table-compact">
                          <thead>
                            <tr>
                              <th>Member</th>
                              <th>Amount</th>
                              <th>Currency</th>
                              <th>USD</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {run.entries.map((e) => (
                              <tr key={e.memberId}>
                                <td style={{ fontWeight: 600 }}>{e.memberName}</td>
                                <td>{fmt(e.grossAmount, e.currency)}</td>
                                <td><span className="tp-currency-tag">{e.currency}</span></td>
                                <td style={{ color: 'var(--color-accent)', fontWeight: 600 }}>${e.usdEquivalent.toLocaleString()}</td>
                                <td>
                                  <span className="tp-status-badge" style={{ color: statusColor(e.status), borderColor: statusColor(e.status), backgroundColor: `${statusColor(e.status)}15`, fontSize: '0.7rem', padding: '2px 6px' }}>
                                    {e.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Payment Providers ────────────────────────────────────────── */}
      <section className="tp-providers-section">
        <div className="tp-providers-container">
          <h4 className="tp-providers-title">Supported Payout Channels & Networks</h4>
          <div className="tp-providers-grid">
            <a href="https://paystack.com" target="_blank" rel="noopener noreferrer" className="tp-provider-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="5" fill="#3cbef9" />
                <path d="M7 6h6.5c1.8 0 2.9 1 2.9 2.5s-1.1 2.5-2.9 2.5H10v5H7V6zm3 2v3h3.5c.6 0 1-.3 1-1s-.4-1-1-1H10z" fill="white" />
              </svg>
              <span className="tp-provider-name">Paystack</span>
            </a>
            <a href="https://flutterwave.com" target="_blank" rel="noopener noreferrer" className="tp-provider-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="5" fill="#fb923c" />
                <path d="M8 6h7v2.5H11v3h3.5v2.5H11V18H8V6z" fill="white" />
              </svg>
              <span className="tp-provider-name">Flutterwave</span>
            </a>
            <a href="https://onzazapay.com" target="_blank" rel="noopener noreferrer" className="tp-provider-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="5" fill="url(#zazaGrad)" />
                <path d="M7 7h10v2.5l-6 6.5h6V18H7v-2.5l6-6.5H7V7z" fill="white" />
                <defs>
                  <linearGradient id="zazaGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="tp-provider-name">ZazaPay</span>
            </a>
            <a href="https://www.mastercard.com" target="_blank" rel="noopener noreferrer" className="tp-provider-card">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="12" r="8" fill="#EB001B" fillOpacity="0.9" />
                <circle cx="21" cy="12" r="8" fill="#FF5F00" fillOpacity="0.9" />
                <path d="M16 6.588A7.984 7.984 0 0 1 19.068 12 7.984 7.984 0 0 1 16 17.412a7.984 7.984 0 0 1-3.068-5.412A7.984 7.984 0 0 1 16 6.588z" fill="#F79E1B" />
              </svg>
              <span className="tp-provider-name">Mastercard</span>
            </a>
          </div>

          {/* Compliance & Regulation Link */}
          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <button
              onClick={() => setComplianceOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-accent)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Learn how we handle Regulatory Compliance & Security
            </button>
          </div>
        </div>
      </section>

      {/* ─── Add / Edit Modal ──────────────────────────────────────────── */}
      {modalOpen && (
        <div className="tp-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tp-modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="tp-modal-close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="tp-modal-body">
              <div className="tp-form-grid">
                <div className="tp-form-group">
                  <label>Full Name *</label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="e.g. Amara Osei" className="tp-input" />
                </div>
                <div className="tp-form-group">
                  <label>Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. amara@company.com" className="tp-input" />
                </div>
                <div className="tp-form-group">
                  <label>Role / Title *</label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Frontend Developer" className="tp-input" />
                </div>
                <div className="tp-form-group">
                  <label>Country</label>
                  <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="tp-input">
                    <option>Ghana</option>
                    <option>Nigeria</option>
                    <option>South Africa</option>
                    <option>Kenya</option>
                    <option>Senegal</option>
                  </select>
                </div>
                <div className="tp-form-group">
                  <label>Monthly Salary ({currencySymbols[countryCurrency[formData.country] || 'USD']}) *</label>
                  <input type="number" value={formData.monthlySalary} onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })} placeholder="e.g. 8500" className="tp-input" />
                </div>
                <div className="tp-form-group">
                  <label>Start Date</label>
                  <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="tp-input" />
                </div>
                <div className="tp-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Status</label>
                  <div className="tp-status-options">
                    {(['Active', 'On Leave', 'Probation'] as TeamMemberStatus[]).map((s) => (
                      <button key={s} className={`tp-status-option ${formData.status === s ? 'active' : ''}`} onClick={() => setFormData({ ...formData, status: s })} style={{ '--status-color': statusColor(s) } as React.CSSProperties}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tp-modal-footer">
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)} style={{ borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem' }}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave} style={{ borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 600 }}>
                {editingMember ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ─── Compliance Information Modal ────────────────────────────── */}
      {complianceOpen && (
        <div className="tp-modal-overlay" onClick={() => setComplianceOpen(false)}>
          <div className="tp-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="tp-modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Regulatory Compliance & Security
              </h3>
              <button onClick={() => setComplianceOpen(false)} className="tp-modal-close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="tp-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>
                  🏛️ Licensed Infrastructure & FX Settlement
                </strong>
                Cross-border payout settlement rails are integrated directly with central bank regulated entities. Multi-currency payroll routing complies with guidelines from the Bank of Ghana (BoG), Central Bank of Nigeria (CBN), South African Reserve Bank (SARB), and Central Bank of Kenya (CBK). Payouts use licensed International Money Transfer Operator (IMTO), Payment Service Provider (PSP), and local clearing bank channels to fulfill compliance with local foreign exchange and capital control limits.
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>
                  🔒 KYC/KYB & Sanctions Screening
                </strong>
                To satisfy Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) laws, both employers and team members undergo real-time validation. Verification engines query official government databases, including Nigeria's Bank Verification Number (BVN) / National Identification Number (NIN) registries, the Ghana Card Database, and local registries in South Africa and Kenya. Daily background screenings run against Politically Exposed Persons (PEP) and global sanctions lists (OFAC, UN, EU).
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>
                  📝 Worker Classification & Legal Safeguards
                </strong>
                Reduce legal liabilities and permanent establishment risk in cross-border operations. BorderLine enables automated generation of compliant independent contractor agreements drafted under localized employment jurisdictions. For full-time employees, payments are processed in partnership with certified local Employer of Record (EOR) entities who act as the legal employers of record, taking on complete administrative and legal responsibility.
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>
                  📊 Local Tax, Pension & Statutory Benefits
                </strong>
                Automatically calculate and withhold country-specific payroll deductions in real-time. Calculations are updated dynamically to reflect local tax brackets for PAYE income tax, national health insurance, and social security payments (such as Ghana's SSNIT, Kenya's NSSF & NHIF, South Africa's SARS & UIF, and Nigeria's PENCOM & NHF). BorderLine generates localized reporting to streamline monthly tax remittances and year-end filings.
              </div>
            </div>
            <div className="tp-modal-footer">
              <button className="btn btn-primary" onClick={() => setComplianceOpen(false)} style={{ borderRadius: '8px', padding: '10px 24px', fontSize: '0.85rem', fontWeight: 600 }}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
