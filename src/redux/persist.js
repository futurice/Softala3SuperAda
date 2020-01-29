import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import rest from '../utils/rest';

/**
 * Don't save or restore 'loading' flag in rest reducers.
 *
 * If the 'loading' flag is set even though there is no request in progress,
 * redux-api will wait forever and never let us issue any further requests
 * to the endpoint
 */
const apiLoadingFilters = Object.keys(rest.reducers).map(reducer =>
  createBlacklistFilter(reducer, ['loading'], ['loading']),
);

export const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,

  transforms: [...apiLoadingFilters],

  // blacklisted reducers, useful when debugging to recover from broken state
  blacklist: [
    // 'navigatorState',
  ],
};

export default store =>
  new Promise(resolve => {
    const persistor = persistStore(store, null, () =>
      resolve(persistor),
    );
  });
