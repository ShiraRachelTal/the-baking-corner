-- ==========================================
-- 0. Reset Tables (Clean Slate)
-- ==========================================
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- 1. Insert Products (30 Items Total)
-- ==========================================
INSERT INTO products (name, description, price, category, stock, image_url) VALUES 

-- Ingredients
('White Wheat Flour', 'All-purpose wheat flour for baking, 1 kg', 8.50, 'ingredients', 50, '/images/flour.jpg'),
('Premium Vanilla Extract', 'Pure Madagascar vanilla extract, 50 ml', 42.00, 'ingredients', 20, '/images/vanilla.jpg'),
('Dark Chocolate 70%', 'Belgian dark chocolate coins for baking, 1 kg', 65.00, 'ingredients', 30, '/images/chocolate-dark.jpg'),
('Milk Chocolate 34%', 'High-quality milk chocolate coins for melting, 1 kg', 62.00, 'ingredients', 25, '/images/chocolate-milk.jpg'),
('White Chocolate 30%', 'Rich white chocolate coins for baking and coating, 1 kg', 68.00, 'ingredients', 20, '/images/chocolate-white.jpg'),
('Active Dry Yeast', 'Vacuum-packed dry yeast for yeast doughs, 500g', 15.00, 'ingredients', 40, '/images/yeast.jpg'),
('Red Gel Food Coloring', 'Concentrated gel food coloring for creams and fondant', 18.00, 'ingredients', 25, '/images/color-red.jpg'),
('Blue Gel Food Coloring', 'Concentrated gel food coloring for creams and fondant', 18.00, 'ingredients', 22, '/images/color-blue.jpg'),
('100% Pistachio Paste', 'Pure pistachio paste with no added sugar, 200g', 55.00, 'ingredients', 15, '/images/pistachio-paste.jpg'),
('Powdered Sugar', 'Finely ground powdered sugar for icing and whipping, 1 kg', 9.00, 'ingredients', 60, '/images/powdered-sugar.jpg'),
('Dutch Cocoa Powder', 'High-fat premium cocoa powder 22-24%, 500g', 24.00, 'ingredients', 35, '/images/cocoa.jpg'),
('Rainbow Sprinkles', 'Decorative sprinkle pack for cakes and desserts, 250g', 14.00, 'ingredients', 45, '/images/sprinkles.jpg'),
('Baking Powder', 'Pack of 10 baking powder sachets (100g total)', 6.00, 'ingredients', 80, '/images/baking-powder.jpg'),
('Baking Soda', 'Baking soda powder for baking, 250g', 5.00, 'ingredients', 70, '/images/baking-soda.jpg'),
('Fish Gelatin Powder', 'Kosher gelatin powder for stabilizing mousses and desserts, 100g', 16.00, 'ingredients', 30, '/images/gelatin.jpg'),

-- Equipment
('Springform Pan 24cm', 'Round non-stick detachable baking pan', 55.00, 'equipment', 15, '/images/pan-24.jpg'),
('Springform Pan 26cm', 'Round non-stick detachable baking pan', 60.00, 'equipment', 12, '/images/pan-26.jpg'),
('Reusable Loaf Pan', 'High-quality metal pan for loaf cakes', 32.00, 'equipment', 25, '/images/english-pan.jpg'),
('Muffin Silicone Pan', '12-cavity silicone pan for muffins and cupcakes', 45.00, 'equipment', 18, '/images/muffin-pan.jpg'),
('Large Silicone Spatula', 'Heat-resistant silicone spatula up to 250°C', 22.00, 'equipment', 40, '/images/spatula.jpg'),
('Digital Kitchen Scale', 'Precision digital scale accurate to 1g', 89.00, 'equipment', 10, '/images/scale.jpg'),
('Professional Whisk', 'Sturdy stainless steel whisk for whipping', 35.00, 'equipment', 25, '/images/whisk.jpg'),
('Disposable Piping Bags', 'Pack of 100 thick, heavy-duty piping bags (40cm)', 30.00, 'equipment', 50, '/images/piping-bags.jpg'),
('Piping Nozzles Set', 'Set of 12 stainless steel nozzles in various shapes', 48.00, 'equipment', 20, '/images/nozzles-set.jpg'),
('Adjustable Rolling Pin', 'Wooden rolling pin with silicone rings for dough thickness control', 65.00, 'equipment', 14, '/images/rolling-pin.jpg'),
('Dough Scraper', 'Stainless steel scraper for cutting and cleaning work surfaces', 18.00, 'equipment', 30, '/images/dough-scraper.jpg'),
('Silicone Baking Mat', 'Reusable oven silicone baking mat (Silpat) 30x40 cm', 42.00, 'equipment', 22, '/images/silicone-mat.jpg'),
('Rotating Cake Turntable', 'Stainless steel rotating stand for cake decorating', 110.00, 'equipment', 8, '/images/cake-turntable.jpg'),
('Digital Food Thermometer', 'Digital probe thermometer for precise sugar and chocolate work', 55.00, 'equipment', 15, '/images/thermometer.jpg'),
('Cake Cooling Rack', 'Rectangular stainless steel wire rack for cooling baked goods', 38.00, 'equipment', 18, '/images/cooling-rack.jpg');

