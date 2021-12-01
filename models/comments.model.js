const db = require('../db/connection');

exports.DELETECommentsById = (id) => {
  return db.query(
    `
      DELETE FROM comments WHERE comments.comment_id=$1;
    `,
    [id]
  );
};
