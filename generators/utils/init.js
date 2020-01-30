const createView = require('./createView');

module.exports = {
  description: 'Generates initial welcome screens',
  actions: [
    ...createView('generators/templates/Welcome.js.hbs'),
    ...createView(
      'generators/templates/Settings.js.hbs',
      'createStackNavigator',
      'src/containers/navigator/Stack.js',
    ),
  ],
};
