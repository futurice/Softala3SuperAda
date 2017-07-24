import { connect } from 'react-redux';
import FeedbackView from './FeedbackView';
import * as NavigationState from '../../modules/navigation/NavigationState';
import rest from '../../utils/rest';

export default connect(
  state => ({
    feedback: state.feedback,
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.feedback.get());
    },
    save(feedback) {
      dispatch(
        rest.actions.feedback.post(
          {},
          {
            body: JSON.stringify(feedback),
          },
          (err, data) => {
            if (!err) {
              console.log('successfully sent feedback');
              dispatch(
                NavigationState.pushRoute({
                  key: 'GoodbyeFB',
                  title: 'Kiitos palautteestasi',
                }),
              );
            }
          },
        ),
      );
    },
  }),
)(FeedbackView);
