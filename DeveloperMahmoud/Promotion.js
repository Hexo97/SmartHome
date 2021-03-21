import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import { Input, Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Shop() {

  const [promotions, setPromotions] = useState([]);
  useEffect(() => db.Promotions.listenAll(setPromotions), []);
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Available Free Services for you: </Text>
          <View style={styles.container}>
            {/* {promotions.map((promotion) => (
              <Service
                key={promotion.id}
                promotion={promotion}
                {...promotion}
              />
            ))} */}
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
