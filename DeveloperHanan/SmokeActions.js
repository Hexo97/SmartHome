import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { Card, Icon } from "react-native-elements";

export default function SmokeActions({ sensor }) {
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
      current: (reading?.current || 35) + Math.floor(Math.random() * 15) - 10,
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

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginLeft: "10%",
            marginTop: "1%",
            backgroundColor: "#12232E",
          }}
        >
          <Card>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                marginLeft: "5%",
              }}
            >
              Decrement/Increment Standard Humdity Level
            </Text>
            <View
              style={{
                backgroundColor: "white",
                width: "60%",
                flexDirection: "row",
                marginLeft: "25%",
                marginTop: "2%",
              }}
            >
              <Icon
                reverse
                name="minus"
                type="font-awesome"
                color="#99ceea"
                size={20}
                onPress={() => updateMinMax("max", -5)}
              />
              <Icon
                reverse
                name="plus"
                type="font-awesome"
                color="#99ceea"
                size={20}
                onPress={() => updateMinMax("max", 5)}
              />
            </View>
          </Card>
        </View>

        <View
          style={{
            marginLeft: "10%",
            marginTop: "1%",
            backgroundColor: "#12232E",
          }}
        >
          <Card>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                marginLeft: "5%",
              }}
            >
              Decrement/Increment Minimum Humdity Level
            </Text>
            <View
              style={{
                backgroundColor: "white",
                width: "60%",
                flexDirection: "row",
                marginLeft: "25%",
                marginTop: "2%",
              }}
            >
              <Icon
                reverse
                name="minus"
                type="font-awesome"
                color="#99ceea"
                size={20}
                onPress={() => updateMinMax("min", -5)}
              />
              <Icon
                reverse
                name="plus"
                type="font-awesome"
                color="#99ceea"
                size={20}
                onPress={() => updateMinMax("min", 5)}
              />
            </View>
          </Card>
        </View>

        {/* <Text
          style={{
            color: "white",
            fontSize: 20,
            marginRight: "10%",
            marginLeft: "26%",
            marginTop: "2%",
          }}
        >
          Decrement/Increment Min Humdity Level
        </Text>
        <View
          style={{
            backgroundColor: "#12232E",
            width: "60%",
            flexDirection: "row",
            marginLeft: "37%",
            marginTop: "2%",
          }}
        >
          <Icon
            raised
            name="minus"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={() => updateMinMax("min", -10)}
          />
          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={() => updateMinMax("min", 10)}
          />
        </View> */}

        <View
          style={{
            backgroundColor: "#99ceea",
            width: "70%",
            height: "8%",
            marginLeft: "20%",
            marginTop: "2%",
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              marginTop: 10,
              fontSize: 18,
            }}
          >
            Sensor's Dashboard
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#12232E",
            width: "60%",
            flexDirection: "row",
            marginLeft: "23%",
            marginTop: "2%",
          }}
        >
          <Icon
            raised
            name="upload"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={uploadReading}
          />
          <Icon
            raised
            name="exclamation-triangle"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={handleToggleAlert}
          />
          <Icon
            raised
            name="play-circle"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={handleStartSimulator}
          />
          <Icon
            raised
            name="stop"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={handleStopSimulator}
          />
        </View>

        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginRight: "10%",
            marginLeft: "26%",
            marginTop: "2%",
          }}
        >
          Decrement/Increment Delay by 1
        </Text>
        <View
          style={{
            backgroundColor: "#12232E",
            width: "60%",
            flexDirection: "row",
            marginLeft: "37%",
            marginTop: "2%",
          }}
        >
          <Icon
            raised
            name="minus"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={() => setDelay(delay - 1)}
          />
          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#99ceea"
            size={20}
            onPress={() => setDelay(delay + 1)}
          />
        </View>

        <View
          style={{
            backgroundColor: "#12232E",
            marginHorizontal: 40,
            marginBottom: "10%",
            alignSelf: "center",
            alignItems: "center",
            height: 130,
            width: 150,
            marginRight: "4%",
          }}
        >
          <Icon
            raised
            name="hourglass-half"
            type="font-awesome"
            color="#99ceea"
            size={40}
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginLeft: "5%",
              marginBottom: "5%",
            }}
          >
            {delay}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {

    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0%",
    marginRight: "10%",
  },
  tinyLogo: {
    width: 302.5,
    height: 200,
    marginLeft: 0,
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
