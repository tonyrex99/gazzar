import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import NotificationsService from "../../../src/services/notifications.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/notifications.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/notifications/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/notifications");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    NotificationsService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/notifications")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(NotificationsService.list).toHaveBeenCalled();
  });

  test("POST creates a new Notifications", async () => {
    const data = {
      storeID: "test",
      dateAdded: "2001-01-01T00:00:00Z",
      details: { foo: "bar" },
    };

    NotificationsService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/notifications")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(NotificationsService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Notifications without required attributes fails", async () => {
    const data = {};

    NotificationsService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/notifications")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(NotificationsService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/notifications/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    NotificationsService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/notifications/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(NotificationsService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/notifications/507f1f77bcf86cd799439011");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    NotificationsService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/notifications/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(NotificationsService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    NotificationsService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/notifications/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(NotificationsService.get).not.toHaveBeenCalled();
  });

  test("Notifications update", async () => {
    const data = {
      storeID: "test",
      dateAdded: "2001-01-01T00:00:00Z",
      details: { foo: "bar" },
    };
    NotificationsService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/notifications/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(NotificationsService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("Notifications deletion", async () => {
    NotificationsService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/notifications/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(NotificationsService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
