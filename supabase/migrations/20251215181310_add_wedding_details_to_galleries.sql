/*
  # Add Wedding Story Details to Galleries

  1. Changes to `galleries` table
    - Add `couple_names` (text) - Names of the couple (e.g., "Ava & William")
    - Add `venue_name` (text) - Name of the wedding venue
    - Add `wedding_date` (date) - Date of the wedding
    - Add `description` (text) - Elegant description of the wedding celebration
    - Add `hashtags` (text) - Comma-separated hashtags for the wedding
    - Modify `category` to support new values: Formal Elegance, Casual Joy, Outdoor Magic, Intimate Gatherings

  2. Notes
    - Preserves existing data
    - All new fields are optional to maintain backward compatibility
    - Category check constraint updated to include new elegant category names
*/

-- Add new columns to galleries table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'galleries' AND column_name = 'couple_names'
  ) THEN
    ALTER TABLE galleries ADD COLUMN couple_names text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'galleries' AND column_name = 'venue_name'
  ) THEN
    ALTER TABLE galleries ADD COLUMN venue_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'galleries' AND column_name = 'wedding_date'
  ) THEN
    ALTER TABLE galleries ADD COLUMN wedding_date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'galleries' AND column_name = 'description'
  ) THEN
    ALTER TABLE galleries ADD COLUMN description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'galleries' AND column_name = 'hashtags'
  ) THEN
    ALTER TABLE galleries ADD COLUMN hashtags text;
  END IF;
END $$;

-- Drop old category constraint if it exists
ALTER TABLE galleries DROP CONSTRAINT IF EXISTS galleries_category_check;

-- Add new category constraint with updated values
ALTER TABLE galleries ADD CONSTRAINT galleries_category_check 
  CHECK (category IN ('Ceremonies', 'Couples', 'Details', 'Celebrations', 'Formal Elegance', 'Casual Joy', 'Outdoor Magic', 'Intimate Gatherings'));

-- Insert sample wedding stories
INSERT INTO galleries (title, category, image_url, couple_names, venue_name, wedding_date, description, hashtags, order_position)
VALUES
  (
    'A Grand Celebration of Love',
    'Formal Elegance',
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Ava & William',
    'Luxury Hotel Ballroom',
    '2024-11-18',
    'A grand celebration of love where elegance met exuberance, sophisticated details complemented joyful moments, and every photograph tells a story of timeless romance.',
    '#GrandEntrance, #LiveBand, #ElegantDecor',
    1
  ),
  (
    'A Timeless Celebration',
    'Formal Elegance',
    'https://images.pexels.com/photos/1309587/pexels-photo-1309587.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Emma & James',
    'The Grand Ballroom',
    '2024-06-15',
    'A timeless celebration filled with elegant details, joyful dancing, and heartfelt toasts under crystal chandeliers that sparkled as brightly as their love.',
    '#FirstDance, #CakeCutting, #FamilyToasts',
    2
  ),
  (
    'An Enchanting Outdoor Celebration',
    'Outdoor Magic',
    'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Sophia & Michael',
    'Sunset Garden Estate',
    '2024-08-22',
    'An enchanting outdoor celebration where nature became the perfect backdrop for laughter, dancing, and unforgettable memories under the golden hour glow.',
    '#GoldenHour, #GardenDancing, #StringLights',
    3
  ),
  (
    'A Relaxed and Joyful Celebration',
    'Casual Joy',
    'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Olivia & Daniel',
    'Rustic Barn Venue',
    '2024-09-10',
    'A relaxed and joyful celebration where authentic moments and genuine laughter filled the rustic space, capturing the true essence of their love story.',
    '#BarnDancing, #FamilyFun, #CountryCharm',
    4
  ),
  (
    'An Intimate Garden Gathering',
    'Intimate Gatherings',
    'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Isabella & Alexander',
    'Private Garden Villa',
    '2024-05-20',
    'An intimate garden gathering where close friends and family witnessed their vows, surrounded by blooming flowers and the warmth of genuine connection.',
    '#GardenWedding, #IntimateVows, #BloomingSeason',
    5
  ),
  (
    'A Beachside Romance',
    'Outdoor Magic',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Charlotte & Benjamin',
    'Coastal Beach Resort',
    '2024-07-30',
    'A beachside romance where ocean breezes carried their promises, sandy toes danced at sunset, and every moment was kissed by the golden coastal light.',
    '#BeachWedding, #SunsetVows, #OceanBreeze',
    6
  )
ON CONFLICT (id) DO NOTHING;