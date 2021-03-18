import React, { useContext, useState, useEffect } from "react";
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
import fb from "../fb";
import { Button, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
// import { Button } from "native-base";

export default function CategoryAction({ category, edit, remove }) {
  const { user } = useContext(UserContext);

  const uploadImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!image.cancelled) {
      const when = new Date();
      const imageName = when.toISOString();
      const imageRef = fb
        .storage()
        .ref(`categories/${category.id}/images/${imageName}.jpg`);

      const response = await fetch(image.uri);
      const blob = await response.blob();
      await imageRef.put(blob);
      const url = await imageRef.getDownloadURL();
      blob.close();
      await db.Categories.update({
        id: category.id,
        name: category.name,
        description: category.description,
        price: category.price,
        image: url,
      });
    }
  };

  const [sensors, setSensors] = useState([]);
  useEffect(
    () => db.Sensors.listenSensorsByCategory(setSensors, category?.id || ""),
    [category]
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Card>
            <Card.Title
              style={{ backgroundColor: "#4DA8DA", fontWeight: "bold" }}
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
                fontWeight: "bold",
                backgroundColor: "#4DA8DA",
                paddingLeft:"5%",
                paddingTop:"2%"
              }}
            >
              {category.description}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                backgroundColor: "#4DA8DA",
                paddingLeft:"36%"
              }}
            >
              QR: {category.price}
            </Text>
            <Card.Divider />
            <View
              style={{
                backgroundColor: "#4DA8DA",
                marginLeft: "8%",
                marginRight:"10%",
                marginTop: "5%",
                flexDirection: "row",
                marginTop:"0%",
              }}
            >
              <Icon
                raised
                name="edit"
                type="font-awesome"
                color="#4DA8DA"
                size={20}
                onPress={() => edit(category)}
              />
              <Icon
                raised
                name="upload"
                type="font-awesome"
                color="#4DA8DA"
                size={20}
                onPress={() => uploadImage()}
              />

              <Button
                onPress={() => remove(category.id)}
                title="Delete"
                disabled={sensors.length === 0 ? false : true}
                buttonStyle={styles.myButton}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 302.5,
    height: 200,
    marginLeft: 0,
  },
  container: {
    flex: 1,
    // backgroundColor: "",
    // marginTop:"5%",
    // marginBottom:"80%"
    marginVertical: 20

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
    height: 30,
    width: 100,
    borderRadius: 4,
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
  myButton: {
    backgroundColor: "#4DA8DA",
    alignSelf: "center",
    width: 100,
    marginLeft: 15,
    marginTop: "7%"
  },
});
