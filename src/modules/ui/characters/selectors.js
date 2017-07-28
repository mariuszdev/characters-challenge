import {get} from 'lodash';

const defaultSearchQuery = '';

export const getSearchQuery = (state) =>
  get(state, ['ui', 'characters', 'searchQuery'], defaultSearchQuery);
