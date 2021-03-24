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
              SensorRequest:'two',
              Reviews:'three',
              SuggestionForSupport:'four',
              Maintenance:'five',
            },
          },
          TabTwo: {
            screens: {
              Reports: 'two',
            },
          },
          TabThree: {
            screens: {
              Faq: 'three',
            },
          },
          TabFour: {
            screens: {
              Settings: 'four',
            },
          },
          TabFive: {
            screens: {
              Maintenance: 'five',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
