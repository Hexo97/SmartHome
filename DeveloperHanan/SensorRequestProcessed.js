import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, } from "react-native";
import { View } from "../components/Themed";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import db from "../db";
import { Button } from "react-native-elements";

export default function SensorRequestProcessed({ payment }) {

  const [addd, setAddd] = useState(false);
  const [category, setCategory] = useState("");
  const [rusers, setRusers] = useState("");
  const [categories, setCategories] = useState("");
  let sensorid
  useEffect(() => payment ? db.Categories.listenOne(setCategory, payment.categories) : undefined, [payment])
  useEffect(() => payment ? db.Categories.listenOne(setCategories, payment.categories) : undefined, [payment])
  useEffect(() => payment ? db.Users.listenOne(setRusers, payment.userid) : undefined, [payment])
  useEffect(() => payment ? db.Categories.listenOne(setCategories, payment.categories) : undefined, [payment])

  const create = async (userid, categoryid) => {


    if (category && category.name === "Temperature") {
      const { id: sensorid } = await db.Sensors.create({
        categoryid: categoryid,
        userid: userid,
        alert: false,
        location: "Default",
        min: 0,
        max: 100
      });
      await db.Logs.create(
        {
          sensorId: sensorid,
          categoryId: categoryid,
          date: new Date(),
          logMessage: ` Sensor Created`
        }
      )
      await db.Users.Notifications.createNotification(
        userid
,
        {
          userId: userid
,
          message: 'Temperature sensor request has been processed',
          date: new Date(),
          isRead: false
        }
      )
      setAddd(true)
    }
    if (category && category.name === "Sound") {
      const { id: sensorid } = await db.Sensors.create({
        categoryid: categoryid,
        userid: userid,
        alert: false,
        location: "Default",
        minDB: 0,
        maxDB: 100
      });
      await db.Logs.create(
        {
          sensorId: sensorid,
          categoryId: categoryid,
          date: new Date(),
          logMessage: ` Sensor Created`
        }
      )
      await db.Users.Notifications.createNotification(
        userid
,
        {
          userId: userid
,
          message: 'Sound sensor request has been processed',
          date: new Date(),
          isRead: false
        }
      )
      setAddd(true)
    }
    if (category && category.name === "Proximity") {
      db.Sensors.create({
        categoryid: categoryid,
        userid: userid,
        location: "Kitchen",
        state: "off",
        latitude: 25.354826,
        longitude: 25.4,
        motiondetected: false,
      });
      await db.Logs.create(
        {
          sensorId: sensorid,
          categoryId: categoryid,
          date: new Date(),
          logMessage: ` Sensor Created`
        }
      )
      await db.Users.Notifications.createNotification(
        userid
,
        {
          userId: userid
,
          message: 'Proximity sensor request has been processed',
          date: new Date(),
          isRead: false
        }
      )
      setAddd(true)
    }
    if (category && category.name === "Motion") {
      const { id: sensorid } = await db.Sensors.create({
        categoryid: categoryid,
        userid: userid,
        motiondetected: false,
        location: "Default",
      });
      await db.Logs.create(
        {
          sensorId: sensorid,
          categoryId: categoryid,
          date: new Date(),
          logMessage: ` Sensor Created`
        }
      )
      await db.Users.Notifications.createNotification(
        userid
,
        {
          userId: userid
,
          message: 'Motion sensor request has been processed',
          date: new Date(),
          isRead: false
        }
      )
      setAddd(true)
    }
    if (category && category.name === "Smoke detector") {
      db.Sensors.create({
        categoryid: categoryid,
        userid: userid,
        alert: false,
        location: "Default",
        min: 25,
        max: 70
      });
      await db.Logs.create(
        {
          sensorId: sensorid,
          categoryId: categoryid,
          date: new Date(),
          logMessage: ` Sensor Created`
        }
      )
      await db.Users.Notifications.createNotification(
        userid
,
        {
          userId: userid
,
          message: 'Smoke Detector sensor request has been processed',
          date: new Date(),
          isRead: false
        }
      )
      setAddd(true)
    }

    if (category && category.name === "Capacitive Pressure") {
      db.Sensors.create({
        categoryid: categoryid,
        userid: userid,
        alert: false,
        location: "Default",
        area: 4,
        pressureDetected: false,
        status: "Sleeping",
        alarm: "off"
      });
      await db.Logs.create(
        {
          sensorId: sensorid,
          categoryId: categoryid,
          date: new Date(),
          logMessage: ` Sensor Created`
        }
      )
      await db.Users.Notifications.createNotification(
        userid
,
        {
          userId: userid
,
          message: 'Capacitive Pressure sensor request has been processed',
          date: new Date(),
          isRead: false
        }
      )
      setAddd(true)
    }
    alert("Sensor created");
    await db.Payment.update({ ...payment, status: 'created' })
  }


  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.container}>
            <Card>
              <Card.Title
                style={{
                  backgroundColor: "#4DA8DA",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Customer Name: {rusers.name}
              </Card.Title>
              <Text
                style={{
                  fontSize: 15,
                  color: "black",
                }}
              >
                Amount paid: QR {payment.price}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "black",
                }}
              >
                Sensor requested: {categories.name}
              </Text>

              <Button
                onPress={() => create(payment.userid, payment.categories)}
                title="Create"
                disabled={payment.status === "created"}
                buttonStyle={styles.myButton}
              />
            </Card>
          </View>
        </>
      </ScrollView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#203647",
  },
  cardBg: {
    backgroundColor: "rgba(96,100,109, 0.8)",
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
    // display: "flex",
    height: 30,
    width: 100,
    borderRadius: 4,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#4DA8DA",
    shadowColor: "white",
    shadowOpacity: 0.4,
    padding: 5,
    margin: 2,
    marginLeft: 35,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title1: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4DA8DA",
  },
  title3: {
    height: 20,
    width: 20,
  },
  cardtext: {
    fontSize: 20,
    textAlign: "left",
  },
  cardbg: {
    backgroundColor: "lightblue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  myButton: {
    backgroundColor: "#4DA8DA",
    alignSelf: "center",
    width: 100,
    marginLeft: 10,
    height: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5

  },
});
