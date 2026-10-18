import { useEffect, useRef, useState, FormEvent } from 'react';
import { X, Send } from 'lucide-react';
import { sendEnquiry } from '../lib/sendEnquiry';
import { eventTypes } from '../data/studio';
import EnquiryWhatsAppLink from './EnquiryWhatsAppLink';

const bookingFieldClassName = 'w-full px-4 py-3 bg-white text-[#1F2937] placeholder:text-[#6B7280] caret-[#1F2937] [color-scheme:light] border border-[#E5E3ED] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors';

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
          'Your enquiry has been accepted for email delivery. We will get back to you within 24-48 hours at the email or phone number you provided.',
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
            ? 'Email delivery is not set up yet. Please email us directly at ulhaslp1995@gmail.com or use WhatsApp.'
            : 'Email is currently unavailable. Please use Send via WhatsApp below, or email ulhaslp1995@gmail.com.',
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
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto transition-transform duration-500 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="sticky top-0 bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-elegant text-2xl leading-tight">Book Your Slot</h2>
              <p className="text-white/80 text-xs mt-0.5">
                Tell us about your event and we'll confirm availability
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close booking form"
              className="p-1.5 hover:bg-white/15 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label htmlFor="booking-name" className="block text-[#33333F] font-medium mb-2 text-sm">
                Your Name *
              </label>
              <input
                type="text"
                id="booking-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={bookingFieldClassName}
              />
            </div>

            <div>
              <label htmlFor="booking-email" className="block text-[#33333F] font-medium mb-2 text-sm">
                Email *
              </label>
              <input
                type="email"
                id="booking-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={bookingFieldClassName}
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-[#33333F] font-medium mb-2 text-sm">
                Phone *
              </label>
              <input
                type="tel"
                id="booking-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={bookingFieldClassName}
              />
            </div>

            <div>
              <label htmlFor="booking-event" className="block text-[#33333F] font-medium mb-2 text-sm">
                Event Name *
              </label>
              <select
                id="booking-event"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                className={bookingFieldClassName}
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="booking-date" className="block text-[#33333F] font-medium mb-2 text-sm">
                Event Date *
              </label>
              <input
                type="date"
                id="booking-date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className={bookingFieldClassName}
              />
            </div>

            <div>
              <label htmlFor="booking-message" className="block text-[#33333F] font-medium mb-2 text-sm">
                Message *
              </label>
              <textarea
                id="booking-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={2000}
                rows={4}
                placeholder="Share your venue, style preferences, or any questions..."
                className={`${bookingFieldClassName} resize-none`}
              />
            </div>

            {submitStatus.type && (
              <div role="status" aria-live="polite"
                className={`p-4 rounded-sm text-sm ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white py-3.5 rounded-sm hover:opacity-90 transition-all duration-300 font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Send Email Enquiry
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-4"><EnquiryWhatsAppLink details={formData} /></div>

            <p className="text-[#77778A] text-xs flex items-start gap-1.5">
              <Send className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              Send an email enquiry, or choose WhatsApp to chat with the studio.
            </p>
          </form>
        </aside>
      </div>
    </>
  );
}
