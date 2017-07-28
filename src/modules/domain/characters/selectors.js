import {get} from 'lodash';

const defaultList = [];

export const getCharacters = (state) =>
  get(state, ['domain', 'characters', 'list'], defaultList);

export const getCharactersPending = (state) =>
  get(state, ['domain', 'characters', 'pending'], true);
