const {
  fetchArticles,
  fetchArticleById,
  changeArticle,
  addArticle,
  removeArticle
} = require("../models/articles-model");

const getArticles = (req, res, next) => {
  const { sort_by, order, ...otherQueries } = req.query;

  fetchArticles(sort_by, order, otherQueries)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  changeArticle(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const postArticle = (req, res, next) => {
  addArticle(req.body)
    .then(newArticle => {
      res.status(201).send({ newArticle });
    })
    .catch(err => {
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getArticles,
  getArticleById,
  patchArticle,
  postArticle,
  deleteArticle
};
