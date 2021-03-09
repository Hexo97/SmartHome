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
              Settings:'two',
              Search:'three',
              Faq:'four'
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
        },
      },
      NotFound: '*',
    },
  },
};
