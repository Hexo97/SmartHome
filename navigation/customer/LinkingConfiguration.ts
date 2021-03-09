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
              Settings:'two'
            },
          },
          TabTwo: {
            screens: {
              Sensors: 'two',
            },
          },
          TabThree: {
            screens: {
              Search: 'two',
            },
          },
          TabFour: {
            screens: {
              Faq: 'four',
            },
          },
          TabFive: {
            screens: {
              Shop: 'five',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
