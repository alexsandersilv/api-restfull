const { hash, compare } = require('bcryptjs');

const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class UsersController {

  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if (checkUserExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return res.status(201).json({ message: 'User created successfully' });
    
  }


  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.user;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if(!user) {
      throw new AppError('User not found');
    }

    const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    const emailAlreadyExists = userWithUpdateEmail && userWithUpdateEmail.id !== id;

    if (emailAlreadyExists) {
      throw new AppError('Email already exists');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    const oldPasswordWasEntered = password && !old_password;

    if (oldPasswordWasEntered) {
      throw new AppError('Old Password is required');
    }

    const passwordAndOldPasswordWasEntered = password && old_password;

    if (passwordAndOldPasswordWasEntered) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password is incorrect');
      }

      user.password = await hash(password, 8);

    }

    await database.run('UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME("now") WHERE id = ?', [user.name, user.email, user.password, id])

    return res.status(200).json({ message: 'User updated successfully' });

  }
}


module.exports = UsersController;