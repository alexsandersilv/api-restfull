const knex = require('../database/knex');
const { compare } = require('bcryptjs');

const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

const { sign } = require('jsonwebtoken')

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();
  
    if (!user) throw new AppError('E-mail or password incorrect', 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError('E-mail or password incorrect', 401);
     
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.status(202).json({
      token,
      user
    });

  }
}

module.exports = SessionController;