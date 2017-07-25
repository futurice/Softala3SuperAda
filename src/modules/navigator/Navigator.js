import React from 'react';
import { View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AppStyles from '../AppStyles';

// StackNavigator's initial view
import LoginView from '../views/LoginView';

// TabNavigator's four tabs
import WelcomeView from '../views/WelcomeView';
import TeamView from '../views/TeamView';
import CheckpointsView from '../views/CheckpointsView';
import QuizView from '../views/QuizView';

// Subviews
import MapView from '../views/MapView';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator(
  {
    Welcome: { screen: WelcomeView },
    Team: { screen: TeamView },
    Checkpoints: { screen: CheckpointsView },
    Quiz: { screen: QuizView },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: AppStyles.darkRed,
      inactiveTintColor: AppStyles.darkGrey,
      indicatorStyle: {
        opacity: 0,
      },
      style: {
        backgroundColor: AppStyles.whiteBackground,
      },
      iconStyle: {
        width: 48,
        height: 48,
      },
    },
  },
);

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginView },
    Main: { screen: MainScreenNavigator },
    Map: { screen: MapView },
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontSize: AppStyles.headerFontSize,
        alignSelf: 'center',
      },
      // Hack to get title centered when back button is present on MapView
      headerRight: navigation.state.routeName === 'Map' && <View />,
      headerStyle: { backgroundColor: AppStyles.lightRed },
      headerTintColor: AppStyles.white,
      headerPressColorAndroid: AppStyles.white,
    }),
  },
);

export default AppNavigator;
