import {SET_CHARACTERS} from './actions';

const initialState = [];

export default function characters(state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTERS:
      return [...action.payload];
    default:
      return state;
  }
}
