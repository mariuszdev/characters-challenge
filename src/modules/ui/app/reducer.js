import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from './actions';

const initialState = {
  modalOpen: null,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        modalOpen: action.payload,
      });
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        modalOpen: null,
      });
    default:
      return state;
  }
}
