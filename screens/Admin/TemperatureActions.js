import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";
import db from "../../db";
import UserContext from "../../UserContext";
import { Button, Card, Icon } from "react-native-elements";

export default function TemperatureActions({ sensor }) {
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

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginRight: "10%",
            marginLeft: "26%",
            marginTop: "2%",
          }}
        >
          Decrement/Increment Max Temperature by 10
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
            color="#4DA8DA"
            size={20}
            onPress={() => updateMinMax("max", -10)}
          />
          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={() => updateMinMax("max", 10)}
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
          Decrement/Increment Min Temperature by 10
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
            color="#4DA8DA"
            size={20}
            onPress={() => updateMinMax("min", -10)}
          />
          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="#4DA8DA"
            size={20}
            onPress={() => updateMinMax("min", 10)}
          />
        </View>

        <View
          style={{
            backgroundColor: "#4DA8DA",
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

        <View style={{ margin: 10, width: "45%", marginLeft: "31%" }}>
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
    marginLeft: "0%",
    marginRight: "10%"
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
