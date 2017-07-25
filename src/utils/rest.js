import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

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
  },
  teamDetails: {
    url: `${apiRoot}/teamdetails`,
    transformer: (data, prevData, action) => {
      return { ...prevData, ...data };
    },
    crud: true,
  },
  feedback: {
    url: `${apiRoot}/feedback`,
    transformer: transformers.array,
    crud: true,
  },
  companies: {
    url: `${apiRoot}/companies`,
    transformer: transformers.array,
  },
  quiz: {
    url: `${apiRoot}/quiz`,
    crud: true,
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
