import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { X, CheckCircle2, Phone, Clock } from 'lucide-react';

export default function ServicesPage() {
  const { state, dispatch, addToast } = useApp();
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: '', timeSlot: '', notes: '' });

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const handleBook = (e) => {
    e.preventDefault();
    if (!bookingForm.date || !bookingForm.timeSlot) return;

    dispatch({
      type: 'ADD_SERVICE_BOOKING',
      payload: {
        service: selectedService.name,
        provider: selectedService.provider,
        date: bookingForm.date,
        timeSlot: bookingForm.timeSlot,
        notes: bookingForm.notes,
        flat: state.user?.flat,
        resident: state.user?.name,
      }
    });

    addToast(`${selectedService.name} booked for ${bookingForm.date} at ${bookingForm.timeSlot}! ✅`, 'success');
    setSelectedService(null);
    setBookingForm({ date: '', timeSlot: '', notes: '' });
  };

  return (
    <div className="fade-in">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-2xl)' }}>
        Book trusted service providers for your home. ನಿಮ್ಮ ಮನೆಗೆ ನಂಬಿಕಸ್ಥ ಸೇವಾ ಪೂರೈಕೆದಾರರನ್ನು ಬುಕ್ ಮಾಡಿ.
      </p>

      <div className="services-grid">
        {state.services.map(service => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => service.available && setSelectedService(service)}
            style={{ opacity: service.available ? 1 : 0.5, cursor: service.available ? 'pointer' : 'not-allowed' }}
          >
            <div className="service-card-icon" style={{ background: service.color, color: service.textColor }}>
              {service.icon}
            </div>
            <div className="service-card-title">{service.name}</div>
            <div className="service-card-desc">{service.description}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="service-card-available">
                <span className="dot" style={{ background: service.available ? 'var(--success)' : 'var(--danger)' }}></span>
                {service.available ? 'Available' : 'Unavailable'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.rate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      {state.serviceBookings.length > 0 && (
        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
            Your Bookings
          </h3>
          <div className="ticket-list">
            {state.serviceBookings.map(booking => (
              <div key={booking.id} className="ticket-card">
                <div className="ticket-priority low"></div>
                <div className="ticket-info">
                  <div className="ticket-title">{booking.service}</div>
                  <div className="ticket-meta">
                    <span className="ticket-id">{booking.id}</span>
                    <span>{booking.provider}</span>
                    <span>{booking.date} at {booking.timeSlot}</span>
                  </div>
                </div>
                <span className="ticket-status resolved">{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedService.icon} Book {selectedService.name}
              </h3>
              <button className="modal-close" onClick={() => setSelectedService(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleBook}>
              <div className="modal-body">
                {/* Provider Info */}
                <div className="card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{selectedService.provider}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-lg)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Phone size={12} /> {selectedService.phone}
                    </span>
                    <span>Rate: {selectedService.rate}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input
                    id="booking-date"
                    type="date"
                    className="form-input"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Preferred Time Slot
                  </label>
                  <div className="time-slots">
                    {timeSlots.map(slot => (
                      <div
                        key={slot}
                        className={`time-slot ${bookingForm.timeSlot === slot ? 'selected' : ''}`}
                        onClick={() => setBookingForm({ ...bookingForm, timeSlot: slot })}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Notes (Optional)</label>
                  <textarea
                    id="booking-notes"
                    className="form-input form-textarea"
                    placeholder="Describe the issue or special requirements..."
                    style={{ minHeight: 80 }}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedService(null)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="confirm-booking"
                  disabled={!bookingForm.date || !bookingForm.timeSlot}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
