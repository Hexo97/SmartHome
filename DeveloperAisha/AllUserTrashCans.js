import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, ScrollView } from "react-native";
import { ListItem,Image } from 'react-native-elements'
import { View } from '../components/Themed';
import UserContext from '../UserContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'
import { Icon } from 'react-native-elements'

export default function AllUserTrashCans() {
  const { user } = useContext(UserContext)

  const[userSensors, setUserSensors] = useState([])
  useEffect(() => db.Sensors.listenByUser(setUserSensors,user.id),[user])

  const[proxCat, setProxCat] = useState(null)
  useEffect(() => db.Categories.listenByName(setProxCat,"Proximity"), [])
  console.log(proxCat)

  const[trashSensors,setTrashSensors] = useState([])
  useEffect(() => proxCat?.id &&  db.Sensors.listenByCategory(setTrashSensors, proxCat.id),[proxCat])

  console.log(trashSensors)

  let yellow = "https://firebasestorage.googleapis.com/v0/b/cp3351-572e1.appspot.com/o/trash%2FyellowTrash.jpg?alt=media&token=b13bfae9-27aa-4a76-a7d1-8ae837b53135";
  let blue = "https://firebasestorage.googleapis.com/v0/b/cp3351-572e1.appspot.com/o/trash%2FblueTrash.jpg?alt=media&token=b13bfae9-27aa-4a76-a7d1-8ae837b53135";
  let red = "https://firebasestorage.googleapis.com/v0/b/cp3351-572e1.appspot.com/o/trash%2FredTrash.jpg?alt=media&token=fad5f7ed-e43c-47bb-8d0b-4d3a5ef1b87d";

  return (

    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style= {{ backgroundColor:"#12232E", height:50, margin:5, marginBottom:10}}>
        <Text style= {{ color: 'red',textAlign:"center",marginTop:10, fontSize:20 , fontStyle:"italic"}}>Trash Can's State</Text>
        <Icon name='trash' color='white' type='fontisto'/>
        </View>

        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
            These products cannot be used in safety devices for presses or other safety devices used to protect human life.
            These products are designed for use in applications for sensing workpieces and workers that do not affect safety.
        </Text> 

        <Text style={{color:"white" , fontStyle:"italic" , margin:20}}>
        Its touchless design opens the lid with a wave of the hand.
         When full, a button press on the front seals the bag, opens the top assembly for bag removal,
          then closes to pull a new bag into place. If the lid won’t close due to overloading,
           the trash can will automatically lift the top and seal the bag for removal.
        </Text> 


        <View style={{ margin:20}}>
          {
            trashSensors
            .map((oneTrash, i) => 
                <ListItem key={i} bottomDivider>
                      <Image
                        style={{width: 66, height: 58}}
                        source={oneTrash.fill === "Empty" ?{uri:blue}: oneTrash.fill === "Half"?{uri:yellow}: oneTrash.fill === "Full" ? {uri:red} : undefined}
                     />
                    <ListItem.Content>
                    <ListItem.Title>{oneTrash.location}</ListItem.Title>
                    <ListItem.Subtitle>{oneTrash.fill}</ListItem.Subtitle>
                    </ListItem.Content>
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
  space: {
    width: 0,
    height: 20,
  },
});
