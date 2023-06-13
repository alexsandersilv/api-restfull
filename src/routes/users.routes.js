const { Router } = require('express');
const multer = require('multer');

const usersRoutes = Router();

const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const uploadConfig = require('../configs/upload');

const upload = multer(uploadConfig.MULTER);

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update)

module.exports = usersRoutes;