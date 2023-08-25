import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import OrderDetailsService from "../../../src/services/orderdetails.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/orderdetails.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/order-details/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/order-details");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    OrderDetailsService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/order-details")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(OrderDetailsService.list).toHaveBeenCalled();
  });

  test("POST creates a new OrderDetails", async () => {
    const data = {
      orderID: "test",
      productID: "test",
      quantity: 3.141592,
      storeID: "test",
    };

    OrderDetailsService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/order-details")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(OrderDetailsService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new OrderDetails without required attributes fails", async () => {
    const data = {};

    OrderDetailsService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/order-details")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(OrderDetailsService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/order-details/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    OrderDetailsService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/order-details/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(OrderDetailsService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/order-details/507f1f77bcf86cd799439011");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    OrderDetailsService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/order-details/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(OrderDetailsService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    OrderDetailsService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/order-details/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(OrderDetailsService.get).not.toHaveBeenCalled();
  });

  test("OrderDetails update", async () => {
    const data = {
      orderID: "test",
      productID: "test",
      quantity: 3.141592,
      storeID: "test",
    };
    OrderDetailsService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/order-details/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(OrderDetailsService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("OrderDetails deletion", async () => {
    OrderDetailsService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/order-details/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(OrderDetailsService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
