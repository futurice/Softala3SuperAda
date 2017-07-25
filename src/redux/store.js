import { applyMiddleware, createStore, compose } from 'redux';
//import * as reduxLoop from 'redux-loop';

import middleware from './middleware';
import reducer from './reducer';

const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers =
  (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(...enhancers);

// create the store
const store = createStore(reducer, null, enhancer);

export default store;
