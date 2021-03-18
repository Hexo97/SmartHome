import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { View, Text, Icon } from "../components/Themed";
import db from "../db";
import { StatusBar, SafeAreaView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AdsScreen() {
  const [categories, setCategories] = useState([]);
  useEffect(() => db.Categories.listenAll(setCategories), []);
  const [categoryId, setCategoryId] = useState("");

  let [category, setCategory] = useState(null);
  let [updatedCategory, setUpdatedCategory] = useState(null);

  let [desc, setDesc] = useState("");
  let [url, setUrl] = useState("");
  let [myText, setMyText] = useState("");
  let [isEdit, setIsEdit] = useState("false");
  let [idd, setMyId] = useState("");

  const [ads, setAds] = useState([]);
  useEffect(() => db.Ads.listenAll(setAds), []);

  const create = async () => {
    setMyText("TRUE");

    await db.Ads.create({
      desc: desc,
      categoryid: categoryId,
      image: url,
      date: new Date().toDateString(),
    });
    alert("Ad successfully created");
    setDesc(""), setCategoryId(""), setUrl("");
    setMyText("FALSE");
  };

  const valid = () => desc !== "" && categoryId !== null && url != "";

  const remove = (id) => {
    db.Ads.remove(id);
  };

  const edit = async () => {
    db.Ads.update({
      id: idd,
      desc: desc,
      categoryid: categoryId,
      image: url,
      date: new Date().toDateString(),
    });
    setDesc(""), setCategoryId(""), setUrl(""), setMyId(""), setIsEdit("false");
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imagebg}>
          <StatusBar hidden={true} />

          <View style={styles.navBar}>
            <Text style={styles.headingText}> Ad</Text>
          </View>

          <View>
            {isEdit == "false" ? (
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Create Ad
              </Text>
            ) : null}
            {isEdit == "true" ? (
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Edit Ad</Text>
            ) : null}
          </View>

          <View
            style={{
              width: "80%",
              height: 50,
              borderColor: "#4DA8DA",
              borderWidth: 2,
              marginBottom: 20,
              borderRadius: 15,
            }}
          >
            <Picker selectedValue={categoryId} onValueChange={setCategoryId}>
              <Picker.Item label="Select Category" value="" />
              {categories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Picker>
          </View>

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

          {isEdit == "false" ? (
            <TouchableOpacity
              disabled={!valid()}
              onPress={create}
              style={styles.createBtn}
            >
              <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
          ) : null}
          {isEdit == "true" ? (
            <TouchableOpacity
              disabled={!valid()}
              onPress={edit}
              style={styles.createBtn}
            >
              <Text style={styles.createText}>Edit</Text>
            </TouchableOpacity>
          ) : null}

          {isEdit == "true" ? (
            <Text
              style={styles.footerLink}
              onPress={() => {
                console.log("Switch");
                setIsEdit("false");
                setDesc(""), setCategoryId(""), setUrl("");
              }}
            >
              Switch to create
            </Text>
          ) : null}

          {myText == "TRUE" ? <Text>Creating Ad, Please Wait...</Text> : null}

          <View style={styles.space} />

          <View>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              Edit/Delete Ad
            </Text>

            {ads.map((c) => (
              <View
                key={c.id}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 220,
                  height: 170,
                  borderColor: "#000",
                  marginRight: 3,
                  marginTop: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderWidth: 2,
                }}
              >
                <Text>{c.desc}</Text>
                <Text>{c.date}</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      width: 90,
                      borderRadius: 10,
                      height: 25,
                      paddingLeft: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: 2,
                      marginTop: 15,
                      backgroundColor: "#007CC7",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onPress={() => {
                      setDesc(c.desc),
                        setCategoryId(c.categoryid),
                        setUrl(c.image);
                      setIsEdit("true"), setMyId(c.id);
                      console.log("is edit " + isEdit);
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>

                 <TouchableOpacity
                  onPress={() => {
                    remove(c.id);
                  }}
                >
                  <Text
                    style={{
                      width: 90,
                      borderRadius: 10,
                      height: 25,
                      paddingLeft: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      paddingTop: 2,
                      backgroundColor: "#007CC7",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Remove
                  </Text>
                </TouchableOpacity> 

              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  editObjContainer: {
    // height: "MATCH_PARENT",
    width: "90%",
    backgroundColor: "#fff",
    // marginTop:100,
    // paddingTop: 50,
    alignItems: "center",
    position: "absolute",
    // top: "90%",
    left: "5%",
    right: "20%",
    bottom: 0,
    // borderRadius: 15,
  },

  sContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#4DA8DA",
    borderRadius: 2,
  },
  navBar: {
    backgroundColor: "#4DA8DA",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },

  createContainer: {
    height: "50%",
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 20,
    // marginTop:3,
    alignItems: "center",
    position: "absolute",
    top: "10%",
    left: "5%",
    right: "20%",
    marginBottom: 50,
    // bottom: 0,
    borderRadius: 15,
  },

  editContainer: {
    height: 400,
    width: "90%",
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "center",
    position: "absolute",
    top: "65%",
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
    borderColor: "#4DA8DA",
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
    textAlign: "center",
  },

  createBtn: {
    width: "80%",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#007CC7",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#4DA8DA",
  },
  footerLink: {
    color: "#4DA8DA",
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
  space: {
    height: 30,
  },
});
