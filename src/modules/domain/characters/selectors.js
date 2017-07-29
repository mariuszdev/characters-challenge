import {get} from 'lodash';
import {createSelector} from 'reselect';

import {getUserFetched} from '../user';
import {getSearchQuery} from '../../ui/characters/selectors';

const defaultList = [];

export const getCharacters = (state) =>
  get(state, ['domain', 'characters', 'list'], defaultList);

export const getCharacter = (state, id) =>
  getCharacters(state).find(({_id}) => _id === id);

export const getCharactersSearched = createSelector(getCharacters, getSearchQuery, (characters, searchQuery = '') => {
  const searchQueryNormalized = searchQuery.trim().toLowerCase();

  return characters.filter(({name}) => name.toLowerCase().indexOf(searchQueryNormalized) >= 0);
});

export const getCharactersFetched = (state) =>
  get(state, ['domain', 'characters', 'fetched'], false);

export const isCharacterPending = (state, characterId) =>
  get(state, ['domain', 'characters', 'pending'], []).indexOf(characterId) >= 0;

export const getCharactersReady = (state) => (
  getCharactersFetched(state) &&
  getUserFetched(state)
);
