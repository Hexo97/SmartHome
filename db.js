import firebase from "./fb";
const db = firebase.firestore();

class DB {
  constructor(collection) {
    this.collection = collection;
  }

  reformat(doc) {
    // console.log('reformat', doc.id)
    return { id: doc.id, ...doc.data() };
  }

  findAll = async () => {
    const data = await db.collection(this.collection).get();
    return data.docs.map(this.reformat);
  };

  listenAll = (set) =>
    db
      .collection(this.collection)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  findOne = async (id) => {
    const doc = await db.collection(this.collection).doc(id).get();
    return doc.exists ? this.reformat(doc) : undefined;
  };

  listenOne = (set, id) =>
    id === ""
      ? set(null)
      : db
        .collection(this.collection)
        .doc(id)
        .onSnapshot((snap) => set(this.reformat(snap)));

  // item has no id
  create = async (item) => {
    const { id, ...rest } = item;
    return await db.collection(this.collection).add(rest);
  };

  // item has id
  update = async (item) => {
    const { id, ...rest } = item;
    await db.collection(this.collection).doc(id).set(rest);
  };

  remove = async (id) => {
    await db.collection(this.collection).doc(id).delete();
  };

  listenSubAll = (set , id ,sub) =>
  {
    if(sub === "suggestionlist")
    {
      db.collection(this.collection).doc(id).collection(sub).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }
  }
}

class Ads extends DB {
  constructor() {
    super("ads");
  }

  // max 10
  listenInIds = (set, ids) =>
    db
      .collection(this.collection)
      .where(db.FieldPath.documentId(), "in", ids)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Sensors extends DB {
  constructor() {
    super("sensors");
    this.Readings = new Readings(this.collection);
    this.Maintenance = new Maintenance(this.collection);
  }

  listenByCategory = (set, categoryid) =>
    db
      .collection(this.collection)
      .where("categoryid", "==", categoryid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenByUser = (set, userid) =>
    db
      .collection(this.collection)
      .where("userid", "==", userid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenByUserAndCategory = (set, userid, categoryid) =>
    db
      .collection(this.collection)
      .where("userid", "==", userid)
      .where("categoryid", "==", categoryid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenSensorsByCategory = (set, categoryid) =>
    db
      .collection(this.collection)
      .where("categoryid", "==", categoryid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  toggleMotionDetected = (sensor) =>
    db
      .collection(this.collection)
      .doc(sensor.id)
      .set({ motiondetected: !sensor.motiondetected }, { merge: true });

  setMotionDetected = (sensor, motiondetected) =>
    db
      .collection(this.collection)
      .doc(sensor.id)
      .set({ motiondetected }, { merge: true });

  toggleAlert = (sensor) =>
    db
      .collection(this.collection)
      .doc(sensor.id)
      .set({ alert: !sensor.alert }, { merge: true });

  togglePresence = (sensor) =>
    db.collection(this.collection).doc(sensor.id).set({ presenceDetected: !sensor.presenceDetected }, { merge: true });
}

class Readings extends DB {
  constructor(containing) {
    super("readings");
    this.containing = containing;
  }

  createReading = (sensorId, reading) =>
    db
      .collection(this.containing)
      .doc(sensorId)
      .collection(this.collection)
      .add(reading);

  listen2OrderByWhen = (set, sensorId) =>
    db
      .collection(this.containing)
      .doc(sensorId)
      .collection(this.collection)
      .orderBy("when", "desc")
      .limit(2)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenToFirst10 = (set, sensorId) =>
    db
      .collection(this.containing)
      .doc(sensorId)
      .collection(this.collection)
      .limit(10)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenLatestOne = (set, sensorId) =>
    db
      .collection(this.containing)
      .doc(sensorId)
      .collection(this.collection)
      .orderBy("when", "desc")
      .limit(1)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)[0]));

}

class Reviews extends DB {
  constructor(containing) {
    super("reviews");
    this.containing = containing;
  }

  createReview = (categoryId, review) => {
    const { ...rest } = review;
    console.log("review?:", review);
    console.log("rest?:", rest);
    console.log("categoryId?:", categoryId);
    db
      .collection(this.containing)
      .doc(categoryId)
      .collection(this.collection)
      .add(rest);
  }

  listenToAll = (set, categoryId) =>
    db
      .collection(this.containing)
      .doc(categoryId)
      .collection(this.collection)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Users extends DB {
  constructor() {
    super("users");
    this.SuggestionList = new SuggestionList(this.collection);
    this.Notifications = new Notifications(this.collection);
  }

  listenByRole = (set, role) =>
    db
      .collection(this.collection)
      .where("role", "==", role)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class SuggestionList extends DB {
  constructor(containing) {
    super("suggestionlist");
    this.containing = containing;
  }

  createList = (userid, list) =>
    db.collection(this.containing).doc(userid).collection(this.collection).add(list);

  listenToUserSuggestion = (set, userid) =>
    db
      .collection(this.containing)
      .doc(userid)
      .collection(this.collection)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenToProductSuggestion = (set, userid) =>
    db.collection(this.containing).doc(userid).collection(this.collection).where("type", "==", "Products").onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenToAppSuggestion = (set, userid) =>
    db.collection(this.containing).doc(userid).collection(this.collection).where("type", "==", "Application").onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenToStaffSuggestion = (set, userid) =>
    db.collection(this.containing).doc(userid).collection(this.collection).where("type", "==", "Staff").onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  removeUserSuggestList = (userid, listid) =>
    db
      .collection(this.containing)
      .doc(userid)
      .collection(this.collection)
      .doc(listid)
      .delete();

      listenToProductSuggestions = (set) =>
        db.collectionGroup(this.collection).where("type", "==", "Products").onSnapshot(snap => set(snap.docs.map(this.reformat)))

      listenToApplicationSuggestions = (set) =>
        db.collectionGroup(this.collection).where("type", "==", "Application").onSnapshot(snap => set(snap.docs.map(this.reformat)))

      listenToStaffSuggestions = (set) =>
        db.collectionGroup(this.collection).where("type", "==", "Staff").onSnapshot(snap => set(snap.docs.map(this.reformat)))
}

class Categories extends DB {
  constructor() {
    super("categories");
    this.Reviews = new Reviews(this.collection);
  }

  // max 10
  listenInIds = (set, ids) =>
    db
      .collection(this.collection)
      .where(db.FieldPath.documentId(), "in", ids)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenByName = (set, name) =>
    db
      .collection(this.collection)
      .where("name", "==", name)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)[0]));
}

class Request extends DB {
  constructor() {
    super("requests");
  }
}

class Maintenance extends DB {
  constructor(containing) {
    super("maintenance");
    this.containing = containing;
  }

