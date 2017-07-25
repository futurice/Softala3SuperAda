import React, { PropTypes, Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';

import { connect } from 'react-redux';
import rest from '../../utils/rest';

import PuzzleContainer from '../puzzle/PuzzleContainer';
import * as GameState from '../../state/GameState';
import AppStyles from '../AppStyles';

const resetGame = component => event => {
  event.preventDefault();

  const { deleteGame, initialiseGame } = component.props;

  deleteGame();
  initialiseGame();
};

const startGame = component => event => {
  event.preventDefault();

  const { resumeGame } = component.props;

  resumeGame();
};

const togglePause = component => event => {
  event.preventDefault();

  const { pauseGame, resumeGame, gameState } = component.props;

  const { gameStatus } = gameState;

  if (gameStatus === GameState.GAME_PAUSE) {
    resumeGame();
  } else {
    pauseGame();
  }
};

const mapStateToProps = state => ({
  gameState: state.gameState,
  quizStatus: state.quiz,
});
const mapDispatchToProps = dispatch => ({
  initialiseGame: () => dispatch(GameState.initGame()),
  refresh: () => dispatch(rest.actions.quiz.sync()),
  deleteGame: () => dispatch(rest.actions.quiz.delete()),
  pauseGame: () => dispatch(GameState.gamePause()),
  resumeGame: () => dispatch(GameState.gameResume()),
});

export class GameView extends Component {
  static navigationOptions = {
    title: 'Super-Ada Quiz!',
    tabBarLabel: '',
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../images/muutiso_transparent.png')}
        style={[AppStyles.icon, { tintColor: tintColor }]}
      />,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { initialiseGame, gameState, refresh } = this.props;

    const { gameStatus } = gameState;

    refresh();

    if (gameStatus === GameState.NO_GAME) {
      initialiseGame();
    }
  }

  // TODO: render grew too big
  render() {
    const { gameState, quizStatus } = this.props;

    const { puzzle, solution, gameStatus, wordsToFind, timer } = gameState;

    let contentView;
    const remaining = (__DEV__ ? 10 : 10 * 60) - timer;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining - minutes * 60;

    let footerText = `Aika: ${minutes}m ${seconds}s ${gameStatus ===
    GameState.GAME_PAUSE
      ? '(paused)'
      : ''}`;
    if (gameStatus === GameState.GAME_COMPLETED) {
      footerText = `Game ended in ${timer}s`;
    }

    // If server thinks we're done, but redux store state says we're not,
    // show total points from server and offer to restart
    if (
      !quizStatus.loading &&
      quizStatus.data.done &&
      gameStatus !== GameState.GAME_COMPLETED
    ) {
      return (
        <View style={styles.gameContainer}>
          <StatusBar
            backgroundColor={AppStyles.darkRed}
            animated={false}
            barStyle="light-content"
          />
          <Text style={styles.congratsText}>Onneksi olkoon!</Text>
          <Text style={styles.congratsBodyText}>
            {'Tehtävä ratkottu'}
          </Text>
          <Text style={styles.congratsBodyText}>
            {`Pisteitä yhteensä: ${quizStatus.data.points}`}
          </Text>
          <Text style={styles.retryText}>
            {
              'Voitte yrittää uudelleen, mutta tämä nollaa pisteenne kunnes ratkotte tehtävän uudelleen!'
            }
          </Text>
          <TouchableOpacity
            style={[{ marginTop: 10 }, styles.button]}
            onPress={resetGame(this)}
          >
            <Text style={styles.buttonText}>UUSI YRITYS</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (gameStatus) {
      case GameState.GAME_CREATED: {
        contentView = (
          <View style={styles.gameContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.titleText}>Super-Ada quiz!</Text>
              <Text style={styles.welcomeText}>
                Tervetuloa ratkomaan Super-Ada quiz-tehtävää!
              </Text>
              <Text style={styles.welcomeText}>
                Kerää pisteitä löytämällä mahdollisimman monta IT-alaan
                liittyvää sanaa. Saat lisäpisteitä löytämällä kaikki sanat
                nopeasti!
              </Text>
              <Text style={styles.welcomeText}>
                Aikarajoitus: 10 minuuttia.
              </Text>
              <Text style={styles.welcomeText}>
                Voit yrittää ratkoa quiz-tehtävän monta kertaa. Pisteet
                huomioidaan ainoastaan viimeisestä yrityksestä!
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={startGame(this)}>
              <Text style={styles.buttonText}>ALOITA</Text>
            </TouchableOpacity>
          </View>
        );

        break;
      }
      case GameState.GAME_PAUSE:
      case GameState.GAME_RUNNING: {
        contentView = (
          <View style={styles.gameContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.wordsToFind}>
                Sanaa jäljellä: {wordsToFind || solution.found.length}
              </Text>
              <Text style={styles.timer}>
                {footerText}
              </Text>
            </View>
            <PuzzleContainer
              puzzle={puzzle}
              solution={solution}
              gameStatus={gameStatus}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={togglePause(this)}
              >
                <Text style={styles.buttonText}>
                  {gameStatus === GameState.GAME_RUNNING ? 'TAUKO' : 'JATKA'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  gameStatus === GameState.GAME_RUNNING
                    ? styles.buttonDisabled
                    : styles.button
                }
                disabled={gameStatus === GameState.GAME_RUNNING}
                onPress={resetGame(this)}
              >
                <Text style={styles.buttonText}>UUSI YRITYS</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

        break;
      }
      case GameState.GAME_COMPLETED: {
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
        const totalPoints = Math.round(
          pointsIfCompleted + wordsPoints + minutesPoints,
        );

        contentView = (
          <View style={styles.gameContainer}>
            <Text style={styles.congratsText}>
              {`${puzzleCompleted ? 'Onneksi olkoon!' : 'Aika loppui!'}`}
            </Text>
            <Text style={styles.congratsBodyText}>
              {`Tehtävä ratkottu ${minutes} minuuttia alle aikarajan: ${minutesPoints} pistettä`}
            </Text>
            <Text style={styles.congratsBodyText}>
              {`${wordsFound} sanaa (${pointsPerWord} pistettä sanaa kohti): ${wordsPoints} pistettä`}
            </Text>
            <Text style={styles.congratsBodyText}>
              {puzzleCompleted
                ? `Löysitte kaikki sanat: ${pointsCompleted} pistettä`
                : 'Ette löytäneet kaikkia sanoja: 0 pistettä'}
            </Text>
            <Text style={styles.congratsBodyText}>
              {`Pisteitä yhteensä: ${totalPoints}`}
            </Text>
            <Text style={styles.retryText}>
              {
                'Voitte yrittää uudelleen, mutta tämä nollaa pisteenne kunnes ratkotte tehtävän uudelleen!'
              }
            </Text>
            <TouchableOpacity
              style={[{ marginTop: 10 }, styles.button]}
              onPress={resetGame(this)}
            >
              <Text style={styles.buttonText}>UUSI YRITYS</Text>
            </TouchableOpacity>
          </View>
        );

        break;
      }

      case GameState.NO_GAME:
      default: {
        contentView = (
          <ActivityIndicator
            animating
            style={styles.activityIndicator}
            size="large"
          />
        );
      }
    }

    return (
      <View style={styles.gameContainer}>
        <StatusBar
          backgroundColor={AppStyles.darkRed}
          animated={false}
          barStyle="light-content"
        />
        {contentView}
      </View>
    );
  }
}

GameView.propTypes = {
  puzzle: PropTypes.array,
  solution: PropTypes.object,
  gameState: PropTypes.object.isRequired,
  initialiseGame: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  quizStatus: PropTypes.object.isRequired,
};

const centered = {
  alignSelf: 'center',
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: AppStyles.darkRed,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  activityIndicator: {
    ...centered,
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  wordsToFind: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    textAlign: 'center',
  },
  timer: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    textAlign: 'center',
  },
  congratsText: {
    paddingTop: 20,
    marginBottom: 40,
    fontSize: AppStyles.titleFontSize,
    fontWeight: 'bold',
    color: AppStyles.white,
    textAlign: 'center',
  },
  congratsBodyText: {
    ...centered,
    color: AppStyles.white,
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: AppStyles.fontSize,
  },
  retryText: {
    ...centered,
    color: AppStyles.white,
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: AppStyles.fontSize,
  },
  titleText: {
    ...centered,
    color: AppStyles.white,
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: AppStyles.headerFontSize,
  },
  welcomeText: {
    ...centered,
    color: AppStyles.white,
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: AppStyles.fontSize,
  },
  button: {
    backgroundColor: AppStyles.lightRed,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2 - 40,
    elevation: 5,
    height: 70,
    marginTop: 13,
    marginHorizontal: 20,
  },
  buttonDisabled: {
    backgroundColor: AppStyles.darkRed,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2 - 40,
    elevation: 5,
    height: 70,
    marginTop: 13,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
