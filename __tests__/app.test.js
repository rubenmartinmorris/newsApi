const db = require('../db/connection.js');
const request = require('supertest');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('200: should return an object with the key of topics and a value of array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3);
        expect(Array.isArray(topics)).toBe(true);
        expect(topics[0]).toHaveProperty('slug');
        expect(topics[0]).toHaveProperty('description');
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  test('200: should return an object with the key or article and a single value array of article_id ', () => {
    return request(app)
      .get('/api/articles/3')
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article).toHaveLength(1);
        expect(Array.isArray(article.article)).toBe(true);
      });
  });
  test('should have properties author, title, article_id,body,created_at,votes,comment_count', () => {
    return request(app)
      .get('/api/articles/3')
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article[0]).toHaveProperty('article_id');
        expect(article.article[0]).toHaveProperty('title');
        expect(article.article[0]).toHaveProperty('body');
        expect(article.article[0]).toHaveProperty('votes');
        expect(article.article[0]).toHaveProperty('topic');
        expect(article.article[0]).toHaveProperty('author');
        expect(article.article[0]).toHaveProperty('created_at');
        expect(article.article[0]).toHaveProperty('comment_count', 11);
      });
  });
});
describe('PATCH /api/articles/:article_id', () => {
  //PATCH NOT POST don't use queries(?X=1) use parametric endpoint
  test('200: ', () => {
    return request(app)
      .post('/api/articles/?article_id=1')
      .send({ inc_votes: 3 })
      .expect(200);
  });
  test('200: should update an article and return the updated article adding votes', () => {
    return request(app)
      .post('/api/articles/?article_id=1')
      .send({ inc_votes: 3 })
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toHaveProperty('votes', 103);
      });
  });
  test('200: should update an article and return the updated article removing votes', () => {
    return request(app)
      .post('/api/articles/?article_id=1')
      .send({ inc_votes: -3 })
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toHaveProperty('votes', 97);
      });
  });
});
describe('GET /api/articles', () => {
  test('200: Should return a 200', () => {
    return request(app).get('/api/articles/').expect(200);
  });
  test('Should return an array of articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        /* 
        const articles = body.articles
        const articles = 
        {articles:[{},{}]}
        
        */
        //console.log(toBeUpdated, '<-----------');

        expect(Array.isArray(toBeUpdated)).toBe(true);
        expect(toBeUpdated.length).toBe(12);
      });
  });
  test('Should return an array of articles with all required properties', () => {
    return request(app)
      .get('/api/articles/')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        //console.log("toBeUpdated", body.article.article);
        // for each function vanilla js
        expect(toBeUpdated[0]).toHaveProperty('author');
        expect(toBeUpdated[0]).toHaveProperty('title');
        expect(toBeUpdated[0]).toHaveProperty('article_id');
        expect(toBeUpdated[0]).toHaveProperty('body');
        expect(toBeUpdated[0]).toHaveProperty('topic');
        expect(toBeUpdated[0]).toHaveProperty('created_at');
        expect(toBeUpdated[0]).toHaveProperty('votes');
        expect(toBeUpdated[0]).toHaveProperty('comment_count');
      });
  });
  test('Should return an array of articles with all required properties sorted by created_at', () => {
    return request(app)
      .get('/api/articles/?sort_by=created_at')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        expect(toBeUpdated[0].article_id).toBe(7);
        //https://github.com/P-Copley/jest-sorted
      });
  });
  test('Should return an array of articles with all required properties sorted by article id', () => {
    return request(app)
      .get('/api/articles/?sort_by=article_id')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        expect(toBeUpdated[0].article_id).toBe(1);
        //console.log('toBeUpdated', toBeUpdated);
      });
  });
  test('Should return an array of articles with all required properties sorted by title', () => {
    return request(app)
      .get('/api/articles/?sort_by=title')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        expect(toBeUpdated[0].article_id).toBe(6);
        //console.log('toBeUpdated', toBeUpdated);
      });
  });
  test('Should return an array of articles with all required properties sorted by article id descending', () => {
    return request(app)
      .get('/api/articles/?sort_by=article_id&&order=desc')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        expect(toBeUpdated[0].article_id).toBe(12);
        //console.log('toBeUpdated', toBeUpdated);
      });
  });
  test('Should return an array of articles with all required properties sorted by article id descending filtered by topic', () => {
    return request(app)
      .get('/api/articles/?sort_by=article_id&order=desc&topic=mitch')
      .expect(200)
      .then(({ body }) => {
        const toBeUpdated = body.article.article;
        //console.log('toBeUpdated', toBeUpdated);
        expect(toBeUpdated.length).toBe(11);
      });
  });
});

describe('GET /api/articles/:article_id/comments', () => {
  //Check for sql injection
  test('should return a 200 code', () => {
    return request(app).get('/api/articles/3/comments').expect(200);
  });
  test('should return an array of comments corresponding to the article', () => {
    return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(2);
      });
  });
  test('should return an array of comments corresponding to the article', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        // Add values expect(body[0]).toHaveProperty('comment_id',xxx);
        expect(body[0]).toHaveProperty('comment_id');
        expect(body[0]).toHaveProperty('votes');
        expect(body[0]).toHaveProperty('created_at');
        expect(body[0]).toHaveProperty('author');
        expect(body[0]).toHaveProperty('body');
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('should return a 200 code', () => {
    return request(app)
      .post('/api/articles/2/comments')
      .send({
        username: 'rogersop',
        body: 'What is this nonesense that we all have to go through?',
      })
      .expect(200);
  });
  test('should return a 200 code and return a comments object with all required properties', () => {
    return request(app)
      .post('/api/articles/2/comments')
      .send({
        username: 'rogersop',
        body: 'What is this nonesense that we all have to go through?',
      })
      .expect(200)
      .then(({ body }) => {
        // rename to expect(body.comment<------[0]).toHaveProperty( only use an array when required
        expect(body.rows[0]).toHaveProperty(
          'body',
          'What is this nonesense that we all have to go through?'
        );
        expect(body.rows[0]).toHaveProperty('comment_id', 19);
        expect(body.rows[0]).toHaveProperty('votes', 0);
        expect(body.rows[0]).toHaveProperty('author', 'rogersop');
        expect(body.rows[0]).toHaveProperty('article_id', 2); //has to be a number objectContaining
        expect(body.rows[0]).toHaveProperty('created_at'); //
      });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  test('should return 204 and no content', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204)
      .then(() => {
        console.log(`Check the database that it is deleted you rusher`);
      });
    // check the response in model for the response of the db query
  });
});
describe('GET /api', () => {
  test('should return a 200 code', () => {
    return request(app).get('/api').expect(200);
  });
  test('should return an object', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe('object');
      });
  });
});

describe.skip('Error Handling', () => {
  test('404 /api/notARoute -> route that does not exist: 404 Not Found', () => {
    return request(app).get('/api/notARoute').expect(404);
  });
  test('GET /api/articles/:article_id', () => {
    return request(app)
      .get('/api/articles/notAnId')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid input');
      });
  });
});
