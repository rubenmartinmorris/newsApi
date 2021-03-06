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
  test('should have properties author, title, article_id,body,created_at,votes,comment_count', () => {
    return request(app)
      .get('/api/articles/3')
      .expect(200)
      .then(({ body }) => {
        console.log(body.article, '<---- test 2');

        expect(body.article).toHaveProperty('article_id');
        expect(body.article).toHaveProperty('title');
        expect(body.article).toHaveProperty('body');
        expect(body.article).toHaveProperty('votes');
        expect(body.article).toHaveProperty('topic');
        expect(body.article).toHaveProperty('author');
        expect(body.article).toHaveProperty('created_at');
        expect(body.article).toHaveProperty('comment_count', 11);
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
    return request(app).get('/api/articles').expect(200);
  });
  test('Should return an array of articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        //console.log(articles, '<-articles');
        /* 
        const articles = body.articles
        const articles = 
        {articles:[{},{}]}
        
        */
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBe(12);
      });
  });
  test('Should return an array of articles with all required properties', () => {
    return request(app)
      .get('/api/articles/')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((article) => {
          expect(article).toHaveProperty('author');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('article_id');
          expect(article).toHaveProperty('body');
          expect(article).toHaveProperty('topic');
          expect(article).toHaveProperty('created_at');
          expect(article).toHaveProperty('votes');
          expect(article).toHaveProperty('comment_count');
          expect(typeof article.author).toBe('string');
          expect(typeof article.title).toBe('string');
          expect(typeof article.article_id).toBe('number');
          expect(typeof article.body).toBe('string');
          expect(typeof article.topic).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.comment_count).toBe('number');
        });
      });
  });
  test('Should return an array of articles with all required properties sorted by created_at', () => {
    return request(app)
      .get('/api/articles/?sort_by=created_at')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSorted({ key: 'created_at' });
      });
  });
  test('Should return an array of articles with all required properties sorted by article id', () => {
    return request(app)
      .get('/api/articles/?sort_by=article_id')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSorted({ key: 'article_id' });
      });
  });
  test('Should return an array of articles with all required properties sorted by title', () => {
    return request(app)
      .get('/api/articles/?sort_by=title')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSorted({ key: 'title' });
      });
  });
  test('Should return an array of articles with all required properties sorted by article id descending', () => {
    return request(app)
      .get('/api/articles/?sort_by=article_id&order=desc')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSorted({ key: 'article_id', descending: true });
      });
  });
  test('Should return an array of articles with all required properties sorted by article id descending filtered by topic', () => {
    return request(app)
      .get('/api/articles/?sort_by=article_id&order=desc&topic=mitch')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(11);
        articles.forEach((article) => {
          expect(article.topic).toBe('mitch');
        });
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
      .get('/api/articles/4/comments')
      .expect(200)
      .then(({ body }) => {
        console.log(body, 'body');

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
