import { MessageCircle } from 'lucide-react';
import { studio } from '../data/studio';

interface EnquiryDetails {
  name: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  message: string;
}

export default function EnquiryWhatsAppLink({ details, showHint = true, compact = false, onOpen }: { details: EnquiryDetails; showHint?: boolean; compact?: boolean; onOpen?: () => void }) {
  const message = [
    `Hi ${studio.name}, I'd like to enquire about a shoot.`,
    ...Object.entries({
      Name: details.name, Email: details.email, Phone: details.phone,
      Event: details.eventName, 'Event date': details.eventDate, Message: details.message,
    }).filter(([, value]) => value.trim()).map(([label, value]) => `${label}: ${value.trim()}`),
  ].join('\n');

  return (
    <div className={compact ? 'min-w-0' : 'space-y-2'}>
      <a
        href={`https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(message)}`}
        onClick={() => { if (onOpen) window.setTimeout(onOpen, 0); }}
        aria-label="Send enquiry via WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border border-green-600 text-green-600 rounded-sm px-4 py-3 hover:bg-green-600/10 transition-colors font-medium"
      >
        <MessageCircle className="w-4 h-4" />
        {compact ? 'WhatsApp' : 'Send via WhatsApp'}
      </a>
      {showHint && (
        <p className="text-xs text-[#8B82A8]">
          Opens the studio's WhatsApp chat with your details. Tap Send there to send your enquiry.
        </p>
      )}
    </div>
  );
}
