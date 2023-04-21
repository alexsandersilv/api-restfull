const knex = require('../database/knex');

class NotesController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    const id = await knex('notes').insert({
      title,
      description,
      user_id
    });

    const note_id = id[0];
    const linksInert = links.map(link => {
      return {
        note_id,
        url: link
      }
    });

    await knex('links').insert(linksInert);


    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex('tags').insert(tagsInsert)

    return res.status(200).json();

  }
}

module.exports = NotesController;