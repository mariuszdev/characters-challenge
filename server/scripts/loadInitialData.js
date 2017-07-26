const connectMongo = require('../utils/connectMongo');

const initialCharacters = require('../../characters.json').characters;

const mongoUrl = process.env.MONGODB_URL ||
  `mongodb://localhost:27017/characters-challenge`;

connectMongo(mongoUrl)
  .then((db) => {
    const collection = db.collection('characters');

    return collection.deleteMany()
      .then(() => collection.insertMany(initialCharacters))
      .then(() => db.close());
  })
  .then(() => console.log('Data loaded.'));
