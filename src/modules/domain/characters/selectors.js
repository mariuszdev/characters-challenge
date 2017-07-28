import {get} from 'lodash';
import {createSelector} from 'reselect';

import {getSearchQuery} from '../../ui/characters/selectors';

const defaultList = [];

export const getCharacters = (state) =>
  get(state, ['domain', 'characters', 'list'], defaultList);

export const getCharactersSearched = createSelector(getCharacters, getSearchQuery, (characters, searchQuery = '') => {
  const searchQueryNormalized = searchQuery.trim().toLowerCase();

  return characters.filter(({name}) => name.toLowerCase().indexOf(searchQueryNormalized) >= 0);
});

export const getCharactersPending = (state) =>
  get(state, ['domain', 'characters', 'fetched'], true);

export const isCharacterPending = (state, characterId) =>
  get(state, ['domain', 'characters', 'pending'], []).indexOf(characterId) >= 0;
