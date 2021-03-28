import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Service from "../DeveloperMahmoud/Service";

export default function Promotion() {

  const [promotions, setPromotions] = useState([]);
  useEffect(() => db.Promotions.listenAll(setPromotions), []);

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Available Free Services: </Text>
          <View style={styles.container}>
            {promotions.map((promotion) =>
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
