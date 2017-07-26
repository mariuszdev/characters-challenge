const validate = require('validate.js');

const constraints = {
  name: {
    presence: true,
    length: {
      minimum: 2,
      maximum: 20,
      message: (value, attribute, options) =>
        `length should be between ${options.minimum} and ${options.maximum} including`,
    },
  },
  height: {
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
  mass: {
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
  hair_color: {
    presence: true,
    length: {
      minimum: 1,
    },
  },
  skin_color: {
    presence: true,
    length: {
      minimum: 1,
    },
  },
  eye_color: {
    presence: true,
    length: {
      minimum: 1,
    },
  },
  birth_year: {
    presence: true,
    format: {
      pattern: /^\d+(ABY|BBY)$/,
    },
  },
  is_male: {
    presence: true,
    inclusion: {
      within: [true, false],
      message: '^Male indicator should be true or false',
    },
  },
};

module.exports = function validateCharacter(data) {
  return validate(data, constraints);
};
