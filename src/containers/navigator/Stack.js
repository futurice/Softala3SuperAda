import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import appConfig from '../../../app.json';

// ## View Imports ##
import LoginView from '../views/Login';
import MapView from '../views/Map';
import FeedbackView from '../views/Feedback';
import ThankYouView from '../views/ThankYou';
import Tabs from './Tabs';

const StackNavigatorConfig = {
  navigationOptions: {
    ...Platform.select({
      android: {
        headerStyle: {
          paddingTop: StatusBar.currentHeight,
          height: StatusBar.currentHeight + 56,
        }
      }
    })
  }
  //headerMode: 'none',
};

export default StackNavigator(
  {
    Login: { screen: LoginView },
    Tabs: { screen: Tabs, },
    Map: { screen: MapView, },
    Feedback: { screen: FeedbackView, },
    ThankYou: { screen: ThankYouView, },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
