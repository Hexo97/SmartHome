import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { View } from '../components/Themed';
import db from '../db'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from '../UserContext'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem } from 'react-native-elements'

export default function ProximityActions({ sensor }) {

  const [start, setStart] = useState(false);

  const { user } = useContext(UserContext)
  useEffect(() => handleStopSimulator(), [user])

  // return "stop simulator function", to be called on component unmount, stopping the timer
  useEffect(() => handleStopSimulator, [])

  const [reading, setReading] = useState(null)
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor])


  const setProximity = async () => await db.Sensors.Readings.createReading(sensor.id, {
    when: new Date(),
    distance: (reading?.distance || 50) + Math.floor(Math.random() * 20) - 10,
    capacity: (reading?.distance || 50) + Math.floor(Math.random() * 20) - 10
  })

  // const fillTrash = async(capacity, amount) =>
  //    await db.Sensors.update({...sensor , [capacity]: sensor[capacity] + amount }, sensor.id)

  const handleToggleAlert = async () => {
    await db.Sensors.togglePresence(sensor)

    await db.Users.Notifications.createNotification(sensor.userid,
      {
        userId: sensor.userid,
        message: `Sensor at ${sensor.location} has been toggled!`,
        date: new Date(),
        isRead: false
      }
    )
  }

  const setPosition = async (latitudelongitude, amount) => {
    await db.Sensors.update({ ...sensor, [latitudelongitude]: sensor[latitudelongitude] + amount })

    await db.Users.Notifications.createNotification(sensor.userid,
      {
        userId: sensor.userid,
        message: `Sensor at ${sensor.location} has new position!`,
        date: new Date(),
        isRead: false
      }
    )
  }

  const [delay, setDelay] = useState(5)
  const [intervalId, setIntervalId] = useState(0)

  // start uploading random readings every 5 seconds
  const handleStartSimulator = () => {
    setIntervalId(setInterval(setProximity, delay * 1000)),
      setStart(true)
  }

  const handleStopSimulator = () => {
    clearInterval(intervalId)
    setIntervalId(0)
    setStart(false)
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.space} />


        <View style={{ flexDirection: "row", backgroundColor: '#12232E', marginBottom: 10, marginTop: 10 }}>

          <View style={{ backgroundColor: "#12232E", alignSelf: "center", marginHorizontal: 30 }}>
            <Button
              title="Toggle Alert"
              type="outline"
              onPress={handleToggleAlert}
              icon={
                <Icon
                  name="exclamation"
                  size={30}
                  color="red"
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>

          <View style={{ backgroundColor: "#12232E", alignSelf: "center", marginHorizontal: 50 }}>
            <Button
              title="Set Proximity"
              type="outline"
              onPress={setProximity}
              icon={
                <Icon
                  name="male"
                  size={30}
                  color="#00aedb"
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>
        </View>


        <View style={{ flexDirection: "row", backgroundColor: '#12232E', marginBottom: 10, marginTop: 10 }}>
          <View style={{ backgroundColor: "#12232E", alignSelf: "center", marginHorizontal: 30 }}>

            <Button
              title="Start simulator"
              type="outline"
              onPress={handleStartSimulator}
              icon={
                <Icon
                  name="play"
                  size={30}
                  color="green"
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>
          <View style={{ backgroundColor: "#12232E", marginHorizontal: 20 }}>
            <Button
              title="Stop simulator"
              type="outline"
              onPress={handleStopSimulator}
              icon={
                <Icon
                  name="stop"
                  size={30}
                  color="red"
                  style={{ marginRight: 10 }}
                />
              }
            />

          </View>
        </View>


        <View style={{ flexDirection: "row", backgroundColor: '#12232E', marginBottom: 10, marginTop: 10 }}>
          <View style={{ backgroundColor: "#12232E", marginHorizontal: 30 }}>
            <Button
              title="Set Delay + 1"
              type="outline"
              onPress={() => setDelay(delay + 1)}
              icon={
                <Icon
                  name="calendar"
                  size={30}
                  color="lightblue"
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>

          <View style={{ backgroundColor: "#12232E", alignSelf: "center", marginHorizontal: 30 }}>
            <Button
              title="Set Delay - 1"
              type="outline"
              onPress={() => setDelay(delay - 1)}
              icon={
                <Icon
                  name="calendar"
                  size={30}
                  color="lightblue"
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>
        </View>

        <View style={styles.space} />
        <View style={{ backgroundColor: "#EEFBFB", marginHorizontal: 40, marginBottom: 20, alignSelf: "center", alignItems: "center", height: 100, width: 200 }}>
          <Icon
            raised
            name='hourglass-half'
            type='font-awesome'
            color='black'
            size={40}
            style={{ marginTop: 20 }}
          />
          <Text style={{ fontSize: 20, fontStyle: "italic" }}>{delay}</Text>
        </View>


        <ListItem style={{ backgroundColor: "#EEFBFB", alignItems: "center", marginHorizontal: 30, marginBottom: 40 }}>
          <ListItem.Content>
            {
              start === true
                ?
                <>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>Status {""}{"RUNNING"}</Text>
                  <ActivityIndicator size="large" color="green" alignSelf="center" />
                </>
                :
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Status{""} {"NOT RUNNING"}</Text>
            }
          </ListItem.Content>
        </ListItem>

      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

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
  space: {
    width: 0, // or whatever size you need
    height: 40,
  },
});
