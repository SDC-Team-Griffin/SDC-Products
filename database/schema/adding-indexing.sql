-- Manually load the following sql commands into database from this schema from main sdc-products directory
-- psql -U darienpoon -d sdc_products -f /database/adding-indexing.sql;


-- Index for products table
CREATE INDEX product_id_index ON products (product_id);

-- Index for features table
CREATE INDEX feature_product_id_index ON features (product_id);

-- Index for styles table
CREATE INDEX style_product_id_index ON styles (product_id, style_id);

-- Composite index for photos table
CREATE INDEX photos_style_id_url_index ON photos (style_id);

-- Composite index for skus table
CREATE INDEX skus_style_id_sku_id_index ON skus (style_id);

-- Index for related_products table
CREATE INDEX related_current_product_id_index ON related_products (current_product_id, related_product_id);