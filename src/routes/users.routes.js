const { Router } = require('express');
const usersRoutes = Router();

const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();

function middleware(req, res, next) {
  next();
}

usersRoutes.use(middleware);
usersRoutes.post('/', usersController.create);

module.exports = usersRoutes;