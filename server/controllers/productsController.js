const productsModel = require('../models/productsModel.js');

module.exports = {

  getProducts: ( function (req, res) {
    productsModel.loadProducts()
    .then((products) => {
      console.log("products", products);
      res.status(200).send(products)
    })
    .catch((err) => {
      console.error('Error loading products:', err)
      res.status(500).send('Internal Server Error');
    })
  }),

  getDefaultProduct : ( function (req, res) {
    productsModel.loadDefaultProduct()
    .then((defaultProduct) => {
      console.log('defaultProduct', defaultProduct);
      res.status(200).send(defaultProduct)
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
      console.log('specificProduct', specificProduct);
      res.status(200).send(specificProduct)
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
      console.log('product styles', productStyles);
      res.status(200).send(productStyles)
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
      console.log('related products', relatedProducts);
      res.status(200).send(relatedProducts)
    })
    .catch((err) => {
      console.error('Error loading related products', err)
      res.status(500).send('Internal Service Error')
    })
  })

  }

