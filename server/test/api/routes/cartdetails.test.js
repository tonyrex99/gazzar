import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import CartDetailsService from "../../../src/services/cartdetails.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/cartdetails.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/cart-details/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/cart-details");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    CartDetailsService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/cart-details")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(CartDetailsService.list).toHaveBeenCalled();
  });

  test("POST creates a new CartDetails", async () => {
    const data = {
      storeID: "test",
      customerID: "test",
      productID: "test",
    };

    CartDetailsService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/cart-details")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(CartDetailsService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new CartDetails without required attributes fails", async () => {
    const data = {};

    CartDetailsService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/cart-details")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(CartDetailsService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/cart-details/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    CartDetailsService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/cart-details/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(CartDetailsService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/cart-details/507f1f77bcf86cd799439011");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    CartDetailsService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/cart-details/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(CartDetailsService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    CartDetailsService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/cart-details/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(CartDetailsService.get).not.toHaveBeenCalled();
  });

  test("CartDetails update", async () => {
    const data = {
      storeID: "test",
      customerID: "test",
      productID: "test",
    };
    CartDetailsService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/cart-details/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(CartDetailsService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("CartDetails deletion", async () => {
    CartDetailsService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/cart-details/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(CartDetailsService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
