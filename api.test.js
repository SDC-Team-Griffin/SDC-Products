const request = require("supertest");
require("dotenv").config();
const baseURL = `http://localhost:${process.env.PORT}`;
const productsController = require('./server/controllers/productsController');



//Integration tests //

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



// Unit Tests //

describe("Products Controller", () => {
  describe("getProducts", () => {
    it("should return all products", async () => {
      const req = { query: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await productsController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("getDefaultProduct", () => {
    it("should return the default product", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await productsController.getDefaultProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("getProductById", () => {
    it("should return a specific product by ID", async () => {
      const req = { params: { product_id: "22" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await productsController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("getProductStyles", () => {
    it("should return the styles of a specific product", async () => {
      const req = { params: { product_id: "88" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await productsController.getProductStyles(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("getRelatedProducts", () => {
    it("should return the related products of a specific product", async () => {
      const req = { params: { product_id: "88" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await productsController.getRelatedProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });
});