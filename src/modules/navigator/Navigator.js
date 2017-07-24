import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import LoginView from '../login/LoginView';

/*
const headerColor = '#333333';
const activeColor = '#15a369';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Experts: { screen: ExpertsView },
  Lectures: { screen: LecturesContainer },
  Profile: { screen: ProfileContainer },
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: { backgroundColor: activeColor },
        style: { backgroundColor: headerColor },
      },
    }),
  },
});

MainScreenNavigator.navigationOptions = {
  title: 'XPRT',
  header: {
    titleStyle: { color: '#15a369' },
    style: {
      backgroundColor: headerColor,
      elevation: 0, // disable header elevation when TabNavigator visible
    },
  },
};
*/

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Login: { screen: LoginView },
}, {
  headerMode: 'none',
});

export default AppNavigator;
