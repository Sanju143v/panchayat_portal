import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { CreditCard, CheckCircle2, Clock, AlertTriangle, TrendingDown, TrendingUp, Download, Wallet } from 'lucide-react';

const PAYMENT_HISTORY = [
  { id: 'PAY-2026-04', month: 'April 2026', amount: 3500, status: 'pending', dueDate: '2026-04-05', paidDate: null },
  { id: 'PAY-2026-03', month: 'March 2026', amount: 3500, status: 'paid', dueDate: '2026-03-05', paidDate: '2026-03-04' },
  { id: 'PAY-2026-02', month: 'February 2026', amount: 3500, status: 'paid', dueDate: '2026-02-05', paidDate: '2026-02-03' },
  { id: 'PAY-2026-01', month: 'January 2026', amount: 3500, status: 'paid', dueDate: '2026-01-05', paidDate: '2026-01-05' },
  { id: 'PAY-2025-12', month: 'December 2025', amount: 3500, status: 'paid', dueDate: '2025-12-05', paidDate: '2025-12-02' },
  { id: 'PAY-2025-11', month: 'November 2025', amount: 3500, status: 'paid', dueDate: '2025-11-05', paidDate: '2025-11-06' },
];

const EXPENSE_BREAKDOWN = [
  { label: 'Security Staff', amount: '₹85,000', percent: 32, icon: '🛡️', color: 'var(--info)' },
  { label: 'Housekeeping', amount: '₹45,000', percent: 17, icon: '🧹', color: 'var(--primary-400)' },
  { label: 'Electricity (Common)', amount: '₹62,000', percent: 23, icon: '⚡', color: 'var(--accent-400)' },
  { label: 'Water & Plumbing', amount: '₹28,000', percent: 11, icon: '💧', color: '#60a5fa' },
  { label: 'Lift Maintenance', amount: '₹18,000', percent: 7, icon: '🛗', color: '#a78bfa' },
  { label: 'Miscellaneous', amount: '₹27,000', percent: 10, icon: '📦', color: 'var(--text-muted)' },
];

