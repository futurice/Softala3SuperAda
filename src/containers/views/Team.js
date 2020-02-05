import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  Alert,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import I18n from 'ex-react-native-i18n'
//import ImagePicker from 'react-native-image-picker';
//import ImageResizer from 'react-native-image-resizer';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePicker } from 'expo';
import { ImageManipulator } from 'expo';
import { connect } from 'react-redux';

import AppStyles from '../../AppStyles';
import rest from '../../utils/rest';
import AdaButton from '../../components/Button';

import { texts } from '../../utils/translation';

const mapStateToProps = state => ({
  teamDetails: state.teamDetails,
  description: state.teamDetails.data.description,
  image: state.teamDetails.data.file,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: () => dispatch(rest.actions.teamDetails()),
  save: (description, imageUri) => {
    if (!description && !imageUri) {
      return ownProps.navigation.navigate({ routeName: 'Checkpoints' });
    }

    let formdata = new FormData();

    if (imageUri) {
      formdata.append('image', {
        uri: imageUri,
        name: 'image.png',
        type: 'multipart/form-data',
      });
    }
    if (description) {
      formdata.append('description', description);
    }

    dispatch(
      rest.actions.teamDetails.post(
        {},
        {
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        (err, data) => {
          if (!err) {
            ownProps.navigation.navigate({ routeName: 'Checkpoints' });
          } else {
            console.log('Error ', err);
            console.log('Data: ', data);
          }
        },
      ),
    );
  },
});

export class TeamView extends React.Component {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('../../../assets/ryhmaiso_transparent.png')}
        style={[AppStyles.icon, { tintColor: tintColor }]}
      />,
  };

  state = {
    description: null,
    image: null,
    loading: false,

    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.props.refresh();
  }

  checkpoints = () => {
    this.props.dispatch(NavigationState.switchTab('CheckPointsTab'));
  };

  chooseImage = (type) => async () => {
    this.setState(() => ({
      loading: true,
    }));

    let result;

    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });
    }

    if (!result.cancelled) {
      const resized = await ImageManipulator.manipulate(result.uri, [
        { resize: { width: 512, height: 512 } }
      ]);

      this.setState(() => ({
        image: resized.uri,
      }));
    }

    this.setState(() => ({
      loading: false,
    }));
  }

  chooseImageDialog = () => {
    Alert.alert(
      I18n.t(texts.imageGalleryOptionsTitle),
      I18n.t(texts.imageGalleryOptionsDescription),
      [
        {text: I18n.t(texts.imageGalleryOptionsCancelButton), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: I18n.t(texts.imageGalleryOptionsTakePhoto), onPress: this.chooseImage('camera')},
        {text: I18n.t(texts.imageGalleryOptionsLibraryButton), onPress: this.chooseImage('library')},
      ],
    );
  };

  render() {
    const image = { uri: this.state.image || this.props.image };
    const description = this.state.description !== null ? this.state.description : this.props.teamDetails.data.description;

    const disabled = this.props.teamDetails.loading || this.state.loading;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <View
          style={{ flex: 1 }}
          onLayout={e => {
            var { x, y, width, height } = e.nativeEvent.layout;
            // TODO: any more sane way of passing this View's height down?
            if (height !== this.state.height) {
              //this.setState({ width, height });
            }
          }}
        >
          <ScrollView
            style={{ backgroundColor: '#fafafa' }}
            contentContainerStyle={{
              minHeight: this.state.height,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.teamTitle}>
                {this.props.teamDetails.data.teamName || ''}
              </Text>
              {!this.props.teamDetails.sync
                ? <ActivityIndicator
                    color={'#ff5454'}
                    animating={true}
                    style={{ height: 150 }}
                    size="large"
                  />
                : <TouchableOpacity
                    onPress={this.chooseImageDialog}
                    style={[styles.cameraButton]}
                  >
                    {image.uri
                      ? <Image source={image} style={styles.teamImage} />
                      : <Image
                          style={styles.cameraImage}
                          source={require('../../../assets/kamera.png')}
                        />}
                  </TouchableOpacity>}
              <Text style={styles.descriptionText}>Slogan:</Text>
              <View style={styles.description}>
                <TextInput
                  style={styles.teamInput}
                  onChangeText={description => this.setState({ description })}
                  value={description}
                  onSubmitEditing={() => {
                    !disabled &&
                      this.props.save(this.state.description, this.state.image);
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <AdaButton
          styles={styles}
          content={texts.saveButton}
          onPress={() => {
            this.props.save(this.state.description, this.state.image);
          }}
          disabled={disabled}
        />
      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 75,
  width: 150,
  height: 150,
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
  },
  teamContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.whiteBackground,
  },
  teamNameStyle: {
    alignItems: 'center',
  },
  teamTitle: {
    paddingTop: StatusBar.currentHeight + Platform.OS === 'ios' ? 40 : 20,
    color: AppStyles.darkRed,
    fontFamily: 'pt-sans',
    fontSize: AppStyles.titleFontSize,
  },
  description: {
    margin: 20,
    flexDirection: 'row',
  },
  descriptionText: {
    color: 'black',
    fontSize: AppStyles.fontSize,
    margin: 10,
  },
  teamInput: {
    flex: 1,
    alignSelf: 'stretch',
    color: 'black',
    ...Platform.select({
      ios: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 20,
      },
      android: {
        height: 40,
      }
    }),
  },
  cameraButton: {
    ...circle,
    backgroundColor: AppStyles.grey,
    margin: 20,
  },
  cameraImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    margin: 25,
  },
  teamImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 75,
  },
  buttonContainer: {
    backgroundColor: AppStyles.whiteBackground,
    elevation: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    margin: 20,
  },
  button: {
    backgroundColor: AppStyles.darkRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    elevation: 2,
  },
  buttonLoading: {
    backgroundColor: AppStyles.lightRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    elevation: 2,
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);
