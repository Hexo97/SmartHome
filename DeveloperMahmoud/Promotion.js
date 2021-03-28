import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Service from "../DeveloperMahmoud/Service";
import { useFocusEffect } from "@react-navigation/native";

export default function Promotion() {
  const { user } = useContext(UserContext);

  const [promotions, setPromotions] = useState([]);
  useEffect(() => db.Promotions.listenAll(setPromotions), []);

  // const [checkPromotion, setPromotion] = useState([]);
  // const [checkActivePromotion, setService] = useState([]);
  // useEffect(() => {
  //   db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  // }, [user]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // do this when focused
  //     console.log("focused");
  //     db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)

  //     return () => {
  //       // Do something when the screen is unfocused
  //       console.log("unfocused");
  //       db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)

  //     };
  //   }, [])
  // );
  
  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Available Free Services: </Text>
          <View style={styles.container}>
            {promotions.map((promotion) =>

              // ((
              //   checkPromotion.name != promotion.name
              //   &&
              //   checkActivePromotion.userId != user.id
              // )
              // ||
              // (user.role == "Support"))
              // &&

              (<Service
                key={promotion.id}
                promotion={promotion}
              />)
            )
            }
          </View>
        </ScrollView>
      </SafeAreaProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#203647",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 60,
    color: "white"
  }
});
