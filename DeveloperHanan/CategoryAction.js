import React, { useContext } from "react";
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

export default function CategoryAction({ category, edit, remove }) {
  const { user } = useContext(UserContext);

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
              }}
            >
              {category.description}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                backgroundColor: "#4DA8DA",
              }}
            >
              {category.price}
            </Text>
            <Card.Divider />
            <TouchableOpacity
              onPress={() => edit(category)}
              style={styles.title}
            >
              <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => remove(category.id)}
              style={styles.title}
            >
              <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                Remove
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#EEFBFB",
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
});
