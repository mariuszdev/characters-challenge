import {get} from 'lodash';

const defaultList = [];

export const getFavouriteCharactersIds = (state) =>
  get(state, ['domain', 'user', 'favouriteCharacters'], defaultList);

export const isCharacterFavourite = (state, characterId) =>
  getFavouriteCharactersIds(state).indexOf(characterId) >= 0;

export const getUserFetched = (state) =>
  get(state, ['domain', 'user', 'fetched'], false);
