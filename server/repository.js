class MongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
  }

  createCharacter() {
    return new Promise((resolve) => {
      resolve('123');
    });
  }
}

module.exports = function createRepository(mongoClient) {
  return new MongoRepository(mongoClient);
};
