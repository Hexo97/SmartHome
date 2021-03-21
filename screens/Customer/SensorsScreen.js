import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { View, Text } from "../../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserContext from "../../UserContext";
import { Button, Icon, AirbnbRating } from "react-native-elements";
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import MotionInfo from './MotionInfo'

import db from '../../db'
import CategoryByUserPicker from "../pickers/CategoryByUserPicker";
import SensorByUserAndCategoryPicker from "../pickers/SensorByUserAndCategoryPicker";
import ProximityInfo from '../../DeveloperAisha/ProximityInfo'
import PressureInfo from '../../DeveloperAisha/PressureInfo'
import SoundInfo from "../../DeveloperHanan/SoundInfo";
import TemperatureInfo from './TemperatureInfo'
import SmokeInfo from '../../DeveloperHanan/SmokeInfo'
import ReportButton from "../../DeveloperAahmad/ReportButton";


export default function SensorsScreen({ navigation }) {

  const { user } = useContext(UserContext)
  const [category, setCategory] = useState(null)
  const [sensor, setSensor] = useState(null)

  useEffect(() => setCategory(null), [user])
  useEffect(() => setSensor(null), [category])

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>

        <View style={{ backgroundColor: "#4DA8DA", height: 50, margin: 5, marginBottom: 10 }}>
          <Text style={{ color: 'black', textAlign: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}>Control Sensors</Text>
        </View>

        <View style={{ alignSelf: "center", backgroundColor: "#12232E" }}>
          <Icon
            raised
            name='warning'
            type='font-awesome'
            color='red'
            onPress={() => navigation.navigate('AllUserSensors')} />
        </View>

        {
          user
          &&
          <View style={styles.getStartedContainer}>
            <CategoryByUserPicker set={setCategory} />
          </View>
        }
        {
          user
          &&
          category
          &&
          <View style={styles.getStartedContainer}>
            <SensorByUserAndCategoryPicker category={category} set={setSensor} />
          </View>
        }
        {
          user
          &&
          category
          &&
          sensor
          &&
          <>
            {category.name === "Motion"
              &&
              <MotionInfo user={user} category={category} sensor={sensor} />
            }
              {category.name === "Smoke detector"
              &&
              <SmokeInfo user={user} category={category} sensor={sensor} />
            }
            {
              category.name === "Temperature" && (
                <TemperatureInfo
                  user={user}
                  category={category}
                  sensor={sensor}
                />
              )}
            {category.name === "Sound" && (
              <SoundInfo user={user} category={category} sensor={sensor} />
            )}
            {
              category.name === "Proximity"
              &&
              <ProximityInfo user={user} category={category} sensor={sensor} navigation={navigation}/>
            }
             {
              category.name === "Capacitive Pressure"
              &&
              <PressureInfo sensor={sensor}/>
            }
            <ReportButton user={user} category={category} sensor={sensor} />
          </>
        }
      </ScrollView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
  },
  space: {
    width: 0, // or whatever size you need
    height: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#12232E"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#EEFBFB",
    borderRadius: 10,
    borderBottomColor: "black",
    borderWidth: 2
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
  TextInput: {
    width: 200,
    height: 50,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
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
  alert: {
    color: "red",
    textAlign: "center"
  },
});
