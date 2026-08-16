import wedding01 from '../assets/gallery/wedding/01.jpg';
import wedding02 from '../assets/gallery/wedding/02.jpg';
import wedding03 from '../assets/gallery/wedding/03.jpg';
import wedding04 from '../assets/gallery/wedding/04.jpg';
import wedding05 from '../assets/gallery/wedding/05.jpg';
import wedding06 from '../assets/gallery/wedding/06.jpg';
import wedding07 from '../assets/gallery/wedding/07.jpg';
import wedding08 from '../assets/gallery/wedding/08.jpg';
import wedding09 from '../assets/gallery/wedding/09.jpg';
import wedding10 from '../assets/gallery/wedding/10.jpg';

import engagement01 from '../assets/gallery/engagement/01.jpg';
import engagement02 from '../assets/gallery/engagement/02.jpg';
import engagement03 from '../assets/gallery/engagement/03.jpg';
import engagement04 from '../assets/gallery/engagement/04.jpg';

import mehndhi01 from '../assets/gallery/mehndhi/01.jpg';
import mehndhi02 from '../assets/gallery/mehndhi/02.jpg';
import mehndhi03 from '../assets/gallery/mehndhi/03.jpg';
import mehndhi04 from '../assets/gallery/mehndhi/04.jpg';
import mehndhi05 from '../assets/gallery/mehndhi/05.jpg';
import mehndhi06 from '../assets/gallery/mehndhi/06.jpg';
import mehndhi07 from '../assets/gallery/mehndhi/07.jpg';
import mehndhi08 from '../assets/gallery/mehndhi/08.jpg';
import mehndhi09 from '../assets/gallery/mehndhi/09.jpg';
import mehndhi10 from '../assets/gallery/mehndhi/10.jpg';

import babyshoot01 from '../assets/gallery/babyshoot/01.jpg';
import babyshoot02 from '../assets/gallery/babyshoot/02.jpg';
import babyshoot03 from '../assets/gallery/babyshoot/03.jpg';
import babyshoot04 from '../assets/gallery/babyshoot/04.jpg';
import babyshoot05 from '../assets/gallery/babyshoot/05.jpg';
import babyshoot06 from '../assets/gallery/babyshoot/06.jpg';
import babyshoot07 from '../assets/gallery/babyshoot/07.jpg';
import babyshoot08 from '../assets/gallery/babyshoot/08.jpg';
import babyshoot09 from '../assets/gallery/babyshoot/09.jpg';
import babyshoot10 from '../assets/gallery/babyshoot/10.jpg';

import familyShoot01 from '../assets/gallery/family-shoot/01.jpg';
import familyShoot02 from '../assets/gallery/family-shoot/02.jpg';
import familyShoot03 from '../assets/gallery/family-shoot/03.jpg';
import familyShoot04 from '../assets/gallery/family-shoot/04.jpg';
import familyShoot05 from '../assets/gallery/family-shoot/05.jpg';
import familyShoot06 from '../assets/gallery/family-shoot/06.jpg';
import familyShoot07 from '../assets/gallery/family-shoot/07.jpg';
import familyShoot08 from '../assets/gallery/family-shoot/08.jpg';

import modeling01 from '../assets/gallery/modeling/01.jpg';
import modeling02 from '../assets/gallery/modeling/02.jpg';
import modeling03 from '../assets/gallery/modeling/03.jpg';
import modeling04 from '../assets/gallery/modeling/04.jpg';

import maternity01 from '../assets/gallery/maternity/01.jpg';
import maternity02 from '../assets/gallery/maternity/02.jpg';
import maternity03 from '../assets/gallery/maternity/03.jpg';
import maternity04 from '../assets/gallery/maternity/04.jpg';

import preWedding01 from '../assets/gallery/pre-wedding/01.jpg';
import preWedding02 from '../assets/gallery/pre-wedding/02.jpg';
import preWedding03 from '../assets/gallery/pre-wedding/03.jpg';
import preWedding04 from '../assets/gallery/pre-wedding/04.jpg';
import preWedding05 from '../assets/gallery/pre-wedding/05.jpg';
import preWedding06 from '../assets/gallery/pre-wedding/06.jpg';
import preWedding07 from '../assets/gallery/pre-wedding/07.jpg';
import preWedding08 from '../assets/gallery/pre-wedding/08.jpg';
import preWedding09 from '../assets/gallery/pre-wedding/09.jpg';
import preWedding10 from '../assets/gallery/pre-wedding/10.jpg';

export interface Gallery {
  id: string;
  title: string;
  image_url: string;
  category: string;
  couple_names?: string;
  venue_name?: string;
  wedding_date?: string;
  description?: string;
  hashtags?: string;
  order_position: number;
}

/**
 * Add more photos here anytime:
 * 1. Drop the image file into src/assets/gallery/<category-folder>/
 * 2. Import it at the top of this file
 * 3. Add an entry below using the imported variable as `image_url`
 */
