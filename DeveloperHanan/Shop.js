import React, { useState, useEffect, useContext, } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import ShopItem from "./ShopItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

export default function Shop({ navigation }) {

  const [category, setCategory] = useState([]);
  useEffect(() => db.Categories.listenAll(setCategory), []);

  const { user } = useContext(UserContext);
  const [userSensors, setUserSensors] = useState([])

  useEffect(() => db.Sensors.listenByUser(setUserSensors, user.id), [user])

  const [promotion, setPromotion] = useState([]);
  const [ActivePromotion, setService] = useState([]);
  useEffect(() => {
    db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  }, [navigation]);


  useFocusEffect(
    React.useCallback(() => {
      // do this when focused
      console.log("shop is focused");
      db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
      return () => {
        // Do something when the screen is unfocused
        console.log("shop is unfocused");

      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            userSensors.length >= 2
            &&
            <TouchableOpacity
              onPress={() => navigation.navigate('Promotion')}
              style={styles.TouchPromotion}
            >
              <Text style={styles.TextPromotion}>Promos</Text>
            </TouchableOpacity>
          }
          <View style={styles.container}>

            {category.map((category) => (
              <ShopItem
                key={category.id}
                category={category}
                navigation={navigation}
                {...category}
                discount={promotion.name == ("Discount")}
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
    paddingVertical: 5,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  TouchPromotion: {
    marginLeft: 15,
    marginTop: 10,
    height: 30,
    width: 100,
    borderRadius: 55,
    backgroundColor: 'red'
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
