const request = require("supertest");
const { fetchPlaces } = require("../src/controllers/search");
const { app } = require("../app");
const axios = require("axios");
jest.mock("axios");

describe("fetchPlaces", () => {
  it("should return places when API call succeeds", async () => {
    axios.get.mockResolvedValue({
      data: {
        businesses: [
          {
            name: "Joe's Pizza",
            location: { address1: "123 Main St" },
            rating: 4.5,
            phone: "+123456789",
          },
        ],
      },
    });

    const result = await fetchPlaces("pizza", "New York");
    expect(result).toEqual([
      {
        name: "Joe's Pizza",
        address: "123 Main St",
        rating: 4.5,
        phone: "+123456789",
      },
    ]);
  });

  it("should return an empty array when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));
    const result = await fetchPlaces("pizza", "New York");
    expect(result).toEqual([]);
  });

  it("should throw validation error for invalid location", async () => {
    await expect(fetchPlaces("pizza", "")).rejects.toThrow("Validation Error");
  });
});

describe("REST API Endpoints", () => {
  it("should return pizza places", async () => {
    axios.get.mockResolvedValue({
      data: { businesses: [{ name: "Joe's Pizza", location: { address1: "123 Main St" }, rating: 4.5, phone: "+123456789" }] },
    });
    const res = await request(app).get("/search/pizza").query({ location: "New York" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Joe's Pizza");
  });

  it("should return 400 for missing location", async () => {
    const res = await request(app).get("/search/pizza");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Location is required");
  });
});

describe("GraphQL Queries", () => {
  it("should return pizza places via GraphQL", async () => {
    axios.get.mockResolvedValue({
      data: { businesses: [{ name: "Joe's Pizza", location: { address1: "123 Main St" }, rating: 4.5, phone: "+123456789" }] },
    });
    const query = {
      query: `{
        searchPizza(location: "New York") {
          name
          address
          rating
          phone
        }
      }`,
    };

    const res = await request(app).post("/graphql").send(query).set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.data.searchPizza).toHaveLength(1);
    expect(res.body.data.searchPizza[0].name).toBe("Joe's Pizza");
  });
});
