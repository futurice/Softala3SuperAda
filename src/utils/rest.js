import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export const CLEAR_AUTH_ERROR = 'rest/CLEAR_AUTH_ERROR';
export const CLEAR_TEAMDETAILS_ERROR = 'rest/CLEAR_TEAMDETAILS_ERROR';
export const CLEAR_FEEDBACK_ERROR = 'rest/CLEAR_FEEDBACK_ERROR';
export const CLEAR_COMPANIES_ERROR = 'rest/CLEAR_COMPANIES_ERROR';
export const CLEAR_QUIZ_ERROR = 'rest/CLEAR_QUIZ_ERROR';

export const apiRoot = __DEV__
  ? 'http://localhost:3000'
  : 'https://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/teams/authenticate`,
    options: {
      method: 'POST',
    },
    reducer(state, action) {
      if (action.type === CLEAR_AUTH_ERROR) {
        return Object.assign({}, state, { error: null });
      }
      return state;
    },
  },
  teamDetails: {
    url: `${apiRoot}/teamdetails`,
    transformer: (data, prevData, action) => {
      return { ...prevData, ...data };
    },
    crud: true,
    reducer(state, action) {
      if (action.type === CLEAR_TEAMDETAILS_ERROR) {
        return Object.assign({}, state, { error: null });
      }
      return state;
    },
  },
  feedback: {
    url: `${apiRoot}/feedback`,
    transformer: transformers.array,
    crud: true,
    reducer(state, action) {
      if (action.type === CLEAR_FEEDBACK_ERROR) {
        return Object.assign({}, state, { error: null });
      }
      return state;
    },
  },
  companies: {
    url: `${apiRoot}/companies`,
    transformer: transformers.array,
    reducer(state, action) {
      if (action.type === CLEAR_COMPANIES_ERROR) {
        return Object.assign({}, state, { error: null });
      }
      return state;
    },
  },
  quiz: {
    url: `${apiRoot}/quiz`,
    crud: true,
    reducer(state, action) {
      if (action.type === CLEAR_QUIZ_ERROR) {
        return Object.assign({}, state, { error: null });
      }
      return state;
    },
  },
})
  .use('options', (url, params, getState) => {
    const { auth: { data: { token } } } = getState();

    // Add token to header request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Add token to request headers
    if (token) {
      return { headers: { ...headers, Authorization: `Bearer ${token}` } };
    }

    return { headers };
  })
  .use('fetch', adapterFetch(fetch));

export default rest;
export const reducers = rest.reducers;
