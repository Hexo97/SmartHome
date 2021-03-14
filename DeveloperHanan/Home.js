import * as React from "react";

import { useState, useEffect, useContext } from "react";
import { Image, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import UserContext from "../UserContext";
import { Card} from 'react-native-elements'
import Login from "./Login";
import Register from "./Register";
import Popular from "../DeveloperAisha/Popular";
import FaqPublic from "./FaqPublic";
import Advertisments from "./Advertisments";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";



export function Home({ navigation }) {
  const { user } = useContext(UserContext);
  return (
 
    <View style={styles.imagebg}>
      <StatusBar hidden={true} />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../assets/images/icon2.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/welcome.png")}
        ></Image>
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

function MyDrawer({ user }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {
        !user ?
          <>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Popular" component={Popular} />
            <Drawer.Screen name="Faq" component={FaqPublic} />
            <Drawer.Screen name="Advertisments" component={Advertisments} />
          </>
          :
          <>
          </>
      }

    </Drawer.Navigator>
  );
}

export default function App() {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      <MyDrawer user={user} />
    </NavigationContainer>
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
  space: {
    width: 0, // or whatever size you need
    height: 10,
  },
});
