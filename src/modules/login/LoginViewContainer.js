import {connect} from 'react-redux';
import LoginView from './LoginView';
import {setAuthenticationToken} from '../../utils/authentication'
import * as NavigationState from '../../modules/navigation/NavigationState';
import rest from '../../services/rest';

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    login(name) {
      dispatch(rest.actions.auth({}, {
        body: JSON.stringify({
          name
        })
      }, (err, data) => {
        console.log('got data', data);
        if (!err) {
          setAuthenticationToken(data.token);
        }
      }));
    }
  })
)(LoginView);
