import { useState } from 'react';
import { useApp } from './store/AppContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AssistantPage from './pages/AssistantPage';
import TicketsPage from './pages/TicketsPage';
import ServicesPage from './pages/ServicesPage';
import RulesPage from './pages/RulesPage';
import EventsPage from './pages/EventsPage';
import AdminPage from './pages/AdminPage';
import MaintenancePage from './pages/MaintenancePage';
import {
  LayoutDashboard, Bot, TicketCheck, Wrench,
  BookOpen, CalendarDays, LogOut, Menu, X,
  Bell, Shield, CreditCard, ChevronRight
} from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, icon: '🎫', text: 'Your ticket TKT-001 has been updated to In Progress', time: '2m ago', unread: true },
  { id: 2, icon: '📅', text: 'Reminder: Ugadi Celebration on Apr 20 at 5 PM', time: '1h ago', unread: true },
  { id: 3, icon: '💳', text: 'April 2026 maintenance fee is due', time: '2h ago', unread: true },
  { id: 4, icon: '✅', text: 'Your plumber booking BKG-XYZ123 is confirmed', time: 'Yesterday', unread: false },
  { id: 5, icon: '📢', text: 'Society meeting on Apr 25 at 7 PM — Community Hall', time: '2d ago', unread: false },
];

function NotificationPanel({ onClose }) {
  const { dispatch } = useApp();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(n => n.map(notif => ({ ...notif, unread: false })));
  };

  return (
    <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
      <div className="notification-header">
        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Notifications</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={markAllRead} style={{ fontSize: '0.72rem', background: 'none', color: 'var(--primary-400)', fontWeight: 600 }}>
            Mark all read
          </button>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="notification-list">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`notification-item ${notif.unread ? 'unread' : ''}`}
            onClick={() => {
              setNotifications(n => n.map(n => n.id === notif.id ? { ...n, unread: false } : n));
              if (notif.text.includes('ticket')) dispatch({ type: 'SET_PAGE', payload: 'tickets' });
              else if (notif.text.includes('maintenance') || notif.text.includes('fee')) dispatch({ type: 'SET_PAGE', payload: 'maintenance' });
              else if (notif.text.includes('Celebration') || notif.text.includes('meeting')) dispatch({ type: 'SET_PAGE', payload: 'events' });
              onClose();
            }}
          >
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{notif.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 2 }}>{notif.text}</p>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.time}</span>
            </div>
            {notif.unread && <span className="notif-dot" />}
          </div>
        ))}
      </div>
      <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>All caught up 🎉</span>
      </div>
    </div>
  );
}

function Sidebar() {
  const { state, dispatch } = useApp();

  const mainNav = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { key: 'assistant', label: 'AI Assistant', icon: <Bot size={18} />, badge: null },
    { key: 'tickets', label: 'Complaints', icon: <TicketCheck size={18} />, badge: state.tickets.filter(t => t.status === 'open').length },
    { key: 'services', label: 'Services', icon: <Wrench size={18} /> },
    { key: 'maintenance', label: 'Payments', icon: <CreditCard size={18} />, badge: 1, badgeClass: 'warning' },
  ];

  const infoNav = [
    { key: 'rules', label: 'Society Rules', icon: <BookOpen size={18} /> },
    { key: 'events', label: 'Events & Amenities', icon: <CalendarDays size={18} /> },
  ];

  const adminNav = state.user?.role === 'Admin' ? [
    { key: 'admin', label: 'Admin Panel', icon: <Shield size={18} /> },
  ] : [];

  return (
    <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🏘️</div>
          <div className="sidebar-logo-text">
            <h1>Panchayat</h1>
            <span>Smart Society</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Main</div>
        {mainNav.map(item => (
          <div
            key={item.key}
            className={`nav-item ${state.currentPage === item.key ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: item.key })}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && (
              <span className={`nav-item-badge ${item.badgeClass || ''}`}>{item.badge}</span>
            )}
          </div>
        ))}

        <div className="nav-section-title">Information</div>
        {infoNav.map(item => (
          <div
            key={item.key}
            className={`nav-item ${state.currentPage === item.key ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: item.key })}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}

        {adminNav.length > 0 && (
          <>
            <div className="nav-section-title">Administration</div>
            {adminNav.map(item => (
              <div
                key={item.key}
                className={`nav-item admin-nav-item ${state.currentPage === item.key ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_PAGE', payload: item.key })}
              >
                <span className="nav-item-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {state.user?.initials || 'U'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{state.user?.name}</div>
            <div className="sidebar-user-flat">Flat {state.user?.flat} · {state.user?.role}</div>
          </div>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => dispatch({ type: 'LOGOUT' })}
            title="Logout"
            style={{ marginLeft: 'auto', width: 32, height: 32 }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function ToastContainer() {
  const { state } = useApp();

  const iconMap = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  return (
    <div className="toast-container">
      {state.toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span className="toast-icon">{iconMap[toast.type] || '✅'}</span>
          <span className="toast-text">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

const PAGE_CONFIG = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your society', component: DashboardPage },
  assistant: { title: 'AI Assistant', subtitle: 'Voice & text powered help desk', component: AssistantPage },
  tickets: { title: 'Complaints', subtitle: 'Track and manage grievances', component: TicketsPage },
  services: { title: 'Service Concierge', subtitle: 'Book trusted service providers', component: ServicesPage },
  rules: { title: 'Society Rulebook', subtitle: 'Bylaws and regulations', component: RulesPage },
  events: { title: 'Events & Amenities', subtitle: 'Stay updated with society happenings', component: EventsPage },
  admin: { title: 'Admin Panel', subtitle: 'Society management & analytics', component: AdminPage },
  maintenance: { title: 'Maintenance & Payments', subtitle: 'Track dues and payment history', component: MaintenancePage },
};

function MainApp() {
  const { state, dispatch } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const pageConfig = PAGE_CONFIG[state.currentPage] || PAGE_CONFIG.dashboard;
  const PageComponent = pageConfig.component;

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="app-layout">
      <Sidebar />

      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 99
          }}
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        />
      )}

      <main className="main-content">
        <header className="page-header">
          <div className="page-header-left">
            <button
              className="mobile-toggle"
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            >
              {state.sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="page-title">{pageConfig.title}</h1>
              <p className="page-subtitle">{pageConfig.subtitle}</p>
            </div>
          </div>
          <div className="page-header-right">
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                id="notification-bell"
                className="btn btn-ghost btn-icon"
                title="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ position: 'relative' }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 8, height: 8, background: 'var(--danger)',
                    borderRadius: '50%', border: '1.5px solid var(--bg-secondary)'
                  }} />
                )}
              </button>

              {showNotifications && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 149 }}
                    onClick={() => setShowNotifications(false)}
                  />
                  <NotificationPanel onClose={() => setShowNotifications(false)} />
                </>
              )}
            </div>

            {/* Maintenance Due Badge */}
            <button
              className="btn btn-ghost"
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'maintenance' })}
              style={{ fontSize: '0.75rem', color: 'var(--danger)', gap: 4, padding: '0.4rem 0.75rem', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-full)' }}
            >
              <CreditCard size={13} /> ₹3,500 Due
            </button>
          </div>
        </header>

        <div className="page-body">
          <PageComponent />
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default function App() {
  const { state } = useApp();

  if (!state.isAuthenticated) {
    return <LoginPage />;
  }

  return <MainApp />;
}
