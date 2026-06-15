-- ============================================================
-- Aura Apparels — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Products table



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
