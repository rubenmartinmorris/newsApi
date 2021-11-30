const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: should return an object with the key of topics and a value of array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        console.log(topics);

        expect(topics).toHaveLength(3);
        expect(Array.isArray(topics)).toBe(true);
        expect(topics[0]).toHaveProperty("slug");
        expect(topics[0]).toHaveProperty("description");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: should return an object with the key or article and a single value array of article_id ", () => {
    return request(app)
      .get("/api/articles/:1")
      .expect(200)
      .then(({ body: { article } }) => {
        console.log(article);
        expect(article).toHaveLength(1);
        expect(Array.isArray(article).toBe(true));
      });
  });
});
