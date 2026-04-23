import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Plus, Filter, X } from 'lucide-react';

export default function TicketsPage() {
  const { state, dispatch, TICKET_CATEGORIES, addToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '', category: 'Electrical', priority: 'medium', description: ''
  });

  const filteredTickets = filter === 'all'
    ? state.tickets
    : state.tickets.filter(t => t.status === filter);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.title.trim() || !newTicket.description.trim()) return;

    dispatch({
      type: 'ADD_TICKET',
      payload: {
        title: newTicket.title,
        category: newTicket.category,
        priority: newTicket.priority,
        flat: state.user?.flat || 'N/A',
        resident: state.user?.name || 'Resident',
        description: newTicket.description,
        language: 'English'
      }
    });

    addToast(`Ticket created successfully! Your complaint has been registered.`, 'success');
    setNewTicket({ title: '', category: 'Electrical', priority: 'medium', description: '' });
    setShowCreate(false);
  };

  const statusFilters = [
    { key: 'all', label: 'All' },
    { key: 'open', label: 'Open' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'closed', label: 'Closed' },
  ];

  return (
    <div className="fade-in">
      {/* Filter & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-glass)', padding: 4, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          {statusFilters.map(f => (
            <button
              key={f.key}
              className={`lang-option ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          id="create-ticket-btn"
          className="btn btn-primary"
          onClick={() => setShowCreate(true)}
        >
          <Plus size={16} />
          New Complaint
        </button>
      </div>

      {/* Ticket List */}
      {filteredTickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Filter size={32} />
          </div>
          <div className="empty-state-title">No tickets found</div>
          <div className="empty-state-desc">
            {filter === 'all'
              ? 'No complaints have been raised yet. Click "New Complaint" to create one.'
              : `No ${filter} tickets at the moment.`}
          </div>
        </div>
      ) : (
        <div className="ticket-list">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className={`ticket-priority ${ticket.priority}`}></div>
              <div className="ticket-info">
                <div className="ticket-title">{ticket.title}</div>
                <div className="ticket-meta">
                  <span className="ticket-id">{ticket.id}</span>
                  <span>{ticket.category}</span>
                  <span>Flat {ticket.flat}</span>
                  <span>{ticket.resident}</span>
                  <span>{new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <span className={`ticket-status ${ticket.status}`}>
                  {ticket.status.replace('-', ' ')}
                </span>
                {state.user?.role === 'Admin' && ticket.status === 'open' && (
                  <button
                    className="btn btn-ghost"
                    style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'UPDATE_TICKET_STATUS', payload: { id: ticket.id, status: 'in-progress' } });
                      addToast(`${ticket.id} marked as In Progress`, 'info');
                    }}
                  >
                    Take Action
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">📋 New Complaint</h3>
              <button className="modal-close" onClick={() => setShowCreate(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateTicket}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    id="ticket-title"
                    type="text"
                    className="form-input"
                    placeholder="Brief description of the issue..."
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      id="ticket-category"
                      className="form-select"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    >
                      {TICKET_CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      id="ticket-priority"
                      className="form-select"
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High / Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    id="ticket-description"
                    className="form-input form-textarea"
                    placeholder="Describe the problem in detail... (you can write in Kannada, Kanglish, or English)"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" id="submit-ticket">
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
