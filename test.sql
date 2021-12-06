\c nc_news_test

SELECT articles.article_id, articles.title, articles.body, articles.votes, articles.topic, articles.author, articles.created_at, COUNT(comment_id) AS comment_count  FROM articles JOIN comments ON articles.article_id = comments.article_id  WHERE articles.article_id = 3 GROUP BY articles.article_id;

/*
SELECT * FROM articles WHERE articles.topic = 'cats';

SELECT comment_id,votes,created_at,author,body FROM comments WHERE comments.article_id = 1;
INSERT INTO comments(body,votes,author,article_id) VALUES ('lol',0,'butter_bridge',3) RETURNING *
DELETE FROM comments WHERE comments.comment_id=3 RETURNING *;


SELECT * FROM articles;

SELECT * FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id;
SELECT * FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id;

SELECT article_id,count(*) AS "Number of comments"
FROM comments
GROUP BY article_id
ORDER BY article_id;

SELECT comment_id,votes,created_at,author,body FROM comments WHERE comment_id = 4;

SELECT article_id,count(*) 

FROM comments
GROUP BY article_id
ORDER BY article_id
*/
    