  createMaintenance = (sensorId, maintenance) => {
    const { ...rest } = maintenance;
    db
      .collection(this.containing)
      .doc(sensorId)
      .collection(this.collection)
      .add(rest);
  }

  updateMaintenance = (sensorId, maintenance, maintenanceId) => {
    const { ...rest } = maintenance;
    db
      .collection(this.containing)
      .doc(sensorId)
      .collection(this.collection)
      .doc(maintenanceId)
      .set(rest);
  }

  reformat(doc) {
    return {
      ...super.reformat(doc),
      dateScheduled: doc.data().dateScheduled.toDate(),
    };
  }

  listenToAll = (set) =>
    db
      .collectionGroup(this.collection).onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Reports extends DB {
  constructor() {
    super("reports");
  }

  reformat(doc) {
    return {
      ...super.reformat(doc),
      dateCreated: doc.data().dateCreated.toDate(),
    };
  }
}

class Faq extends DB {
  constructor() {
    super("faqs");
  }
}

class Payment extends DB {
  constructor() {
    super("payments");
  }

  reformat(doc) {
    return { ...super.reformat(doc), cdate: doc.data().cdate.toDate() };
  }

  listenByPayment = (set, userid) =>
    db
      .collection(this.collection)
      .where("userid", "==", userid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenByCategory = (set, categoryid) =>
    db
      .collection(this.collection)
      .where("categories", "==", categoryid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class RealTimeMonitoring extends DB {
  constructor() {
    super("realtimemonitoring");
  }

  reformat(doc) {
    return {
      ...super.reformat(doc),
      activityDate: doc.data().activityDate.toDate(),
    };
  }

  listentToTracksByOperation = (set, operation) =>
    db
      .collection(this.collection)
      .where("activity", "==", activity)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  listenToTracksByUsers = (set, users) =>
    db
      .collection(this.collection)
      .where(
        "userId",
        "in",
        users.map((user) => user.id)
      )
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class PopularSensor extends DB {
  constructor() {
    super("popularsensor");
  }
  reformat(doc) {
    return {
      ...super.reformat(doc),
      dateSearched: doc.data().dateSearched.toDate(),
    };
  }

  listenBySensor = (set, sensorid) =>
    db.collection(this.collection).where("sensorid", "==", sensorid).onSnapshot(snap => set(snap.docs.map(this.reformat)[0]))

  listenToLatestThree = (set) =>
    db
      .collection(this.collection)
      .orderBy("dateSearched", "desc")
      .limit(3)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Simulator extends DB {
  constructor() {
    super("simulator");
  }

  listenBySensor = (set, sensorid) =>
    db
      .collection(this.collection)
      .where("sensorid", "==", sensorid)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)[0]));
}

class Logs extends DB {
  constructor() {
    super("logs");
  }

  listen2OrderByWhen = (set) =>
    db.collection(this.collection).orderBy("date").onSnapshot((snap) => set(snap.docs.map(this.reformat)));

}

class Promotions extends DB {
  constructor() {
    super("promotions");
    this.ActivePromotions = new ActivePromotions(this.collection);
  }

  listenToActiveByMaintenance = (set) =>
    db.collection(this.collection).where("name", "!=", 'Discount').onSnapshot((snap) => set(snap.docs.map(this.reformat)));

}

class ActivePromotions extends DB {
  constructor(containing) {
    super("activepromotions");
    this.containing = containing;
  }

  reformat(doc) {
    return {
      ...super.reformat(doc)
    };
  }

  createAP = (promotionid, userPromotion) => {
    db.collection(this.containing).doc(promotionid).collection(this.collection).add(userPromotion);
  }

  listenToAll = (set, promoId) =>
    db
      .collection(this.containing)
      .doc(promoId)
      .collection(this.collection)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
  
  updateActivePromo = (promoId, acId, promo) => {
    const { ...rest } = promo;
    db
      .collection(this.containing)
      .doc(promoId)
      .collection(this.collection)
      .doc(acId)
      .set(rest);
  }
  // This is Mahmoud. I am so proud of doing this function. I shall flex on my instructor and my peers, Thanks
  listenToAllAPByUser = async (setProm, set, userid) => {
    db.collection(this.containing).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection('promotions').doc(doc.id).collection('activepromotions').where("userId", "==", userid).get().then(function (querySnapshot2) {
          querySnapshot2.forEach(function (doc2) {
            setProm(doc.data())
            set(doc2.data())
          });
        })
      });
    }
    );
  }

}

