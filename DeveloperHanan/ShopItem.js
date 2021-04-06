import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { View } from "../components/Themed";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import UserContext from "../UserContext";
import db from "../db";
import { CardItem } from "native-base";

export default function ShopItem({ navigation, category, edit, remove, discount }) {
  const { user } = useContext(UserContext);

  const [payment, setPayment] = useState([]);

  const [catId, setCategory] = useState([]);
  const [cdate, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [userid, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  const create = async (cprice, catId) => {
    db.Payment.create({
      id: id,
      cdate: new Date(),
      price: cprice,
      userid: user.id,
      categories: catId,
      status: ""
    });
    setId("");
    setPrice("");
    setUser("");
    setDate("");
    setCategory("");
    setStatus("");
    alert("Payment successfully done, Sensor will be avaibale in some time");
  };



  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Card containerStyle={styles.card} >
            <Card.Title 
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18
              }}
            >
              {category.name}
              </Card.Title>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: category.image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: "white",
              }}
            >
              {category.description}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              QR: {discount ? category.price - (category.price * 20 / 100) + " (Discount Applied)" : category.price}
            </Text>

            <TouchableOpacity
              onPress={() => create(category.price, category.id)}
              style={styles.title}
            >
              <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                Buy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Reviews', { reviewCategory: category })}
              style={styles.title}
            >
              <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                Reviews
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'transparent',
    borderRadius: 30
  },
  tinyLogo: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  helpLinkText: {
    textAlign: "center",
    height: 30,
    width: 100,
    borderRadius: 4,
    backgroundColor: "#99ceea",
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
});
