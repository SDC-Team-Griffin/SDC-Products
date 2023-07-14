COPY products FROM '$productsCSVFilePath' DELIMITER ',' CSV HEADER;
COPY features FROM '$featuresCSVFilePath' DELIMITER ',' CSV HEADER;
COPY styles FROM '$stylesCSVFilePath' DELIMITER ',' CSV HEADER;
COPY photos FROM '$photosCSVFilePath' DELIMITER ',' CSV HEADER;
COPY skus FROM '$skusCSVFilePath' DELIMITER ',' CSV HEADER;

--Do not copy data where related product is 0, there is no product with id = 0
COPY related_products FROM '$relatedCSVFilePath' DELIMITER ',' CSV HEADER WHERE related_product_id != '0';

-- Remove trailing and ending whitespace from long URLs
UPDATE photos SET url = TRIM(SUBSTRING(url FROM 1 FOR 500));



-- -- Needs absolute path to CSV files
-- COPY products FROM '/Users/darienpoon/HackReactor/rfp2305/SDC-PROJECT/SDC-Products/CSV-data/product.csv' DELIMITER ',' CSV HEADER;
-- COPY features FROM '/Users/darienpoon/HackReactor/rfp2305/SDC-PROJECT/SDC-Products/CSV-data/features.csv' DELIMITER ',' CSV HEADER;
-- COPY styles FROM '/Users/darienpoon/HackReactor/rfp2305/SDC-PROJECT/SDC-Products/CSV-data/styles.csv' DELIMITER ',' CSV HEADER;
-- COPY photos FROM '/Users/darienpoon/HackReactor/rfp2305/SDC-PROJECT/SDC-Products/CSV-data/photos.csv' DELIMITER ',' CSV HEADER;
-- COPY skus FROM '/Users/darienpoon/HackReactor/rfp2305/SDC-PROJECT/SDC-Products/CSV-data/skus.csv' DELIMITER ',' CSV HEADER;

-- --Do not copy data where related product is 0, there is no product with id = 0
-- COPY related_products FROM '/Users/darienpoon/HackReactor/rfp2305/SDC-PROJECT/SDC-Products/CSV-data/related.csv' DELIMITER ',' CSV HEADER WHERE related_product_id != '0';

-- -- Remove trailing and ending whitespace from long URLs
-- UPDATE photos SET url = TRIM(SUBSTRING(url FROM 1 FOR 500));
