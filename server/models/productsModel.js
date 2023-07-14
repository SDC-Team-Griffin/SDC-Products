const db = require('../database/db.js');

module.exports = {

  loadDefaultProduct: () => {
    console.log('got into get default product');
    return db.query('SELECT * FROM products ORDER BY product_id LIMIT 1;')
  },

  loadProducts: () => {
    console.log('got into get products');
    return db.query('SELECT * FROM products;')
  },

  loadSpecificProduct: (product_id) => { // SELECT * FROM products features WHERE product_id = ${product_id}`
    console.log('got into get specific product');
    return db.query(`
      SELECT p.*, f.*
      FROM products p
      JOIN features f ON p.product_id = f.product_id
      WHERE p.product_id = ${product_id}
    `)
  },

  loadProductStyles: (product_id) => { // SELECT * FROM styles WHERE product_id = ${product_id}
    console.log('got into get product styles');
    return db.query(`
      SELECT st.*, sk.*,ph.*
      FROM styles st
      JOIN skus sk ON st.style_id = sk.style_id
      JOIN photos ph ON st.style_id = ph.style_id
      WHERE st.product_id = ${product_id}
    `)
  },

  loadRelatedProducts: (product_id) => {
    console.log('got into get related products');
    return db.query(`SELECT * FROM related_products WHERE current_product_id = ${product_id}`)
  }





}