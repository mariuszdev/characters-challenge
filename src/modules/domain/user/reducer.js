import {union, without} from 'lodash';

import {
  SET_FAVOURITE_CHARACTERS,
  SET_USER_FETCHED,
  ADD_FAVOURITE_CHARACTER_SUCCEED,
  REMOVE_FAVOURITE_CHARACTER_SUCCEED,
} from './actions';

const initialState = {
  logged: true,
  fetched: false,
  favouriteCharacters: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_FAVOURITE_CHARACTERS:
      return Object.assign({}, state, {
        favouriteCharacters: [...action.payload],
      });
    case SET_USER_FETCHED:
      return Object.assign({}, state, {
        fetched: true,
      });
    case ADD_FAVOURITE_CHARACTER_SUCCEED:
      return Object.assign({}, state, {
        favouriteCharacters: union(state.favouriteCharacters, [action.payload]),
      });
    case REMOVE_FAVOURITE_CHARACTER_SUCCEED:
      return Object.assign({}, state, {
        favouriteCharacters: without(state.favouriteCharacters, action.payload),
      });
    default:
      return state;
  }
}
