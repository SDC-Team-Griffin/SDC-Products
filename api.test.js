const request = require("supertest");
require("dotenv").config();
const baseURL = `http://localhost:${process.env.PORT}`;

const productsController = require('./server/controllers/productsController');
const productsModel = require('./server/models/productsModel')


//Integration tests //
describe("Integration Tests", () => {
  describe("GET /  (Should retrieve default product)", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
    });
    it("should return default product", async () => {
      const response = await request(baseURL).get("/");
      expect(response.body.length).toBe(1);
    });
  });


  describe("GET /products/  (Should retrieve products)", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/products").query({ limit: 2 });
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
    });
    it("should return all products", async () => {
      const response = await request(baseURL).get("/products").query({ limit: 2 });
      expect(response.body.length).toBeGreaterThan(1);
    });
  });


  describe("GET /products/:product_id  (Should retrieve specific product given product_id)", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/products/22");
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
    });
    it("should return a product when valid id is provided", async () => {
      const response = await request(baseURL).get("/products/22");
      expect(response.body.length).toBe(1);
    });
    it("should not return a product when invalid id is provided", async () => {
      const response = await request(baseURL).get("/products/0");
      expect(response.body.length).toBe(0);
    });
  });


  describe("GET /products/:product_id/styles  (Should retrieve styles of specific product)", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/products/88/styles");
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
    });
    it("should return styles of specific product", async () => {
      const response = await request(baseURL).get("/products/88/styles");
      expect(response.body.length).toBe(1);
    });
  });


  describe("GET /products/:product_id/related  (Should retrieve list of related products of specific product)", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/products/88/related");
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
    });
    it("should return list of related products of specific product", async () => {
      const response = await request(baseURL).get("/products/88/related");
      expect(response.body).toBeDefined();
    });
  });
})


// Unit Tests //

//Products Controller Tests

// Mock the productsModel module
jest.mock('./server/models/productsModel.js', () => ({
  loadProducts: jest.fn(),
  loadDefaultProduct: jest.fn(),
  loadSpecificProduct: jest.fn(),
  loadProductStyles: jest.fn(),
  loadRelatedProducts: jest.fn()
}));

describe("Products Controller", () => {
  describe("getProducts", () => {
    it("should return all products", async () => {
      const req = { query: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      // Set up the mock behavior for loadProducts
      const { loadProducts } = require('./server/models/productsModel.js');
      loadProducts.mockResolvedValue({ rows: ['product1', 'product2'] });

      await productsController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(['product1', 'product2']);
    });
  });

  describe("getDefaultProduct", () => {
    it("should return the default product", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      // Set up the mock behavior for loadDefaultProduct
      const { loadDefaultProduct } = require('./server/models/productsModel.js');
      loadDefaultProduct.mockResolvedValue({ rows: ['defaultProduct'] });

      await productsController.getDefaultProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(['defaultProduct']);
    });
  });

  describe("getProductById", () => {
    it("should return a specific product by ID", async () => {
      const req = { params: { product_id: "22" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      // Set up the mock behavior for loadSpecificProduct
      const { loadSpecificProduct } = require('./server/models/productsModel.js');
      loadSpecificProduct.mockResolvedValue({ rows: ['specificProduct'] });

      await productsController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(['specificProduct']);
    });
  });

  describe("getProductStyles", () => {
    it("should return the styles of a specific product", async () => {
      const req = { params: { product_id: "88" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      // Set up the mock behavior for loadProductStyles
      const { loadProductStyles } = require('./server/models/productsModel.js');
      loadProductStyles.mockResolvedValue({ rows: ['productStyles'] });

      await productsController.getProductStyles(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(['productStyles']);
    });
  });

  describe("getRelatedProducts", () => {
    it("should return the related products of a specific product", async () => {
      const req = { params: { product_id: "88" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      // Set up the mock behavior for loadRelatedProducts
      const { loadRelatedProducts } = require('./server/models/productsModel.js');
      loadRelatedProducts.mockResolvedValue({ rows: ['relatedProducts'] });

      await productsController.getRelatedProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(['relatedProducts']);
    });
  });
});


// productsModel tests
describe('Products Model', () => {
  describe('loadProducts', () => {
    it('should load all products', async () => {
      const products = await productsModel.loadProducts();
      expect(products).toBeDefined();
      expect(products.rows.length).toBeGreaterThan(0); // Access `rows` property
    });
  });

  describe('loadDefaultProduct', () => {
    it('should load the default product', async () => {
      const defaultProduct = await productsModel.loadDefaultProduct();
      expect(defaultProduct).toBeDefined();
    });
  });

  describe('loadSpecificProduct', () => {
    it('should load a specific product by ID', async () => {
      const specificProduct = await productsModel.loadSpecificProduct(22);
      expect(specificProduct).toBeDefined();
  });
});

  describe('loadProductStyles', () => {
    it('should load styles of a specific product', async () => {
      const productStyles = await productsModel.loadProductStyles(88);
      expect(productStyles).toBeDefined();
      expect(productStyles.rows.length).toBeGreaterThan(0); // Access `rows` property
    });
  });

  describe('loadRelatedProducts', () => {
    it('should load related products of a specific product', async () => {
      const relatedProducts = await productsModel.loadRelatedProducts(88);
      expect(relatedProducts).toBeDefined();
      expect(relatedProducts.rows.length).toBeGreaterThan(0); // Access `rows` property
    });
  });

})



