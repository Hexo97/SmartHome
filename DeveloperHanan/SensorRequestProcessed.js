import React, { useContext, useState,useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { View } from "../components/Themed";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import UserContext from "../UserContext";
import db from "../db";
import { Button } from "react-native-elements";

export default function SensorRequestProcessed({ payment}) {
  const { user } = useContext(UserContext);

  const [addd, setAddd] = useState(false);

  const create = async (userid,categoryid) => {

    if(category && category.name === "Temperature")
    {
      db.Sensors.create({
      categoryid: categoryid,
      userid: userid,
      alert:false,
      location:"Default",
      min:0,
      max:100
    });
    setAddd(true)
    }
    if(category && category.name === "Sound")
    {
      db.Sensors.create({
      categoryid: categoryid,
      userid: userid,
      alert:false,
      location:"Default",
      minDB:0,
      maxDB:100
    });
    setAddd(true)
    }
    if(category && category.name === "Proximity")
    {
      db.Sensors.create({
      categoryid: categoryid,
      userid: userid,
      location: "Kitchen",
        state: "off",
        latitude: 25.354826,
        longitude: 25.4,
        motiondetected: false,
    });
    setAddd(true)
    }
    if(category && category.name === "Motion")
    {
      db.Sensors.create({
      categoryid: categoryid,
      userid: userid,
      motiondetected:false,
      location:"Default",
    });
    setAddd(true)
    }
  
    alert("Sensor created");
  
  };

  const [category, setCategory] = useState("");
  useEffect(() => payment ? db.Categories.listenOne(setCategory,payment.categories) : undefined, [payment])


  // const [request, setRequest] = useState("");
  // useEffect(() => db.Payment.listenAll(setRequest), []);

  // console.log(request.length, "-----------------")

  const [categories, setCategories] = useState("");
  useEffect(() => payment ? db.Categories.listenOne(setCategories,payment.categories) : undefined, [payment])
  // console.log(categories)

  const [rusers, setRusers] = useState("");
  useEffect(() => payment ? db.Users.listenOne(setRusers,payment.userid) : undefined, [payment])
  // console.log(rusers)

  
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
    
      <>
        <View style={styles.container}>
          <Card>
            <Card.Title
              style={{
                backgroundColor: "#4DA8DA",
                color: "black",
                fontWeight: "bold",
              }}
            >
             Customer Name: {rusers.name}
            </Card.Title>
            <Text
              style={{
                fontSize: 15,
                color: "black",
              }}
            >
              Amount paid: QR {payment.price}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "black",
              }}
            >
              Sensor requested: {categories.name} 
            </Text>

            <Button
              onPress={() => create(payment.userid, payment.categories)}
              title="Create"
              disabled={addd}
              buttonStyle={styles.myButton}
            />
     
          </Card>
        </View>
        </>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#203647",
  },
  cardBg: {
    backgroundColor: "rgba(96,100,109, 0.8)",
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
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
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
    // display: "flex",
    height: 30,
    width: 100,
    borderRadius: 4,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#4DA8DA",
    shadowColor: "white",
    shadowOpacity: 0.4,
    padding: 5,
    margin: 2,
    marginLeft: 35,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title1: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4DA8DA",
  },
  title3: {
    height: 20,
    width: 20,
  },
  cardtext: {
    fontSize: 20,
    textAlign: "left",
  },
  cardbg: {
    backgroundColor: "lightblue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  myButton: {
    backgroundColor: "#4DA8DA",
    alignSelf: "center",
    width: 100,
    marginLeft: 10,
    height:30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:5
   
  },
});
