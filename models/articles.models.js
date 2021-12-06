const db = require('../db/connection');
const countComments = require('../ultils/database.utils');

exports.selectArticles = (paras) => {
  let queryString = `
      SELECT * FROM articles `;
  if (paras.topic !== undefined) {
    queryString += `WHERE articles.topic = '${paras.topic}' `;
  }
  queryString += `ORDER BY ${paras.sort_by} ${paras.order};`;
  //group by at the end;

  return db.query(queryString).then(async (selectedArticles) => {
    //console.log(selectedArticles.rows)

    const countComments = await db.query(
      `
        SELECT * FROM comments
        
        `
    );
    selectedArticles.rows.forEach((article) => {
      article.comment_count = 0;
    });
    //console.log(countComments.rows, "<----this one");

    countComments.rows.forEach((comment) => {
      selectedArticles.rows[comment.article_id].comment_count += 1;
      //console.log(selectedArticles.rows[comment.article_id]);
    });
    const formattedOutput = { articles: selectedArticles.rows };
    //console.log(formattedOutput, '<-----output');
    return formattedOutput;
  });
};

exports.selectArticleById = (paras) => {
  console.log(paras, '<---paras');

  return db
    .query(
      `
    SELECT * FROM articles 
    WHERE
    article_id = $1
    `,
      [paras.id]
    )
    .then((result) => {
      console.log(result.rows, '<-------------------------');

      return countComments(result.rows);
    })
    .then((result) => {
      console.log(result.rows, '<------result countComments');
    });
};

exports.updateArticleById = (id, inc_votes) => {
  return db
    .query(
      `
    UPDATE articles
    SET votes= votes+$1
    WHERE article_id=$2
    RETURNING *
    `,
      [inc_votes, id]
    )
    .then((newArticle) => {
      return newArticle.rows;
    });
};

exports.selectCommentById = (id) => {
  console.log(id, 'id');

  return db
    .query(
      `
    SELECT comment_id,votes,created_at,author,body FROM comments 
    WHERE comments.article_id = $1;
    `,
      [id]
    )
    .then((response) => {
      console.log(response.rows, '<---- needs comment count');
    });
};

exports.updateComment = (info) => {
  const id = info.id;
  const username = info.username;
  const body = info.body;

  return db.query(
    `
    INSERT INTO comments(body,votes,author,article_id) VALUES ($1, $2, $3, $4) RETURNING *

    `,
    [body, 0, username, id]
  );
};
