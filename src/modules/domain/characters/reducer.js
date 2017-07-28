import {union, without} from 'lodash';

import {
  SET_CHARACTERS,
  SET_CHARACTER_PENDING,
  UNSET_CHARACTER_PENDING,
  REMOVE_CHARACTER_SUCCEED,
  CREATE_CHARACTER,
} from './actions';

const initialState = {
  fetched: true,
  pending: [],
  list: [],
};

export default function characters(state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTERS:
      return Object.assign({}, state, {
        fetched: false,
        list: [...action.payload],
      });
    case REMOVE_CHARACTER_SUCCEED:
      return Object.assign({}, state, {
        list: state.list.filter(({_id}) => _id !== action.payload),
      });
    case SET_CHARACTER_PENDING:
      return Object.assign({}, state, {
        pending: union(state.pending, [action.payload]),
      });
    case UNSET_CHARACTER_PENDING:
      return Object.assign({}, state, {
        pending: without(state.pending, action.payload),
      });
    case CREATE_CHARACTER:
      return Object.assign({}, state, {
        list: state.list.concat(action.payload),
      });
    default:
      return state;
  }
}
