import { connect } from 'react-redux';
import * as GameState from '../../state/GameState';
import rest from '../../utils/rest';
import Puzzle from './Puzzle';

export default connect(
  state => ({
    discoveredSoFar: state.gameState.discoveredSoFar,
    wordsToFind: state.gameState.wordsToFind,
    gameState: state.gameState,
  }),
  dispatch => ({
    gameStarted() {
      dispatch(GameState.gameStarted(Date.now()));
    },
    tickTimer() {
      dispatch(GameState.tickTimer());
    },
    gameCompleted(points) {
      dispatch(
        rest.actions.quiz.post(
          {},
          {
            body: JSON.stringify({ points: points }),
          },
          (err, data) => {
            if (!err) {
              console.log('successfully set quiz points: ', points);
            } else {
              console.log('Error setting quiz points: ', err, data);
            }
          },
        ),
      );

      dispatch(GameState.gameCompleted(Date.now()));
    },
    wordFound(word) {
      dispatch(GameState.wordFound(word));
    },
  }),
)(Puzzle);
