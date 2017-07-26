const MongoClient = require('mongodb').MongoClient;

const initialCharacters = require('../../characters.json').characters;

const mongoUrl = process.env.MONGODB_URL ||
  `mongodb://localhost:27017/characters-challenge`;

const connectMongo = () => new Promise((resolve, reject) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err !== null) {
      return reject(err);
    }

    resolve(db);
  });
});

connectMongo()
  .then((db) => {
    const collection = db.collection('characters');

    return collection.deleteMany()
      .then(() => collection.insertMany(initialCharacters))
      .then(() => db.close());
  })
  .then(() => console.log('Data loaded.'));
