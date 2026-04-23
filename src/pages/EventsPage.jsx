import { useApp } from '../store/AppContext';
import { Calendar, MapPin, Clock, Users, ChevronRight } from 'lucide-react';

export default function EventsPage() {
  const { state } = useApp();

  const getEventTypeColor = (type) => {
    const colors = {
      Festival: { bg: 'rgba(245, 158, 11, 0.12)', text: '#fbbf24' },
      Meeting: { bg: 'rgba(59, 130, 246, 0.12)', text: '#60a5fa' },
      Activity: { bg: 'rgba(16, 185, 129, 0.12)', text: '#34d399' },
      Wellness: { bg: 'rgba(168, 85, 247, 0.12)', text: '#a78bfa' }
    };
    return colors[type] || { bg: 'rgba(100, 116, 139, 0.12)', text: '#94a3b8' };
  };

  const getEventEmoji = (type) => {
    const emojis = {
      Festival: '🎉',
      Meeting: '📋',
      Activity: '🎯',
      Wellness: '🧘'
    };
    return emojis[type] || '📌';
  };

  return (
    <div className="fade-in">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
        Stay updated with society events and activities. ಸಮಾಜದ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.
      </p>

      {/* Events */}
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <Calendar size={18} style={{ color: 'var(--primary-400)' }} />
        Upcoming Events
      </h3>

      <div className="events-grid" style={{ marginBottom: 'var(--space-2xl)' }}>
        {state.events.map(event => {
          const typeColor = getEventTypeColor(event.type);
          return (
            <div key={event.id} className="event-card">
              <div
                className="event-card-banner"
                style={{
                  background: `linear-gradient(135deg, ${typeColor.bg}, rgba(10, 15, 26, 0.9))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: '3rem' }}>{getEventEmoji(event.type)}</span>
                <div className="event-card-banner-overlay">
                  <div className="event-card-date">
                    <Calendar size={12} />
                    {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="event-card-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: typeColor.bg, color: typeColor.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {event.type}
                  </span>
                </div>
                <div className="event-card-title">{event.title}</div>
                <div className="event-card-detail">
                  <Clock size={13} /> {event.time}
                </div>
                <div className="event-card-detail">
                  <MapPin size={13} /> {event.location}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 'var(--space-sm)', lineHeight: 1.5 }}>
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Amenities */}
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        🏢 Amenity Timings
      </h3>

      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <table className="amenity-table">
          <thead>
            <tr>
              <th></th>
              <th>Amenity</th>
              <th>Timings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {state.amenities.map((amenity, i) => (
              <tr key={i}>
                <td style={{ fontSize: '1.2rem', textAlign: 'center', padding: '12px' }}>{amenity.icon}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{amenity.name}</td>
                <td>{amenity.timings}</td>
                <td>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: 'var(--success)'
                  }}>
                    {amenity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
