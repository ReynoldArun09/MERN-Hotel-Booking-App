import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import "dotenv/config";
import { ErrorMessage, SuccessMessage } from "../helper/Enum";
import User from "../models/user";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  const email = requestBody.email;
  await User.findOneAndDelete({ email });
  await mongoose.connection.close();
});

const requestBody = {
  firstName: "testingFrist",
  lastName: "t2e1stingLast",
  email: "testingemail@gmail.com",
  password: "123456",
  confirmPassword: "123456"
};

const loginBody = {
  email: "testingemail@gmail.com",
  password: "123456",
};

const InvalidloginBody = {
  email: "invalid@email.com",
  password: "invalidpass",
};

describe("POST /api/user/register-user", () => {
  it("should allow user to register account", async () => {
    const response = await request(app)
      .post("/api/user/register-user")
      .send(requestBody);
    expect(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SuccessMessage.USER_REGISTERED);
  });

  it("should not allow user to register account if user already exist", async () => {
    const response = await request(app)
      .post("/api/user/register-user")
      .send(requestBody);
    expect(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(ErrorMessage.USER_ALREADY_EXIST);
  });
});

describe("POST /api/user/login", () => {
  it("should allow registered user to login", async () => {
    const response = await request(app)
      .post("/api/user/login-user")
      .send(loginBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SuccessMessage.LOGIN_SUCCESS);
  });

  it("should not allow login with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/user/login-user")
      .send(InvalidloginBody);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(ErrorMessage.USER_NOT_FOUND);
  });
});


describe("POST /api/user/logout", () => {
  it("should logout user", async () => {
    const response = await request(app).post("/api/user/logout-user").set(
      "Cookie",
      "booking.com=''",
    );
    expect(response.statusCode).toBe(200);
  });
});
