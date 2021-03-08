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
            },
          },
          TabTwo: {
            screens: {
              AdminDashboardScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              ActionsScreen: 'three',
            },
          },
          TabFour: {
            screens: {
              SettingsScreen: 'four',
            },
          },
          TabFive: {
            screens: {
              UserTrack: 'five',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
