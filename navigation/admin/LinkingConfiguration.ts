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
              RealTimeMonitoring:'three',
              Logs:'four',
              SimulatorActions:'five'
            },
          },
          TabTwo: {
            screens: {
              ActionsScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              ManageSensors: 'three',
            },
          },
          TabFour: {
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
