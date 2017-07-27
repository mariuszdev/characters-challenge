import {APP_BOOTED} from '../../ui/app';

export default ({getState}) => (next) => (action) => {
  const returnValue = next(action);

  if (action.type === APP_BOOTED) {
    console.log('fetch favourites');
  }

  return returnValue;
};
