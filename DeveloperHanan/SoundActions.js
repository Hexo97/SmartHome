import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { Card, Icon, Slider } from "react-native-elements";

export default function SoundActions({ sensor }) {
  const { user } = useContext(UserContext);
  useEffect(() => handleStopSimulator(), [user]);

  // return "stop simulator function", to be called on component unmount, stopping the timer
  useEffect(() => handleStopSimulator, []);

  const [reading, setReading] = useState(null);
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [
    sensor,
  ]);

  const uploadReading = async () =>
    await db.Sensors.Readings.createReading(sensor.id, {
      when: new Date(),
      current: (reading?.current || 50) + Math.floor(Math.random() * 20) - 10,
    });

  const handleToggleAlert = async () => await db.Sensors.toggleAlert(sensor);

  const updateMinMax = async (minmax, amount) =>
    await db.Sensors.update({ ...sensor, [minmax]: sensor[minmax] + amount });

  const [delay, setDelay] = useState(5);
  const [intervalId, setIntervalId] = useState(0);

  // start uploading random readings every 5 seconds
  const handleStartSimulator = () =>
    setIntervalId(setInterval(uploadReading, delay * 1000));

  const handleStopSimulator = () => {
    clearInterval(intervalId);
    setIntervalId(0);
  };

  const [value, setValue] = useState(sensor.minDB);
  const saveMin = async (value) => {
    if (reading) {
      await db.Sensors.update({
        ...sensor,
        minDB: value,
        alert: reading.current < value ? true : false,
      });
    } else {
      await db.Sensors.update({ ...sensor, minDB: value });
    }
  };

  const [valuemax, setValuemax] = useState(sensor.maxDB);
  const saveMax = async (value) => {
    if (reading) {
      await db.Sensors.update({
        ...sensor,
        maxDB: value,
        alert: reading.current > valuemax ? true : false,
      });
    } else {
      await db.Sensors.update({ ...sensor, maxDB: value });
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{ backgroundColor: "#12232E" }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              marginLeft: "10%",
              width: "85%",
            }}
          >
            Decrease/Increment Max volume DB level
          </Text>

          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#4DA8DA"
            size={15}
            onPress={() => updateMinMax("maxDB", 10)}
          />

          <Icon
            raised
            name="minus"
            type="font-awesome"
            color="#4DA8DA"
            size={15}
            onPress={() => updateMinMax("maxDB", -10)}
          />
        </View>

        <View style={{ backgroundColor: "#12232E" }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              marginLeft: "10%",
              width: "85%",
            }}
          >
            Decrease/Increment Min volume DB level
          </Text>

          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#4DA8DA"
            size={15}
            onPress={() => updateMinMax("minDB", 10)}
          />

          <Icon
            raised
            name="minus"
            type="font-awesome"
            color="#4DA8DA"
            size={15}
            onPress={() => updateMinMax("minDB", -10)}
          />
        </View> */}

        <View
          style={{
            paddingLeft: "12%",
            paddingRight: "10%",
            paddingTop: 15,
            marginTop: 5,
            paddingBottom: 15,
            marginLeft: "5%",
            marginRight: "6%",
            width: "91%",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 18,
              paddingBottom: 20,
              // marginLeft: "10%",
              // width: "85%",
            }}
          >
            Decrement/Increment Max/Min volume DB level
          </Text>
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

        <View
          style={{
            backgroundColor: "#12232E",
            width: "60%",
            marginLeft: "22%",
            marginTop: "5%",
            flexDirection: "row",
          }}
        >
          <Icon
            raised
            name="upload"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={uploadReading}
          />
          <Icon
            raised
            name="exclamation-triangle"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={handleToggleAlert}
          />
          <Icon
            raised
            name="play-circle"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={handleStartSimulator}
          />
          <Icon
            raised
            name="stop"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={handleStopSimulator}
          />
        </View>

        {/* <Button
            title="Upload a new random reading"
            type="outline"
            onPress={uploadReading}
          />
          <Button
            title="Toggle alert field"
            type="outline"
            onPress={handleToggleAlert}
          />
          <Button
            title=" Start simulator"
            type="outline"
            onPress={handleStartSimulator}
          />
          <Button
            title="Stop simulator"
            type="outline"
            onPress={handleStopSimulator}
          /> */}
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginRight: "10%",
            marginLeft: "15%",
            marginTop: "2%",
          }}
        >
          Decrement/Increment delay by 1
        </Text>
        <View
          style={{
            backgroundColor: "#12232E",
            width: "60%",
            flexDirection: "row",
            marginLeft: "35%",
            marginTop: "2%"
          }}
        >
          <Icon
            raised
            name="minus"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={() => setDelay(delay - 1)}
          />
          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={() => setDelay(delay + 1)}
          />
        </View>

        <View style={{ margin: 10, width: "45%", marginLeft: "27%" }}>
          <Card>
            <Text style={{ color: "black", fontSize: 20, marginLeft: "15%" }}>Delay {delay}</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
