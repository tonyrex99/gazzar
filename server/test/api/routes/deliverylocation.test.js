import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import DeliveryLocationService from "../../../src/services/deliverylocation.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/deliverylocation.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/delivery-location/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/delivery-location");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    DeliveryLocationService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/delivery-location")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(DeliveryLocationService.list).toHaveBeenCalled();
  });

  test("POST creates a new DeliveryLocation", async () => {
    const data = {
      storeID: "test",
      locationName: "test",
      fee: "test",
      description: "test",
    };

    DeliveryLocationService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/delivery-location")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(DeliveryLocationService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new DeliveryLocation without required attributes fails", async () => {
    const data = {};

    DeliveryLocationService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/delivery-location")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(DeliveryLocationService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/delivery-location/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    DeliveryLocationService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/delivery-location/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(DeliveryLocationService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get(
      "/api/v1/delivery-location/507f1f77bcf86cd799439011"
    );
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    DeliveryLocationService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/delivery-location/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(DeliveryLocationService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    DeliveryLocationService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/delivery-location/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(DeliveryLocationService.get).not.toHaveBeenCalled();
  });

  test("DeliveryLocation update", async () => {
    const data = {
      storeID: "test",
      locationName: "test",
      fee: "test",
      description: "test",
    };
    DeliveryLocationService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/delivery-location/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(DeliveryLocationService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("DeliveryLocation deletion", async () => {
    DeliveryLocationService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/delivery-location/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(DeliveryLocationService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
