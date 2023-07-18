const db = require('../database/db.js');

module.exports = {

  loadDefaultProduct: () => {
    // console.log('got into get default product');
    return db.query('SELECT * FROM products ORDER BY product_id LIMIT 1;')
  },

  loadProducts: (limit, offset) => {
    // console.log('got into get products');
    return db.query(`SELECT * FROM products LIMIT ${limit} OFFSET ${offset};`);
  },

  loadSpecificProduct: (product_id) => {
    // console.log('got into get specific product');
    // return db.query(`
    //   SELECT
    //   p.*,
    //   json_agg(json_build_object(
    //     'feature_id', f.feature_id,
    //     'feature', f.feature,
    //     'value', f.value
    //   ) ORDER BY f.feature_id) AS features
    //   FROM products p
    //   JOIN features f ON p.product_id = f.product_id
    //   WHERE p.product_id = ${product_id}
    //   GROUP BY p.product_id
    // `)

    return db.query(`
    SELECT
    p.product_id AS id,
    p.name,
    p.slogan,
    p.description,
    p.category,
    p.default_price,
    json_agg(json_build_object(
      'feature', f.feature,
      'value', f.value
    ) ORDER BY f.feature_id) AS features
    FROM products p
    JOIN features f ON p.product_id = f.product_id
    WHERE p.product_id = ${product_id}
    GROUP BY p.product_id, p.name, p.slogan, p.description, p.category, p.default_price
  `)



  },

  loadProductStyles: (product_id) => {
    // console.log('got into get product styles');
    // return db.query(`
    //   SELECT
    //   st.*,
    //   (
    //     SELECT json_agg(json_build_object(
    //       'photo_id', ph.photo_id,
    //       'url', ph.url,
    //       'thumbnail_url', ph.thumbnail_url
    //     ))
    //     FROM photos ph
    //     WHERE ph.style_id = st.style_id
    //   ) AS photos,
    //   (
    //     SELECT json_agg(json_build_object(
    //       'sku_id', sk.sku_id,
    //       'size', sk.size,
    //       'quantity', sk.quantity
    //     ))
    //     FROM skus sk
    //     WHERE sk.style_id = st.style_id
    //   ) AS skus
    //   FROM styles st
    //   WHERE st.product_id = ${product_id}
    // `);


    return db.query(`
    SELECT
      st.product_id,
      json_agg(
        json_build_object(
          'style_id', st.style_id,
          'name', st.name,
          'original_price', st.original_price,
          'sale_price', st.sale_price,
          'default?', st.default_style,
          'photos', (
            SELECT json_agg(
              json_build_object(
                'thumbnail_url', ph.thumbnail_url,
                'url', ph.url
              )
            )
            FROM photos ph
            WHERE ph.style_id = st.style_id
          ),
          'skus', (
            SELECT json_object_agg(
              sk.sku_id,
              json_build_object(
                'quantity', sk.quantity,
                'size', sk.size
              )
            )
            FROM skus sk
            WHERE sk.style_id = st.style_id
          )
        )
      ) AS results
    FROM styles st
    WHERE st.product_id = ${product_id}
    GROUP BY st.product_id
  `);

  },

  loadRelatedProducts: (product_id) => {
    // console.log('got into get related products');
    // return db.query(`SELECT * FROM related_products WHERE current_product_id = ${product_id}`)

    return db.query(`
    SELECT related_product_id
    FROM related_products
    WHERE current_product_id = ${product_id}
  `);


}
}