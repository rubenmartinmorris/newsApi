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
      .get("/api/articles/?article_id=1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article).toHaveLength(1);
        expect(Array.isArray(article.article)).toBe(true);
        expect(Array.isArray(article.article)).toBe(true);
      });
  });
  test("should have properties author, title, article_id,body,created_at,votes,comment_count", () => {
    return request(app)
      .get("/api/articles/?article_id=1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article[0]).toHaveProperty("article_id");
        expect(article.article[0]).toHaveProperty("title");
        expect(article.article[0]).toHaveProperty("body");
        expect(article.article[0]).toHaveProperty("votes");
        expect(article.article[0]).toHaveProperty("topic");
        expect(article.article[0]).toHaveProperty("author");
        expect(article.article[0]).toHaveProperty("created_at");
        expect(article.article[0]).toHaveProperty("comment_count", 11);
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("200: ", () => {
    return request(app)
      .post("/api/articles/?article_id=1")
      .send({ inc_votes: 3 })
      .expect(200);
  });
  test("200: should update an article and return the updated article adding votes", () => {
    return request(app)
      .post("/api/articles/?article_id=1")
      .send({ inc_votes: 3 })
      .expect(200)
      .then(({ body }) => {
        console.log(body);

        expect(body[0]).toHaveProperty("votes", 103);
      });
  });
  test("200: should update an article and return the updated article removing votes", () => {
    return request(app)
      .post("/api/articles/?article_id=1")
      .send({ inc_votes: -3 })
      .expect(200)
      .then(({ body }) => {
        console.log(body);

        expect(body[0]).toHaveProperty("votes", 97);
      });
  });
});
