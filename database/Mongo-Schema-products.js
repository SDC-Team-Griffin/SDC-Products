const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the products collection schema
const productSchema = new Schema({
  product_id: Number, // Original product ID
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{ type: Schema.Types.ObjectId, ref: 'Feature' }],
  styles: [{ type: Schema.Types.ObjectId, ref: 'Style' }],
  related_products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

// Define the features embedded document schema
const featureSchema = new Schema({
  product_id: Number, // Product ID
  feature: String,
  value: String
});

// Define the styles embedded document schema
const styleSchema = new Schema({
  product_id: Number, // Product ID
  name: String,
  original_price: Number,
  sale_price: Number,
  default_style: Boolean,
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  skus: [{ type: Schema.Types.ObjectId, ref: 'Sku' }]
});

// Define the skus embedded document schema
const skuSchema = new Schema({
  product_id: Number, // Product ID
  style_id: Number, // Style ID
  quantity: Number,
  size: String
});

// Define the photos embedded document schema
const photoSchema = new Schema({
  product_id: Number, // Product ID
  style_id: Number, // Style ID
  thumbnail_url: String,
  url: String
});

// Create the models based on the schemas
const Product = mongoose.model('Product', productSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Style = mongoose.model('Style', styleSchema);
const Sku = mongoose.model('Sku', skuSchema);
const Photo = mongoose.model('Photo', photoSchema);

// Export the models
module.exports = {
  Product,
  Feature,
  Style,
  Sku,
  Photo
};
