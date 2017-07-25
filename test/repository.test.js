const {execSync, spawn} = require('child_process');
const MongoClient = require('mongodb').MongoClient;
const createRepository = require('../server/repository');

let mongoProcess;
let mongoClient;

const mongoPort = '27018';
const mongoUrl = `mongodb://localhost:${mongoPort}/characters-challenge-test`;

const createMongoReadyListener = (onReady) => (data) => {
  if (data.toString().indexOf('waiting for connections') >= 0) {
    onReady();
  }
};

const connectMongo = () => new Promise((resolve, reject) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err !== null) {
      return reject(err);
    }

    resolve(db);
  });
});

beforeAll((done) => {
  execSync('mkdir -p ./mongo-test');
  mongoProcess = spawn('mongod', ['--dbpath', 'mongo-test', '--port', mongoPort]);

  const mongoReadyListener = createMongoReadyListener(() => {
    mongoProcess.stdout.removeListener('data', mongoReadyListener);

    connectMongo()
      .then((db) => {
        mongoClient = db;
      })
      .then(done);
  });

  mongoProcess.stdout.on('data', mongoReadyListener);
});

afterAll((done) => {
  mongoClient.close()
    .then(() => {
      mongoProcess.kill();
      execSync('rm -rf ./mongo-test');
      done();
    });
});

describe('Creating single character', () => {
  const repository = createRepository(mongoClient);
  const validCharacter = {
    'name': 'Luke Skywalker',
    'height': 172,
    'mass': 77,
    'hair_color': 'blond',
    'skin_color': 'fair',
    'eye_color': 'blue',
    'birth_year': '19BBY',
    'is_male': true,
  };

  test('should successfully create character in database', () => {
    expect.assertions(1);

    return repository.createCharacter(validCharacter)
      .then((characterId) => {
        expect(typeof characterId).toBe('string');
      });
  });
});
