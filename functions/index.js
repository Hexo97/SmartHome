// must use older 'require' syntax for import
const fetch = require("node-fetch")
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.findAuthUser = functions.https.onCall(
  async (uid, context) => {
    functions.logger.info("uid", { uid })

    const authUser = await admin.auth().getUser(uid)
    functions.logger.info("authUser", { authUser })

    return authUser
  }
)

const db = admin.firestore()
const reformat = doc => ({ id: doc.id, ...doc.data() })
const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()

exports.createSampleData = functions.https.onCall(
  async (data, context) => {

    // comment the following out to reset auth db every time
    // const users = await db.collection('users').get()
    // if (users.docs.length > 0) {
    //   functions.logger.info("already have data", {})
    //   return
    // }

    const sensors = await findAll('sensors')
    await Promise.all(
      sensors.map(
        async sensor => {
          const readings = await findOneSubAll('sensors', sensor.id, 'readings')
          await Promise.all(
            readings.map(
              async reading =>
                await removeOneSubOne('sensors', sensor.id, 'readings', reading.id))
          )
          await removeOne('sensors', sensor.id)
        }
      )
    )

    const categories = await findAll('categories')
    await Promise.all(
      categories.map(
        async category =>
          await removeOne('categories', category.id)
      )
    )

    const ads = await findAll('ads')
    await Promise.all(
      ads.map(
        async ad =>
          await removeOne('ads', ad.id)
      )
    )

    const faqs = await findAll('faqs')
    await Promise.all(
      faqs.map(
        async faq =>
          await removeOne('faqs', faq.id)
      )
    )

    const users = await findAll('users')
    await Promise.all(
      users.map(
        async user =>
          await removeOne('users', user.id)
      )
    )

    const authUsers = (await admin.auth().listUsers()).users
    await Promise.all(
      authUsers.map(
        async user => await admin.auth().deleteUser(user.uid)
      )
    )

    // auth and db should be completely empty now

    const { uid: authId1 } = await admin.auth().createUser({ email: "joe@joe.com", password: "joejoe" })
    functions.logger.info("authId1", { authId1 })

    const { uid: authId2 } = await admin.auth().createUser({ email: "ann@ann.com", password: "annann" })
    functions.logger.info("authId2", { authId2 })

    const { uid: authId3 } = await admin.auth().createUser({ email: "admin@admin.com", password: "adminadmin" })
    functions.logger.info("authId3", { authId3 })

    const { uid: authId4 } = await admin.auth().createUser({ email: "fred@fred.com", password: "fredfred" })
    functions.logger.info("authId4", { authId4 })

    const { uid: authId5 } = await admin.auth().createUser({ email: "julie@julie.com", password: "juliejulie" })
    functions.logger.info("authId5", { authId5 })

    const { uid: authId6 } = await admin.auth().createUser({ email: "max@max.com", password: "maxmax" })
    functions.logger.info("authId6", { authId6 })

    const result1 = await db.collection('users').doc(authId1).set({ name: "Joe", role: "Customer" ,age: 21, phone: 55346789})
    functions.logger.info("result1", { result1 })

    const result2 = await db.collection('users').doc(authId2).set({ name: "Ann", role: "Customer",age: 20, phone: 77584690 })
    functions.logger.info("result2", { result2 })

    const result3 = await db.collection('users').doc(authId3).set({ name: "Admin", role: "Admin",age: 40, phone: 55097856 })
    functions.logger.info("result3", { result3 })

    const result4 = await db.collection('users').doc(authId4).set({ name: "Fred", role: "Support" ,age: 35, phone: 44356789 })
    functions.logger.info("result4", { result4 })
    
    const result5 = await db.collection('users').doc(authId5).set({ name: "Julie", role: "Marketing" ,age: 21, phone: 55674532 })
    functions.logger.info("result5", { result5 })
    
    const result6 = await db.collection('users').doc(authId6).set({ name: "Max", role: "Finance" ,age: 23, phone: 66985647 })
    functions.logger.info("result6", { result6 })

    const { id: categoryId1 } = await db.collection('categories').add({ name: "Motion", description: "A motion detector is an electrical device that utilizes a sensor to detect nearby motion", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt26P0l14fu4z1s2kbn18zKiv5WrMUwBDyig&usqp=CAU", price:"100000" })
    functions.logger.info("categoryId1", { categoryId1 })

    const { id: categoryId2 } = await db.collection('categories').add({ name: "Temperature" , description: "A temperature sensor is an electronic device that measures the temperature of its environment and converts the input data into electronic data to record, monitor, or signal temperature changes", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW1muEnGAVO4oHm2VxXQbsKl5IzAbzOo4acg&usqp=CAU", price:"200000" })
    functions.logger.info("categoryId2", { categoryId2 })

    const { id: categoryId3 } = await db.collection('categories').add({ name: "Sound" , description: "A sound sensor is defined as a module that detects sound waves through its intensity and converting it to electrical signals.", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpX4FXkePmm2IoZ7AwrsA9PXR_6-b5sb2PYA&usqp=CAU", price:"458712" })
    functions.logger.info("categoryId3", { categoryId3 })

    const { id: categoryId4 } = await db.collection('categories').add({ name: "Proximity" , description: "Proximity sensors are suitable for damp conditions and wide temperature range usage, unlike your traditional optical detection.", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGxYQREXgAEY-isMpl79tpMB13a3HxC_d7g&usqp=CAU" , price:"15248"})

    functions.logger.info("categoryId4", { categoryId4 })

    const { id: sensorId1 } = await db.collection('sensors').add({ userid: authId1, categoryid: categoryId1, location: "front door", motiondetected: false })
    functions.logger.info("sensorId1", { sensorId1 })

    const { id: sensorId2 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId2, location: "lab", min: 0, max: 100, alert: false })
    functions.logger.info("sensorId2", { sensorId2 })

    const { id: faq1 } = await db.collection('faqs').add({ question: "What is the price of sensors package?", answer: "It is 10,000 QR yearly based" })
    functions.logger.info("faq1", { faq1 })

    const { id: faq2 } = await db.collection('faqs').add({ question: "Do you have promotions?", answer: "yes we provide promotion to sensors eith more thne 2 users" })
    functions.logger.info("faq2", { faq2 })

    const { id: adId1 } = await db.collection('ads').add({ desc: "Stay safe! Buy our motion sensors" , categoryid: categoryId1, image: "https://mashtips.com/wp-content/uploads/2016/05/android-as-motion-detector-camera_f.jpg", date:"4th march 2021" })
    functions.logger.info("adId1", { adId1 })

    const { id: adId2 } = await db.collection('ads').add({ desc: "Stay updated with the sound around you. Buy our Temperature sensors", categoryid: categoryId2, image: "https://image.winudf.com/v2/image1/Y29vY2VudC5hcHAudG9vbHMuc291bmRtZXRlci5ub2lzZWRldGVjdG9yX3NjcmVlbl8wXzE1ODg3NjYwMjRfMDUw/screen-0.jpg?h=355&fakeurl=1&type=.jpg", date:"6th march 2021" })
    functions.logger.info("adId2", { adId2 })
    const { id: adId3 } = await db.collection('ads').add({ desc: "This is sound sensor ad2", categoryid: categoryId3, image: "https://cdn.maikoapp.com/3d4b/4r2dg/180h.jpg", date:"5th march 2021" })
    functions.logger.info("adId3", { adId3 })

    const { id: adId4 } = await db.collection('ads').add({ desc: "This is promiximyt sensor ad3", categoryid: categoryId3, image: "http://www.wirelessavenuerepair.com/wp-content/uploads/2017/02/proximity-sensor.png", date:"7th march 2021" })
    functions.logger.info("adId4", { adId4 })

    const { id: adId5 } = await db.collection('ads').add({ desc: "This is light sensor ad3", categoryid: categoryId3, image: "https://play-lh.googleusercontent.com/oVW9zzp7qFlY-8FDxcJgGMRy6x5OWEm_n-vhFXVa_mKvKECukqNI9fVYlNRK8BwUUVY=w412-h220-rw", date:"6th march 2021" })
    functions.logger.info("adId5", { adId5 })
  }
)

exports.onNewReading = functions.firestore.document('sensors/{sensorid}/readings/{readingid}').onCreate(

  async (snap, context) => {
    const reading = snap.data();
    functions.logger.info("reading", { reading })

    const { sensorid, readingid } = context.params
    functions.logger.info("sensorid", { sensorid })
    functions.logger.info("readingid", { readingid })

    const sensorDoc = await db.collection('sensors').doc(sensorid).get()
    const sensor = { id: sensorDoc.id, ...sensorDoc.data() }

    functions.logger.info("sensor object", { sensor })
    const categoryDoc = await db.collection('categories').doc(sensor.categoryid).get()
    const category = { id: categoryDoc.id, ...categoryDoc.data() }
    functions.logger.info("category", { category })

    const adDoc = await db.collection('ads').doc(sensor.adId).get()
    const ad = { id: adDoc.id, ...adDoc.data() }
    functions.logger.info("ad", { ad })
    
    if (category.name === "Motion") {
      const readingData = await db.collection('sensors').doc(sensor.id).collection('readings').orderBy("when", "desc").limit(2).get()
      const readings = readingData.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      functions.logger.info("readings.length", { readingslength: readings.length })
      functions.logger.info("readings", { readings })

      if (readings.length >= 2) {
        const latestImageURL = readings[0].url
        const previousImageURL = readings[1].url

        // 1 -- get the blobs from fb storage
        //   -- change the blobs to base64 strings
        // 2 -- compare the strings
        // 3 -- update db with true/false (motiondetected field)
        functions.logger.info("checkMotion", { sensor, previousImageURL, latestImageURL })

        const response1 = await fetch(latestImageURL)
        const buffer1 = await response1.buffer()
        const base64_1 = buffer1.toString('base64')

        const response2 = await fetch(previousImageURL)
        const buffer2 = await response2.buffer()
        const base64_2 = buffer2.toString('base64')

        functions.logger.info("motion detected", { sensor, motiondetected: base64_1 != base64_2 });

        await db.collection('sensors').doc(sensor.id).set({ motiondetected: base64_1 != base64_2 }, { merge: true })
      }
    }
    else if (category.name = "Temperature") {
      await db.collection('sensors').doc(sensor.id).set({ alert: reading.current > sensor.max || reading.current < sensor.min }, { merge: true })
      functions.logger.info("temp alert update", { alert: reading.current > sensor.max || reading.current < sensor.min });
    } else {
      functions.logger.info("No such category", { category });
    }

  })