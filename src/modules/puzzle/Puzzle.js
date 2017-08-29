import React, { PropTypes, Component } from 'react';
import Dimensions from 'Dimensions';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import { StyleSheet, View } from 'react-native';
import Row from './Row';

import { connect } from 'react-redux';
import * as GameState from '../../state/GameState';
import rest from '../../utils/rest';
import Vector2 from '../../utils/vector2';

import { cellSize, cellsNumber } from './CellSize';
import * as Config from '../Config';

const screenWidth = Dimensions.get('window').width;
const puzzleWidth = screenWidth - 10;

const calculatePoints = gameState => {
  const { puzzle, solution, gameStatus, wordsToFind, timer } = gameState;

  const remaining = Config.timelimit - timer;
  const minutes = Math.floor(remaining / 60);

  const puzzleCompleted = wordsToFind === 0;

  // Points per minutes
  const minutesPoints = Math.max(minutes * Config.pointsPerMinute, 0);
  const wordsFound = solution.found.length - wordsToFind;
  const wordsPoints = wordsFound * Config.pointsPerWord;
  const pointsIfCompleted = puzzleCompleted ? Config.pointsCompleted : 0;

  return Math.round(pointsIfCompleted + wordsPoints + minutesPoints);
};

const tick = component => {
  const { gameState, gameCompleted, tickTimer } = component.props;

  const { gameStatus, timer } = gameState;

  if (gameStatus === GameState.GAME_RUNNING) {
    const remaining = Config.timelimit - timer;
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
      firstPressed: {},
    };

    this.allowedDirections = [
      new Vector2(1, 0),
      new Vector2(1, 1),
      new Vector2(0, 1),
      new Vector2(-1, 1),
      new Vector2(-1, 0),
      new Vector2(-1, -1),
      new Vector2(0, -1),
      new Vector2(1, -1),
    ];
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

  onCellPress = cell => {
    const { pressedCells } = this.state;
    pressedCells.push(cell);
    this.setState({
      pressedCells: pressedCells,
      firstPressed: cell,
    });
  };

  handlePress = e => {
    const { gameStatus } = this.props;
    if (gameStatus === GameState.GAME_RUNNING) {
      var cellPosition = this.solveCellPosition(e);
      this.onCellPress(cellPosition);
    }
  };

  onCellMove = currentCell => {
    const { pressedCells } = this.state;

    var firstCell = new Vector2(
      this.state.firstPressed.x,
      this.state.firstPressed.y,
    );

    if (currentCell.equals(firstCell)) {
      return;
    }

    var lastAdded = pressedCells[pressedCells.length - 1];
    if (lastAdded !== undefined) {
      var lastAddedVector = new Vector2(lastAdded.x, lastAdded.y);
      if (lastAddedVector.equals(currentCell)) {
        return;
      }
    }

    var newPressedCells = [];

    // check the direction between cells
    var direction = firstCell.getDirection(currentCell);
    direction = direction.normalize();

    // find closest direction
    var gridDirection = this.findClosestGridDirection(
      this.allowedDirections,
      direction,
    );

    if (gridDirection !== undefined) {
      // add pressed cells on the way
      var lastAdded = firstCell;
      newPressedCells.push(firstCell);
      var movedVector = currentCell.subtract(firstCell);
      var x = Math.abs(movedVector.x);
      var y = Math.abs(movedVector.y);
      var i = Math.max(x, y);
      while (i > 0) {
        lastAdded = lastAdded.add(gridDirection);
        newPressedCells.push(lastAdded);
        i--;
      }
      var uniqueCells = this.removeDuplicates(newPressedCells);
      this.setState({
        pressedCells: uniqueCells,
      });
    } else {
      this.setState({
        pressedCells: [],
      });
    }
  };

  findClosestGridDirection = (array, vector2) => {
    var closestDirection, smallestAngle;
    for (var i in array) {
      var normalized = array[i].normalize();
      var angle = Math.abs(vector2.angle(normalized));
      if (smallestAngle === undefined || angle < smallestAngle) {
        closestDirection = array[i];
        smallestAngle = angle;
      }
    }
    return closestDirection;
  };

  handleMove = e => {
    const { gameStatus } = this.props;
    if (gameStatus === GameState.GAME_RUNNING) {
      var cellPosition = this.solveCellPosition(e);
      this.onCellMove(cellPosition);
    }
  };

  onCellRelease = currentCell => {
    const { pressedCells } = this.state;
    const { puzzle, solution, discoveredSoFar, wordFound } = this.props;

    var word = '';
    pressedCells.forEach(function(element) {
      if (
        puzzle[element.y] !== undefined &&
        puzzle[element.y][element.x] !== undefined
      ) {
        word += puzzle[element.y][element.x];
      }
    }, this);

    var wordReversed = word.split('').reverse().join('');

    var found =
      this.tryFindingWord(this.state.firstPressed, word) ||
      this.tryFindingWord(currentCell, wordReversed);

    this.setState({
      pressedCells: [],
    });
  };

  tryFindingWord(position, word) {
    const { solution, discoveredSoFar, wordFound } = this.props;
    const { found } = solution;
    const wordHit = found.filter(foundWordObj => {
      return (
        !discoveredSoFar.words.includes(foundWordObj.word) &&
        foundWordObj.x === position.x &&
        foundWordObj.y === position.y
      );
    });
    if (wordHit.length > 0) {
      if (wordHit[0].word === word) {
        // Yeah, found a word!
        wordFound(wordHit[0]);
        return true;
      }
    }
    return false;
  }

  removeDuplicates(originalArray) {
    var newArray = [];
    var lookupObject = {};
    for (var i in originalArray) {
      var cell = originalArray[i];
      lookupObject[cell.x + ',' + cell.y] = cell;
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  handleRelease = e => {
    const { gameStatus } = this.props;
    if (gameStatus === GameState.GAME_RUNNING) {
      var cellPosition = this.solveCellPosition(e);
      this.onCellRelease(cellPosition);
    }
  };

  solveCellPosition(e) {
    var evt = e.nativeEvent;
    //can not use location from nativeEvent because it doesn't update properly on android
    var locationX = evt.pageX - this.state.layoutX;
    var locationY = evt.pageY - this.state.layoutY;
    var cellX = Math.floor(locationX / cellSize);
    var cellY = Math.floor(locationY / cellSize);
    return new Vector2(cellX, cellY);
  }

  handleOnLayout = evt => {
    //this is called here becase on android we need onLayout callback to get some values out of measure
    this.refs.puzzleComponent.measure((fx, fy, width, height, px, py) => {
      this.setState({
        layoutX: px,
        layoutY: py,
        width: width,
        height: height,
      });
    });
  };

  render() {
    const { gameStatus, puzzle, discoveredSoFar } = this.props;

    const { pressedCells } = this.state;

    const { cells } = discoveredSoFar;

    const rows = puzzle.map((row, idx) => {
      return (
        <Row
          key={idx}
          gameStatus={gameStatus}
          pressedCells={pressedCells}
          discoveredCells={cells}
          cellY={idx}
          row={row}
        />
      );
    });

    return (
      <View
        style={styles.puzzle}
        onStartShouldSetResponder={event => true}
        onMoveShouldSetResponder={event => true}
        onResponderTerminationRequest={event => true}
        onResponderGrant={this.handlePress}
        onResponderMove={this.handleMove}
        onResponderRelease={this.handleRelease}
      >
        <View ref="puzzleComponent" onLayout={this.handleOnLayout}>
          {rows}
        </View>
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
