import Wordfind from '../utils/wordfind';

// Actions
export const NO_GAME = 'Game/NO_GAME';
export const GAME_INIT = 'Game/GAME_INIT';
export const GAME_CREATED = 'Game/GAME_CREATED';
export const GAME_STARTED = 'Game/GAME_STARTED';
export const GAME_RUNNING = 'Game/GAME_RUNNING';
export const GAME_PAUSE = 'Game/GAME_PAUSE';
export const GAME_RESUME = 'Game/GAME_RESUME';
export const GAME_COMPLETED = 'Game/GAME_COMPLETED';
export const WORD_FOUND = 'Game/WORD_FOUND';
export const TIMER = 'Game/TIMER';
export const PRESSED_CELL = 'Puzzle/PRESSED_CELL';

export function initGame() {
  return {
    type: GAME_INIT,
  };
}

export function gameStarted(time) {
  return {
    type: GAME_STARTED,
    payload: time,
  };
}

export function gamePause() {
  return {
    type: GAME_PAUSE,
  };
}

export function gameResume() {
  return {
    type: GAME_RESUME,
  };
}

export function gameCompleted(time) {
  return {
    type: GAME_COMPLETED,
    payload: time,
  };
}

export function wordFound(word) {
  return {
    type: WORD_FOUND,
    payload: word,
  };
}

export function tickTimer() {
  return {
    type: TIMER,
  };
}

const randomWords = (words, quantity = __DEV__ ? 2 : 21) => {
  let hit = {};
  let i = quantity;
  const rands = quantity;

  while (i > 0 || Object.keys(hit).length < rands) {
    hit[Math.ceil(Math.random() * words.length)] = i--;
  }

  return Object.keys(hit).map(key => words[key - 1]);
};

const initialState = {
  gameStatus: NO_GAME,
  wordsToFind: null,
  puzzle: null,
  solution: null,
  timer: 0,
  discoveredSoFar: {
    cells: [],
    words: [],
  },
};

const getCellsFromWord = ({ x, y, orientation, word }) => {
  const next = Wordfind.orientations[orientation];

  const cells = word.split('').map((_, idx) => {
    return next(x, y, idx);
  });

  return cells;
};

export default function GameStateReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_INIT: {
      const words = [
        'ada',
        'lovelace',
        'mobile',
        'data',
        'robot',
        'infrastructure',
        'testing',
        'teamwork',
        'code',
        'binary',
        'api',
        'agile',
        'software',
        'project',
        'design',
        'creativity',
        'opensource',
        'motherboard',
        'bug',
        'feature',
        'internet',
        'online',
        'interface',
        'hypertext',
        'javascript',
        'automation',
        'programming',
        'computer',
        'gaming',
        'platform',
        'meetings',
      ];
      const puzzleWords = randomWords(words);
      const puzzle = Wordfind.newPuzzle(puzzleWords, {
        height: 14,
        width: 14,
        preferOverlap: true,
        maxAttempts: 5,
        fillBlanks: !__DEV__,
      });

      const solution = Wordfind.solve(puzzle, words);
      return {
        ...initialState,
        gameStatus: GAME_CREATED,
        wordsToFind: puzzleWords.length,
        puzzle,
        solution,
      };
    }
    case GAME_CREATED: {
      return {
        ...state,
        gameStatus: GAME_CREATED,
      };
    }
    case GAME_STARTED: {
      return {
        ...state,
        gameStatus: GAME_RUNNING,
      };
    }
    case GAME_PAUSE: {
      return {
        ...state,
        gameStatus: GAME_PAUSE,
      };
    }
    case GAME_RESUME: {
      return {
        ...state,
        gameStatus: GAME_RUNNING,
      };
    }
    case GAME_COMPLETED: {
      return {
        ...state,
        gameStatus: GAME_COMPLETED,
      };
    }
    case TIMER: {
      const { timer, gameStatus } = state;

      const timeLimit = __DEV__ ? 10 : 10 * 60;

      return {
        ...state,
        timer: Math.min(timer + 1, timeLimit),
      };
    }
    case WORD_FOUND: {
      const { discoveredSoFar, solution } = state;

      const wordHit = action.payload;
      const cells = discoveredSoFar.cells.concat(getCellsFromWord(wordHit));
      const words = discoveredSoFar.words.slice();
      words.push(wordHit.word);

      const wordsToFind = solution.found.length - words.length;

      return {
        ...state,
        discoveredSoFar: {
          cells,
          words,
        },
        wordsToFind,
      };
    }
    default:
      return state;
  }
}
