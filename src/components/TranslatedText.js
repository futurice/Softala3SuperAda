import React from 'react';
import { Text } from 'react-native';
import { getTranslated, setLocale } from '../utils/translation';
import { connect } from 'react-redux';

class TranslatedText extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      setLocale(nextProps.locale);
    }
  }

  render() {
    const { style, text } = this.props;
    return (
      <Text style={style}>
        {getTranslated(text)}
      </Text>
    );
  }
}

export default connect(
  state => ({
    locale: state.locale.locale,
  }),
  dispatch => ({}),
)(TranslatedText);
