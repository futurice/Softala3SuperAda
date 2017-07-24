/*eslint-disable react/prop-types*/

import React from 'react';
import GameViewContainer from './game/GameViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ExampleViewContainer from './exampleView/ExampleViewContainer';
import LoginViewContainer from './login/LoginViewContainer';
import FeedbackViewContainer from './feedback/FeedbackViewContainer';
import MapViewContainer from './map/MapViewContainer';
import TeamViewContainer from './team/TeamViewContainer';
import WelcomeViewContainer from './welcome/WelcomeViewContainer';
import CheckPointViewContainer from './checkpoints/CheckPointViewContainer';
import GoodbyeViewContainer from './goodbye/GoodbyeViewContainer';
import GoodbyeFeedbackViewContainer from './goodbyeFeedback/GoodbyeFeedbackViewContainer';
import TeamPointsViewContainer from './teamPoints/TeamPointsViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'Puzzle') {
    return <GameViewContainer />;
  }

  if (key.indexOf('Color') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return <ColorViewContainer index={index} />;
  }

  if (key === 'ExampleView') {
    return <ExampleViewContainer />;
  }

  if (key === 'LoginView') {
    return <LoginViewContainer />;
  }

  if (key === 'FeedbackView') {
    return <FeedbackViewContainer />;
  }

  if (key === 'Welcome') {
    return <WelcomeViewContainer />;
  }

  if (key === 'MapView') {
    return <MapViewContainer />;
  }
  if (key === 'CheckPoints') {
    return <CheckPointViewContainer />;
  }

  if (key === 'TeamView') {
    return <TeamViewContainer />;
  }

  if (key === 'Goodbye') {
    return <GoodbyeViewContainer />;
  }

  if (key === 'GoodbyeFB') {
    return <GoodbyeFeedbackViewContainer />;
  }

  if (key === 'TeamPointsView') {
    return <TeamPointsViewContainer />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
