import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA84jN5johFsBHCLDM_bB1vKiDAr4tTOKc",
  authDomain: "cp3351-bf05f.firebaseapp.com",
  projectId: "cp3351-bf05f",
  storageBucket: "cp3351-bf05f.appspot.com",
  messagingSenderId: "851316161428",
  appId: "1:851316161428:web:afccdded7a606ce5ebad81"
  };

firebase.initializeApp(firebaseConfig)

firebase.firestore().useEmulator("10.0.2.2", 8080)
firebase.functions().useEmulator("10.0.2.2", 5001)
firebase.auth().useEmulator("http://10.0.2.2:9099")

export default firebase