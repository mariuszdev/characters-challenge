import {SET_CHARACTERS} from './actions';

const initialState = {
  pending: true,
  list: [],
};

export default function characters(state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTERS:
      return Object.assign({}, state, {
        pending: false,
        list: [...action.payload],
      });
    default:
      return state;
  }
}
