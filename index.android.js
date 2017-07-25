import { Provider } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';

import persistStore from './src/utils/persist';
import store from './src/redux/store';
import AppView from './src/modules/AppView';

export default class SuperAda extends Component {
  state = { rehydrated: false };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    persistStore(store, () => this.setState({ rehydrated: true }));
  }

  navigateBack() {
    const navigatorState = store.getState().navigatorState;

    const currentStackScreen = navigatorState.index;
    const currentTab = navigatorState.routes[0].index;

    if (currentTab !== 0 || currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  }

  render() {
    const { rehydrated } = this.state;

    return (
      <Provider store={store}>
        <AppView isReady={rehydrated} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SuperAda', () => SuperAda);
