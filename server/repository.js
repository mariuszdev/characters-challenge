const mongodb = require('mongodb');

const validate = require('./validators/character');

class MongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.charactersCollection = this.mongoClient.collection('characters');
    this.usersCollection = this.mongoClient.collection('users');
  }

  _findCharacter(characterId) {
    return this.charactersCollection.findOne({
      '_id': new mongodb.ObjectID(characterId),
    })
      .then((character) => character ? character : Promise.reject());
  }

  createCharacter(character) {
    return new Promise((resolve, reject) => {
      const errors = validate(character);
      if (errors) {
        return reject(errors);
      }

      return resolve(
        this.charactersCollection.insertOne(character)
          .then((data) => data.insertedId.toString())
      );
    });
  }

  deleteCharacter(characterId) {
    return this.charactersCollection.deleteOne({
      '_id': new mongodb.ObjectID(characterId),
    }).then(({deletedCount}) => {
      if (deletedCount === 0) {
        return Promise.reject({
          error: 'Character not exist.',
        });
      }
    }).then(() => {
      return this.usersCollection.find().toArray()
        .then((users) => {
          const removeFromFavouritePromises = users
            .filter(({favouriteCharacters}) => favouriteCharacters.indexOf(characterId) >= 0)
            .map(({_id}) => this.removeFavouriteCharacter(_id, characterId));

          return Promise.all(removeFromFavouritePromises).then(() => null);
        });
    });
  }

  editCharacter(characterId, data) {
    return this._findCharacter(characterId)
      .catch(() => Promise.reject({
        error: 'Character not exist.',
      }))
      .then(
        (character) => {
          const newCharacterData = Object.assign({}, character, data);
          const errors = validate(newCharacterData);

          if (errors) {
            return Promise.reject(errors);
          }

          this.charactersCollection.updateOne({
            '_id': new mongodb.ObjectID(characterId),
          }, newCharacterData)
            .then(() => Promise.resolve());
        }
      );
  }

  getAllCharacters() {
    return this.charactersCollection.find().toArray();
  }

  getFavouriteCharactersIds(userId) {
    return this.usersCollection.findOne({
      '_id': userId,
    }, {
      'favouriteCharacters': true,
    }).then((user) => {
      if (user) {
        return user.favouriteCharacters;
      }

      return Promise.reject({
        error: 'User not exist.',
      });
    });
  }

  addFavouriteCharacter(userId, characterId) {
    return this.getAllCharacters()
      .then((characters) => {
        if (characters.map((character) => character._id.toString()).indexOf(characterId) === -1) {
          return Promise.reject({
            error: 'Character not exist.',
          });
        }
      })
      .then(() => this.getFavouriteCharactersIds(userId))
      .then((favouriteCharacters) => {
        if (favouriteCharacters.indexOf(characterId) >= 0) {
          return Promise.reject({
            error: 'Character already favourite.',
          });
        }

        return favouriteCharacters;
      })
      .then((favouriteCharacters) => (
        this.usersCollection.updateOne({
          '_id': userId,
        }, {
          $set: {
            favouriteCharacters: [...favouriteCharacters, characterId],
          },
        })
      ));
  }

  removeFavouriteCharacter(userId, characterId) {
    return this.getFavouriteCharactersIds(userId)
      .then((favouriteCharacters) => {
        if (favouriteCharacters.indexOf(characterId) === -1) {
          return Promise.reject({
            error: 'Character is not favourite.',
          });
        }

        return favouriteCharacters;
      })
      .then((favouriteCharacters) => {
        const removedCharacterIndex = favouriteCharacters.indexOf(characterId);
        const favouriteCharactersWithoutRemoved = [...favouriteCharacters];

        favouriteCharactersWithoutRemoved.splice(removedCharacterIndex, 1);

        return this.usersCollection.updateOne({
          '_id': userId,
        }, {
          $set: {
            favouriteCharacters: favouriteCharactersWithoutRemoved,
          },
        });
      });
  }
}

module.exports = function createRepository(mongoClient) {
  return new MongoRepository(mongoClient);
};
