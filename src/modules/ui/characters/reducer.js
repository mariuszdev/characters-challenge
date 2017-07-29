import {
  SEARCH_CHARACTERS,
  SET_CHARACTER_EDITED,
  CLEAR_CHARACTER_EDITED,
} from './actions';

const initialState = {
  searchQuery: '',
  characterEdited: null,
};

export default function characters(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CHARACTERS:
      return Object.assign({}, state, {
        searchQuery: action.payload,
      });
    case SET_CHARACTER_EDITED:
      return Object.assign({}, state, {
        characterEdited: action.payload,
      });
    case CLEAR_CHARACTER_EDITED:
      return Object.assign({}, state, {
        characterEdited: null,
      });
    default:
      return state;
  }
}
