import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, Avatar, ScrollView } from "react-native";
import { ListItem, Icon , Card, Button } from 'react-native-elements'
import { View } from '../components/Themed';
import UserContext from '../UserContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'

export default function AllUserSensors() {
  const { user } = useContext(UserContext)

  const [profilePics, setProfilePics] = useState([])
  useEffect(() => db.Users.listenOne(setProfilePics, user.id), [])

  let currentProfile = "https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"
  if (profilePics.url) {
      currentProfile = profilePics.url
  }

  const[userSensors, setUserSensors] = useState([])
  useEffect(() => db.Sensors.listenByUser(setUserSensors,user.id),[user])

  const[categories,setCategories] = useState([])
  useEffect(() => db.Categories.listenAll(setCategories),[])

  return (

    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style= {{ backgroundColor:"#4DA8DA", height:50, margin:5, marginBottom:10}}>
        <Text style= {{ color: 'black',textAlign:"center",marginTop:10, fontSize:20 , fontWeight:"bold", fontStyle:"italic"}}>Sensors Status</Text>
        </View>

        <View>
        {/* {
            userSensors.map((item, i) => (
            <ListItem key={i} bottomDivider>

                <ListItem.Content>
                <ListItem.Title>{item.location}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />

            </ListItem>
            ))
        } */}

          {
            categories
            .filter(category => userSensors.find(sensor => sensor.categoryid === category.id) !== undefined)
            .map((category, i) => 
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                    <ListItem.Title>{category.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                )
          }

        </View>

    
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
});
