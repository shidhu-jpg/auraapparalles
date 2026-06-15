-- ============================================================
-- Aura Apparels — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  description   TEXT,
  price         NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  offer_price   NUMERIC(10,2)          CHECK (offer_price >= 0),
  offer_percentage INTEGER             CHECK (offer_percentage BETWEEN 0 AND 100),
  stock         INTEGER     DEFAULT 0  CHECK (stock >= 0),
  sizes         TEXT[]      DEFAULT '{}',
  category      VARCHAR(100),
  is_active     BOOLEAN     DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url  TEXT        NOT NULL,
  is_primary BOOLEAN     DEFAULT FALSE,
  sort_order INTEGER     DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on products
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Row Level Security
ALTER TABLE products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Public read (anyone can see active products)
CREATE POLICY "public_read_products"
  ON products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "public_read_product_images"
  ON product_images FOR SELECT
  USING (TRUE);

-- Authenticated admin write
CREATE POLICY "admin_all_products"
  ON products FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "admin_all_product_images"
  ON product_images FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- Storage bucket (run separately or create via dashboard)
-- ============================================================
-- Go to Supabase Dashboard > Storage > Create Bucket
-- Name: product-images
-- Public bucket: YES (toggle on)
-- Then add this storage policy:

-- INSERT policy for authenticated users:
-- CREATE POLICY "admin_upload_images"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'product-images');

-- SELECT policy for everyone:
-- CREATE POLICY "public_read_images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');

-- DELETE policy for authenticated users:
-- CREATE POLICY "admin_delete_images"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'product-images');
