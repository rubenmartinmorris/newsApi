const db = require("../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query(
      `
  SELECT * FROM articles 
  WHERE
  article_id = $1
  `,
      [id]
    )
    .then(async (selected) => {
      const count = await db.query(
        `
      SELECT * FROM comments
      WHERE article_id=$1
      `,
        [id]
      );

      //console.log(id, "count", count.rows, "selected.rows", selected.rows);
      selected.rows[0].comment_count = count.rows.length;
      return selected.rows;
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
