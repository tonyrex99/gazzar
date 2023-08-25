import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import OrderService from "../../../src/services/order.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/order.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/order/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/order");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    OrderService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/order")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(OrderService.list).toHaveBeenCalled();
  });

  test("POST creates a new Order", async () => {
    const data = {
      orderID: "test",
      dateCreated: "2001-01-01T00:00:00Z",
      customerID: "test",
      status: "test",
      shippingType: "test",
      expectedDeliveryDate: "2001-01-01T00:00:00Z",
      orderType: "test",
      storeID: "test",
    };

    OrderService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/order")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(OrderService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Order without required attributes fails", async () => {
    const data = {};

    OrderService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/order")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(OrderService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/order/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    OrderService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/order/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(OrderService.get).toHaveBeenCalledWith("507f1f77bcf86cd799439011");
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/order/507f1f77bcf86cd799439011");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    OrderService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/order/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(OrderService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    OrderService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/order/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(OrderService.get).not.toHaveBeenCalled();
  });

  test("Order update", async () => {
    const data = {
      orderID: "test",
      dateCreated: "2001-01-01T00:00:00Z",
      customerID: "test",
      status: "test",
      shippingType: "test",
      orderType: "test",
      storeID: "test",
    };
    OrderService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/order/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(OrderService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("Order deletion", async () => {
    OrderService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/order/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(OrderService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
