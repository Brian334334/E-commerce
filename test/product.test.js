import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";

describe("PRODUCT ROUTES", () => {
  afterAll(async () => {
    await mongoose.connection.close(); 
  });

  test("GET /products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /products", async () => {
    const product = {
      name: "Test Product",
      price: 100,
      description: "Sample product",
      category: "Electronics" // required field
    };

    const res = await request(app).post("/products").send(product);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Product");
  });
});