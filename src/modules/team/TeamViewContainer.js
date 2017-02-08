import {connect} from 'react-redux';
import TeamView from './TeamView';

import {setAuthenticationToken} from '../../utils/authentication'
import * as NavigationState from '../../modules/navigation/NavigationState';
import rest from '../../services/rest';

export default connect(
  state => ({
    teamDetails: state.teamDetails,
    image: state.teamDetails.data.file
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.teamDetails());
    },
    save(description, imageUri) {
      let formdata = new FormData();

      if (imageUri) {
        formdata.append('image', {uri: imageUri, name: 'image.png', type: 'multipart/form-data'});
      }
      if (description) {
        formdata.append('description', description);
      }

      dispatch(rest.actions.teamDetails.post({}, {
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }, (err, data) => {
        if (!err) {
          dispatch(NavigationState.switchTab('CheckPointsTab'));
        }
      }));
    }
  })
)(TeamView);
