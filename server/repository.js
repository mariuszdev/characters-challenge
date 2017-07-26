const uuid = require('uuid');

const validate = require('./validators/character');

class MongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
  }

  createCharacter(character) {
    return new Promise((resolve, reject) => {
      const errors = validate(character);
      if (errors) {
        return reject(errors);
      }

      const charactersCollection = this.mongoClient.collection('characters');
      const characterWithId = Object.assign({}, character, {
        id: uuid(),
      });

      return charactersCollection.insertOne(characterWithId)
        .then((data) => data.insertedId.toString())
        .then(resolve);
    });
  }
}

module.exports = function createRepository(mongoClient) {
  return new MongoRepository(mongoClient);
};
