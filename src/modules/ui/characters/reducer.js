import {
  SEARCH_CHARACTERS,
} from './actions';

const initialState = {
  searchQuery: '',
};

export default function characters(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CHARACTERS:
      return Object.assign({}, state, {
        searchQuery: action.payload,
      });
    default:
      return state;
  }
}
