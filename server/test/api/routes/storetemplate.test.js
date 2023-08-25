import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import StoreTemplateService from "../../../src/services/storetemplate.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/storetemplate.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/store-template/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/store-template");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    StoreTemplateService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/store-template")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(StoreTemplateService.list).toHaveBeenCalled();
  });

  test("POST creates a new StoreTemplate", async () => {
    const data = {
      name: "test",
      dateCreated: "2001-01-01T00:00:00Z",
      price: 3.141592,
      tier: "test",
      data: "test",
      storeID: "test",
    };

    StoreTemplateService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/store-template")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(StoreTemplateService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new StoreTemplate without required attributes fails", async () => {
    const data = {};

    StoreTemplateService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/store-template")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(StoreTemplateService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/store-template/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    StoreTemplateService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/store-template/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(StoreTemplateService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get(
      "/api/v1/store-template/507f1f77bcf86cd799439011"
    );
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    StoreTemplateService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/store-template/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(StoreTemplateService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    StoreTemplateService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/store-template/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(StoreTemplateService.get).not.toHaveBeenCalled();
  });

  test("StoreTemplate update", async () => {
    const data = {
      name: "test",
      dateCreated: "2001-01-01T00:00:00Z",
      price: 3.141592,
      tier: "test",
      data: "test",
      storeID: "test",
    };
    StoreTemplateService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/store-template/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(StoreTemplateService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("StoreTemplate deletion", async () => {
    StoreTemplateService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/store-template/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(StoreTemplateService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
