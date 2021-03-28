import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import db from '../db'
import { Tile } from 'react-native-elements';


export default function Popular({ navigation }) {

  const [popular, setPopular] = useState([])
  useEffect(() => db.PopularSensor.listenToLatestThree(setPopular), [])

  let onePop = ""
  let twoPop = ""
  let threePop = ""
  if (popular.length >= 3) {
    onePop = popular[0]
    twoPop = popular[1]
    threePop = popular[2]
  }
  const [firstSensor, setFirstSensor] = useState(null)
  useEffect(() => onePop ? db.Sensors.listenOne(setFirstSensor, onePop.sensorid) : undefined, [onePop])

  const [firstCategory, setFirstCategory] = useState(null)
  useEffect(() => firstSensor ? db.Categories.listenOne(setFirstCategory, firstSensor.categoryid) : undefined, [firstSensor])

  const [secondSensor, setSecondSensor] = useState(null)
  useEffect(() => twoPop ? db.Sensors.listenOne(setSecondSensor, twoPop.sensorid) : undefined, [twoPop])

  const [secondCategory, setSecondCategory] = useState(null)
  useEffect(() => secondSensor ? db.Categories.listenOne(setSecondCategory, secondSensor.categoryid) : undefined, [secondSensor])

  const [thirdSensor, setThirdSensor] = useState(null)
  useEffect(() => threePop ? db.Sensors.listenOne(setThirdSensor, threePop.sensorid) : undefined, [threePop])

  const [thirdCategory, setThirdCategory] = useState(null)
  useEffect(() => thirdSensor ? db.Categories.listenOne(setThirdCategory, thirdSensor.categoryid) : undefined, [thirdSensor])

  const image = { uri: "https://media.istockphoto.com/vectors/abstract-white-background-geometric-texture-vector-id1069183510?k=6&m=1069183510&s=612x612&w=0&h=IsR2U2IjDpCVAyY6oeeANwvIP1SHpBalMZPB_QNGnbw=" };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imagebg}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={{ width: 50, height: 50 }}
            onPress={() => navigation.openDrawer()}
          >
            <Image
              source={require("../assets/images/menu.png")}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
          <Text style={styles.headingText}>Customer Favourite Products</Text>
        </View>
        <ImageBackground source={image} style={styles.image}>
          {/* <View style={{alignSelf:"center", margin:50}}> */}
          <Tile
            imageSrc={require('../assets/images/customer.gif')}
            featured
            onPress={() => console.log("HELLO")} />
          {/* </View> */}

          {
            firstCategory
            &&
            <Tile
              imageSrc={require('../assets/images/box.png')}
              title={firstCategory.name + "\n" + "QR" + firstCategory.price}
              featured
            />
          }
          {
            thirdCategory
            &&
            <Tile
              imageSrc={require('../assets/images/boxFlip.png')}
              title={thirdCategory.name + "\n" + "QR" + thirdCategory.price}
              featured
            />
          }
          {
            secondCategory
            &&
            <Tile
              imageSrc={require('../assets/images/box.png')}
              title={secondCategory.name + "\n" + "QR" + secondCategory.price}
              featured
              onPress={() => console.log("HELLO")} />
          }

        </ImageBackground>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#007CC7",
    height: 60,
    paddingRight: 10,
    width: "100%",
    flexDirection: "row",
  },
  space: {
    width: 0, // or whatever size you need
    height: 20,
  },
  container: {
    height: 400,
    width: "90%",
    backgroundColor: "#fff",
    paddingTop: 50,
    alignItems: "center",
    position: "absolute",
    top: "25%",
    left: "5%",
    right: "20%",
    bottom: 0,
    borderRadius: 15,
  },

  imagebg: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEFBFB",
  },

  inputView: {
    borderColor: "#4DA8DA",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    paddingTop: 0,
    height: 50,
    fontSize: 15,
    color: "#12232E",
    marginBottom: 20,
  },

  TextInput: {
    width: "80%",
    height: 50,
    flex: 1,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
  },

  loginText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",

  },

  loginBtn: {
    width: "80%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#007CC7",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#4DA8DA",
  },
  footerLink: {
    color: "#4DA8DA",
    fontWeight: "bold",
    fontSize: 16,
  },

  headingView: {
    // flex: 1,
    alignItems: "center",
    marginTop: "25%",
  },

  headingText: {
    top: "1%",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  wrapper: {

  },
  backgroundImage: {
    width: 320,
    height: 480,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
