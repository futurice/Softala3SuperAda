import { createAppContainer } from 'react-navigation';
import RootNavigator from './Stack';
//import { createStore, applyMiddleware, combineReducers } from 'redux';

export default createAppContainer(RootNavigator);
