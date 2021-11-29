const db = require("./");
const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS toppics `);
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
        topic VARCHAR(255), 
        author VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(5)
      )`);
      // topic: field which references the slug in the topics table
      // author: field that references a user's primary key (username)
    })
    .then(() => {
      return dbb.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(255),
        article_id INT,
        votes INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(5),
        body VARCHAR (255)
      )`);
      //field that references a user's primary key (username)
      //field that references an article's primary key
    });
};

module.exports = seed;
