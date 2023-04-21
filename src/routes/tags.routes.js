const { Router } = require('express');
const tagsRoutes = Router();

const TagsController = require('../controllers/TagsController');
const tagsController = new TagsController();

function middleware(req, res, next) {
  next();
}

tagsRoutes.use(middleware);
tagsRoutes.get('/:user_id', tagsController.index);

module.exports = tagsRoutes