const db = require('../db/connection');

async function countComments(arrayOfArticles) {
  return await Promise.resolve(
    db.query(`
SELECT article_id,count(*) 
AS "NoC"
FROM comments
GROUP BY article_id
ORDER BY article_id
;
`)
  ).then((result) => {
    const newObject = {};
    arrayOfArticles.forEach((article) => {
      newObject[article.article_id] = article.NoC;
    });
    console.log([
      arrayOfArticles,
      result.rows,
      newObject,
      '<----------IN COUNTCOMMENTS',
    ]);
  });
}
module.exports = countComments;
