import { connect } from 'react-redux';
import TeamPointsView from './TeamPointsView';
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
    feedback() {
      dispatch(
        NavigationState.pushRoute({
          key: 'FeedbackView',
          title: 'Anna palautetta',
        }),
      );
    },
    goodbye() {
      dispatch(
        NavigationState.pushRoute({
          key: 'Goodbye',
          title: 'Kiitos osallistumisesta!',
        }),
      );
    },
  }),
)(TeamPointsView);
