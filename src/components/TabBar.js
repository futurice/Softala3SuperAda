import React, { PropTypes } from 'react';
import TabBarButton from '../components/TabBarButton';

import { NavigationExperimental, StyleSheet, View, Image } from 'react-native';

const { PropTypes: NavigationPropTypes } = NavigationExperimental;

const TabBar = React.createClass({
  displayName: 'TabBar',
  propTypes: {
    tabs: NavigationPropTypes.navigationState.isRequired,
    height: PropTypes.number.isRequired,
    currentTabIndex: PropTypes.number.isRequired,
    switchTab: PropTypes.func.isRequired,
  },

  render() {
    this.props.tabs.routes.forEach((route, index) => {
      route.index = index;
    });

    const tabRoutes = this.props.tabs.routes.filter(route => !!route.title);

    return (
      <View style={[styles.navigationBar, { height: this.props.height }]}>
        {tabRoutes.map(route =>
          <TabBarButton
            key={'tab-bar-button-' + route.key}
            text={route.title}
            action={() => this.props.switchTab(route.key)}
            isSelected={route.index === this.props.currentTabIndex}
          />,
        )}
      </View>
    );
  },
});

const styles = StyleSheet.create({
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    flex: 1,
    position: 'relative',
  },
});

export default TabBar;
