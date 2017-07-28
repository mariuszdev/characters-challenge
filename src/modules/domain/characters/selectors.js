import {get} from 'lodash';

const defaultList = [];

export const getCharacters = (state) =>
  get(state, ['domain', 'characters', 'list'], defaultList);

export const getCharactersPending = (state) =>
  get(state, ['domain', 'characters', 'fetched'], true);

export const isCharacterPending = (state, characterId) =>
  get(state, ['domain', 'characters', 'pending'], []).indexOf(characterId) >= 0;
