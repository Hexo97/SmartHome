import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { View } from "../components/Themed";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserContext from "../UserContext";
import db from "../db";

export default function PaymentHistory({ payments }) {
  const { user } = useContext(UserContext);

  const [payment, setPayment] = useState([]);
  useEffect(() => db.Payment.listenByPayment(setPayment, user?.id || ""), [
    user,
  ]);

  //console.log(payment);
  // console.log(payments);

  const [categories, setCategories] = useState("");
  useEffect(
    () =>
      payment
        ? db.Categories.listenOne(setCategories, payment.categories)
        : undefined,
    [payment]
  );
  //  console.log(categories.id)

  //console.log(payment.length);

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {payment.length !== 0 ? (
          <>
            {payment.map((c) => (
              <View style={styles.container} key={c.id}>
                <Card>
                  <Card.Title
                    style={{
                      backgroundColor: "#4DA8DA",
                      color: "black",
                      fontWeight: "bold",
                      // paddingBottom:"10%",
                      // marginTop:"10%"
                    }}
                  >
                    <Text key={c.id}> Receipt Code: {c.id} </Text>
                  </Card.Title>
                  <View style={{
                    backgroundColor: "white",
                    alignContent: "center",
                  }}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png",
                      }}
                    />
                  </View>


                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    <Text key={c.id}> Customer: {user.name}</Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    <Text key={c.id}> Amount paid: {c.price} QR</Text>
                  </Text>
                  {/* <Text
                style={{
                  fontSize: 15,
                  color: "black",
                }}
              >
                <Text key={c.id}> Sensor requested: {c.categories}</Text>
              </Text> */}

                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    <Text key={c.id}> Date: {c.cdate.toDateString()}</Text>
                  </Text>
                </Card>
              </View>
            ))}
          </>
        ) : (
          <Text
            style={{
              fontSize: 15,
              color: "white",
              marginTop: "60%",
              marginLeft: "28%",
            }}
          >
            {" "}
            NO PAYMENT HISTORY{" "}
          </Text>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
    marginLeft: 70,
  },
  container: {
    flex: 1,
    backgroundColor: "#203647",
  },
  cardBg: {
    backgroundColor: "rgba(96,100,109, 0.8)",
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
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
    marginLeft: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title1: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4DA8DA",
  },
  title3: {
    height: 20,
    width: 20,
  },
  cardtext: {
    fontSize: 20,
    textAlign: "left",
  },
  cardbg: {
    backgroundColor: "lightblue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
