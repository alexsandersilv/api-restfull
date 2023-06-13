const knex = require('../database/knex');

class TagsController {
  async index(req, res) {
    const { id: user_id } = req.user;

    const tags = await knex('tags').where({ user_id });

    return res.json(tags);
  }
}

module.exports = TagsController;