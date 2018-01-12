import React from 'react';
import { Text, StyleSheet, } from 'react-native';
import I18n from 'ex-react-native-i18n'

const defaultStyles = StyleSheet.create({
  text: {
    fontFamily: 'pt-sans',
  }
});

export default class TranslatedText extends React.Component {
  render() {
    const { style, text, ...options } = this.props;
    return (
      <Text style={[defaultStyles.text, style]}>
        {I18n.t(text, options)}
      </Text>
    );
  }
}
