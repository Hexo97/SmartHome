import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, ScrollView } from "react-native";
import { ListItem,Avatar } from 'react-native-elements'
import { View } from '../components/Themed';
import UserContext from '../UserContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'
import { Icon } from 'react-native-elements'

export default function AllUserSensors() {
  const { user } = useContext(UserContext)

  const[userSensors, setUserSensors] = useState([])
  useEffect(() => db.Sensors.listenByUser(setUserSensors,user.id),[user])

  const[categories,setCategories] = useState([])
  useEffect(() => db.Categories.listenAll(setCategories),[])

  return (

    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style= {{ backgroundColor:"#12232E", height:50, margin:5, marginBottom:10}}>
        <Text style= {{ color: 'red',textAlign:"center",marginTop:10, fontSize:20 , fontStyle:"italic"}}>Precautions</Text>
        <Icon name='warning' color='white'/>
        </View>

        <View style={{ margin:20}}>
          {
            categories
            .filter(category => userSensors.find(sensor => sensor.categoryid === category.id) !== undefined)
            .map((category, i) => 
                <ListItem key={i} bottomDivider>
                     <Avatar source={{uri: category.image ? category.image : "https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"}} />
                    <ListItem.Content>
                    <ListItem.Title>{category.name}</ListItem.Title>
                    <ListItem.Subtitle>{userSensors.location}</ListItem.Subtitle>
                    </ListItem.Content>
                    </ListItem>
                )
          }
        </View>


        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
            These products cannot be used in safety devices for presses or other safety devices used to protect human life.
            These products are designed for use in applications for sensing workpieces and workers that do not affect safety.
        </Text> 

        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
        Operating Environment
        Do not use the products in an environment where there are explosive or inflammable gases.

        Power Supply Voltage
        Do not use a voltage that exceeds the power supply voltage range.
        Using a voltage that exceeds the range may cause burning.

        Load Short-circuiting
        Do not short-circuit the load. Doing so may cause explosion or burning.
        </Text> 

        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
        Incorrect Wiring
        Be sure that the power supply polarity and other wiring is correct.
        Incorrect wiring may cause explosion or burning.
        </Text> 

        <View style= {{ backgroundColor:"#12232E", height:50, margin:5, marginBottom:10}}>
        <Text style= {{ color: 'red',textAlign:"center",marginTop:10, fontSize:20 , fontStyle:"italic"}}>Precautions for Correct Use</Text>
        <Icon name='warning' color='white'/>
        </View>


        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
        • When using a Sensor that supports non-corrosive gas as the applicable fluid, use an air filter to remove moisture and oil from the gas.

        • Do not insert any wire or other object into the pressure port. Doing so may damage the pressure elements and cause a malfunction.

        • Mount the Sensor so that it is not subject to ultrasonic vibration.

        • The cable can be extended to a maximum of 10 m. For details, see the output impedance section on the previous page.
        </Text>

        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
        Unplug it
        Simply disconnecting your devices or turning them off when not in use can significantly reduce your vulnerability to cyberattacks. It removes potential entry points into your network and minimizes the chances of unauthorized access to your network.

        With the advent of IoT devices in homes and offices, hackers also developed more cunning ways to exploit them.
        Adopting the abovementioned security habits can prevent a variety of IoT attacks, but if you need to beef up your security, contact us today. We have robust security solutions to keep your hardware and systems safe.
        </Text>

    </ScrollView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:"#12232E"
  },
  text: {
      color: "#EEFBFB",
      backgroundColor:"#12232E"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined,
      backgroundColor:"#12232E"
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      backgroundColor:"#12232E",
  },
  subText: {
      fontSize: 12,
      color: "#EEFBFB",
      textTransform: "uppercase",
      fontWeight: "500",
      backgroundColor:"#12232E"
  },
  profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      overflow: "hidden",
      backgroundColor:"#FFFFFF"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  space: {
    width: 0, // or whatever size you need
    height: 5,
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
      marginTop: 16
  },
  dm: {
    backgroundColor: "#55C21B",
    position: "absolute",
    top: 20,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
},
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1,
      backgroundColor:"#12232E"
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10,
      backgroundColor:"#12232E"
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
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  backgroundImage:{
    width:320,
    height:480,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  space: {
    width: 0,
    height: 20,
  },
});
