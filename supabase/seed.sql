-- ============================================================
-- Aura Apparels — Demo Products
-- Run in Supabase Dashboard > SQL Editor AFTER schema.sql
-- ============================================================

INSERT INTO products (id, name, description, price, offer_price, offer_percentage, stock, sizes, category, is_active) VALUES

-- Women
('a1000000-0000-0000-0000-000000000001',
 'Floral Wrap Midi Dress',
 'A stunning floral wrap dress crafted from lightweight chiffon. The flattering V-neckline and adjustable tie waist create an effortlessly elegant silhouette. Perfect for brunches, garden parties, or date nights.',
 1299, 899, 31, 15, ARRAY['XS','S','M','L','XL'], 'Women', true),

('a1000000-0000-0000-0000-000000000002',
 'Classic White Linen Shirt',
 'The ultimate wardrobe essential. Relaxed-fit linen shirt in crisp white — breathable, wrinkle-friendly, and timelessly chic. Tuck it in for office, wear it open for weekends.',
 799, 599, 25, 20, ARRAY['S','M','L','XL','XXL'], 'Women', true),

('a1000000-0000-0000-0000-000000000003',
 'High-Waist Palazzo Pants',
 'Wide-leg palazzo pants in a rich mocha hue. The high waist design elongates your legs beautifully. Made from a flowy poly-crepe blend — comfortable all day and sophisticated all evening.',
 1099, NULL, NULL, 12, ARRAY['S','M','L','XL'], 'Women', true),

('a1000000-0000-0000-0000-000000000004',
 'Embroidered Kurta Set',
 'Hand-embroidered kurta with matching palazzo — a celebration of Indian craftsmanship. Features mirror work detailing on the neckline and sleeves. Available in a vibrant teal palette.',
 1899, 1399, 26, 8, ARRAY['S','M','L','XL','XXL'], 'Ethnic', true),

-- Men
('a1000000-0000-0000-0000-000000000005',
 'Premium Slim Fit Chinos',
 'Versatile slim-fit chinos in warm khaki. Crafted from a 98% cotton, 2% stretch blend for comfort without compromising on style. Works equally well at the office and on the weekend.',
 1499, 999, 33, 18, ARRAY['S','M','L','XL','XXL'], 'Men', true),

('a1000000-0000-0000-0000-000000000006',
 'Oxford Button-Down Shirt',
 'A true wardrobe staple. Classic Oxford cotton shirt with a button-down collar, chest pocket, and a clean straight hem. Wear it crisp for meetings or relaxed-open over a white tee.',
 1199, NULL, NULL, 25, ARRAY['S','M','L','XL','XXL','XXXL'], 'Men', true),

('a1000000-0000-0000-0000-000000000007',
 'Classic Washed Denim Jacket',
 'An iconic piece that never goes out of style. Medium-wash denim jacket with a slim contemporary cut, chest pockets, and adjustable button cuffs. Layer it over everything.',
 2499, 1799, 28, 8, ARRAY['S','M','L','XL','XXL'], 'Men', true),

('a1000000-0000-0000-0000-000000000008',
 'Mandarin Collar Linen Shirt',
 'Lightweight linen shirt with a sleek mandarin collar. A modern take on ethnic-casual dressing. Perfect for festive occasions or a polished everyday look.',
 999, 749, 25, 16, ARRAY['S','M','L','XL','XXL'], 'Men', true),

-- Kids
('a1000000-0000-0000-0000-000000000009',
 'Dinosaur Graphic Tee',
 'Kids go wild for this 100% super-soft cotton dinosaur tee! Pre-shrunk and colour-fast — it stays bright and cosy wash after wash. Let them roar in style.',
 399, 299, 25, 30, ARRAY['XS','S','M','L'], 'Kids', true),

