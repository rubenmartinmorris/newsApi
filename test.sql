\c nc_news_test

SELECT * FROM articles WHERE articles.topic = 'cats';

SELECT comment_id,votes,created_at,author,body FROM comments WHERE comments.article_id = 1;