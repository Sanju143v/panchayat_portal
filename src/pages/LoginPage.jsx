import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { LogIn, User, Hash, Shield, Sparkles, ChevronRight } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { name: 'Ravi Kumar', flat: 'A-402', role: 'Owner', initials: 'RK', color: 'var(--primary-400)' },
  { name: 'Priya Hegde', flat: 'B-304', role: 'Tenant', initials: 'PH', color: 'var(--info)' },
  { name: 'Admin User', flat: 'A-001', role: 'Admin', initials: 'AD', color: 'var(--accent-400)' },
];

export default function LoginPage() {
  const { dispatch } = useApp();
  const [form, setForm] = useState({ name: '', flat: '', role: 'Owner', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoHint, setShowDemoHint] = useState(false);

  const handleLogin = (e, overrideForm) => {
    if (e) e.preventDefault();
    const data = overrideForm || form;
    if (!data.name.trim() || !data.flat.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      dispatch({
        type: 'LOGIN',
        payload: {
          name: data.name.trim(),
          flat: data.flat.trim().toUpperCase(),
          role: data.role,
          phone: data.phone || '',
          initials: data.name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        }
      });
      setIsLoading(false);
    }, 700);
  };

  const loginAsDemo = (account) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({
        type: 'LOGIN',
        payload: {
          name: account.name,
          flat: account.flat,
          role: account.role,
          phone: '',
          initials: account.initials
        }
      });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="login-page">
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '8%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="login-card fade-in" style={{ maxWidth: 440 }}>
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon" style={{ width: 70, height: 70, fontSize: '2rem' }}>🏘️</div>
          <h1 style={{ fontSize: '2rem', marginBottom: 6 }}>Panchayat</h1>
          <p style={{ fontSize: '0.88rem' }}>AI-Powered Society Management</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Grievance AI', 'Service Booking', 'Society Rules', 'Voice Input'].map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: '0.65rem',
                  padding: '3px 8px',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--primary-400)',
                  fontWeight: 600,
                  letterSpacing: '0.3px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Demo Login */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', cursor: 'pointer' }}
            onClick={() => setShowDemoHint(!showDemoHint)}
          >
            <Sparkles size={13} style={{ color: 'var(--accent-400)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Demo Access
            </span>
            <ChevronRight
              size={13}
              style={{ color: 'var(--text-muted)', marginLeft: 'auto', transform: showDemoHint ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </div>

          {showDemoHint && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', animation: 'fade-in 0.2s ease' }}>
              {DEMO_ACCOUNTS.map(account => (
                <button
                  key={account.name}
                  onClick={() => loginAsDemo(account)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    padding: 'var(--space-md)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color-hover)';
                    e.currentTarget.style.background = 'var(--bg-glass-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.background = 'var(--bg-glass)';
                  }}
                >
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 'var(--radius-md)',
                    background: `linear-gradient(135deg, ${account.color}33, ${account.color}11)`,
                    border: `1px solid ${account.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.85rem', color: account.color, flexShrink: 0
                  }}>
                    {account.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{account.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Flat {account.flat} · {account.role}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>OR ENTER DETAILS</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              <User size={12} style={{ display: 'inline', marginRight: 4 }} />
              Resident Name
            </label>
            <input
              id="login-name"
              type="text"
              className="form-input"
              placeholder="e.g., Ramesh Gowda"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="form-label">
                <Hash size={12} style={{ display: 'inline', marginRight: 4 }} />
                Flat Number
              </label>
              <input
                id="login-flat"
                type="text"
                className="form-input"
                placeholder="e.g., A-402"
                value={form.flat}
                onChange={(e) => setForm({ ...form, flat: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Shield size={12} style={{ display: 'inline', marginRight: 4 }} />
                Role
              </label>
              <select
                id="login-role"
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone (Optional)</label>
            <input
              id="login-phone"
              type="tel"
              className="form-input"
              placeholder="+91 98450 XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: 4 }}
            disabled={isLoading || !form.name.trim() || !form.flat.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Enter Society Portal
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          🏢 Srinivasa Residency, Koramangala, Bengaluru
        </p>
      </div>
    </div>
  );
}
