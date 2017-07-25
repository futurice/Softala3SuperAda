import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

// StackNavigator's initial view
import LoginView from '../login/LoginView';

// TabNavigator's four tabs
import WelcomeView from '../welcome/Welcome';
//import TeamView from '../team/TeamView';
//import CheckpointsView from '../checkpoints/CheckPointView';
//import QuizView from '../quiz/QuizView';

// Subviews
//import MapView from '../map/MapView';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Welcome: { screen: WelcomeView },
  //Team: { screen: TeamView },
  //Checkpoints: { screen: CheckPointView },
  //Quiz: { screen: QuizView },
});

MainScreenNavigator.navigationOptions = {
  title: 'SuperAda v2',
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginView },
    MainScreen: { screen: MainScreenNavigator },
    //MapScreen: { screen: MapScreen},
  },
  {
    headerMode: 'none',
  },
);

export default AppNavigator;
