import {get} from 'lodash';
import {createSelector} from 'reselect';

import {getCharacter} from '../../domain/characters';

const defaultSearchQuery = '';

export const getSearchQuery = (state) =>
  get(state, ['ui', 'characters', 'searchQuery'], defaultSearchQuery);

export const getCharacterEditedId = (state) =>
  get(state, ['ui', 'characters', 'characterEdited']);

export const getCharacterEditedFormData = createSelector(
  [getCharacterEditedId, (state) => state],
  (characterEditedId, state) => {
    const character = getCharacter(state, characterEditedId);

    return {
      ...character,
      birth_year: parseInt(character.birth_year, 10),
      era: character.birth_year.match(/(\D+)$/)[0],
    };
  }
);
