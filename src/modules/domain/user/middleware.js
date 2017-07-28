import {APP_BOOTED} from '../../ui/app';
import {fetchUser} from './actions';

export default ({getState, dispatch}) => (next) => (action) => {
  const returnValue = next(action);

  if (action.type === APP_BOOTED) {
    dispatch(fetchUser());
  }

  return returnValue;
};
