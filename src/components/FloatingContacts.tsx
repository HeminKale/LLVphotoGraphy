import { MessageCircle, Instagram, Youtube } from 'lucide-react';
import { studio } from '../data/studio';

const WHATSAPP_NUMBER = studio.whatsappNumber;
const WHATSAPP_MESSAGE = "Hi! I'd like to enquire about booking a shoot.";
const INSTAGRAM_URL = studio.instagram;

export default function FloatingContacts() {
  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-[85] flex flex-col gap-3">
      <a
        href={studio.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch Love Light Vision on YouTube"
        className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <Youtube className="w-5 h-5" />
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
