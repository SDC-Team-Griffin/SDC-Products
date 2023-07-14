const express = require('express')
const router = express.Router()
const productsController = require('./controllers/productsController.js');


router.get('/', productsController.getDefaultProduct);
router.get('/products', productsController.getProducts);
router.get('/products/:product_id/styles', productsController.getProductStyles);
router.get('/products/:product_id/related', productsController.getRelatedProducts);
router.get('/products/:product_id', productsController.getProductById);


module.exports = router;