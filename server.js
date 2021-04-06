const firebase = require("firebase");
const fb = require('firebase/storage')

const firebaseConfig = {
  apiKey: "AIzaSyDA9XBf7mmSydm45U8LAC_8ZanHAdj5mkY",
  authDomain: "cp3351-572e1.firebaseapp.com",
  databaseURL: "https://cp3351-572e1-default-rtdb.firebaseio.com",
  projectId: "cp3351-572e1",
  storageBucket: "cp3351-572e1.appspot.com",
  messagingSenderId: "2568886566",
  appId: "1:2568886566:web:0c2da3a5e37b0b0fdfc9e7",
  measurementId: "G-QEN9H9ZN1Q",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.useEmulator("localhost", 8080);
firebase.functions().useEmulator("localhost", 5001);
firebase.auth().useEmulator("http://localhost:9099");


const reformat = (doc) => ({ id: doc.id, ...doc.data() });
// const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
// const findOne = async (collection, id) => reformat(await db.collection(collection).doc(id).get())
// const listenOne = (act, collection, id) => db.collection(collection).doc(id).onSnapshot(snap => act(reformat(snap)))
// const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
// const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
// const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()

const inDoc = db.collection("simulator").doc("in");
const outDoc = db.collection("simulator").doc("out");

let delay = 5;
let intervalId = 0;

// when command received, act on it
// - send back any info to 'out' document
const act = async ({ command, delay: newDelay }) => {
  console.log("acting on", command, newDelay);
  if (command === "Start" && intervalId === 0) {
    delay = newDelay;
    handleStartSimulator();
  } else if (command === "Stop") {
    handleStopSimulator();
  } else {
    console.log("Unrecognized command");
  }
};

// set listener to 'in' document
inDoc.onSnapshot((snap) => act(reformat(snap)));

// start listening to all categories
let categories = [];
db.collection("categories").onSnapshot(
  (snap) => (categories = snap.docs.map(reformat))
);
const isCategory = (sensor, name) =>
  categories.find((category) => category.id === sensor.categoryid).name ===
  name;

// start listening to all sensors
let sensors = [];
db.collection("sensors").onSnapshot(
  (snap) => (sensors = snap.docs.map(reformat))
);

const simulateReading = async (sensor) => {
  // first get latest reading
  const readings = (
    await db
      .collection("sensors")
      .doc(sensor.id)
      .collection("readings")
      .orderBy("when")
      .limit(1)
      .get()
  ).docs.map(reformat);
  // then update it
  if (isCategory(sensor, "Temperature")) {
    const current = readings.length > 0 ? readings[0].current : 50;
    await db
      .collection("sensors")
      .doc(sensor.id)
      .collection("readings")
      .add({
        when: new Date(),
        current: current + Math.floor(Math.random() * 20) - 10,
      });
  }
  if (isCategory(sensor, "Sound")) {
    const current = readings.length > 0 ? readings[0].current : 45;
    await db
      .collection("sensors")
      .doc(sensor.id)
      .collection("readings")
      .add({
        when: new Date(),
        current: current + Math.floor(Math.random() * 20) - 10,
      });

  }

  if (isCategory(sensor, "Smoke detector")) {
    const current = readings.length > 0 ? readings[0].current : 35;
    await db
      .collection("sensors")
      .doc(sensor.id)
      .collection("readings")
      .add({
        when: new Date(),
        current: current + Math.floor(Math.random() * 15) - 10,
      });
  }

  if (isCategory(sensor, "Proximity")) {
    const distance = readings.length > 0 ? readings[0].distance : 45;
    const capacity = readings.length > 0 ? readings[0].capacity : 45;
    await db
      .collection("sensors")
      .doc(sensor.id)
      .collection("readings")
      .add({
        when: new Date(),
        distance: distance + Math.floor(Math.random() * 20) - 10,
        capacity: capacity + Math.floor(Math.random() * 20) - 10,
      });
  }

  if (isCategory(sensor, "Capacitive Pressure")) {
    const force = readings.length > 0 ? readings[0].force : 10;
    await db
      .collection("sensors")
      .doc(sensor.id)
      .collection("readings")
      .add({
        when: new Date(),
        force: force + Math.floor(Math.random() * 10) + 0,
      });
  }

};

const simulate = () => {
  sensors.map(simulateReading);
};

const handleStartSimulator = async () => {
  intervalId = setInterval(simulate, delay * 1000);
  await outDoc.set({ status: "Running", delay });
};

const handleStopSimulator = async () => {
  clearInterval(intervalId);
  intervalId = 0;
  await outDoc.set({ status: "Stopped", delay });
};

const init = async () => {
  await outDoc.set({ status: "Stopped", delay });
};
init();
