import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

import {middleware as charactersMiddleware} from '../modules/domain/characters';
import {middleware as userMiddleware} from '../modules/domain/user';

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    createLogger({
      predicate: () => process.env.NODE_ENV === 'production' ? false : true,
    }),
    userMiddleware,
    charactersMiddleware,
  ),
);
