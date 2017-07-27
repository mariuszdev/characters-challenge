import {combineReducers} from 'redux';

import {reducer as user} from '../modules/domain/user';

export default combineReducers({
  user,
});
