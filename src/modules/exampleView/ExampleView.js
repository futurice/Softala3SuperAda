import React, { PropTypes } from 'react';

import { Text, View, StyleSheet } from 'react-native';

import * as NavigationState from '../../modules/navigation/NavigationState';

const color = () => Math.floor(255 * Math.random());

const ExampleView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      background: `rgba(${color()},${color()},${color()}, 1)`,
    };
  },

  render() {
    const text = `Hello world from ExampleView!`;
    return (
      <View
        style={[styles.container, { backgroundColor: this.state.background }]}
      >
        <Text>
          {text}
        </Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ExampleView;
