const bodyParser = require('body-parser');
const express = require('express');

const USER_ID = '123456789000';

module.exports = function configureRoutes(app, repository) {
  const router = express.Router(); // eslint-disable-line

  router.use(bodyParser.json());

  router.use((req, res, next) => {
    return setTimeout(next, app.get('API_THROTTLE'));
  });

  router.get('/characters', (req, res) => {
    repository.getAllCharacters()
      .then((characters) => res.json({
        characters,
      }));
  });

  router.delete('/characters/:id', (req, res) => {
    repository.deleteCharacter(req.params.id)
      .then(() => res.sendStatus(202))
      .catch((error) => res.status(400).json(error));
  });

  router.post('/characters', (req, res) => {
    const character = req.body;

    repository.createCharacter(character)
      .then((id) => res.status(201).json({
        id,
      }))
      .catch((error) => res.status(400).json(error));
  });

  router.put('/characters/:id', (req, res) => {
    const characterData = req.body;

    repository.editCharacter(req.params.id, characterData)
      .then((id) => res.sendStatus(204))
      .catch((error) => res.status(400).json(error));
  });

  router.post('/favourites/:id', (req, res) => {
    repository.addFavouriteCharacter(USER_ID, req.params.id)
      .then((id) => res.sendStatus(204))
      .catch((error) => res.status(400).json(error));
  });

  router.get('/favourites', (req, res) => {
    repository.getFavouriteCharactersIds(USER_ID)
      .then((favouritesIds) => res.status(200).json({
        favourites: favouritesIds,
      }))
      .catch(() => res.sendStatus(500));
  });

  router.delete('/favourites/:id', (req, res) => {
    repository.removeFavouriteCharacter(USER_ID, req.params.id)
      .then((id) => res.sendStatus(204))
      .catch((error) => res.status(400).json(error));
  });

  app.use('/api', router);
};