class Notifications extends DB {
  constructor(containing) {
    super("notifications");
    this.containing = containing;
  }
  createNotification = (userid, notification) =>
    db.collection(this.containing).doc(userid).collection(this.collection).add(notification);

  listenToUserNotifications = (set, userid) =>
    db
      .collection(this.containing)
      .doc(userid)
      .collection(this.collection)
      .orderBy("date", "desc")
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

  updateNotification = (userId, notificationId, Notification) => {
    const { ...rest } = Notification;
    db
      .collection(this.containing)
      .doc(userId)
      .collection(this.collection)
      .doc(notificationId)
      .set(rest);
  }
  listenToAllUnread = (set, userid) =>
    db
      .collectionGroup(this.collection)
      .where("userId", "==", userid)
      .where("isRead", "==", false)
      .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

export default {
  Categories: new Categories(),
  Sensors: new Sensors(),
  Users: new Users(),
  Simulator: new Simulator(),


  Request: new Request(),
  Reports: new Reports(),
  Reviews: new Reviews(),
  Maintenance: new Maintenance(),


  //HANAN
  Ads: new Ads(),
  Faq: new Faq(),
  Payment: new Payment(),


  Logs: new Logs(),
  Promotions: new Promotions(),
  ActivePromotions: new ActivePromotions(),
  Notifications: new Notifications(),

  RealTimeMonitoring: new RealTimeMonitoring(),
  PopularSensor: new PopularSensor(),
  SuggestionList,
};
