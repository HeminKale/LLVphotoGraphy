export interface Package {
  id: string;
  name: string;
  description: string;
  hours_coverage: number;
  deliverables: string[];
  starting_price: number;
  featured: boolean;
  order_position: number;
}

export const packages: Package[] = [
  {
    id: '1',
    name: 'The Essential Collection',
    description: 'Perfect for intimate weddings and elopements.',
    hours_coverage: 4,
    deliverables: [
      '4 hours of coverage',
      '1 photographer',
      '150+ edited high-resolution images',
      'Online gallery',
      'Print release',
    ],
    starting_price: 1500,
    featured: false,
    order_position: 1,
  },
  {
    id: '2',
    name: 'The Classic Collection',
    description: 'Our most popular package for a full wedding day.',
    hours_coverage: 8,
    deliverables: [
      '8 hours of coverage',
      '2 photographers',
      '400+ edited high-resolution images',
      'Online gallery',
      'Print release',
      'Engagement session',
      'Wedding timeline planning',
    ],
    starting_price: 3200,
    featured: true,
    order_position: 2,
  },
  {
    id: '3',
    name: 'The Signature Collection',
    description: 'The complete experience for your entire celebration.',
    hours_coverage: 12,
    deliverables: [
      '12 hours of coverage',
      '2 photographers',
      '600+ edited high-resolution images',
      'Online gallery',
      'Print release',
      'Engagement session',
      'Wedding timeline planning',
      'Premium wedding album',
      'Second-day/rehearsal coverage',
    ],
    starting_price: 4800,
    featured: false,
    order_position: 3,
  },
];
