import { useApp } from '../store/AppContext';
import {
  AlertTriangle, CheckCircle2, Clock, BarChart3,
  Mic, CalendarDays, ArrowUpRight, CreditCard,
  Zap, Bell, Shield, TrendingUp, MessageSquare
} from 'lucide-react';

export default function DashboardPage() {
  const { state, dispatch } = useApp();

  const openTickets = state.tickets.filter(t => t.status === 'open').length;
  const inProgress = state.tickets.filter(t => t.status === 'in-progress').length;
  const resolved = state.tickets.filter(t => t.status === 'resolved').length;
  const totalBookings = state.serviceBookings.length;

  const quickActions = [
    { label: 'Report Issue', icon: '🎤', color: 'rgba(239, 68, 68, 0.12)', page: 'assistant', desc: 'Voice or text' },
    { label: 'Book Service', icon: '🔧', color: 'rgba(59, 130, 246, 0.12)', page: 'services', desc: 'Plumber, AC & more' },
    { label: 'View Rules', icon: '📜', color: 'rgba(168, 85, 247, 0.12)', page: 'rules', desc: 'Society bylaws' },
    { label: 'Events', icon: '🎉', color: 'rgba(245, 158, 11, 0.12)', page: 'events', desc: 'Upcoming activities' },
    { label: 'My Tickets', icon: '📋', color: 'rgba(16, 185, 129, 0.12)', page: 'tickets', desc: 'Track complaints' },
    { label: 'AI Chat', icon: '🤖', color: 'rgba(6, 182, 212, 0.12)', page: 'assistant', desc: 'Ask anything' },
  ];

  const recentTickets = state.tickets.slice(0, 4);

  const statCards = [
    {
      icon: <AlertTriangle size={22} />,
      colorClass: 'red',
      value: openTickets,
      label: 'Open Tickets',
      change: 'Active',
      changeIcon: <Zap size={12} />,
      color: 'var(--danger)',
    },
    {
      icon: <Clock size={22} />,
      colorClass: 'amber',
      value: inProgress,
      label: 'In Progress',
      change: 'Being handled',
      changeIcon: <TrendingUp size={12} />,
      color: 'var(--warning)',
    },
    {
      icon: <CheckCircle2 size={22} />,
      colorClass: 'green',
      value: resolved,
      label: 'Resolved',
      change: 'Completed',
      changeIcon: <CheckCircle2 size={12} />,
      color: 'var(--success)',
    },
    {
      icon: <BarChart3 size={22} />,
      colorClass: 'blue',
      value: totalBookings,
      label: 'Service Bookings',
      change: 'Total booked',
      changeIcon: <ArrowUpRight size={12} />,
      color: 'var(--info)',
    },
  ];

  return (
    <div className="fade-in">

      {/* ── Maintenance Due Alert Banner ─────────── */}
      <div
        className="card"
        style={{
          marginBottom: 'var(--space-xl)',
          background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.03))',
          border: '1px solid rgba(239,68,68,0.22)',
          cursor: 'pointer',
        }}
        onClick={() => dispatch({ type: 'SET_PAGE', payload: 'maintenance' })}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div style={{ width: 40, height: 40, background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} style={{ color: 'var(--danger)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--danger)' }}>
                ⚠️ April Maintenance Fee Due — ₹3,500
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Due by 5th April 2026 · Late fee: ₹52/day · Click to pay now
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 600 }}>
            Pay Now <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────── */}
      <div className="stats-grid">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.colorClass}`}>{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-change up" style={{ color: s.color }}>
                {s.changeIcon} {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ─────────────────────────── */}
      <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
        ⚡ Quick Actions
      </h2>
      <div className="quick-actions">
        {quickActions.map((action) => (
          <div
            key={action.label}
            className="quick-action"
            onClick={() => dispatch({ type: 'SET_PAGE', payload: action.page })}
          >
            <div className="quick-action-icon" style={{ background: action.color }}>
              {action.icon}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="quick-action-label">{action.label}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{action.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── AI Assistant Promo ───────────────────── */}
      <div
        className="card"
        style={{
          marginBottom: 'var(--space-2xl)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.06))',
          border: '1px solid rgba(16,185,129,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xl)',
        }}
        onClick={() => dispatch({ type: 'SET_PAGE', payload: 'assistant' })}
      >
        <div style={{ width: 52, height: 52, background: 'var(--gradient-primary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-glow)' }}>
          🤖
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
            Panchayat AI — Always Available
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Report issues, book services, ask about society rules — in Kannada, Hindi, or English.
            <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>✨ Try voice mode!</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexShrink: 0 }}>
          <div style={{ width: 44, height: 44, background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' }}>
            <Mic size={20} color="#fff" />
          </div>
          <div style={{ width: 44, height: 44, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={18} style={{ color: 'var(--primary-400)' }} />
          </div>
        </div>
      </div>

      {/* ── Recent Complaints ───────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>🎫 Recent Complaints</h2>
        <button
          className="btn btn-ghost"
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'tickets' })}
          style={{ fontSize: '0.8rem' }}
        >
          View All →
        </button>
      </div>
      <div className="ticket-list" style={{ marginBottom: 'var(--space-2xl)' }}>
        {recentTickets.map(ticket => (
          <div key={ticket.id} className="ticket-card">
            <div className={`ticket-priority ${ticket.priority}`} />
            <div className="ticket-info">
              <div className="ticket-title">{ticket.title}</div>
              <div className="ticket-meta">
                <span className="ticket-id">{ticket.id}</span>
                <span>{ticket.category}</span>
                <span>Flat {ticket.flat}</span>
              </div>
            </div>
            <span className={`ticket-status ${ticket.status}`}>
              {ticket.status.replace('-', ' ')}
            </span>
          </div>
        ))}
        {recentTickets.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            ✅ No open complaints — all is well!
          </div>
        )}
      </div>

      {/* ── Upcoming Events ─────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>📅 Upcoming Events</h2>
        <button
          className="btn btn-ghost"
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'events' })}
          style={{ fontSize: '0.8rem' }}
        >
          View All →
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
        {state.events.slice(0, 3).map(event => (
          <div key={event.id} className="card" style={{ cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
              <CalendarDays size={16} style={{ color: 'var(--primary-400)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-400)', fontWeight: 600 }}>
                {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{event.title}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{event.time} • {event.location}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
