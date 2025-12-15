/*
  # Wedding Photography Website Schema

  1. New Tables
    - `galleries`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `title` (text) - Image title or description
      - `category` (text) - Category: Ceremonies, Couples, Details, or Celebrations
      - `image_url` (text) - URL to the image
      - `order_position` (integer) - For custom ordering of images
      - `created_at` (timestamptz) - When the image was added
    
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier
      - `couple_names` (text) - Names of the couple
      - `quote` (text) - Their testimonial quote
      - `wedding_date` (date) - Date of their wedding
      - `featured` (boolean) - Whether to show on homepage
      - `created_at` (timestamptz) - When added
    
    - `packages`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Package name (e.g., "The Classic Collection")
      - `description` (text) - Package description
      - `hours_coverage` (integer) - Hours of coverage included
      - `deliverables` (text) - What's included (stored as JSON text)
      - `starting_price` (integer) - Starting price in dollars
      - `order_position` (integer) - Display order
      - `featured` (boolean) - Highlight package
      - `created_at` (timestamptz) - When created
    
    - `contact_inquiries`
      - `id` (uuid, primary key) - Unique identifier
      - `bride_name` (text) - Bride's name
      - `groom_name` (text) - Groom's name
      - `email` (text) - Contact email
      - `phone` (text, optional) - Phone number
      - `wedding_date` (date) - Planned wedding date
      - `venue_location` (text) - Wedding venue/location
      - `message` (text) - Personal message
      - `created_at` (timestamptz) - When inquiry was submitted
      - `status` (text) - Status: new, contacted, booked

  2. Security
    - Enable RLS on all tables
    - Public can read galleries, testimonials, and packages
    - Public can insert contact inquiries
    - Only authenticated users can manage content
*/

-- Create galleries table
CREATE TABLE IF NOT EXISTS galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('Ceremonies', 'Couples', 'Details', 'Celebrations')),
  image_url text NOT NULL,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_names text NOT NULL,
  quote text NOT NULL,
  wedding_date date,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  hours_coverage integer NOT NULL,
  deliverables text NOT NULL,
  starting_price integer NOT NULL,
  order_position integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_name text NOT NULL,
  groom_name text NOT NULL,
  email text NOT NULL,
  phone text,
  wedding_date date NOT NULL,
  venue_location text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Galleries policies
CREATE POLICY "Anyone can view galleries"
  ON galleries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert galleries"
  ON galleries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update galleries"
  ON galleries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete galleries"
  ON galleries FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials policies
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- Packages policies
CREATE POLICY "Anyone can view packages"
  ON packages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert packages"
  ON packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update packages"
  ON packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete packages"
  ON packages FOR DELETE
  TO authenticated
  USING (true);

-- Contact inquiries policies
CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact inquiries"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact inquiries"
  ON contact_inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);