('a1000000-0000-0000-0000-000000000010',
 'Rainbow Stripe Dungarees',
 'Cheerful rainbow-stripe dungarees with adjustable shoulder straps and roomy front pocket. Made from soft denim-cotton blend that moves with your little adventurer.',
 699, NULL, NULL, 10, ARRAY['XS','S','M','L'], 'Kids', true),

-- Accessories
('a1000000-0000-0000-0000-000000000011',
 'Handwoven Canvas Tote Bag',
 'Eco-friendly handwoven cotton canvas tote in natural off-white. Spacious enough for a day''s essentials, with reinforced handles and an inner zip pocket. Good for the planet, great for you.',
 599, 449, 25, 22, ARRAY['Free Size'], 'Accessories', true),

('a1000000-0000-0000-0000-000000000012',
 'Silk Scrunchie Set — 5 Pcs',
 'Five luxurious mulberry silk scrunchies in a curated pastel palette. Gentle on all hair types, minimises breakage and frizz. Doubles as a chic wrist accessory.',
 249, NULL, NULL, 40, ARRAY['Free Size'], 'Accessories', true);


-- ============================================================
-- Product images (using picsum for demo — replace with real
-- uploads once your Supabase storage bucket is set up)
-- ============================================================

INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
-- Floral Wrap Dress
('a1000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/aura-dress-1a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/aura-dress-1b/600/800', false, 1),
('a1000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/aura-dress-1c/600/800', false, 2),
-- White Linen Shirt (Women)
('a1000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/aura-shirt-2a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/aura-shirt-2b/600/800', false, 1),
-- Palazzo Pants
('a1000000-0000-0000-0000-000000000003', 'https://picsum.photos/seed/aura-palazzo-3a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000003', 'https://picsum.photos/seed/aura-palazzo-3b/600/800', false, 1),
-- Embroidered Kurta
('a1000000-0000-0000-0000-000000000004', 'https://picsum.photos/seed/aura-kurta-4a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000004', 'https://picsum.photos/seed/aura-kurta-4b/600/800', false, 1),
('a1000000-0000-0000-0000-000000000004', 'https://picsum.photos/seed/aura-kurta-4c/600/800', false, 2),
-- Slim Fit Chinos
('a1000000-0000-0000-0000-000000000005', 'https://picsum.photos/seed/aura-chinos-5a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000005', 'https://picsum.photos/seed/aura-chinos-5b/600/800', false, 1),
-- Oxford Shirt
('a1000000-0000-0000-0000-000000000006', 'https://picsum.photos/seed/aura-oxford-6a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000006', 'https://picsum.photos/seed/aura-oxford-6b/600/800', false, 1),
-- Denim Jacket
('a1000000-0000-0000-0000-000000000007', 'https://picsum.photos/seed/aura-denim-7a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000007', 'https://picsum.photos/seed/aura-denim-7b/600/800', false, 1),
('a1000000-0000-0000-0000-000000000007', 'https://picsum.photos/seed/aura-denim-7c/600/800', false, 2),
-- Mandarin Collar Shirt
('a1000000-0000-0000-0000-000000000008', 'https://picsum.photos/seed/aura-mandarin-8a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000008', 'https://picsum.photos/seed/aura-mandarin-8b/600/800', false, 1),
-- Dino Tee
('a1000000-0000-0000-0000-000000000009', 'https://picsum.photos/seed/aura-tee-9a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000009', 'https://picsum.photos/seed/aura-tee-9b/600/800', false, 1),
-- Rainbow Dungarees
('a1000000-0000-0000-0000-000000000010', 'https://picsum.photos/seed/aura-dung-10a/600/800', true, 0),
-- Tote Bag
('a1000000-0000-0000-0000-000000000011', 'https://picsum.photos/seed/aura-tote-11a/600/800', true,  0),
('a1000000-0000-0000-0000-000000000011', 'https://picsum.photos/seed/aura-tote-11b/600/800', false, 1),
-- Scrunchie Set
('a1000000-0000-0000-0000-000000000012', 'https://picsum.photos/seed/aura-scrunchie-12a/600/800', true, 0);
