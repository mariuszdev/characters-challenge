const connectMongo = require('../utils/connectMongo');

const initialCharacters = require('../../characters.json').characters;

const mongoUrl = process.env.MONGODB_URL ||
  `mongodb://localhost:27017/characters-challenge`;


const createCharacters = (db) => {
  const collection = db.collection('characters');

  return collection.deleteMany()
    .then(() => collection.insertMany(initialCharacters));
};

const createUsers = (db) => {
  const collection = db.collection('users');

  return collection.deleteMany()
    .then(() => collection.insertOne({
      '_id': '123456789000',
      'favouriteCharacters': [],
    }));
};

connectMongo(mongoUrl)
  .then((db) => (
    createCharacters(db)
      .then(() => createUsers(db))
      .then(() => db.close())
  ))
  .then(() => console.log('Data loaded.'));
