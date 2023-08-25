import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import PickupLocationService from "../../../src/services/pickuplocation.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/pickuplocation.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/pickup-location/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/pickup-location");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    PickupLocationService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/pickup-location")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(PickupLocationService.list).toHaveBeenCalled();
  });

  test("POST creates a new PickupLocation", async () => {
    const data = {
      locationName: "test",
      phoneNumber: "test",
      pickupAddress: "test",
      state: "test",
      country: "test",
      availability: { foo: "bar" },
      availableTime: "test",
      storeID: "test",
    };

    PickupLocationService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/pickup-location")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(PickupLocationService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new PickupLocation without required attributes fails", async () => {
    const data = {};

    PickupLocationService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/pickup-location")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(PickupLocationService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/pickup-location/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    PickupLocationService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/pickup-location/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PickupLocationService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get(
      "/api/v1/pickup-location/507f1f77bcf86cd799439011"
    );
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    PickupLocationService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/pickup-location/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(PickupLocationService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    PickupLocationService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/pickup-location/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(PickupLocationService.get).not.toHaveBeenCalled();
  });

  test("PickupLocation update", async () => {
    const data = {
      locationName: "test",
      phoneNumber: "test",
      pickupAddress: "test",
      state: "test",
      country: "test",
      availability: { foo: "bar" },
      availableTime: "test",
      storeID: "test",
    };
    PickupLocationService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/pickup-location/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PickupLocationService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("PickupLocation deletion", async () => {
    PickupLocationService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/pickup-location/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(PickupLocationService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
