const db = require("../connection");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics `);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username VARCHAR(255) PRIMARY KEY,
        avatar_url VARCHAR(255),
        name VARCHAR(255) NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
        slug VARCHAR(255) PRIMARY KEY UNIQUE,
        description VARCHAR(255) NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body VARCHAR(255) NOT NULL,
        votes INT DEFAULT 0,
        topic VARCHAR(255)  , 
        author VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(5),
        FOREIGN KEY (topic) REFERENCES topics (slug),
        FOREIGN KEY (author) REFERENCES users (username)
      )`);
      // topic: field which references the slug in the topics table foreigh key constraint
      // author: field that references a user's primary key (username)
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(255),
        article_id INT,
        votes INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(5),
        body VARCHAR (255),
        FOREIGN KEY (author) REFERENCES users (username),
        FOREIGN KEY (article_id) REFERENCES articles(article_id)
      )`);
      //author field that references a user's primary key (username)
      //field that references an article's primary key
    })
    .then(() => {
      const queryString = format(
        `
      INSERT INTO users (
        username, avatar_url, name
      )
      VALUES 
      %L
      `,
        userData.map((user) => [user.username, user.avatar_url, user.name])
      );
      return db.query(queryString);
    })
    .then(() => {
      const queryString = format(
        `
      INSERT INTO topics (
        slug,description
      )
      VALUES
      %L
      RETURNING *
      `,
        topicData.map((topic) => [topic.slug, topic.description])
      );
      //console.log(queryString);

      return db.query(queryString);
    })
    .then((lol) => {
      console.log(lol.rows);
    });
};

module.exports = seed;
