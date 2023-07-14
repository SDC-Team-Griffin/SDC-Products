-- Create the products table
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(255),
  default_price DECIMAL(10, 2)
);

-- Create the features table
CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products (product_id),
  feature VARCHAR(255),
  value VARCHAR(255)
);

-- Create the styles table
CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products (product_id),
  name VARCHAR(255),
  sale_price VARCHAR (15),
  original_price VARCHAR(15),
  default_style BOOLEAN
);

-- Create the photos table
CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES styles (style_id),
  url VARCHAR(65000),
  thumbnail_url VARCHAR(65000)
);

-- Create the skus table
CREATE TABLE skus (
  sku_id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES styles (style_id),
  size VARCHAR(10),
  quantity INTEGER
);

-- Create the related_products table
CREATE TABLE related_products (
  index_id SERIAL PRIMARY KEY,
  current_product_id INTEGER REFERENCES products (product_id),
  related_product_id INTEGER REFERENCES products (product_id)
);


