const { Router } = require('express');

const routes = Router();
const usersRoutes = require('./users.routes');
const notesRoutes = require('./notes.routes');
const tagsRoutes = require('./tags.routes');
const sessionRoutes = require('./session.routes');

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/notes', notesRoutes);
routes.use('/tags', tagsRoutes);

module.exports = routes;