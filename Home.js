import * as React from "react";

import { useState, useEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import RegisterLogin from "./RegisterLogin";

import Register from "./Register";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "react-native";
import db from "./db";
import { SliderBox } from "react-native-image-slider-box";
import "react-native-gesture-handler";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Card } from "react-native-elements";

export function Home({ navigation }) {
  const [items, setItems] = useState([]);
  const [ads, setAds] = useState([]);
  useEffect(() => db.Ads.listenAll(setAds), []);

  // useEffect(() => {categorries})

  let [myText, setMyText] = useState("");
  let [myDate, setMyDate] = useState("");

  useEffect(() => {
    let items = ads.map((v, i) => {
      //Loop to make image array to show in slider
      return v.image;
    });

    setItems(items);
    showText(0);
  }, []);

  const showText = (p) => {
    ads.map((y, i) => {
      //get the description from that position
      if (p == i) {
        setMyText(y.desc);
        setMyDate(y.date);
      }
    });
  };

  return (
    <View style={styles.imagebg}>
      <StatusBar hidden={true} />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("./assets/images/menu.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require("./assets/images/welcome.png")}
        ></Image>
      </View>

      <View style={{ width: "95%" }}>
        <Card
          styles={{ height: 80, marginTop: 400, backgroundColor: "#203647" }}
        >
          <Text
            style={{
              fontWeight: "bold",
              backgroundColor: "#4DA8DA",
              marginTop: 5,
              textAlign: "center",
              width: "94%",
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
              width: "94%"
            }}
          >
            {myDate}
          </Text>

          <SliderBox
            onPageSelected={(index) => showText(index)}
            images={items}
            autoplay
            circleLoop
            autoplaySpeed={1000}
            style={{ width: "74.4%", height: 200 }}
            dotColor="#203647"
          />
        </Card>
      </View>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={RegisterLogin} />
      <Drawer.Screen name="Register" component={Register} />
      {/* <Drawer.Screen name ="Action" component ={ActionsScreen}/> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#4DA8DA",
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
  imgContainer: {
    marginRight: "30%",
    marginLeft: "30%",
    // backgroundColor: "#fff",
    height: 200,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginRight: "30%",
    marginLeft: "30%",
  },
});
