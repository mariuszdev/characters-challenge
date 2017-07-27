const bodyParser = require('body-parser');

const USER_ID = '123456789000';

module.exports = function configureRoutes(app, repository) {
  app.use(bodyParser.json());

  app.get('/characters', (req, res) => {
    repository.getAllCharacters()
      .then((characters) => res.json({
        characters,
      }));
  });

  app.delete('/characters/:id', (req, res) => {
    repository.deleteCharacter(req.params.id)
      .then(() => res.sendStatus(202))
      .catch((error) => res.status(400).json(error));
  });

  app.post('/characters', (req, res) => {
    const character = req.body;

    repository.createCharacter(character)
      .then((id) => res.status(201).json({
        id,
      }))
      .catch((error) => res.status(400).json(error));
  });

  app.put('/characters/:id', (req, res) => {
    const characterData = req.body;

    repository.editCharacter(req.params.id, characterData)
      .then((id) => res.sendStatus(204))
      .catch((error) => res.status(400).json(error));
  });

  app.post('/favourites/:id', (req, res) => {
    repository.addFavouriteCharacter(USER_ID, req.params.id)
      .then((id) => res.sendStatus(204))
      .catch((error) => res.status(400).json(error));
  });

  app.get('/favourites', (req, res) => {
    repository.getFavouriteCharactersIds(USER_ID)
      .then((favouritesIds) => res.status(200).json({
        favourites: favouritesIds,
      }))
      .catch(() => res.sendStatus(500));
  });

  app.delete('/favourites/:id', (req, res) => {
    repository.removeFavouriteCharacter(USER_ID, req.params.id)
      .then((id) => res.sendStatus(204))
      .catch((error) => res.status(400).json(error));
  });
};
