import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import StoreDataService from "../../../src/services/storedata.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/storedata.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/store-data/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/store-data");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    StoreDataService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/store-data")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(StoreDataService.list).toHaveBeenCalled();
  });

  test("POST creates a new StoreData", async () => {
    const data = {
      tagline: "test",
      description: "test",
      headerImages: { foo: "bar" },
      productPerPage: 3.141592,
      storeID: "test",
      logo: "test",
    };

    StoreDataService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/store-data")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(StoreDataService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new StoreData without required attributes fails", async () => {
    const data = {};

    StoreDataService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/store-data")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(StoreDataService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/store-data/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    StoreDataService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/store-data/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(StoreDataService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/store-data/507f1f77bcf86cd799439011");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    StoreDataService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/store-data/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(StoreDataService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    StoreDataService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/store-data/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(StoreDataService.get).not.toHaveBeenCalled();
  });

  test("StoreData update", async () => {
    const data = {
      tagline: "test",
      description: "test",
      headerImages: { foo: "bar" },
      productPerPage: 3.141592,
      storeID: "test",
      logo: "test",
    };
    StoreDataService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/store-data/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(StoreDataService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("StoreData deletion", async () => {
    StoreDataService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/store-data/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(StoreDataService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