export const galleries: Gallery[] = [
  // Wedding
  { id: 'wedding-1', title: 'Wedding Moments', category: 'Wedding', image_url: wedding01, order_position: 1 },
  { id: 'wedding-2', title: 'Wedding Moments', category: 'Wedding', image_url: wedding02, order_position: 2 },
  { id: 'wedding-3', title: 'Wedding Moments', category: 'Wedding', image_url: wedding03, order_position: 3 },
  { id: 'wedding-4', title: 'Wedding Moments', category: 'Wedding', image_url: wedding04, order_position: 4 },
  { id: 'wedding-5', title: 'Wedding Moments', category: 'Wedding', image_url: wedding05, order_position: 5 },
  { id: 'wedding-6', title: 'Wedding Moments', category: 'Wedding', image_url: wedding06, order_position: 6 },
  { id: 'wedding-7', title: 'Wedding Moments', category: 'Wedding', image_url: wedding07, order_position: 7 },
  { id: 'wedding-8', title: 'Wedding Moments', category: 'Wedding', image_url: wedding08, order_position: 8 },
  { id: 'wedding-9', title: 'Wedding Moments', category: 'Wedding', image_url: wedding09, order_position: 9 },
  { id: 'wedding-10', title: 'Wedding Moments', category: 'Wedding', image_url: wedding10, order_position: 10 },

  // Engagement
  { id: 'engagement-1', title: 'Engagement Story', category: 'Engagement', image_url: engagement01, order_position: 11 },
  { id: 'engagement-2', title: 'Engagement Story', category: 'Engagement', image_url: engagement02, order_position: 12 },
  { id: 'engagement-3', title: 'Engagement Story', category: 'Engagement', image_url: engagement03, order_position: 13 },
  { id: 'engagement-4', title: 'Engagement Story', category: 'Engagement', image_url: engagement04, order_position: 14 },

  // Mehndhi
  { id: 'mehndhi-1', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi01, order_position: 15 },
  { id: 'mehndhi-2', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi02, order_position: 16 },
  { id: 'mehndhi-3', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi03, order_position: 17 },
  { id: 'mehndhi-4', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi04, order_position: 18 },
  { id: 'mehndhi-5', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi05, order_position: 19 },
  { id: 'mehndhi-6', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi06, order_position: 20 },
  { id: 'mehndhi-7', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi07, order_position: 21 },
  { id: 'mehndhi-8', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi08, order_position: 22 },
  { id: 'mehndhi-9', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi09, order_position: 23 },
  { id: 'mehndhi-10', title: 'Mehndhi Celebration', category: 'Mehndhi', image_url: mehndhi10, order_position: 24 },

  // Babyshoot
  { id: 'babyshoot-1', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot01, order_position: 25 },
  { id: 'babyshoot-2', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot02, order_position: 26 },
  { id: 'babyshoot-3', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot03, order_position: 27 },
  { id: 'babyshoot-4', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot04, order_position: 28 },
  { id: 'babyshoot-5', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot05, order_position: 29 },
  { id: 'babyshoot-6', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot06, order_position: 30 },
  { id: 'babyshoot-7', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot07, order_position: 31 },
  { id: 'babyshoot-8', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot08, order_position: 32 },
  { id: 'babyshoot-9', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot09, order_position: 33 },
  { id: 'babyshoot-10', title: 'Little Moments', category: 'Babyshoot', image_url: babyshoot10, order_position: 34 },

  // Family Shoot
  { id: 'family-1', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot01, order_position: 35 },
  { id: 'family-2', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot02, order_position: 36 },
  { id: 'family-3', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot03, order_position: 37 },
  { id: 'family-4', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot04, order_position: 38 },
  { id: 'family-5', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot05, order_position: 39 },
  { id: 'family-6', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot06, order_position: 40 },
  { id: 'family-7', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot07, order_position: 41 },
  { id: 'family-8', title: 'Family Togetherness', category: 'Family Shoot', image_url: familyShoot08, order_position: 42 },

  // Modeling
  { id: 'modeling-1', title: 'Portrait & Modeling', category: 'Modeling', image_url: modeling01, order_position: 43 },
  { id: 'modeling-2', title: 'Portrait & Modeling', category: 'Modeling', image_url: modeling02, order_position: 44 },
  { id: 'modeling-3', title: 'Portrait & Modeling', category: 'Modeling', image_url: modeling03, order_position: 45 },
  { id: 'modeling-4', title: 'Portrait & Modeling', category: 'Modeling', image_url: modeling04, order_position: 46 },

  // Maternity
  { id: 'maternity-1', title: 'Maternity Glow', category: 'Maternity', image_url: maternity01, order_position: 47 },
  { id: 'maternity-2', title: 'Maternity Glow', category: 'Maternity', image_url: maternity02, order_position: 48 },
  { id: 'maternity-3', title: 'Maternity Glow', category: 'Maternity', image_url: maternity03, order_position: 49 },
  { id: 'maternity-4', title: 'Maternity Glow', category: 'Maternity', image_url: maternity04, order_position: 50 },

  // Pre-Wedding
  { id: 'prewedding-1', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding01, order_position: 51 },
  { id: 'prewedding-2', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding02, order_position: 52 },
  { id: 'prewedding-3', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding03, order_position: 53 },
  { id: 'prewedding-4', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding04, order_position: 54 },
  { id: 'prewedding-5', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding05, order_position: 55 },
  { id: 'prewedding-6', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding06, order_position: 56 },
  { id: 'prewedding-7', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding07, order_position: 57 },
  { id: 'prewedding-8', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding08, order_position: 58 },
  { id: 'prewedding-9', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding09, order_position: 59 },
  { id: 'prewedding-10', title: 'Pre-Wedding Story', category: 'Pre-Wedding', image_url: preWedding10, order_position: 60 },
];
