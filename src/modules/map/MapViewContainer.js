import { connect } from 'react-redux';
import MapView from './MapView';

import * as NavigationState from '../../modules/navigation/NavigationState';

export default connect(
  state => ({}),
  dispatch => ({
    back() {
      dispatch(NavigationState.popRoute());
    },
  }),
)(MapView);
