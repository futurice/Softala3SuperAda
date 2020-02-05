import React from 'react';
import { connect } from 'react-redux';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import {
  CLEAR_AUTH_ERROR,
  CLEAR_TEAMDETAILS_ERROR,
  CLEAR_FEEDBACK_ERROR,
  CLEAR_COMPANIES_ERROR,
  CLEAR_QUIZ_ERROR,
} from '../../utils/rest';

class ErrorMessageView extends React.Component {
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.authError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Could not authenticate: ' + nextProps.authError.message,
      });
      this.props.clearAuthError();
    }
    if (nextProps.teamDetailsError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message:
          'Error with team details: ' + nextProps.teamDetailsError.message,
      });
      this.props.clearTeamDetailsError();
    }
    if (nextProps.feedbackError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Could not post feedback: ' + nextProps.feedbackError.message,
      });
      this.props.clearFeedbackError();
    }
    if (nextProps.companiesError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Could not get companies: ' + nextProps.companiesError.message,
      });
      this.props.clearCompaniesError();
    }
    if (nextProps.quizError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Error with quiz: ' + nextProps.quizError.message,
      });
      this.props.clearQuizError();
    }
  }

  render() {
    return (
      <MessageBar
        ref={alert => {
          MessageBarManager.registerMessageBar(alert);
          MessageBarManager.hideAlert();
        }}
      />
    );
  }
}

export default connect(
  state => ({
    authError: state.auth.error,
    teamDetailsError: state.teamDetails.error,
    feedbackError: state.feedback.error,
    companiesError: state.companies.error,
    quizError: state.quiz.error,
  }),
  dispatch => ({
    clearAuthError() {
      dispatch({ type: CLEAR_AUTH_ERROR });
    },
    clearTeamDetailsError() {
      dispatch({ type: CLEAR_TEAMDETAILS_ERROR });
    },
    clearFeedbackError() {
      dispatch({ type: CLEAR_FEEDBACK_ERROR });
    },
    clearCompaniesError() {
      dispatch({ type: CLEAR_COMPANIES_ERROR });
    },
    clearQuizError() {
      dispatch({ type: CLEAR_QUIZ_ERROR });
    },
  }),
)(ErrorMessageView);
