import firebase from './fb'
import fetch from 'node-fetch'
const db = firebase.firestore()


class DB {

    constructor(collection) {
        this.collection = collection
    }

    reformat(doc) {
        // console.log('reformat', doc.id)
        return { id: doc.id, ...doc.data() }
    }

    findAll = async () => {
        const data = await db.collection(this.collection).get()
        return data.docs.map(this.reformat)
    }

    listenAll = set =>
        db.collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    findOne = async id => {
        const doc = await db.collection(this.collection).doc(id).get()
        return doc.exists ? this.reformat(doc) : undefined
    }

    listenOne = (set, id) =>
        id === ""
            ?
            set(null)
            :
            db.collection(this.collection).doc(id).onSnapshot(snap => set(this.reformat(snap)))

    // item has no id
    create = async item => {
        const { id, ...rest } = item
        return await db.collection(this.collection).add(rest)
    }

    // item has id
    update = async item => {
        const { id, ...rest } = item
        await db.collection(this.collection).doc(id).set(rest)
    }

    remove = async id => {
        await db.collection(this.collection).doc(id).delete()
    }
}


class Sensors extends DB {

    constructor() {
        super('sensors')
        this.Readings = new Readings(this.collection)
    }

    listenByCategory = (set, categoryid) =>
        db.collection(this.collection).where("categoryid", "==", categoryid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenByUser = (set, userid) =>
        db.collection(this.collection).where("userid", "==", userid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenByUserAndCategory = (set, userid, categoryid) =>
        db.collection(this.collection).where("userid", "==", userid).where("categoryid", "==", categoryid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    toggleMotionDetected = sensor =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected: !sensor.motiondetected }, { merge: true })

    setMotionDetected = (sensor, motiondetected) =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected }, { merge: true })

    toggleAlert = sensor =>
        db.collection(this.collection).doc(sensor.id).set({ alert: !sensor.alert }, { merge: true })
}

class Readings extends DB {

    constructor(containing) {
        super('readings')
        this.containing = containing
    }

    createReading = (sensorId, reading) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).add(reading)

    listen2OrderByWhen = (set, sensorId) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).orderBy("when", "desc").limit(2).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenLatestOne = (set, sensorId) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).orderBy("when", "desc").limit(1).onSnapshot(snap => set(snap.docs.map(this.reformat)[0]))

}

class Users extends DB {

    constructor() {
        super('users')
    }

    listenByRole = (set, role) =>
        db.collection(this.collection).where('role', '==', role).onSnapshot(snap => set(snap.docs.map(this.reformat)))
}

class Categories extends DB {

    constructor() {
        super('categories')
    }

    // max 10
    listenInIds = (set, ids) =>
        db.collection(this.collection).where(db.FieldPath.documentId(), "in", ids).onSnapshot(snap => set(snap.docs.map(this.reformat)))

}

class RealTimeMonitoring extends DB {
    constructor() {
        super('realtimemonitoring')
    }

    reformat(doc) {
        return { ...super.reformat(doc), activityDate: doc.data().activityDate.toDate() }
    }

    listentToTracksByOperation = (set, operation) =>
        db.collection(this.collection).where('activity', '==', activity).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenToTracksByUsers = (set, users) =>
        db.collection(this.collection).where('userId', 'in', users.map(user => user.id)).onSnapshot(snap => set(snap.docs.map(this.reformat)))
}

class PopularSensor extends DB {
    constructor() {
        super('popularsensor')
    }

    listenBySensor = (set, sensorid) =>
        db.collection(this.collection).where("sensorid", "==", sensorid).onSnapshot(snap => set(snap.docs.map(this.reformat)[0]))

}

export default {
    Categories: new Categories(),
    Sensors: new Sensors(),
    Users: new Users(),

    //AISHA
    RealTimeMonitoring: new RealTimeMonitoring(),
    PopularSensor: new PopularSensor()
}