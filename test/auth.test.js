import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";

describe("AUTH ROUTES", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("POST /auth/register", async () => {
    const user = {
      name: "Test User",
      email: `test_${Date.now()}@mail.com`,
      password: "123456"
    };

    const res = await request(app).post("/auth/register").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
  });
});