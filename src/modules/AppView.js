import React, { PropTypes, Component } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import NavigatorView from './navigator/NavigatorView';

const styles = {
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
};

export class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
  };

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#455a64" barStyle="light-content" />
        <NavigatorView />
      </View>
    );
  }
}

export default AppView;
