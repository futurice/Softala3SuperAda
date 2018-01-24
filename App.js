import React from 'react';
import { BackHandler } from 'react-native';
import { AppLoading, Font, Util } from 'expo';
import I18n from 'ex-react-native-i18n';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import persistStore from './src/redux/persist';

import Navigator, {
  handleBackButton,
} from './src/containers/navigator/Navigator';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  startAsync = async () => {
    // Call Util.reload() which is supposed to download latest app version &
    // relaunch ONLY when there is a JS bundle update available.
    Util.reload();

    // Perform any initialization tasks here while Expo shows its splash screen.
    await persistStore(store);

    await I18n.initAsync();

    await Font.loadAsync('pt-sans', require('./assets/PT_Sans-Web-Bold.ttf'));

    BackHandler.addEventListener('hardwareBackPress', () =>
      handleBackButton(store),
    );
  };

  onFinish = () => this.setState(() => ({ isReady: true }));

  render = () => {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.startAsync}
          onFinish={this.onFinish}
          onError={console.warn}
        />
      );
    }

    // Render the app only after we're done initializing
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  };
}
