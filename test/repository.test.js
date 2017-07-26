const {execSync, spawn} = require('child_process');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const createRepository = require('../server/repository');

let mongoProcess;
let mongoClient;
let repository;

const mongoPort = '27018';
const mongoUrl = `mongodb://localhost:${mongoPort}/characters-challenge-test`;

const validCharacter = () => ({
  'name': 'Luke Skywalker',
  'height': 172,
  'mass': 77,
  'hair_color': 'blond',
  'skin_color': 'fair',
  'eye_color': 'blue',
  'birth_year': '19BBY',
  'is_male': true,
});

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
          repository = createRepository(db);
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
  afterAll(() => {
    return mongoClient.collection('characters').deleteMany();
  });

  test('should successfully create character in database', () => {
    expect.assertions(1);

    return repository.createCharacter(validCharacter())
      .then((characterId) => {
        expect(typeof characterId).toBe('string');
      });
  });

  test('should reject when invalid character data passed', () => {
    expect.assertions(1);

    const invalidCharacter = Object.assign({}, validCharacter(), {
      name: 'A',
    });

    return expect(repository.createCharacter(invalidCharacter))
      .rejects
      .toMatchObject(expect.objectContaining({
        name: expect.arrayContaining(['Name length should be between 2 and 20 including']),
      }));
  });
});

describe('Delete single character', () => {
  let characterId;

  beforeEach(() => {
    return repository.createCharacter(validCharacter())
      .then((_characterId) => {
        characterId = _characterId;
      });
  });

  afterEach(() => {
    return mongoClient.collection('characters').deleteOne({
      '_id': new ObjectID(characterId),
    });
  });

  test('should successfully delete character from database', () => {
    expect.assertions(1);

    return expect(repository.deleteCharacter(characterId)).resolves.toBeNull();
  });

  test('should reject when character not exist', () => {
    expect.assertions(1);

    return expect(repository.deleteCharacter(new ObjectID())).rejects.toMatchObject({
      error: 'Character not exist.',
    });
  });
});

describe('Update character', () => {
  let characterId;

  beforeEach(() => {
    return repository.createCharacter(validCharacter())
      .then((_characterId) => {
        characterId = _characterId;
      });
  });

  afterEach(() => {
    return mongoClient.collection('characters').deleteOne({
      '_id': new ObjectID(characterId),
    });
  });

  test('should successfully edit character\'s name', () => {
    expect.assertions(1);
    const newName = 'Anakin Skywalker';

    return repository.editCharacter(characterId, {
      name: newName,
    })
      .then(() => (
        mongoClient.collection('characters').findOne({
          '_id': new ObjectID(characterId),
        })
      ))
      .then((character) => {
        expect(character).toHaveProperty('name', newName);
      });
  });

  test('should reject when character not exist', () => {
    expect.assertions(1);

    return expect(repository.editCharacter(new ObjectID(), {
      name: 'Anakin Skywalker',
    })).rejects.toMatchObject({
      error: 'Character not exist.',
    });
  });

  test('should reject when invalid character height passed', () => {
    expect.assertions(1);

    return expect(repository.editCharacter(characterId, {
      height: -10,
    })).rejects.toMatchObject(expect.objectContaining({
      height: expect.arrayContaining(['Height must be greater than 0']),
    }));
  });
});

describe('Get all characters', () => {
  beforeEach(() => {
    const characterA = validCharacter();
    const characterB = Object.assign(validCharacter(), {
      name: 'Sebulba',
    });

    return Promise.all([
      repository.createCharacter(characterA),
      repository.createCharacter(characterB),
    ]);
  });

  afterEach(() => {
    return mongoClient.collection('characters').deleteMany({});
  });

  test('should return all existing characters', () => {
    expect.assertions(1);

    return expect(repository.getAllCharacters())
      .resolves.toHaveLength(2);
  });
});
