import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyCeenjCUQmFV44seFwtLGXGXucxViOmBQo",
  authDomain: "development2-68058.firebaseapp.com",
  projectId: "development2-68058",
  storageBucket: "development2-68058.appspot.com",
  messagingSenderId: "43338044955",
  appId: "1:43338044955:web:10c87107a926f45cc74abe",
  measurementId: "G-VMWGB3KH1X"
};

firebase.initializeApp(firebaseConfig)

firebase.firestore().useEmulator("10.0.2.2", 8080)
firebase.functions().useEmulator("10.0.2.2", 5001)
firebase.auth().useEmulator("http://10.0.2.2:9099")

export default firebase