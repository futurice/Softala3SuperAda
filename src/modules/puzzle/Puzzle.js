import React, { PropTypes, Component } from 'react';
import Dimensions from 'Dimensions';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import { StyleSheet, View } from 'react-native';
import * as GameState from '../game/GameState';
import Row from './Row';

const screenWidth = Dimensions.get('window').width;
const puzzleWidth = screenWidth - 10;

const onCellPress = component => (cellX, cellY) => event => {
  event.preventDefault();

  const { puzzle, solution, discoveredSoFar, wordFound } = component.props;

  const { found } = solution;

  const { currentWord } = component.state;

  const wordHit = found.filter(foundWordObj => {
    return (
      !discoveredSoFar.words.includes(foundWordObj.word) &&
      foundWordObj.x === cellX &&
      foundWordObj.y === cellY
    );
  });

  if (wordHit.length > 0 || currentWord.wordHit !== null) {
    const { pressedCells } = component.state;
    pressedCells.push({ x: cellX, y: cellY });

    // if we hit the beginning of a new word whilst following
    // a current one, ignore the new one
    currentWord.wordHit = currentWord.wordHit || wordHit[0];

    const { currentWordPressed } = currentWord;
    const { word } = currentWord.wordHit;

    const tmpWord = currentWordPressed.join('') + puzzle[cellY][cellX];
    if (tmpWord === word) {
      // Yeah, found a word!
      wordFound(currentWord.wordHit);

      component.setState({
        currentWord: {
          currentWordPressed: [],
          wordHit: null,
        },
        pressedCells: [],
      });

      return;
    }

    if (word.search(tmpWord) > -1) {
      // Got another letter of the word
      if (tmpWord.length > word.length / 2) {
        wordFound(currentWord.wordHit);

        component.setState({
          currentWord: {
            currentWordPressed: [],
            wordHit: null,
          },
          pressedCells: [],
        });

        return;
      }

      currentWordPressed.push(puzzle[cellY][cellX]);
      component.setState({
        currentWord: {
          currentWordPressed,
          wordHit: currentWord.wordHit,
        },
        pressedCells,
      });
    } else {
      // Letter doesn't belong to a word, reset pressedCells and currentWord
      component.setState({
        currentWord: {
          currentWordPressed: [],
          wordHit: null,
        },
        pressedCells: [],
      });

      return;
    }
  } else {
    // Letter doesn't belong to a word, reset pressedCells and currentWord
    component.setState({
      currentWord: {
        currentWordPressed: [],
        wordHit: null,
      },
      pressedCells: [],
    });
  }
};

const calculatePoints = gameState => {
  const { puzzle, solution, gameStatus, wordsToFind, timer } = gameState;

  const remaining = (__DEV__ ? 10 : 10 * 60) - timer;
  const minutes = Math.floor(remaining / 60);

  // TODO: move this into a config
  const pointsPerMinute = 10;
  const pointsPerWord = 5;
  const pointsCompleted = 100;
  const maxMinutes = 10;
  const puzzleCompleted = wordsToFind === 0;

  // Points per minutes
  const minutesPoints = Math.max(minutes * pointsPerMinute, 0);
  const wordsFound = solution.found.length - wordsToFind;
  const wordsPoints = wordsFound * pointsPerWord;
  const pointsIfCompleted = puzzleCompleted ? pointsCompleted : 0;

  return Math.round(pointsIfCompleted + wordsPoints + minutesPoints);
};

const tick = component => {
  const { gameState, gameCompleted, tickTimer } = component.props;

  const { gameStatus, timer } = gameState;

  if (gameStatus === GameState.GAME_RUNNING) {
    const remaining = (__DEV__ ? 10 : 10 * 60) - timer;
    if (remaining <= 0) {
      gameCompleted(calculatePoints(gameState));
    } else {
      tickTimer();
    }
  }
};

class Puzzle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: {
        currentWordPressed: [],
        wordHit: null,
      },
      pressedCells: [],
    };
  }

  componentDidMount() {
    const { gameStarted, gameStatus, gameState } = this.props;

    // Start the timer
    this.setInterval(() => {
      tick(this);
    }, 1000);

    if (
      gameStatus === GameState.GAME_RUNNING ||
      gameStatus === GameState.GAME_PAUSE
    ) {
      return;
    }

    gameStarted();
  }

  componentWillUpdate(newProps) {
    const { gameCompleted, wordsToFind, gameState } = newProps;

    if (wordsToFind === 0) {
      setTimeout(() => {
        gameCompleted(calculatePoints(gameState));
      }, 500);
    }
  }

  render() {
    const { gameStatus, puzzle, discoveredSoFar } = this.props;

    const { pressedCells } = this.state;

    const { cells } = discoveredSoFar;

    const rows = puzzle.map((row, idx) => {
      return (
        <Row
          key={idx}
          gameStatus={gameStatus}
          onCellPress={onCellPress(this)}
          pressedCells={pressedCells}
          discoveredCells={cells}
          cellY={idx}
          row={row}
        />
      );
    });

    return (
      <View style={styles.puzzle}>
        {rows}
      </View>
    );
  }
}

reactMixin(Puzzle.prototype, TimerMixin);

Puzzle.propTypes = {
  puzzle: PropTypes.array.isRequired,
  solution: PropTypes.object.isRequired,
  discoveredSoFar: PropTypes.object.isRequired,
  gameStarted: PropTypes.func.isRequired,
  wordsToFind: PropTypes.number.isRequired,
  gameStatus: PropTypes.string.isRequired,
  gameState: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  puzzle: {
    width: puzzleWidth,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default Puzzle;
