import { persistCombineReducers } from 'redux-persist';
import { persistConfig } from './persist';

// ## Reducer Imports ##
import NavigatorStateReducer from '../state/navigator';
import GameStateReducer from '../state/game';
import rest from '../utils/rest';

export default persistCombineReducers(persistConfig, {
  // ## Reducers ##

  // Navigator state
  navigatorState: NavigatorStateReducer,

  gameState: GameStateReducer,

  ...rest.reducers,
});
