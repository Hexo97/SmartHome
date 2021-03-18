import * as React from "react";

import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "react-native";
import Gallery from "react-native-image-gallery";
import db from "../db";
import { SliderBox } from "react-native-image-slider-box";
import "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { Image } from "react-native";

export default function Advertisments({ navigation }) {
  const { user } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [ads, setAds] = useState([]);
  useEffect(() => db.Ads.listenAll(setAds), []);

  let [myText, setMyText] = useState("");
  let [myDate, setMyDate] = useState("");

  useEffect(() => {
    let items = ads.map((v, i) => {
      //Loop to make image array to show in slider
      return v.image;
    });
    // console.log(items)
    setItems(items);
    showText(0);
  }, [ads]);

  const showText = async (p) => {
    // console.log("nailaaa " + p);
    await ads.map((y, i) => {
      //get the description from that position
      if (p == i) {
        setMyText(y.desc);
        setMyDate(y.date);
      }
    });
  };

  return (
    <>
      <View style={styles.imgContainer1}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={{ width: 50, height: 50 }}
            onPress={() => navigation.openDrawer()}
          >
            <Image
              source={require("../assets/images/icon2.png")}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/ads.gif")}
          ></Image>
        </View>
      </View>

      <View style={styles.imagebg}>
        <StatusBar hidden={true} />

        <View style={{ width: "105%" }}>
          <Card
            styles={{ height: 80, marginTop: 400, backgroundColor: "#203647" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "#4DA8DA",
                marginTop: 5,
                textAlign: "center",
                width: "100%",
                paddingTop: 5,
              }}
            >
              {myText}
            </Text>

            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "#4DA8DA",
                textAlign: "center",
                paddingBottom: 5,
                width: "100%",
              }}
            >
              {myDate}
            </Text>

            <SliderBox
              currentImageEmitter={(index) => showText(index)}
              //  onPageSelected={(index) => showText(index)}
              images={items}
              autoplay
              circleLoop
              autoplaySpeed={1000}
              style={{ width: "89.2%", height: 300 }}
              dotColor="#203647"
            />
          </Card>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#007CC7",
    height: 60,
    paddingRight: 10,
    width: "100%",
  },

  imagebg: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEFBFB",
  },

  container: {
    height: 350,
    width: "70%",
    backgroundColor: "#EEFBFB",
    // paddingTop: 20,
    alignItems: "center",
    position: "absolute",
    // top: "35%",
    left: "15%",
    right: "15%",
    bottom: 350,
    borderRadius: 15,
  },
  headingText: {
    top: "1%",
    fontSize: 30,
    textAlign: "center",
    marginLeft: "29%",
    fontWeight: "bold",
  },

  imgContainer: {
    marginRight: "30%",
    marginLeft: "35%",
    backgroundColor: "#EEFBFB",
    height: 200,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer1: {
    backgroundColor: "#EEFBFB",
  },

  image: {
    marginRight: "30%",
    marginLeft: "50%",
    height: 200,
    width: 320,
    marginTop: 15,
  },
});
