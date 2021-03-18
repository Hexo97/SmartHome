import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Platform, ScrollView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '../../components/Themed';
import fb from '../../fb'
import db from '../../db'
import { Button} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserContext from '../../UserContext'

export default function MotionActions({ sensor }) {

  const RandomUpload = async () => {

      let images = []
      let index = 0
      images[0] = "https://static01.nyt.com/images/2020/01/19/fashion/18RING-PREVIEW-IMAGE/18RING-PREVIEW-IMAGE-superJumbo-v4.png";
      images[1] = "https://townsquare.media/site/10/files/2019/07/Porch-Pirate.png?w=980&q=75";
      images[2] = "https://ewscripps.brightspotcdn.com/dims4/default/53f770f/2147483647/strip/true/crop/1280x672+0+24/resize/1200x630!/quality/90/?url=https%3A%2F%2Fx-default-stgec.uplynk.com%2Fausw%2Fslices%2F5c2%2Fbe88c4e651db4a7dbe102614d7272948%2F5c2579ee9c3b48479551eb29750baa19%2Fposter_92ae91e3b2da431fab2e0897ebf62d0e.jpg";
    
      index = Math.floor(Math.random() * images.length);

      const when = new Date()
      const imageName = when.toISOString()
      const imageRef = fb.storage().ref(`sensors/${sensor.id}/images/${imageName}.jpg`)

      const url = images[index]

      await db.Sensors.Readings.createReading(sensor.id, { when, url })
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const uploadImage = async () => {

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (!image.cancelled) {

      // image's name = date & time
      const when = new Date()
      const imageName = when.toISOString()
      const imageRef = fb.storage().ref(`sensors/${sensor.id}/images/${imageName}.jpg`)

      const response = await fetch(image.uri)
      const blob = await response.blob()
      await imageRef.put(blob)
      const url = await imageRef.getDownloadURL()
      console.log('url', url)
      blob.close()

      // create reading using when (ISO format) also as image name in storage
      await db.Sensors.Readings.createReading(sensor.id, { when, url })
    }
  }
  const { user } = useContext(UserContext)
  useEffect(() => handleStopSimulator(), [user])

  // return "stop simulator function", to be called on component unmount, stopping the timer
  useEffect(() => handleStopSimulator, [])

  const [delay, setDelay] = useState(5)
  const [intervalId, setIntervalId] = useState(0)

  // start uploading random readings every 5 seconds
  const handleStartSimulator = () => setIntervalId(setInterval(RandomUpload, delay * 1000))

  const handleStopSimulator = () => {
    clearInterval(intervalId)
    setIntervalId(0)
  }

  const handleToggleMotionDetected = () => db.Sensors.toggleMotionDetected(sensor)

  return (
    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{flexDirection:"row" , backgroundColor: '#12232E', marginBottom:10,marginTop:10}}>

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginLeft:30}}>
        <Button
            title="Upload Image"
            type="outline"
            onPress={uploadImage} 
            icon={
                <Icon
                  name="camera"
                  size={30}
                  color="#7bc043"
                  style={{marginRight:10}}
                />
              }
        />
        
    </View>
    

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
    <Button
            title="Toggle Alert"
            type="outline"
            onPress={handleToggleMotionDetected} 
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

      <View style={{flexDirection:"row" , backgroundColor: '#12232E', marginBottom:10,marginTop:10}}>
      <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginLeft:30}}>

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
      <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginLeft:30}}>
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
    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginLeft:30}}>
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

    <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginLeft:40}}>
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
    height: 7,
  },
});
