const db = require('../db/connection');

async function countComments() {
  return await Promise.resolve(
    db.query(`
SELECT article_id,count(*) 
AS "Number of comments"
FROM comments
GROUP BY article_id
ORDER BY article_id
;
`)
  );
}
module.exports = countComments;
