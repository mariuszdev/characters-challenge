import {combineReducers} from 'redux';

import {reducer as user} from '../modules/domain/user';
import {reducer as characters} from '../modules/domain/characters';
import {reducer as charactersUI} from '../modules/ui/characters';

export default combineReducers({
  domain: combineReducers({
    user,
    characters,
  }),
  ui: combineReducers({
    characters: charactersUI,
  }),
});
