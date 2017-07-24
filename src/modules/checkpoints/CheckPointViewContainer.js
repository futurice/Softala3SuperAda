import { connect } from 'react-redux';
import CheckPointView from './CheckPointView';

import rest from '../../utils/rest';
import * as NavigationState from '../../modules/navigation/NavigationState';

export default connect(
  state => ({
    companies: state.companies,
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.companies());
    },
    map() {
      dispatch(
        NavigationState.pushRoute({
          key: 'MapView',
          title: 'Kartta',
        }),
      );
    },
  }),
)(CheckPointView);
