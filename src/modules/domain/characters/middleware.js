import {APP_BOOTED} from '../../ui/app';
import {fetchCharacters} from './actions';

export default ({getState, dispatch}) => (next) => (action) => {
  const returnValue = next(action);

  if (action.type === APP_BOOTED) {
    dispatch(fetchCharacters());
  }

  return returnValue;
};
