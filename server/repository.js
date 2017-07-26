const mongodb = require('mongodb');

const validate = require('./validators/character');

class MongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.charactersCollection = this.mongoClient.collection('characters');
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
      if (deletedCount === 1) {
        return null;
      }

      return Promise.reject({
        error: 'Character not exist.',
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
}

module.exports = function createRepository(mongoClient) {
  return new MongoRepository(mongoClient);
};
