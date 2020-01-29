import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const puzzleWidth = screenWidth - 10;

const margin = 1;

export const cellsNumber = 10;
export const cellSize = (puzzleWidth - 28) / cellsNumber + margin;
