import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import ShopItem from "./ShopItem";
import { Input, Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native-elements";

export default function Shop({ navigation }) {

  const [category, setCategory] = useState([]);
  useEffect(() => db.Categories.listenAll(setCategory), []);

  const { user } = useContext(UserContext);
  const [userSensors, setUserSensors] = useState([])

  useEffect(() => db.Sensors.listenByUser(setUserSensors, user.id), [user])

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>BUY Smart Home Sensors </Text>
          <View style={styles.container}>

            {
              userSensors.length >= 2
              &&
              <Button
                title="FREE SERVICES"
                type="outline"
                onPress={() => navigation.navigate('Promotion')}
              />
              // &&
              // <TouchableOpacity
              //   onPress={() => navigation.navigate('Promotion')}
              //   style={styles.TouchPromotion}
              // >
              //   <Text style={styles.TextPromotion}>
              //     FREE SERVICES
              // </Text>
              // </TouchableOpacity>

            }
            {category.map((category) => (
              <ShopItem
                key={category.id}
                category={category}
                navigation={navigation}
                {...category}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  TextPromotion: {
    fontSize: 17,
    color: 'yellow'
  },
  TouchPromotion: {
    padding: 5,
    height: 35,
    overflow: 'hidden',
    borderRadius: 55,
    backgroundColor: '#3B58F5'
  },
  customViewStyle: {
    width: 120,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonStyle8: {
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 22,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#203647",
  },
  container1: {
    height: 300,
    width: 300,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 60,
    color: "white"
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
    color: "black",
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
    marginLeft: 10,
  },
  helpLinkText4: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  helpLinkText3: {
    textAlign: "center",
    color: "black",
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
    marginLeft: 15,
  },
  helpLinkText1: {
    textAlign: "center",
    color: "black",
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
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 0,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
