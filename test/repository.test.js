const {execSync, spawn} = require('child_process');
const ObjectID = require('mongodb').ObjectID;

const connectMongo = require('../server/utils/connectMongo');
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

beforeAll(() => {
  return new Promise((resolve) => {
    execSync('mkdir -p ./mongo-test');
    mongoProcess = spawn('mongod', ['--dbpath', 'mongo-test', '--port', mongoPort]);

    const mongoReadyListener = createMongoReadyListener(() => {
      mongoProcess.stdout.removeListener('data', mongoReadyListener);

      connectMongo(mongoUrl)
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
    return mongoClient.collection('characters').deleteMany();
  });

  test('should successfully delete character from database', () => {
    expect.assertions(1);

    return expect(repository.deleteCharacter(characterId)).resolves.toBeNull();
  });

  test('should successfully delete character from database and remove it from users\' favourites lists', () => {
    expect.assertions(1);

    const userId = new ObjectID();

    return mongoClient.collection('users').insertOne({
      '_id': userId,
      'favouriteCharacters': [characterId],
    })
      .then(() => repository.deleteCharacter(characterId))
      .then(() => (
        mongoClient.collection('users').findOne({
          '_id': userId,
        }, {
          'favouriteCharacters': true,
        })
      ))
      .then((user) => {
        expect(user.favouriteCharacters).toHaveLength(0);
      });
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

describe('List ids of favourite characters', () => {
  const userId = new ObjectID();
  const favouriteId1 = new ObjectID();
  const favouriteId2 = new ObjectID();

  beforeEach(() => {
    return mongoClient.collection('users').insertOne({
      '_id': userId,
      'favouriteCharacters': [favouriteId1, favouriteId2],
    });
  });

  afterEach(() => {
    return mongoClient.collection('users').deleteMany();
  });

  test('should return all favourite characters ids', () => {
    expect.assertions(1);

    return expect(repository.getFavouriteCharactersIds(userId))
      .resolves.toHaveLength(2);
  });

  test('should reject if user not exist', () => {
    expect.assertions(1);

    return expect(repository.getFavouriteCharactersIds(new ObjectID()))
      .rejects.toHaveProperty('error', 'User not exist.');
  });
});

describe('Add character to favourites', () => {
  const userId = new ObjectID();
  let characterId;

  beforeEach(() => {
    const createUserPromise = mongoClient.collection('users').insertOne({
      '_id': userId,
      'favouriteCharacters': [],
    });

    const createCharacterPromise = repository.createCharacter(validCharacter());

    return Promise.all([createUserPromise, createCharacterPromise])
      .then(([userResult, _characterId]) => {
        characterId = _characterId;
      });
  });

  afterEach(() => {
    return Promise.all([
      mongoClient.collection('users').deleteMany(),
      mongoClient.collection('characters').deleteMany(),
    ]);
  });

  test('should add character to favourites list of user', () => {
    expect.assertions(1);

    return repository.addFavouriteCharacter(userId, characterId)
      .then(() => (
        mongoClient.collection('users').findOne({
          '_id': userId,
        }, {
          'favouriteCharacters': true,
        })
      ))
      .then(({favouriteCharacters}) => (
        expect(favouriteCharacters).toHaveLength(1)
      ));
  });

  test('should reject if character not exist', () => {
    expect.assertions(1);

    return expect(repository.addFavouriteCharacter(userId, new ObjectID()))
      .rejects.toHaveProperty('error', 'Character not exist.');
  });

  test('should reject if character is already favourite', () => {
    expect.assertions(1);

    return repository.addFavouriteCharacter(userId, characterId)
      .then(() => expect(repository.addFavouriteCharacter(userId, characterId))
        .rejects.toHaveProperty('error', 'Character already favourite.')
      );
  });
});


describe('Remove character from favourites', () => {
  const userId = new ObjectID();
  let characterId;

  beforeEach(() => {
    return repository.createCharacter(validCharacter())
      .then((_characterId) => {
        characterId = _characterId;

        return mongoClient.collection('users').insertOne({
          '_id': userId,
          'favouriteCharacters': [characterId],
        });
      });
  });

  afterEach(() => {
    return Promise.all([
      mongoClient.collection('users').deleteMany(),
      mongoClient.collection('characters').deleteMany(),
    ]);
  });

  test('should remove character from favourites', () => {
    expect.assertions(1);

    return repository.removeFavouriteCharacter(userId, characterId)
      .then(() => (
        mongoClient.collection('users').findOne({
          '_id': userId,
        }, {
          'favouriteCharacters': true,
        })
      ))
      .then(({favouriteCharacters}) => (
        expect(favouriteCharacters).toHaveLength(0)
      ));
  });

  test('should reject if character is not favourite', () => {
    expect.assertions(1);

    return expect(repository.removeFavouriteCharacter(userId, new ObjectID()))
      .rejects.toHaveProperty('error', 'Character is not favourite.');
  });
});
