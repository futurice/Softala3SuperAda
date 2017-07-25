import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

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
  },
);

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Login: { screen: LoginView },
  Main: { screen: MainScreenNavigator },
  Map: { screen: MapView },
});

export default AppNavigator;
