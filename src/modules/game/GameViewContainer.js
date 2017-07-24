import { connect } from 'react-redux';
import rest from '../../utils/rest';
import * as GameState from './GameState';
import GameView from './GameView';

export default connect(
  state => ({
    gameState: state.gameState,
    quizStatus: state.quiz,
  }),
  dispatch => ({
    initialiseGame() {
      dispatch(GameState.initGame());
    },
    refresh() {
      dispatch(rest.actions.quiz.sync());
    },
    deleteGame() {
      dispatch(rest.actions.quiz.delete());
    },
    pauseGame() {
      dispatch(GameState.gamePause());
    },
    resumeGame() {
      dispatch(GameState.gameResume());
    },
  }),
)(GameView);
