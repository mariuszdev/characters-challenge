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

beforeAll(() => {
  return new Promise((resolve) => {
    execSync('mkdir -p ./mongo-test');
    mongoProcess = spawn('mongod', ['--dbpath', 'mongo-test', '--port', mongoPort]);

    const mongoReadyListener = createMongoReadyListener(() => {
      mongoProcess.stdout.removeListener('data', mongoReadyListener);

      connectMongo()
        .then((db) => {
          mongoClient = db;
        })
        .then(resolve);
    });

    mongoProcess.stdout.on('data', mongoReadyListener);
  });
});

afterAll((done) => {
  mongoClient.close()
    .then(() => {
      mongoProcess.kill();
      execSync('rm -rf mongo-test');
      done();
    });
});


describe('Creating single character', () => {
  let repository;
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

  beforeAll(() => {
    repository = createRepository(mongoClient);
  });

  test('should successfully create character in database', () => {
    expect.assertions(1);

    return repository.createCharacter(validCharacter)
      .then((characterId) => {
        expect(typeof characterId).toBe('string');
      });
  });

  test('should throw error when invalid character data passed', () => {
    expect.assertions(1);

    const invalidCharacter = Object.assign({}, validCharacter, {
      name: 'A',
    });

    return expect(repository.createCharacter(invalidCharacter))
      .rejects
      .toMatchObject(expect.objectContaining({
        name: expect.arrayContaining(['Name length should be between 2 and 20 including']),
      }));
  });
});
