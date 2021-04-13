
# SmartHome app - control your home sensors remotely
## Built With
* [React Native](https://reactnative.dev/ "React Native") - framework
* [Expo.io](https://expo.io/ "Expo.io") - platform
* [Firestore](https://console.firebase.google.com/ "Firestore") - database

## Authors
* [Mahmoud](https://github.com/Hexo97 "Mahmoud")
* [Aahmad](https://github.com/AahmadAA "Aahmad")
* [Aisha](https://github.com/Aisha-Shahzad "Aisha")
* [Hanan](https://github.com/hanan1152 "Hanan")

## Installation
First, make a local copy of the repo
```
git checkout https://github.com/Hexo97/SmartHome.git
```
install node modules inside home and functions directories separately
```
npm install
```
## Firebase Configurations
1. add your firebase configurations inside following files:
  * fb.js
  * server.js
2. add your fiebase project id inside '.firebaserc' file
## Running

First, run your local firebase:
```
firebase emulators:start
```
Second, run expo:
```
expo start || npm start
```
**Optional, automated simulation feature. run:*
```
node server.js
```

Finally, run the project in your expo app.

Enjoy!


*This project is dedicated to our CP3351 App Development II course*
