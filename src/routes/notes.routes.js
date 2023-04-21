const { Router } = require('express');
const usersRoutes = Router();

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();

function middleware(req, res, next) {
  next();
}

usersRoutes.use(middleware);
usersRoutes.post('/:user_id', notesController.create);

module.exports = usersRoutes;