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
    couple_names: 'Emma & James',
    quote:
      "Our wedding photos are beyond anything we could have imagined. Every emotion, every laugh, every tear was captured so beautifully. We'll treasure these images forever.",
    wedding_date: '2024-06-15',
    featured: true,
  },
  {
    id: '2',
    couple_names: 'Sophia & Michael',
    quote:
      'From the moment we met, we knew our photographer understood our vision. The photos feel like art, but they also feel like us — authentic and full of joy.',
    wedding_date: '2024-08-22',
    featured: true,
  },
  {
    id: '3',
    couple_names: 'Olivia & Daniel',
    quote:
      'We were nervous about being in front of the camera, but the whole day felt relaxed and natural. The results speak for themselves — timeless, gorgeous photos.',
    wedding_date: '2024-09-10',
    featured: true,
  },
];
