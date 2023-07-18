const productsModel = require('../models/productsModel.js');

module.exports = {

  getProducts: (function (req, res) {
    const limit = req.query.limit || 10; // Default limit to 10 if not provided
    const page = req.query.page || 1;   // Default page to 1 if not provided
    const offset = (page - 1) * limit;  // Calculate the offset based on the page and limit

    productsModel
      .loadProducts(limit, offset)
      .then((products) => {
        var productRows = products.rows;
        console.log("products", productRows);
        res.status(200).send(productRows);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        res.status(500).send('Internal Server Error');
      });
  }),

  getDefaultProduct : ( function (req, res) {
    productsModel.loadDefaultProduct()
    .then((defaultProduct) => {
      var defaultProductRows = defaultProduct.rows;
      console.log('defaultProduct', defaultProductRows);
      res.status(200).send(defaultProductRows)
    })
    .catch((err) => {
      console.error('Error loading default product:', err)
      res.status(500).send('Internal Server Error');
  })
}),

  getProductById: (function (req,res) {
    var product_id = req.params.product_id
    productsModel.loadSpecificProduct(product_id)
    .then((specificProduct) => {
      var specificProductRows = specificProduct.rows;
      console.log('specificProduct', specificProductRows);
      res.status(200).send(specificProductRows)
    })
    .catch((err) => {
      console.error('Error loading specific product', err)
      res.status(500).send('Internal Server Error')
    })
  }),

  getProductStyles: (function (req, res) {
    var product_id = req.params.product_id
    productsModel.loadProductStyles(product_id)
    .then((productStyles) => {
      var productStylesRows = productStyles.rows;
      console.log('product styles', productStylesRows);
      res.status(200).send(productStylesRows)
    })
    .catch((err) => {
      console.error('Error loading product styles', err)
      res.status(500).send('Internal Server Error')
    })
  }),

  getRelatedProducts : (function (req, res) {
    var product_id = req.params.product_id
    productsModel.loadRelatedProducts(product_id)
    .then((relatedProducts) => {
      var relatedProductRows = relatedProducts.rows;
      console.log('related products', relatedProductRows);
      res.status(200).send(relatedProductRows)
    })
    .catch((err) => {
      console.error('Error loading related products', err)
      res.status(500).send('Internal Service Error')
    })
  })

  }



