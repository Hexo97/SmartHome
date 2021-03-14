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
              Faq:'two',
              Reviews:'three',
              Search:'four',
              List:'five',
              AllUserSensors:'six'
            },
          },
          TabTwo: {
            screens: {
              Sensors: 'two',
            },
          },
          TabThree: {
            screens: {
              Shop: 'two',
            },
          },
          TabFour: {
            screens: {
              Settings: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
