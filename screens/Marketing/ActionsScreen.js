import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "../../components/Themed";
import CatPicker from "../pickers/CatPicker";
import db from "../../db";
import { StatusBar } from "react-native";

export default function ActionsScreen() {
  let [category, setCategory] = useState(null);
  let [desc, setDesc] = useState("");
  let [url, setUrl] = useState("");
  let [myText, setMyText] = useState("");

  const create = async () => {
    setMyText("TRUE");

    await db.Ads.create({
      desc: desc,
      categoryid: category.id,
      image: url,
      date: new Date().toDateString(),
    });
    alert("Ad successfully created");
    setDesc(""), setCategory(null), setUrl("");
    setMyText("FALSE");

  };

  const valid = () => desc !== "" && category !== null && url != "";

  return (
    <View style={styles.imagebg}>
      <StatusBar hidden={true} />
      <View style={styles.navBar}>
        <Text style={styles.headingText}>Create Ad</Text>
      </View>
      <View style={styles.container}>
        <CatPicker set={setCategory} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Description"
            placeholderTextColor="#12232E"
            onChangeText={(text) => setDesc(text)}
            value={desc}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Image Url"
            placeholderTextColor="#12232E"
            onChangeText={(text) => setUrl(text)}
            value={url}
          />
        </View>

        <TouchableOpacity
          disabled={!valid()}
          onPress={create}
          style={styles.createBtn}
        >
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
        {myText == "TRUE" ? <Text>Creating Ad, Please Wait...</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#99ceea",
    height: 60,
    alignItems: "center",
    width: "100%",
  },

  container: {
    height: 400,
    width: "90%",
    backgroundColor: "#fff",
    paddingTop: 50,
    alignItems: "center",
    position: "absolute",
    top: "25%",
    left: "5%",
    right: "20%",
    bottom: 0,
    borderRadius: 15,
  },

  imagebg: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEFBFB",
  },

  inputView: {
    borderColor: "#99ceea",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    paddingTop: 0,
    height: 50,
    fontSize: 15,
    color: "#12232E",
    marginBottom: 20,
  },

  TextInput: {
    width: "80%",
    height: 50,
    flex: 1,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
  },

  createText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },

  createBtn: {
    width: "80%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#99ceea",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#99ceea",
  },
  footerLink: {
    color: "#99ceea",
    fontWeight: "bold",
    fontSize: 16,
  },

  headingView: {
    // flex: 1,
    alignItems: "center",
    // marginTop: "25%",
  },

  headingText: {
    top: "9%",
    fontSize: 30,
    textAlign: "center",
    // marginLeft: "32%",
    fontWeight: "bold",
  },
});
