import { Camera, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studio } from '../data/studio';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-6 h-6" />
              <span className="font-elegant text-xl">Love Light Vision</span>
            </div>
            <p className="text-sand-300 text-sm leading-relaxed">
              Creating timeless wedding memories through fine-art photography.
              Every love story deserves to be beautifully told.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/portfolio"
                className="text-sand-300 text-sm hover:text-white transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/about"
                className="text-sand-300 text-sm hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                to="/testimonials"
                className="text-sand-300 text-sm hover:text-white transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/contact"
                className="text-sand-300 text-sm hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href={studio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                title="Instagram"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={studio.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Love Light Vision on YouTube"
                title="YouTube"
                className="w-10 h-10 bg-red-600/15 text-red-400 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:ulhaslp1995@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <a
                href="mailto:ulhaslp1995@gmail.com"
                className="text-sand-300 text-sm hover:text-white transition-colors"
              >
                ulhaslp1995@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sand-300" />
              <a
                href="tel:+918788925877"
                className="text-sand-300 text-sm hover:text-white transition-colors"
              >
                +91 87889 25877
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sand-400 text-sm">
            &copy; {new Date().getFullYear()} Love Light Vision Photography. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
