export interface Testimonial {
  id: string;
  couple_names: string;
  quote: string;
  wedding_date: string;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    couple_names: 'Jitendra Nemade',
    quote:
      'We hired Lovelight vision studio for our recent event and were absolutely thrilled with the results! The photographer and team captured every special moment beautifully. The quality of the photos is outstanding, and they were delivered on time as promised. Their professionalism, creativity, and friendly nature made the whole experience smooth and enjoyable. Highly recommended for any event!',
    wedding_date: '2025-07-02',
    featured: true,
  },
  {
    id: '2',
    couple_names: 'Shekhar Chaudhari',
    quote:
      'First time at Lovelight Vision Studio! Super impressed! Candid shots were fantastic and the retouching is flawless. Great experience, definitely recommend for a professional, yet fun, photoshoot.',
    wedding_date: '2025-09-18',
    featured: true,
  },
  {
    id: '3',
    couple_names: 'Sonal More',
    quote:
      'A BIG heartfelt thanks to you for all these amazing captures in time! These will be cherished forever. Thank you sooo much for all your hard work, they are absolutely wonderful. The photos and teaser are absolutely amazing and so much more than I could have imagined. Thank you sooo much LOVE LIGHT VISION',
    wedding_date: '2025-10-18',
    featured: true,
  },
  {
    id: '4',
    couple_names: 'Gunvant',
    quote:
      'Stepped into Lovelight Vision Studio feeling a bit nervous for my maternity and portfolio shoots. The atmosphere was so welcoming, instantly putting me at ease. The photographer was brilliant, capturing stunning, intimate moments I\u2019ll cherish forever, and produced portfolio shots that truly shine. Highly recommend for any visitor wanting professional, heartfelt photos.',
    wedding_date: '2026-10-03',
    featured: true,
  },
];
