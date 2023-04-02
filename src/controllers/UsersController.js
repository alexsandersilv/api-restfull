const AppError = require('../utils/AppError');

class UsersController {

  create(req, res) {
    const { name } = req.body;

    if (!name) {
      throw new AppError('Name is required');
    }
    return res.status(201).json({ message: 'User created' });
  }
}


module.exports = UsersController;