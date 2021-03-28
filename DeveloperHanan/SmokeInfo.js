import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import { Image, Icon } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

// all picker values should be non-object (number, string, etc.)

export default function SmokeInfo({ user, category, sensor }) {
  const [reading, setReading] = useState(null);
  useEffect(
    () =>
      sensor
        ? db.Sensors.Readings.listenLatestOne(setReading, sensor.id)
        : undefined,
    [sensor]
  );

  const [location, setLocation] = useState("");

  const updateLoc = async () => {
    await db.Sensors.update({
      id: sensor.id,
      alert: sensor.alert,
      categoryid: sensor.categoryid,
      location: location,
      max: sensor.max,
      min: sensor.min,
      userid: sensor.userid,
    });
    setLocation("");
  };

  const EditUserRole = (location) => {
    setLocation(location);
  };

  return (

    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.rolesContainer}>
          <Text style={styles.title}>Update Location</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Change location name"
              placeholderTextColor="#12232E"
              value={location}
              onChangeText={(value) => setLocation(value)}
            />
          </View>

          <View
            style={{
              width: "60%",
              marginLeft: "22%",
              marginTop: "3%",
              flexDirection: "row",
            }}
          >
            <Icon
              reverse
              name="save"
              type="font-awesome"
              color="#4DA8DA"
              size={20}
              onPress={updateLoc}
            />

            <Icon
              reverse
              name="edit"
              type="font-awesome"
              color="#4DA8DA"
              size={20}
              onPress={() => EditUserRole(sensor.location)}
            />
          </View>
        </View>


        <View
          style={{
            backgroundColor: "#12232E",
            width: "90%",
            marginLeft: "5%",
            marginTop: "5%",
          }}
        >
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Standard Humdity Level: {sensor.max}
          </Text>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Min Humidty Level: {sensor.min}
          </Text>
          {reading && (
            <Text
              style={sensor.alert ? styles.getStartedRed : styles.getStartedGreen}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              Live Humidity Level: {reading.current}
            </Text>
          )}
          <Text
            style={sensor.alert ? styles.getStartedRed : styles.getStartedGreen}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Smoke alert: {sensor.alert ? "True" : "False"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#12232E",
            width: "105%",
            marginLeft: "3%",
            marginBottom: "80%",
            marginTop: "4%",
            marginRight: "10%",
            height: "50%",

            padddingBotton: "20%"
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                "https://www.airthings.com/hs-fs/hubfs/Website/Images/Newsletter/Blog/Blog%20body%20images%20compressed%20-illustration/Humidity%20level%20chart%20(1).jpg?width=1754&name=Humidity%20level%20chart%20(1).jpg",
            }}
          />
        </View>


      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: "90%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#12232E",

  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  rolesContainer: {
    borderRadius: 20,
    height: 200,
    width: 330,
    marginLeft: "7%",
    // margin: 20,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#12232E",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btn: {
    width: "80%",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#007CC7",
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
    fontWeight: "bold",
    color: "white",
  },
  getStartedGreen: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
  getStartedRed: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputView: {
    borderColor: "#4DA8DA",
    borderWidth: 2,
    borderRadius: 15,
    width: "75%",
    paddingLeft: 30,
    marginTop: 20,
    height: 50,
    fontSize: 15,
    color: "#12232E",
  },

  TextInput: {
    width: "80%",
    height: 10,
    flex: 1,
    fontSize: 15,
    // padding: 10,
    color: "#12232E",
  },
});
