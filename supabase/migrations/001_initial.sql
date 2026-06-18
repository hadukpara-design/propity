-- Create plots table
CREATE TABLE IF NOT EXISTS plots (
  id SERIAL PRIMARY KEY,
  plot_number INTEGER UNIQUE NOT NULL,
  ganda_size DECIMAL(5,2) NOT NULL,
  area_sqft INTEGER,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'reserved')),
  price_lakhs DECIMAL(5,2) DEFAULT 30.00,
  facing TEXT CHECK (facing IN ('north', 'south', 'east', 'west', 'corner')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER REFERENCES plots(id),
  plot_number INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_city TEXT,
  message TEXT,
  booking_amount DECIMAL DEFAULT 100000,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  booked_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plots
CREATE POLICY "Public can read plots" ON plots FOR SELECT USING (true);
CREATE POLICY "Authenticated can update plots" ON plots FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for bookings
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read limited bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Authenticated can read all bookings" ON bookings FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for enquiries
CREATE POLICY "Public can insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read enquiries" ON enquiries FOR SELECT USING (auth.role() = 'authenticated');

-- Seed all 63 plots
INSERT INTO plots (plot_number, ganda_size, area_sqft) VALUES
(1, 5.00, 4320), (2, 5.00, 4320), (3, 5.00, 4320), (4, 5.00, 4320),
(5, 5.00, 4320), (6, 5.00, 4320), (7, 5.00, 4320), (8, 5.00, 4320),
(9, 5.00, 4320), (10, 5.00, 4320), (11, 5.00, 4320), (12, 5.00, 4320),
(13, 5.00, 4320), (14, 5.00, 4320), (15, 5.00, 4320), (16, 5.00, 4320),
(17, 5.00, 4320),
(18, 3.80, 3283), (19, 3.80, 3283),
(20, 5.00, 4320), (21, 5.00, 4320), (22, 5.00, 4320), (23, 5.00, 4320),
(24, 6.44, 5564),
(25, 5.00, 4320), (26, 5.00, 4320), (27, 5.00, 4320), (28, 5.00, 4320),
(29, 5.00, 4320), (30, 5.00, 4320),
(31, 2.77, 2393),
(32, 4.71, 4069),
(33, 7.10, 6134),
(34, 5.00, 4320), (35, 5.00, 4320), (36, 5.00, 4320), (37, 5.00, 4320),
(38, 5.00, 4320), (39, 5.00, 4320), (40, 5.00, 4320), (41, 5.00, 4320),
(42, 5.00, 4320), (43, 5.00, 4320),
(44, 4.25, 3672),
(45, 4.00, 3456),
(46, 5.00, 4320), (47, 5.00, 4320), (48, 5.00, 4320),
(49, 3.40, 2938),
(50, 6.30, 5443),
(51, 7.11, 6143),
(52, 11.00, 9504),
(53, 6.27, 5417),
(54, 5.00, 4320),
(55, 4.00, 3456),
(56, 5.00, 4320), (57, 5.00, 4320),
(58, 3.70, 3197),
(59, 4.10, 3542),
(60, 20.00, 17280),  -- corner/premium
(61, 5.00, 4320),
(62, 3.20, 2765),
(63, 3.25, 2808)
ON CONFLICT (plot_number) DO NOTHING;

-- Mark Plot 60 as corner/premium
UPDATE plots SET facing = 'corner', notes = 'Corner premium plot — 20 Ganda', price_lakhs = 35.00 WHERE plot_number = 60;
