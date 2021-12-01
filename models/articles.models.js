const db = require('../db/connection');

exports.selectArticleById = (paras) => {
  //console.log(`paras in selectArticleById = ${JSON.stringify(paras)}`);
  order = paras.sort_by;

  if (paras.id === undefined) {
    let queryString = `
      SELECT * FROM articles `;
    if (paras.topic !== undefined) {
      queryString += `WHERE articles.topic = '${paras.topic}' `;
    }
    queryString += `ORDER BY ${paras.sort_by} ${paras.order};`;
    //console.log(queryString);

    return db.query(queryString).then(async (selectedArticles) => {
      //console.log(selectedArticles.rows);

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
      //console.log("selectedArticles.rows", selectedArticles.rows);
      return selectedArticles.rows;
    });
  } else {
    return db
      .query(
        `
    SELECT * FROM articles 
    WHERE
    article_id = $1
    `,
        [paras.id]
      )
      .then(async (selected) => {
        const count = await db.query(
          `
        SELECT * FROM comments
        WHERE article_id=$1
        `,
          [paras.id]
        );

        selected.rows[0].comment_count = count.rows.length;
        return selected.rows;
      });
  }
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
  return db
    .query(
      `
    SELECT comment_id,votes,created_at,author,body FROM comments 
    WHERE comments.article_id = $1;
    `,
      [id]
    )
    .then((response) => {
      return response.rows;
    });
};

exports.updateComment = (info) => {
  const id = info.id;
  const username = info.username;
  const body = info.body;
  console.log(id, username, body);

  return db.query(
    `
    INSERT INTO comments(body,votes,author,article_id) VALUES ($1, $2, $3, $4) RETURNING *

    `,
    [body, 0, username, id]
  );
};
