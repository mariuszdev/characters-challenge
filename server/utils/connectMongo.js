const MongoClient = require('mongodb').MongoClient;

module.exports = function connectMongo(mongoUrl) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err !== null) {
        return reject(err);
      }

      resolve(db);
    });
  });
};
