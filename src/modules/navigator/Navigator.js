import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import LoginView from '../login/LoginView';
import WelcomeView from '../welcome/Welcome';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Welcome: { screen: WelcomeView },
  //Lectures: { screen: LecturesContainer },
  //Profile: { screen: ProfileContainer },
  //Profile: { screen: ProfileContainer },
});

MainScreenNavigator.navigationOptions = {
  title: 'SuperAda v2',
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginView },
    MainScreen: { screen: MainScreenNavigator },
  },
  {
    headerMode: 'none',
  },
);

export default AppNavigator;
