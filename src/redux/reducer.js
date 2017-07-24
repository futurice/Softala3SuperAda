//import {combineReducers} from 'redux-loop';
import { combineReducers } from 'redux';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import GameStateReducer from '../modules/game/GameState';
import SessionStateReducer, {
  RESET_STATE,
} from '../modules/session/SessionState';
import rest from '../utils/rest';

const reducers = {
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

  gameState: GameStateReducer,

  ...rest.reducers,
};

const namespacedReducer = combineReducers(reducers);

export default function mainReducer(state, action) {
  if (action.type === RESET_STATE) {
    return namespacedReducer(action.payload, action);
  }

  return namespacedReducer(state || void 0, action);
}
