import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { sendEnquiry } from '../lib/sendEnquiry';
import { eventTypes } from '../data/studio';
import EnquiryWhatsAppLink from '../components/EnquiryWhatsAppLink';
import FAQ from '../components/FAQ';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: 'Wedding',
    eventDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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
      'Contact Form',
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
    <div className="bg-[#100B21]">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1476055/pexels-photo-1476055.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <h1 className="font-elegant text-5xl md:text-7xl text-white mb-4 text-shadow">
            Let's Tell Your Love Story
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light">
            Tell us about your wedding, family celebration, or portrait session
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="font-elegant text-4xl text-[#F1EDFB] mb-6">
                  Get In Touch
                </h2>
                <p className="text-[#A9A0C4] leading-relaxed mb-8">
                  Thank you for considering us to capture your special day. We
                  would be honored to learn more about your story and how we
                  can help preserve your most precious moments.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#8F1ED2]/15 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#8F1ED2]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F1EDFB] mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:ulhaslp1995@gmail.com"
                        className="text-[#A9A0C4] hover:text-[#8F1ED2] transition-colors"
                      >
                        ulhaslp1995@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#8F1ED2]/15 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#8F1ED2]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F1EDFB] mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+918788925877"
                        className="text-[#A9A0C4] hover:text-[#8F1ED2] transition-colors"
                      >
                        +91 87889 25877
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#8F1ED2]/15 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#8F1ED2]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F1EDFB] mb-1">
                        Location
                      </h3>
                      <p className="text-[#A9A0C4]">
                        Based in Jalgaon, Maharashtra
                        <br />
                        Available for travel worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#1C1330] rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-[#F1EDFB] mb-3">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-[#A9A0C4] text-sm">
                    <li className="flex gap-2">
                      <span className="text-[#8F1ED2]">•</span>
                      <span>Response within 24-48 hours</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8F1ED2]">•</span>
                      <span>Detailed pricing and package information</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8F1ED2]">•</span>
                      <span>Portfolio samples matching your style</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8F1ED2]">•</span>
                      <span>Option to schedule a consultation call</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-[#1C1330] p-8 md:p-10 rounded-sm shadow-lg"
              >
                <div className="mb-6">
                  <label
                    htmlFor="contact-name"
                    className="block text-[#D9D2E8] font-medium mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#100B21] text-[#F1EDFB] border border-[#332950] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[#D9D2E8] font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#100B21] text-[#F1EDFB] border border-[#332950] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[#D9D2E8] font-medium mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#100B21] text-[#F1EDFB] border border-[#332950] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="contact-event"
                      className="block text-[#D9D2E8] font-medium mb-2"
                    >
                      Event Name *
                    </label>
                    <select
                      id="contact-event"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#100B21] text-[#F1EDFB] border border-[#332950] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-date"
                      className="block text-[#D9D2E8] font-medium mb-2"
                    >
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="contact-date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#100B21] text-[#F1EDFB] border border-[#332950] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="contact-message"
                    className="block text-[#D9D2E8] font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    rows={6}
                    placeholder="Share your venue, style preferences, or any questions..."
                    className="w-full px-4 py-3 bg-[#100B21] text-[#F1EDFB] border border-[#332950] rounded-sm focus:outline-none focus:border-[#8F1ED2] transition-colors resize-none"
                  />
                </div>

                {submitStatus.type && (
                  <div role="status" aria-live="polite"
                    className={`mb-6 p-4 rounded-sm ${submitStatus.type === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white py-4 rounded-sm hover:opacity-90 transition-all duration-300 font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Email Enquiry
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="mt-4"><EnquiryWhatsAppLink details={formData} /></div>

                <p className="text-[#77778A] text-xs mt-4 flex items-start gap-1.5">
                  <Send className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Send an email enquiry, or choose WhatsApp to chat with the studio.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1C1330]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-elegant text-4xl md:text-5xl text-[#F1EDFB] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#A9A0C4] text-lg max-w-2xl mx-auto">
              Common questions about the booking process and what to expect
            </p>
          </div>
          <FAQ />
        </div>
      </section>
    </div>
  );
}
