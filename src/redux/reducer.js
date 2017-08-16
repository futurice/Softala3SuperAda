//import {combineReducers} from 'redux-loop';
import { combineReducers } from 'redux';
import NavigatorStateReducer from '../state/NavigatorState';
import GameStateReducer from '../state/GameState';
import SessionStateReducer, { RESET_STATE } from '../state/SessionState';
import { LocaleReducer } from '../utils/translation';
import rest from '../utils/rest';

const reducers = {
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

  gameState: GameStateReducer,

  locale: LocaleReducer,

  ...rest.reducers,
};

const namespacedReducer = combineReducers(reducers);

export default function mainReducer(state, action) {
  if (action.type === RESET_STATE) {
    return namespacedReducer(action.payload, action);
  }
  return namespacedReducer(state || void 0, action);
}
