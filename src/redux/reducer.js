import { persistCombineReducers } from 'redux-persist';
import { persistConfig } from './persist';

// ## Reducer Imports ##
import GameStateReducer from '../state/game';
import rest from '../utils/rest';

export default persistCombineReducers(persistConfig, {
  // ## Reducers ##

  gameState: GameStateReducer,

  ...rest.reducers,
});
