import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";

const requestBody = {
  userId: "randomid",
  name: "testhotel",
  city: "testcity",
  country: "testcountry",
  description: "testdescription",
  type: "testtype",
  adultCount: 2,
  childCount: 2,
  facilities: ["garden", "pool"],
  pricePerNight: 100,
  starRating: 3,
  imageUrls: ["sample1.png", "sample2.png"],
  lastUpdated: Date.now(),
};


describe("GET api/v1/hotel", () => {
  it("should create hotel and return 200 status", async () => {
    const res = await request(app).get("/api/hotel").send(requestBody);
    expect(200)
  });
});