-- ==========================================
-- 2. Insert Admins & Customers
-- ==========================================
INSERT INTO users (first_name, last_name, email, password, role) VALUES
-- Admins
('Shira Rachel', 'Tal', 'shira@thebakingcorner.com', 'admin123', 'admin'),
('Zohar', 'Timsut', 'Zohar@thebakingcorner.com', 'admin123', 'admin'),

-- Customers
('Israel', 'Israeli', 'israel@gmail.com', 'cust123', 'customer'),
('Noa', 'Cohen', 'noa.cohen@gmail.com', 'cust123', 'customer'),
('Daniel', 'Levi', 'daniel.levi@gmail.com', 'cust123', 'customer'),
('Maya', 'Mizrachi', 'maya.m@gmail.com', 'cust123', 'customer'),
('Ori', 'Peretz', 'ori.p@gmail.com', 'cust123', 'customer'),
('Tamar', 'Biton', 'tamar.b@gmail.com', 'cust123', 'customer'),
('Yossi', 'Avraham', 'yossi.a@gmail.com', 'cust123', 'customer'),
('Shira', 'Haddad', 'shira.h@gmail.com', 'cust123', 'customer'),
('Omer', 'Dahan', 'omer.d@gmail.com', 'cust123', 'customer'),
('Adi', 'Malka', 'adi.m@gmail.com', 'cust123', 'customer'),
('Roei', 'Azoulay', 'roei.a@gmail.com', 'cust123', 'customer'),
('Michal', 'Gabay', 'michal.g@gmail.com', 'cust123', 'customer'),
('Itai', 'Yosef', 'itai.y@gmail.com', 'cust123', 'customer'),
('Yael', 'Katz', 'yael.k@gmail.com', 'cust123', 'customer'),
('Ido', 'Amar', 'ido.a@gmail.com', 'cust123', 'customer'),
('Anat', 'Shalom', 'anat.s@gmail.com', 'cust123', 'customer'),
('Guy', 'Dagan', 'guy.d@gmail.com', 'cust123', 'customer'),
('Neta', 'Alon', 'neta.a@gmail.com', 'cust123', 'customer'),
('Matan', 'Golan', 'matan.g@gmail.com', 'cust123', 'customer'),
('Roni', 'Shachar', 'roni.s@gmail.com', 'cust123', 'customer'),
('Oren', 'Lavi', 'oren.l@gmail.com', 'cust123', 'customer'),
('Hadar', 'Mor', 'hadar.m@gmail.com', 'cust123', 'customer'),
('Alon', 'Barak', 'alon.b@gmail.com', 'cust123', 'customer'),
('Tal', 'Goren', 'tal.g@gmail.com', 'cust123', 'customer'),
('Shahar', 'Peled', 'shahar.p@gmail.com', 'cust123', 'customer'),
('Zohar', 'Or', 'zohar.o@gmail.com', 'cust123', 'customer'),
('Lior', 'Tal', 'lior.t@gmail.com', 'cust123', 'customer'),
('Meital', 'Schwartz', 'meital.s@gmail.com', 'cust123', 'customer'),
('Aviv', 'Rosen', 'aviv.r@gmail.com', 'cust123', 'customer'),
('Noam', 'Golden', 'noam.g@gmail.com', 'cust123', 'customer');

-- ==========================================
-- 3. Insert Sample Orders
-- ==========================================
INSERT INTO orders (user_id, total_amount, status) VALUES 
(4, 114.50, 'delivered'),
(5, 89.00, 'pending'),
(6, 142.00, 'shipped'),
(7, 42.00, 'delivered'),
(8, 175.00, 'pending'),
(9, 65.00, 'cancelled'),
(10, 210.00, 'delivered'),
(11, 55.00, 'pending');

-- ==========================================
-- 4. Insert Order Items
-- ==========================================
-- Order 1 (User 4)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(1, 1, 2, 8.50),   -- 2 x White Wheat Flour
(1, 2, 1, 42.00),  -- 1 x Vanilla Extract
(1, 16, 1, 55.00); -- 1 x Springform Pan 24cm

-- Order 2 (User 5)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(2, 21, 1, 89.00); -- 1 x Digital Kitchen Scale

-- Order 3 (User 6)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(3, 3, 2, 65.00),  -- 2 x Dark Chocolate 70%
(3, 13, 2, 6.00);   -- 2 x Baking Powder

-- Order 4 (User 7)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(4, 27, 1, 42.00); -- 1 x Silicone Baking Mat

-- Order 5 (User 8)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(5, 28, 1, 110.00), -- 1 x Rotating Cake Turntable
(5, 25, 1, 65.00);  -- 1 x Adjustable Rolling Pin

-- Order 6 (User 9)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(6, 29, 1, 55.00);  -- 1 x Sugar & Chocolate Thermometer

-- Order 7 (User 10)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(7, 9, 2, 55.00),   -- 2 x Pistachio Paste
(7, 24, 1, 48.00),  -- 1 x Piping Nozzles Set
(7, 23, 1, 30.00),  -- 1 x Disposable Piping Bags
(7, 20, 1, 22.00);  -- 1 x Silicone Spatula

-- Order 8 (User 11)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
(8, 19, 1, 45.00),  -- 1 x Muffin Silicone Pan
(8, 10, 1, 10.00);  -- 1 x Powdered Sugar