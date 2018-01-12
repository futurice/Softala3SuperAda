import { Platform } from 'react-native';

export default {
  lightRed: '#fe9593',
  darkRed: '#ed3a4b',
  whiteBackground: '#fafafa',
  grey: '#eeeeee',
  darkGrey: '#bbbbbb',
  white: '#ffffff',
  fontSize: 18,
  titleFontSize: 42,
  headerFontSize: 32,
  headerHeight: 64,
  headerElevation: 5,
  statusbarHeight: Platform.select({
    ios: 18,
    android: 0,
  }),
  icon: {
    width: 64,
    height: 64,
  },
};
