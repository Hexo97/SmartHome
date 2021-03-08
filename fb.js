import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDA9XBf7mmSydm45U8LAC_8ZanHAdj5mkY",
    authDomain: "cp3351-572e1.firebaseapp.com",
    databaseURL: "https://cp3351-572e1-default-rtdb.firebaseio.com",
    projectId: "cp3351-572e1",
    storageBucket: "cp3351-572e1.appspot.com",
    messagingSenderId: "2568886566",
    appId: "1:2568886566:web:0c2da3a5e37b0b0fdfc9e7",
    measurementId: "G-QEN9H9ZN1Q"
  };

firebase.initializeApp(firebaseConfig)

firebase.firestore().useEmulator("10.0.2.2", 8080)
firebase.functions().useEmulator("10.0.2.2", 5001)
firebase.auth().useEmulator("http://10.0.2.2:9099")

export default firebase