import { connect } from 'react-redux';
import Welcome from './Welcome';
import * as NavigationState from '../../modules/navigation/NavigationState';

export default connect(
  state => ({}),
  dispatch => ({
    profile() {
      dispatch(NavigationState.switchTab('ProfileTab'));
    },
  }),
)(Welcome);
