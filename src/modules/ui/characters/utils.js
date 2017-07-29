import {omit} from 'lodash';

export const transformFormData = (data) => {
  const transformed = Object.assign({}, data, {
    birth_year: data.birth_year === '' ? null : data.birth_year + data.era,
  });

  return omit(transformed, ['_id']);
};
