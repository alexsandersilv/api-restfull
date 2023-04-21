const { Router } = require('express');
const notesRoutes = Router();

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();

function middleware(req, res, next) {
  next();
}

notesRoutes.use(middleware);
notesRoutes.get('/', notesController.index);
notesRoutes.get('/:id', notesController.show);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes;