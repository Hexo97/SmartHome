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
              PaymentHistory:'six',
              AllUserTrashCans:'seven',
              Notifications:'eight'
            },
          },
          TabTwo: {
            screens: {
              Sensors: 'one',
              Precautions:'two'
            },
          },
          TabThree: {
            screens: {
              Shop: 'two',
              Promotion: 'three',
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
