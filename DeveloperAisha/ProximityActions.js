import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, ScrollView} from "react-native";
import { View ,Text} from '../components/Themed';
import db from '../db'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from '../UserContext'
import { Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProximityActions({ sensor }) {
    console.log(sensor)

  const { user } = useContext(UserContext)
  useEffect(() => handleStopSimulator(), [user])

  // return "stop simulator function", to be called on component unmount, stopping the timer
  useEffect(() => handleStopSimulator, [])

  const [reading, setReading] = useState(null)
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor])


  const setProximity = async () => await db.Sensors.Readings.createReading(sensor.id, {
    when: new Date(),
    distance: (reading?.distance || 50) + Math.floor(Math.random() * 20) - 10,
  })

  const fillTrash = async(capacity, amount) =>
     await db.Sensors.Readings.update({...sensor , [capacity]: sensor[capacity] + amount })

  const handleToggleAlert = async () => await db.Sensors.togglePresence(sensor)

  const setPosition = async (latitudelongitude, amount) => await db.Sensors.update({ ...sensor, [latitudelongitude]: sensor[latitudelongitude] + amount })

  const [delay, setDelay] = useState(5)
  const [intervalId, setIntervalId] = useState(0)

  // start uploading random readings every 5 seconds
  const handleStartSimulator = () => setIntervalId(setInterval(setProximity, delay * 1000))

  const handleStopSimulator = () => {
    clearInterval(intervalId)
    setIntervalId(0)
  }

  return (
    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

    {/* <View style={{flexDirection:"row" , backgroundColor: '#12232E', marginBottom:10,marginTop:10}}>

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
      <Button
            title=" Set Latitude"
            type="outline"
            onPress={() => setPosition('latitude', +10)} 
            icon={
                <Icon
                  name="globe"
                  size={30}
                  color="#fe4a49"
                  style={{marginRight:10}}
                />
              }
        />
    </View>
    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
        <Button
            title=" Set Longitude"
            type="outline"
            onPress={() => setPosition('longitude', +10)} 
            icon={
                <Icon
                  name="globe"
                  size={30}
                  color="#fed766"
                  style={{marginRight:10}}
                />
              }
        />
    </View>
    </View> */}


    <View style={{flexDirection:"row" , backgroundColor: '#12232E', marginBottom:10,marginTop:10}}>

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
        <Button
            title="Fill the Trash"
            type="outline"
            onPress={() => fillTrash('capacity', 5)} 
            icon={
                <Icon
                  name="trash"
                  size={30}
                  color="#7bc043"
                  style={{marginRight:10}}
                />
              }
        />
    </View>

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
        <Button
            title="Set Proximity"
            type="outline"
            onPress={setProximity} 
            icon={
                <Icon
                  name="male"
                  size={30}
                  color="#00aedb"
                  style={{marginRight:10}}
                />
              }
        />
    </View>
    </View>


    <View style={{flexDirection:"row" , backgroundColor: '#12232E', marginBottom:10,marginTop:10}}>
    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>

            <Button
            title="Start simulator"
            type="outline"
            onPress={handleStartSimulator} 
            icon={
                <Icon
                  name="play"
                  size={30}
                  color="green"
                  style={{marginRight:10}}
                />
              }
      />
      </View>
      <View style= {{ backgroundColor:"#12232E",marginHorizontal:20}}>
      <Button
            title="Stop simulator"
            type="outline"
            onPress={handleStopSimulator}
            icon={
                <Icon
                  name="stop"
                  size={30}
                  color="red"
                  style={{marginRight:10}}
                />
              }
      />

      </View>
      </View>

      
    <View style={{flexDirection:"row" , backgroundColor: '#12232E', marginBottom:10,marginTop:10}}>
    <View style= {{ backgroundColor:"#12232E",marginHorizontal:30}}>
    <Button
            title="Set Delay + 1"
            type="outline"
            onPress={() => setDelay(delay + 1)}
            icon={
                <Icon
                  name="calendar"
                  size={30}
                  color="lightblue"
                  style={{marginRight:10}}
                />
              }
      />
    </View>

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
    <Button
            title="Set Delay - 1"
            type="outline"
            onPress={() => setDelay(delay- 1)}
            icon={
                <Icon
                  name="calendar"
                  size={30}
                  color="lightblue"
                  style={{marginRight:10}}
                />
              }
      />
    </View>
    </View>

    <View style={{flexDirection:"row" , backgroundColor: '#12232E',alignSelf:"center", marginBottom:10,marginTop:10}}>
    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
    <Button
            title="Toggle Alert"
            type="outline"
            onPress={handleToggleAlert} 
            icon={
                <Icon
                  name="exclamation"
                  size={30}
                  color="red"
                  style={{marginRight:10}}
                />
              }
        />
      </View>
      </View>
      <View style={{backgroundColor:"#EEFBFB",marginHorizontal:40,marginBottom:20,alignSelf:"center",alignItems:"center", height:100, width:200}}>
      <Icon
            raised
            name='hourglass-half'
            type='font-awesome'
            color='black'
            size={40}
            style={{marginTop:20}}
        />
        <Text style={{fontSize:20, fontStyle:"italic"}}>{delay}</Text>
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
  space: {
    width: 0, // or whatever size you need
    height: 10,
  },
});
