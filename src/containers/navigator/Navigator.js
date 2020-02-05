import React from 'react';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import RootNavigator from './Stack';

export const handleBackButton = (store) => {
  const { navigatorState } = store.getState();

  // Attempt to find a TabNavigator with routeName 'Tabs'
  const tabNavigatorIndex = navigatorState.routes.findIndex(
    route => route.routeName === 'Tabs',
  );

  if (tabNavigatorIndex !== -1) {
    // TabNavigator found, check if we are on first tab or not
    const currentTab = navigatorState.routes[tabNavigatorIndex];

    if (currentTab.index !== 0) {
      // We are not on the first tab, send back action to react-navigation
      store.dispatch(NavigationActions.back());
      return true;
    }
  } else {
    // Else assume root navigator behaves like a StackNavigator
    if (navigatorState.routes.length > 1) {
      // We are not at bottom of stack, send back action to react-navigation
      store.dispatch(NavigationActions.back());
      return true;
    }
  }

  // We are at bottom of stack or on first tab, so we let the OS handle the back
  // button press. Returning false here will close the app.
  return false;
};

const mapStateToProps = ({ navigatorState }) => ({ navigatorState });

export class NavigatorView extends React.Component {
  render = () =>
    <RootNavigator
      navigation={{
        dispatch: this.props.dispatch,
        state: this.props.navigatorState
      }}
    />;
}

export { RootNavigator };

// export default connect(mapStateToProps)(createAppContainer(NavigatorView));

// Redux integration not supported in new versions of react-navigation
// TODO: Need to reimplement navigation to go through react navigation instead of redux state
export default createAppContainer(RootNavigator);
