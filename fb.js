import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // INSERT YOUR FIREBASE CONFIGE HERE
};

firebase.initializeApp(firebaseConfig)

firebase.firestore().useEmulator("10.0.2.2", 8080)
firebase.functions().useEmulator("10.0.2.2", 5001)
firebase.auth().useEmulator("http://10.0.2.2:9099")

export default firebase