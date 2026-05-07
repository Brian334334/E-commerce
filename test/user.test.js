import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";

describe("USER ROUTES", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("GET /users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});