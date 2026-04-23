import { useState } from 'react';
import { useApp } from '../store/AppContext';
import {
  BarChart3, Users, CheckCircle2, AlertTriangle, Clock,
  TrendingUp, Shield, Download, RefreshCw, ChevronRight,
  Zap, MessageSquare, Settings
} from 'lucide-react';

export default function AdminPage() {
  const { state, dispatch, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (state.user?.role !== 'Admin') {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-lg)' }}>
        <div style={{ fontSize: '4rem' }}>🔒</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Admin Access Only</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          This section is restricted to society committee members.<br />
          Please login with an Admin account to continue.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          Switch Account
        </button>
      </div>
    );
  }

  const openTickets = state.tickets.filter(t => t.status === 'open');
  const inProgressTickets = state.tickets.filter(t => t.status === 'in-progress');
  const resolvedTickets = state.tickets.filter(t => t.status === 'resolved');
  const totalResidents = 124; // Mock data
  const occupancyRate = 89;

  const categoryStats = (() => {
    const counts = {};
    state.tickets.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  })();

  const maxCategoryCount = Math.max(...categoryStats.map(c => c[1]), 1);

  const recentActivity = [
    { icon: '🎫', text: 'TKT-001 escalated to Electrician', time: '2m ago', type: 'alert' },
    { icon: '✅', text: 'Garden lights repaired — TKT-003 resolved', time: '1h ago', type: 'success' },
    { icon: '📋', text: 'New complaint from Flat A-402', time: '3h ago', type: 'info' },
    { icon: '💳', text: '12 maintenance payments received today', time: '5h ago', type: 'success' },
    { icon: '🔧', text: 'Plumber booking confirmed for B-204', time: '1d ago', type: 'info' },
  ];

  const handleUpdateStatus = (ticketId, newStatus) => {
    dispatch({ type: 'UPDATE_TICKET_STATUS', payload: { id: ticketId, status: newStatus } });
    addToast(`Ticket ${ticketId} updated to "${newStatus.replace('-', ' ')}"`, 'success');
  };

  const handleSendAnnouncement = () => {
    addToast('📢 Announcement sent to all 124 residents!', 'success');
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
    { key: 'tickets', label: 'Manage Tickets', icon: <CheckCircle2 size={15} /> },
    { key: 'residents', label: 'Residents', icon: <Users size={15} /> },
  ];

  return (
    <div className="fade-in">
      {/* Admin Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)', padding: 'var(--space-md) var(--space-lg)', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 'var(--radius-lg)' }}>
        <Shield size={18} style={{ color: 'var(--accent-400)' }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--accent-400)', fontWeight: 600 }}>
          Admin Panel — Society Committee Dashboard
        </span>
        <button
          className="btn btn-ghost"
          style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--accent-400)' }}
          onClick={handleSendAnnouncement}
        >
          📢 Send Announcement
        </button>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-xl)', background: 'var(--bg-glass)', padding: 4, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', width: 'fit-content' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`lang-option ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 1rem' }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ========== OVERVIEW TAB ========== */}
      {activeTab === 'overview' && (
        <>
          {/* KPI Grid */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="stat-card">
              <div className="stat-icon red"><AlertTriangle size={22} /></div>
              <div>
                <div className="stat-value">{openTickets.length}</div>
                <div className="stat-label">Open Tickets</div>
                <div className="stat-change up"><TrendingUp size={12} /> Needs action</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber"><Clock size={22} /></div>
              <div>
                <div className="stat-value">{inProgressTickets.length}</div>
                <div className="stat-label">In Progress</div>
                <div className="stat-change up"><RefreshCw size={12} /> Being handled</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><CheckCircle2 size={22} /></div>
              <div>
                <div className="stat-value">{resolvedTickets.length}</div>
                <div className="stat-label">Resolved</div>
                <div className="stat-change up"><Zap size={12} /> This month</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue"><Users size={22} /></div>
              <div>
                <div className="stat-value">{totalResidents}</div>
                <div className="stat-label">Residents</div>
                <div className="stat-change up" style={{ color: 'var(--info)' }}>{occupancyRate}% Occupancy</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><BarChart3 size={22} /></div>
              <div>
                <div className="stat-value">₹4.3L</div>
                <div className="stat-label">Revenue (Apr)</div>
                <div className="stat-change up"><TrendingUp size={12} /> +8% MoM</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber"><MessageSquare size={22} /></div>
              <div>
                <div className="stat-value">{state.chatMessages.filter(m => m.role === 'user').length}</div>
                <div className="stat-label">AI Queries Today</div>
                <div className="stat-change up" style={{ color: 'var(--info)' }}>Auto-resolved</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
            {/* Category Breakdown */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-lg)' }}>
                📊 Complaints by Category
              </h3>
              {categoryStats.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No data yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {categoryStats.map(([cat, count]) => (
                    <div key={cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{cat}</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{count}</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${(count / maxCategoryCount) * 100}%`,
                            background: 'var(--gradient-primary)',
                            borderRadius: 'var(--radius-full)',
                            transition: 'width 0.8s ease-out'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity Feed */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-lg)' }}>
                ⚡ Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {recentActivity.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', padding: 'var(--space-sm) 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.text}</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Maintenance Summary */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04))' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>💳 Maintenance Collection — April 2026</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>₹4,34,000 collected from 124 flats (target: ₹4,34,000)</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-400)' }}>96%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>5 flats pending</div>
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-lg)', height: 8, background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '96%', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)' }} />
            </div>
          </div>
        </>
      )}

      {/* ========== TICKETS TAB ========== */}
      {activeTab === 'tickets' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Manage and update all society complaints and grievances.
            </p>
            <button className="btn btn-secondary" style={{ gap: 6 }}>
              <Download size={14} /> Export CSV
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {state.tickets.map(ticket => (
              <div key={ticket.id} className="admin-ticket-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flex: 1, minWidth: 0 }}>
                  <div className={`ticket-priority ${ticket.priority}`} style={{ height: 56 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>{ticket.title}</div>
                    <div className="ticket-meta">
                      <span className="ticket-id">{ticket.id}</span>
                      <span>📁 {ticket.category}</span>
                      <span>🏠 Flat {ticket.flat}</span>
                      <span>👤 {ticket.resident}</span>
                      <span>🕐 {new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {ticket.description && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                        {ticket.description.slice(0, 120)}{ticket.description.length > 120 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexShrink: 0 }}>
                  <span className={`ticket-status ${ticket.status}`}>{ticket.status.replace('-', ' ')}</span>
                  <select
                    className="form-select"
                    style={{ width: 'auto', padding: '4px 28px 4px 8px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                    value={ticket.status}
                    onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== RESIDENTS TAB ========== */}
      {activeTab === 'residents' && (
        <div>
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 'var(--space-lg)' }}>
              Society resident directory and maintenance status overview.
            </p>
            <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <table className="amenity-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Flat</th>
                    <th>Resident</th>
                    <th>Role</th>
                    <th>Maintenance</th>
                    <th>Tickets</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { flat: 'A-101', name: 'Vikram Nair', role: 'Owner', paid: true, tickets: 0 },
                    { flat: 'A-201', name: 'Anita Sharma', role: 'Owner', paid: true, tickets: 1 },
                    { flat: 'A-402', name: 'Ramesh Gowda', role: 'Tenant', paid: false, tickets: 2 },
                    { flat: 'B-204', name: 'Priya Hegde', role: 'Owner', paid: true, tickets: 1 },
                    { flat: 'B-304', name: 'Mohammed Ali', role: 'Tenant', paid: true, tickets: 0 },
                    { flat: 'C-102', name: 'Suresh Shetty', role: 'Owner', paid: true, tickets: 1 },
                    { flat: 'C-205', name: 'Deepa Rao', role: 'Owner', paid: false, tickets: 0 },
                    { flat: 'A-701', name: 'Kavya Menon', role: 'Tenant', paid: true, tickets: 1 },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: 'var(--primary-400)', fontFamily: 'monospace' }}>{r.flat}</td>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: r.role === 'Owner' ? 'rgba(59,130,246,0.12)' : 'rgba(168,85,247,0.12)', color: r.role === 'Owner' ? 'var(--info)' : '#a78bfa' }}>
                          {r.role}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: r.paid ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: r.paid ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                          {r.paid ? '✓ Paid' : '⚠ Pending'}
                        </span>
                      </td>
                      <td style={{ color: r.tickets > 0 ? 'var(--warning)' : 'var(--text-muted)', fontWeight: r.tickets > 0 ? 700 : 400 }}>
                        {r.tickets > 0 ? `${r.tickets} active` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
