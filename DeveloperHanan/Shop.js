import React, { useState, useEffect, useContext, } from "react";
import {
  ImageBackground,
  StyleSheet, ScrollView, TouchableOpacity
} from "react-native";
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


  return (
    <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>
      <View style={styles.container}>
        <SafeAreaProvider style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              (
                userSensors.length >= 2
                &&
                <TouchableOpacity
                  onPress={() => navigation.navigate('Promotion')}
                  style={styles.TouchPromotion}
                >
                  <Text style={styles.TextPromotion}>Promos</Text>
                </TouchableOpacity>
              )
              ||
              <View style={styles.shopSpace}></View>

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
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 2,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  shopSpace: {
    width: 0, // or whatever size you need
    height: 35,
  },
});
