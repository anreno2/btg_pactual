import request from "supertest";
import app from "../src/app.js";

describe("Funds", () => {
  it("should return 401 if no token", async () => {
    const res = await request(app).get("/api/funds");
    expect(res.statusCode).toBe(401);
  });
});