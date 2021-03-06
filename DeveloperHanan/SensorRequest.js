import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import SensorRequestProcessed from "./SensorRequestProcessed";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function SensorRequest() {
  const [payment, setPayment] = useState([]);
  useEffect(() => db.Payment.listenAll(setPayment), []);


  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}> User's Sensor Request </Text>
          <View style={styles.container}>
            {payment.length !== 0 ?
              <>
                {payment.map((payment) => (
                  <SensorRequestProcessed
                    key={payment.id}
                    payment={payment}
                    {...payment}
                  />
                ))}
              </>
              :
              <>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    marginTop: "60%",
                    marginLeft: "5%",
                  }}
                >
                  NO SENSOR REQUESTED
                </Text>
              </>
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
    marginLeft: 10,
    color: "white",
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
    backgroundColor: "#99ceea",
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
    backgroundColor: "#99ceea",
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
    backgroundColor: "#99ceea",
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
