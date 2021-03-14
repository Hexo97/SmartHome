import React, { useEffect, useState } from "react";
import { View } from "react-native";
import db from '../db'
import { StyleSheet,ScrollView } from 'react-native'
import { Text } from 'react-native-elements';
import { Card } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AirbnbRating } from 'react-native-elements';

export default function DisplaySearched({ sensor }) {

    const[sensorCategory , setSensorCategory] = useState([])
    useEffect(() => db.Categories.listenOne(setSensorCategory,sensor.categoryid),[sensor])

    const[categories , setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories),[])

    let catPicture = "https://s3.amazonaws.com/msc-media-linux-production/5e0ea029945d6.gif"

    if(sensorCategory.image)
    {
        catPicture = sensorCategory.image
    }

    const[popularId, setPopularId] = useState(null)
    useEffect(() => sensor !== "" ? db.PopularSensor.listenBySensor(setPopularId,sensor.id):undefined,[])

    console.log(popularId)

    const sendRating = async (rating) =>
    {
        await popularId && db.PopularSensor.update({id:popularId.id,rate:rating, dateSearched: new Date(), sensorid:sensor.id, name:sensor.location})
    }
    return (
        <SafeAreaProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{width:300 , marginLeft:40, marginHorizontal:40, marginBottom:80}}>
        <Card>
        <Card.Title style={{fontSize:20,backgroundColor:"#4DA8DA"}}>{sensor.location}</Card.Title>
        <Card.Divider/>
        <Card.Image source={{uri: catPicture}}>
        </Card.Image>
        <Card.Divider/>
        <Text style={{textAlign:"center",fontSize:20, fontStyle:"italic"}}>
            {
                categories
                &&
                categories.map(cat =>  cat.id == sensor.categoryid ?  <Text key={cat.id}>{cat.name}</Text> : undefined)
            }
         </Text>
         <Text style={{textAlign:"center", fontSize:20,fontStyle:"italic"}}>
            {
                categories
                &&
                categories.map(cat =>  cat.id == sensor.categoryid ?  <Text key={cat.id}>{"QR:"}{cat.price}</Text> : undefined)
            }
         </Text>

         <AirbnbRating
            count={4}
            reviews={["Bad", "OK","Good", "Perfect"]}
            defaultRating={11}
            size={20}
            onPress = {sendRating}
            onFinishRating={rating => sendRating(rating)}
        />

        </Card>
        </View>

        </ScrollView>
        </SafeAreaProvider>
    )
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
        width: 200,
        height: 200,
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
      width: 0, 
      height: 7,
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
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
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
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
  });
  