export default function MaintenancePage() {
  const { state, addToast } = useApp();
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const pendingPayment = PAYMENT_HISTORY.find(p => p.status === 'pending');

  const handlePay = (e) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowPayModal(false);
      addToast('🎉 Payment of ₹3,500 received! Receipt sent to your phone.', 'success');
    }, 2000);
  };

  return (
    <div className="fade-in">
      {/* Current Due Banner */}
      {pendingPayment && (
        <div
          className="card"
          style={{
            marginBottom: 'var(--space-xl)',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04))',
            border: '1px solid rgba(239,68,68,0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
              <div style={{ width: 52, height: 52, background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={24} style={{ color: 'var(--danger)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--danger)' }}>
                  ₹{pendingPayment.amount.toLocaleString()} Due — {pendingPayment.month}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Due by {new Date(pendingPayment.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  &nbsp;• Late fee: ₹52/day after due date
                </div>
              </div>
            </div>
            <button
              id="pay-now-btn"
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}
              onClick={() => setShowPayModal(true)}
            >
              <CreditCard size={16} /> Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 'var(--space-2xl)' }}>
        <div className="stat-card">
          <div className="stat-icon green"><Wallet size={22} /></div>
          <div>
            <div className="stat-value">₹3,500</div>
            <div className="stat-label">Monthly Fee</div>
            <div className="stat-change" style={{ color: 'var(--text-muted)' }}>Per flat/month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 size={22} /></div>
          <div>
            <div className="stat-value">5</div>
            <div className="stat-label">Months Paid</div>
            <div className="stat-change up"><TrendingUp size={12} /> Streak intact</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><Clock size={22} /></div>
          <div>
            <div className="stat-value">1</div>
            <div className="stat-label">Pending</div>
            <div className="stat-change down"><TrendingDown size={12} /> Apr 2026</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><CreditCard size={22} /></div>
          <div>
            <div className="stat-value">₹21K</div>
            <div className="stat-label">Paid This Year</div>
            <div className="stat-change up"><TrendingUp size={12} /> Jan–Mar 2026</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
        {/* Payment History */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>💳 Payment History</h3>
            <button className="btn btn-ghost" style={{ fontSize: '0.78rem', gap: 4 }}>
              <Download size={13} /> Download
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {PAYMENT_HISTORY.map(pay => (
              <div
                key={pay.id}
                className="card"
                style={{
                  padding: 'var(--space-md) var(--space-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-md)',
                  borderColor: pay.status === 'pending' ? 'rgba(239,68,68,0.2)' : 'var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-md)',
                    background: pay.status === 'paid' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {pay.status === 'paid'
                      ? <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
                      : <Clock size={18} style={{ color: 'var(--danger)' }} />
                    }
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{pay.month}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {pay.status === 'paid'
                        ? `Paid on ${new Date(pay.paidDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                        : `Due: ${new Date(pay.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                      }
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹{pay.amount.toLocaleString()}</div>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: pay.status === 'paid' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: pay.status === 'paid' ? 'var(--success)' : 'var(--danger)',
                    textTransform: 'uppercase'
                  }}>
                    {pay.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-lg)' }}>
            📊 Society Expense Breakdown — April 2026
          </h3>
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-400)' }}>₹2,65,000</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Monthly Expenditure</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {EXPENSE_BREAKDOWN.map(exp => (
                <div key={exp.label}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{exp.icon}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{exp.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{exp.amount}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', width: 32, textAlign: 'right' }}>{exp.percent}%</span>
                    </div>
                  </div>
                  <div style={{ height: 5, background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${exp.percent}%`, background: exp.color, borderRadius: 'var(--radius-full)', opacity: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Society Fund */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04))', border: '1px solid rgba(16,185,129,0.15)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>🏦 Society Corpus Fund</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-400)' }}>₹12,40,000</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>Reserved for major repairs & infrastructure</div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3 className="modal-title">💳 Pay Maintenance Fee</h3>
              <button className="modal-close" onClick={() => setShowPayModal(false)}>✕</button>
            </div>
            <form onSubmit={handlePay}>
              <div className="modal-body">
                <div className="card" style={{ marginBottom: 'var(--space-lg)', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 2 }}>April 2026 — Maintenance</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Flat {state.user?.flat} • {state.user?.name}</div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-400)' }}>₹3,500</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-sm)' }}>
                    {[
                      { key: 'upi', label: '📱 UPI', desc: 'Instant' },
                      { key: 'neft', label: '🏦 NEFT', desc: 'Bank Transfer' },
                      { key: 'cheque', label: '🧾 Cheque', desc: 'At Office' },
                    ].map(m => (
                      <div
                        key={m.key}
                        onClick={() => setPayMethod(m.key)}
                        style={{
                          padding: 'var(--space-md)',
                          borderRadius: 'var(--radius-md)',
                          border: `1px solid ${payMethod === m.key ? 'var(--primary-500)' : 'var(--border-color)'}`,
                          background: payMethod === m.key ? 'rgba(16,185,129,0.08)' : 'var(--bg-glass)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>{m.label.split(' ')[0]}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{m.label.split(' ')[1]}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {payMethod === 'upi' && (
                  <div className="form-group">
                    <label className="form-label">UPI ID</label>
                    <input
                      id="upi-input"
                      type="text"
                      className="form-input"
                      placeholder="yourname@upi / Society UPI: srinivasa@icici"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <div style={{ marginTop: 8, padding: 'var(--space-md)', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      📲 Society UPI: <strong style={{ color: 'var(--text-primary)' }}>srinivasa.residency@icici</strong>
                    </div>
                  </div>
                )}

                {payMethod === 'neft' && (
                  <div className="card" style={{ background: 'var(--bg-glass)', fontSize: '0.82rem' }}>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {[['Bank', 'ICICI Bank'], ['Account Name', 'Srinivasa Residency RERA'], ['Account No.', '1234 5678 9012'], ['IFSC', 'ICIC0001234'], ['Branch', 'Koramangala, Bengaluru']].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {payMethod === 'cheque' && (
                  <div className="card" style={{ background: 'var(--bg-glass)', fontSize: '0.82rem' }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      🏢 Drop your cheque<br />
                      <strong>Payable to:</strong> Srinivasa Residency Association<br />
                      <strong>Office Hours:</strong> 9 AM – 6 PM, Mon–Sat<br />
                      <strong>Location:</strong> Gate 1, Ground Floor, Admin Office
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPayModal(false)}>Cancel</button>
                {payMethod !== 'cheque' && (
                  <button
                    id="confirm-payment"
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPaying}
                  >
                    {isPaying ? (
                      <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Processing...</>
                    ) : 'Confirm Payment ₹3,500'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
