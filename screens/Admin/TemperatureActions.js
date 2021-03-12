import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '../../components/Themed';
import db from '../../db'
import UserContext from '../../UserContext'
import { Button, Card} from 'react-native-elements'

export default function TemperatureActions({ sensor }) {

  const { user } = useContext(UserContext)
  useEffect(() => handleStopSimulator(), [user])

  // return "stop simulator function", to be called on component unmount, stopping the timer
  useEffect(() => handleStopSimulator, [])

  const [reading, setReading] = useState(null)
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor])

  const uploadReading = async () => await db.Sensors.Readings.createReading(sensor.id, {
    when: new Date(),
    current: (reading?.current || 50) + Math.floor(Math.random() * 20) - 10
  })

  const handleToggleAlert = async () => await db.Sensors.toggleAlert(sensor)

  const updateMinMax = async (minmax, amount) => await db.Sensors.update({ ...sensor, [minmax]: sensor[minmax] + amount })

  const [delay, setDelay] = useState(5)
  const [intervalId, setIntervalId] = useState(0)

  // start uploading random readings every 5 seconds
  const handleStartSimulator = () => setIntervalId(setInterval(uploadReading, delay * 1000))

  const handleStopSimulator = () => {
    clearInterval(intervalId)
    setIntervalId(0)
  }

  return (
    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Button
            title=" Decrement min by 10"
            type="outline"
            onPress={() => updateMinMax('min', -10)} 
      />
    <Button
            title=" Decrement max by 10"
            type="outline"
            onPress={() => updateMinMax('max', -10)}
      />
        <Button
            title=" Increment max by 10"
            type="outline"
            onPress={() => updateMinMax('max', 10)}
      />
    <Button
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
      />
    <Button
            title=" Decrement delay by 1"
            type="outline"
            onPress={() => setDelay(delay - 1)} 
      />
      <Button
            title="Increment delay by 1"
            type="outline"
            onPress={() => setDelay(delay + 1)} 
      />
      <View style={{margin:10}}>
      <Card>
      <Text style={{color:"black", fontSize:20}}>
        Delay {delay}
      </Text>
      </Card>
      </View>


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
});
