const uuid = require('uuid');
const mongodb = require('mongodb');

const validate = require('./validators/character');

class MongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.charactersCollection = this.mongoClient.collection('characters');
  }

  createCharacter(character) {
    return new Promise((resolve, reject) => {
      const errors = validate(character);
      if (errors) {
        return reject(errors);
      }

      const characterWithId = Object.assign({}, character, {
        id: uuid(),
      });

      return resolve(
        this.charactersCollection.insertOne(characterWithId)
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
}

module.exports = function createRepository(mongoClient) {
  return new MongoRepository(mongoClient);
};
