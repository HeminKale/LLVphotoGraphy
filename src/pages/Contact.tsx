import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import FAQ from '../components/FAQ';

export default function Contact() {
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    email: '',
    phone: '',
    weddingDate: '',
    venueLocation: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const { error } = await supabase.from('contact_inquiries').insert([
      {
        bride_name: formData.brideName,
        groom_name: formData.groomName,
        email: formData.email,
        phone: formData.phone || null,
        wedding_date: formData.weddingDate,
        venue_location: formData.venueLocation,
        message: formData.message,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      setSubmitStatus({
        type: 'error',
        message:
          'There was an error submitting your inquiry. Please try again or email us directly.',
      });
    } else {
      setSubmitStatus({
        type: 'success',
        message:
          "Thank you for your inquiry! I'll be in touch within 24-48 hours.",
      });
      setFormData({
        brideName: '',
        groomName: '',
        email: '',
        phone: '',
        weddingDate: '',
        venueLocation: '',
        message: '',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-cream-50">
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
            I'd love to hear about your wedding day
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="font-elegant text-4xl text-slate-800 mb-6">
                  Get In Touch
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Thank you for considering me to capture your wedding day. I
                  would be honored to learn more about your love story and how I
                  can help preserve your most precious moments.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:hello@lovelightvision.com"
                        className="text-slate-600 hover:text-rose-600 transition-colors"
                      >
                        hello@lovelightvision.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+1234567890"
                        className="text-slate-600 hover:text-rose-600 transition-colors"
                      >
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Location
                      </h3>
                      <p className="text-slate-600">
                        Based in California
                        <br />
                        Available for travel worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-slate-800 mb-3">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex gap-2">
                      <span className="text-rose-600">•</span>
                      <span>Response within 24-48 hours</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-rose-600">•</span>
                      <span>Detailed pricing and package information</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-rose-600">•</span>
                      <span>Portfolio samples matching your style</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-rose-600">•</span>
                      <span>Option to schedule a consultation call</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-lg text-slate-800 mb-4">
                    Current Availability
                  </h3>
                  <AvailabilityCalendar />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-sm shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="brideName"
                      className="block text-slate-700 font-medium mb-2"
                    >
                      Bride's Name *
                    </label>
                    <input
                      type="text"
                      id="brideName"
                      name="brideName"
                      value={formData.brideName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="groomName"
                      className="block text-slate-700 font-medium mb-2"
                    >
                      Groom's Name *
                    </label>
                    <input
                      type="text"
                      id="groomName"
                      name="groomName"
                      value={formData.groomName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-slate-700 font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-slate-700 font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="weddingDate"
                      className="block text-slate-700 font-medium mb-2"
                    >
                      Wedding Date *
                    </label>
                    <input
                      type="date"
                      id="weddingDate"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="venueLocation"
                      className="block text-slate-700 font-medium mb-2"
                    >
                      Venue Location *
                    </label>
                    <input
                      type="text"
                      id="venueLocation"
                      name="venueLocation"
                      value={formData.venueLocation}
                      onChange={handleChange}
                      required
                      placeholder="City, State"
                      className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-slate-700 font-medium mb-2"
                  >
                    Tell Me About Your Wedding *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Share your vision, style preferences, or any questions you have..."
                    className="w-full px-4 py-3 border border-sand-300 rounded-sm focus:outline-none focus:border-rose-400 transition-colors resize-none"
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-sm ${
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
                  className="w-full bg-slate-800 text-white py-4 rounded-sm hover:bg-slate-700 transition-all duration-300 font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-elegant text-4xl md:text-5xl text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Common questions about the booking process and what to expect
            </p>
          </div>
          <FAQ />
        </div>
      </section>
    </div>
  );
}
