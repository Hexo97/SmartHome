import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              Home: 'one',
              Dashboard:'two',
              RealTimeMonitoring:'three'
            },
          },
          TabTwo: {
            screens: {
              ActionsScreen: 'three',
            },
          },
          TabThree: {
            screens: {
              SettingsScreen: 'four',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
