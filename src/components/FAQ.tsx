import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How far in advance should we book?',
    answer:
      'I recommend booking 9-12 months in advance, especially for peak wedding season (May-October). However, I am happy to accommodate shorter timelines when my schedule allows.',
  },
  {
    question: 'Do you travel for weddings?',
    answer:
      'Absolutely! I am based in California but available for weddings worldwide. Travel fees vary by location and are discussed during the consultation.',
  },
  {
    question: 'How long until we receive our photos?',
    answer:
      'You will receive a sneak peek of 15-20 images within 48 hours. Your complete gallery of beautifully edited images will be delivered within 4-6 weeks of your wedding day.',
  },
  {
    question: 'Can we customize a package?',
    answer:
      'Yes! While I offer three core collections, I am happy to create a custom package tailored to your specific needs, timeline, and budget. Let us discuss what works best for your wedding.',
  },
  {
    question: 'What is your photography style?',
    answer:
      'My style blends fine-art and editorial photography with candid moments. I focus on natural light, romantic compositions, and authentic emotions to create timeless images that feel both elegant and genuine.',
  },
  {
    question: 'Do you provide the RAW files?',
    answer:
      'I provide fully edited high-resolution images with print release. RAW files are not included as they require professional editing to achieve the quality and consistency you deserve.',
  },
  {
    question: 'What happens if you are sick on our wedding day?',
    answer:
      'I maintain a network of talented photographers and always have a backup plan in place. In the unlikely event of an emergency, I will ensure you have an experienced professional photographer at your wedding.',
  },
  {
    question: 'Do you help with timeline planning?',
    answer:
      'Yes! I provide guidance on creating a photography timeline that ensures we capture all the important moments while keeping your day stress-free and allowing time for natural, unrushed photos.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-sm shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-sand-50 transition-colors"
            >
              <span className="font-serif text-lg text-slate-800 pr-8">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-rose-600 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
