import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import { Slider, Icon } from "react-native-elements";
// all picker values should be non-object (number, string, etc.)

export default function SoundInfo({ sensor }) {
  const [reading, setReading] = useState(null);
  useEffect(
    () =>
      sensor
        ? db.Sensors.Readings.listenLatestOne(setReading, sensor.id)
        : undefined,
    [sensor]
  );
  // console.log("Reading here", reading)

  const updateMinMax = async (minmax, amount) =>
    await db.Sensors.update({ ...sensor, [minmax]: sensor[minmax] + amount });

  const [value, setValue] = useState(sensor.minDB);
  const saveMin = async (value) => {
    if (reading) {
      await db.Sensors.update({ ...sensor, minDB: value, alert: reading.current < value ? true : false });
    } else {
      await db.Sensors.update({ ...sensor, minDB: value });
    }
  };

  const [valuemax, setValuemax] = useState(sensor.maxDB);
  const saveMax = async (value) => {
    if (reading) {
      await db.Sensors.update({ ...sensor, maxDB: value, alert: reading.current > valuemax ? true : false });
    } else {
      await db.Sensors.update({ ...sensor, maxDB: value });
    }
  };


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
    <>
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
          backgroundColor: "#4DA8DA",
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
          Max Volume: {sensor.maxDB}
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Min Volume: {sensor.minDB}
        </Text>
        {reading && (
          <Text
            style={sensor.alert ? styles.getStartedRed : styles.getStartedGreen}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Current: {reading.current}
          </Text>
        )}
        <Text
          style={sensor.alert ? styles.getStartedRed : styles.getStartedGreen}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Alert: {sensor.alert ? "True" : "False"}
        </Text>
        {/* <Button
        title=" Decrement minDB by 10"
        type="outline"
        onPress={() => updateMinMax("minDB", -10)}
      />
      <Button
        title=" Decrement max by 10"
        type="outline"
        onPress={() => updateMinMax("maxDB", -10)}
      />
      <Button
        title=" Increment max by 10"
        type="outline"
        onPress={() => updateMinMax("maxDB", 10)}
      /> */}

        <View
          style={{
            paddingLeft: 15,
            paddingRight: 5,
            paddingTop: 10,
            marginTop: 5,
            paddingBottom: 15,
          }}
        >
          <Slider
            value={sensor.minDB}
            onValueChange={saveMin}
            maximumValue={50}
            minimumValue={0}
            step={1}
            trackStyle={{ height: 10, backgroundColor: "transparent" }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="minus"
                  type="font-awesome"
                  size={15}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#4DA8DA"
                />
              ),
            }}
          />
          <Text>MinDb: {sensor.minDB}</Text>

          <Slider
            value={sensor.maxDB}
            onValueChange={saveMax}
            maximumValue={100}
            minimumValue={0}
            step={1}
            trackStyle={{ height: 10, backgroundColor: "transparent" }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="plus"
                  type="font-awesome"
                  size={15}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#4DA8DA"
                />
              ),
            }}
          />
          <Text>MaxDb: {sensor.maxDB}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  slider: {
    height: 30,
    marginLeft: 7,
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
  getStartedGreen: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    color: "green",
  },
  getStartedRed: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    color: "red",
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
  imagebg: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEFBFB",
    width: "50%",
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
