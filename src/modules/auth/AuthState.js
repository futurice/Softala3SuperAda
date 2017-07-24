// Initial state
const initialState = {
  isLoggedIn: false,
  authenticationToken: null,
};

// Actions
const USER_LOGIN_SUCCESS = 'AppState/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AppState/USER_LOGIN_ERROR';

export function onUserLoginSuccess(token) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: token,
  };
}

export function onUserLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    /*,
    payload: error,
    error: true
    */
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authenticationToken: action.payload,
      };
    case USER_LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}
