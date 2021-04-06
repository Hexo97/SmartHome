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
              SuggestionForSupport: 'four',
              Promotions:'five',
              Maintenance:'six',
              UserPromReq:'seven',
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
