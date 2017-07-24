import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import store from './src/redux/store';
import AppView from './src/modules/AppView';

export default class SuperAda extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppView />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SuperAda', () => SuperAda);
