import React, { useState, useEffect } from 'react';
import { StyleSheet,TouchableOpacity ,Text, ScrollView, ActivityIndicator} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from '../../components/Themed';
import CategoryPicker from '../pickers/CategoryPicker'
import SensorByCategoryPicker from '../pickers/SensorByCategoryPicker'
import TemperatureActions from './TemperatureActions'
import db from '../../db'
import { Button} from 'react-native-elements'
import MotionActions from './MotionActions'
import { ListItem } from 'react-native-elements'
import Colors from "../../constants/Colors";
import SoundActions from "../../DeveloperHanan/SoundActions";

export default function ManageSensors() {
  const [category, setCategory] = useState(null);
  useEffect(() => setSensor(null), [category]);
  const [sensor, setSensor] = useState(null);

  const [out, setOut] = useState(null);
  useEffect(() => db.Simulator.listenOne(setOut, "out"), []);

  let delay = 5;
  // start uploading random readings every 5 seconds
  const handleStartSimulator = () => {
    db.Simulator.update({ id: "in", command: "Start", delay });
  };

  const handleStopSimulator = () => {
    db.Simulator.update({ id: "in", command: "Stop" });
  };

  const handleDelay = async (change) => {
    delay = out.delay + change;
    await handleStopSimulator();
    await handleStartSimulator();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#4DA8DA",
            height: 50,
            margin: 5,
            marginBottom: 10,
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
            Whole App Sensor's Simulator
          </Text>
        </View>

        <Button
          title=" Start simulator"
          type="outline"
          onPress={handleStartSimulator}
        />
        <View style={styles.space} />
        <Button
          title="Decrement delay by 1"
          type="outline"
          onPress={() => handleDelay(-1)}
        />
        <View style={styles.space} />
        <Button
          title=" Increment delay by 1"
          type="outline"
          onPress={() => handleDelay(+1)}
        />
        <View style={styles.space} />
        <Button
          title=" Stop simulator"
          type="outline"
          onPress={handleStopSimulator}
        />
        <View style={styles.space} />

        <View style={{ margin: 10 }}>
          <ListItem
            style={{
              backgroundColor: "#EEFBFB",
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <ListItem.Content>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Status {out?.status}{" "}
              </Text>
              {out?.status && out?.status == "Running" && (
                <ActivityIndicator size="large" color="#00ff00" />
              )}
            </ListItem.Content>

            <ListItem.Content>
              {out?.delay ? (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Delay {out?.delay}{" "}
                </Text>
              ) : (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Empty</Text>
              )}
            </ListItem.Content>
          </ListItem>
        </View>

        <View style={styles.getStartedContainer}>
          <CategoryPicker set={setCategory} />
        </View>
        {category && (
          <View style={styles.getStartedContainer}>
            <SensorByCategoryPicker category={category} set={setSensor} />
          </View>
        )}
        {category && sensor && category.name === "Motion" && (
          <MotionActions sensor={sensor} />
        )}
        {category && sensor && category.name === "Temperature" && (
          <TemperatureActions sensor={sensor} />
        )}

        {category && sensor && category.name === "Sound" && (
          <SoundActions sensor={sensor} />
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#12232E",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#12232E",
    margin: 10,
  },
  text: {
    color: "#EEFBFB",
    backgroundColor: "#12232E",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    backgroundColor: "#12232E",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    backgroundColor: "#12232E",
  },
  subText: {
    fontSize: 12,
    color: "#EEFBFB",
    textTransform: "uppercase",
    fontWeight: "500",
    backgroundColor: "#12232E",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  space: {
    width: 0, // or whatever size you need
    height: 7,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    // backgroundColor:"#12232E",
    marginTop: 16,
  },
  dm: {
    backgroundColor: "#55C21B",
    position: "absolute",
    top: 20,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#12232E",
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    backgroundColor: "#12232E",
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: "#4DA8DA",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#EEFBFB",
    borderRadius: 10,
    borderBottomColor: "black",
    borderWidth: 2,
  },
  check: {
    alignItems: "center",
    // alignSelf:"center",
    backgroundColor: "#EEFBFB",
    marginHorizontal: 50,
    borderRadius: 10,
    borderBottomColor: "black",
    borderWidth: 2,
  },
  containerInd: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalInd: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  space: {
    width: 0, // or whatever size you need
    height: 7,
  },
});
