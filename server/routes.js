const express = require('express')
const router = express.Router()
const productsController = require('./controllers/productsController.js');


router.get('/', productsController.getDefaultProduct);
router.get('/products', productsController.getProducts);
router.get('/products/:product_id/styles', productsController.getProductStyles);
router.get('/products/:product_id/related', productsController.getRelatedProducts);
router.get('/products/:product_id', productsController.getProductById);


module.exports = router;

// the ROUTE PATH: ROUTE URL, controller method function (that calls model methods(database commmand queries)
// serves purpose of route (router.get/'path', controller.get)
// where controller.get is function that calls models.get, which is methods of database
// in the controller is where we pass the req.body/user input, set params, and pass them as arguments of the model database method, then invoke model method
