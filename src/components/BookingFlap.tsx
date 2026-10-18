import { useEffect, useRef, useState, FormEvent } from 'react';
import { X, Send } from 'lucide-react';
import { sendEnquiry } from '../lib/sendEnquiry';
import { eventTypes } from '../data/studio';
import EnquiryWhatsAppLink from './EnquiryWhatsAppLink';

const bookingFieldClassName = 'booking-field';

export default function BookingFlap() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input, select, textarea, a[href]'
    ) ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: 'Wedding',
    eventDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const result = await sendEnquiry(
      'Book Slot',
      [
        { label: 'Name', value: formData.name },
        { label: 'Email', value: formData.email },
        { label: 'Phone', value: formData.phone },
        { label: 'Event', value: formData.eventName },
        { label: 'Event Date', value: formData.eventDate },
        { label: 'Message', value: formData.message },
      ],
      formData.email
    );

    setIsSubmitting(false);

    if (result.ok) {
      setSubmitStatus({
        type: 'success',
        message:
          'Enquiry sent. We will reply within 24-48 hours.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventName: 'Wedding',
        eventDate: '',
        message: '',
      });
    } else {
      setSubmitStatus({
        type: 'error',
        message:
          result.error === 'Email delivery is not configured yet.'
            ? 'Email is unavailable. Please use WhatsApp or contact us directly.'
            : 'Email is unavailable. Please use WhatsApp or contact us directly.',
      });
    }
  };

  return (
    <>
      {/* Tab stuck to the right edge, always visible */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open booking form"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-gradient-to-b from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white py-6 px-2.5 rounded-l-sm shadow-lg hover:pr-4 transition-all duration-300 font-sans text-xs tracking-widest uppercase flex flex-col items-center"
        style={{ writingMode: 'vertical-rl' }}
      >
        Book Slot
      </button>

      {/* Slide-out flap */}
      <div
        hidden={!isOpen}
        className={`fixed inset-0 z-[95] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        <aside ref={dialogRef} role="dialog" aria-modal="true" aria-label="Book your slot"
          className={`booking-drawer absolute right-0 top-0 w-full bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="booking-drawer-header bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white flex items-center justify-between gap-3">
            <div>
              <h2 className="font-elegant text-3xl leading-tight">Book Your Slot</h2>
              <p className="booking-drawer-subtitle text-white/85 text-xs mt-1">Tell us about your event</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close booking form"
              className="booking-close flex items-center justify-center shrink-0 hover:bg-white/15 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-fields-row">
              <div>
                <label htmlFor="booking-name" className="booking-label">Your Name *</label>
                <input type="text" id="booking-name" name="name" autoComplete="name"
                  value={formData.name} onChange={handleChange} required className={bookingFieldClassName} />
              </div>
              <div>
                <label htmlFor="booking-phone" className="booking-label">Phone *</label>
                <input type="tel" id="booking-phone" name="phone" autoComplete="tel"
                  value={formData.phone} onChange={handleChange} required className={bookingFieldClassName} />
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className="booking-label">Email *</label>
              <input type="email" id="booking-email" name="email" autoComplete="email"
                value={formData.email} onChange={handleChange} required className={bookingFieldClassName} />
            </div>

            <div className="booking-fields-row">
              <div>
                <label htmlFor="booking-event" className="booking-label">Event Type *</label>
                <select id="booking-event" name="eventName" value={formData.eventName}
                  onChange={handleChange} required className={bookingFieldClassName}>
                  {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="booking-date" className="booking-label">Event Date *</label>
                <input type="date" id="booking-date" name="eventDate"
                  value={formData.eventDate} onChange={handleChange} required className={bookingFieldClassName} />
              </div>
            </div>

            <div>
              <label htmlFor="booking-message" className="booking-label">Message *</label>
              <textarea id="booking-message" name="message" value={formData.message}
                onChange={handleChange} required maxLength={2000} rows={3}
                placeholder="Venue, ideas or questions..." className={`${bookingFieldClassName} booking-message`} />
            </div>

            {submitStatus.type && (
              <div role="status" aria-live="polite"
                className={`booking-status rounded-md text-sm ${submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {submitStatus.message}
              </div>
            )}

            <div className="booking-actions">
              <button type="submit" disabled={isSubmitting}
                className="bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white rounded-md hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-4 h-4 shrink-0" />
                {isSubmitting ? 'Sending...' : 'Email enquiry'}
              </button>
              <EnquiryWhatsAppLink details={formData} showHint={false} compact />
            </div>
          </form>
        </aside>
      </div>
    </>
  );
}
