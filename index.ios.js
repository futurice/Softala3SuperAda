import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import persistStore from './src/utils/persist';
import store from './src/redux/store';
import AppView from './src/modules/AppView';

export default class SuperAda extends Component {
  state = { rehydrated: false };

  componentWillMount() {
    persistStore(store, () => this.setState({ rehydrated: true }));
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
