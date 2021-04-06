import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '../components/Themed';
import { SearchBar, ListItem } from 'react-native-elements';
import UserContext from '../UserContext'
import DisplaySearched from './DisplaySearched'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'
export default function SearchSensors() {
  const { user } = useContext(UserContext)

  const [sensors, setSensors] = useState([])
  useEffect(() => db.Sensors.listenAll(setSensors), [])

  const [userSensors, setUserSensors] = useState([])
  useEffect(() => db.Sensors.listenByUser(setUserSensors, user.id), [])

  const [search, setSearch] = useState("")

  const [suggestions, setSuggestions] = useState([])

  const showSuggestions = async (searchValue) => {
    setGo("")
    setSearch(searchValue)
    let filteredList = []
    if (searchValue !== "") {
      sensors.map(sense => {
        const singleItem = userSensors.filter(item => item.id === sense.id)[0]
        if (singleItem) {
          if (singleItem.location.toLowerCase().includes(searchValue.toLowerCase())) {
            filteredList.push({ sense: sense, sensorItem: singleItem })
          }
        }
      })
    }
    setSuggestions(filteredList)
  }

  const [sensorResult, setSensorResult] = useState("")

  const [go, setGo] = useState("")

  const DisplayResults = async (sensor) => {
    await db.PopularSensor.create({ sensorid: sensor.id, name: sensor.location, dateSearched: new Date(), rating: null })
    setGo("go")
    setSensorResult(sensor)
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "#99ceea", height: 50, margin: 20, marginBottom: 10 }}>
          <Text style={{ color: 'black', textAlign: "center", marginTop: 10, fontSize: 18, fontWeight: "bold" }}> Search Sensors</Text>
        </View>

        <Text style={{ color: '#fff', textAlign: "center", fontSize: 15, margin: 5, fontStyle: "italic" }}>Search you sensors and get information about your sensors below.</Text>

        <SearchBar
          placeholder="Search Sensors"
          onChangeText={text => showSuggestions(text)}
          value={search}
          containerStyle={{ margin: 10 }}
          round
          placeholderTextColor="white"
        />
        <View>
          {
            suggestions.map((sr, index) =>
            (
              <ListItem style={{ backgroundColor: "black" }} bottomDivider key={index} onPress={() => DisplayResults(sr.sense)}>
                <ListItem.Title style={{ color: "black", fontSize: 20 }}>{sr.sensorItem.location}</ListItem.Title>
              </ListItem>
            ))
          }
        </View>

        <Text>
          {
            go
            &&
            <DisplaySearched sensor={sensorResult} />
          }
        </Text>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#12232E"
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
