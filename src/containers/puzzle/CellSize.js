import Dimensions from 'Dimensions';

const screenWidth = Dimensions.get('window').width;
const puzzleWidth = screenWidth - 10;

const margin = 1;

export const cellsNumber = 14;
export const cellSize = (puzzleWidth - 28) / cellsNumber + margin;
