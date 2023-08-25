import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import FeedbackService from "../../../src/services/feedback.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/feedback.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/feedback/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/feedback");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    FeedbackService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/feedback")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(FeedbackService.list).toHaveBeenCalled();
  });

  test("POST creates a new Feedback", async () => {
    const data = {
      review: "test",
      dateAdded: "2001-01-01T00:00:00Z",
      customerEmail: "test@example.com",
      rating: 3.141592,
      productID: "test",
      storeID: "test",
    };

    FeedbackService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/feedback")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(FeedbackService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Feedback without required attributes fails", async () => {
    const data = {};

    FeedbackService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/feedback")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(FeedbackService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/feedback/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    FeedbackService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/feedback/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(FeedbackService.get).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/feedback/507f1f77bcf86cd799439011");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "507f1f77bcf86cd799439011";
    FeedbackService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/feedback/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(FeedbackService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    FeedbackService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/feedback/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(FeedbackService.get).not.toHaveBeenCalled();
  });

  test("Feedback update", async () => {
    const data = {
      review: "test",
      dateAdded: "2001-01-01T00:00:00Z",
      customerEmail: "test@example.com",
      rating: 3.141592,
      productID: "test",
      storeID: "test",
    };
    FeedbackService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/feedback/507f1f77bcf86cd799439011`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(FeedbackService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      data
    );
  });

  test("Feedback deletion", async () => {
    FeedbackService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/feedback/507f1f77bcf86cd799439011`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(FeedbackService.delete).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011"
    );
  });
});
