import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as GameState from '../../state/game';
import AppStyles from '../../AppStyles';

const screenWidth = Dimensions.get('window').width;
const cellsNumber = 14;
const puzzleWidth = screenWidth - 10;
const cellSize = (puzzleWidth - 28) / cellsNumber;

class Cell extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { cellX, cellY, status, text, onCellPress, gameStatus } = this.props;

    const style = styles[status];

    return (
      <View style={[styles.column, style]}>
        <Text style={styles.cellText}>
          {gameStatus === GameState.GAME_RUNNING ? text.toUpperCase() : ' '}
        </Text>
      </View>
    );
  };
}

const columnBase = {
  width: cellSize,
  height: cellSize,
  marginLeft: 1,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 1,
};

const styles = StyleSheet.create({
  cellText: {
    color: 'black',
  },
  column: {
    ...columnBase,
    backgroundColor: AppStyles.white,
  },
  pressed: {
    ...columnBase,
    backgroundColor: AppStyles.darkRed,
  },
  discovered: {
    ...columnBase,
    backgroundColor: AppStyles.lightRed,
  },
});

export default Cell;
