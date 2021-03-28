import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import CategoryAction from "./CategoryAction";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, TextInput } from "react-native";

export default function ActionsScreen() {
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [when, setWhen] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => db.Categories.listenAll(setCategory), []);

  const { user } = useContext(UserContext);

  const create = async () => {
    db.Categories.create({
      id: id,
      description: description,
      // image: image,
      name: name,
      price: price + "",
    });

    setDescription("");
    setImage("");
    // setName("");
    setPrice("");

    // automatically create ad with default values
    await db.Ads.create({
      desc: "COMING SOON !!",
      categoryid: id,
      image:
        "https://media.istockphoto.com/vectors/coming-soon-neon-banner-vector-template-glowing-night-bright-sign-vector-id1144514162?k=6&m=1144514162&s=612x612&w=0&h=np7sPl0hycuFTiDgfKCZFy3SF7XCjbRTcyF-sSKfMO8=",
      date: new Date().toDateString(),
    });

    setId("");
  };

  const edit = (category) => {
    setId(category.id);
    setDescription(category.description);
    // setImage(category.image);
    setName(category.name);
    setPrice(category.price + "");
  };

  const save = () => {
    db.Categories.update({
      id: id,
      description: description,
      // image: image,
      name: name,
      price: price,
    });
    setId("");
    setDescription("");
    // setImage("");
    setName("");
    setPrice("");
  };

  const remove = (id) => {
    db.Categories.remove(id);
  };

  const [customers, setCustomers] = useState([]);
  useEffect(() => db.Users.listenAll(setCustomers), []);

  const [cid, setCId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userRoleName, setUserRoleName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const saveUser = async () => {
    await db.Users.update({
      id: cid,
      role: userRole,
      name: userRoleName,
      phone: userPhone,
      age: userAge,
    });
    setName("");
    setId("");
    setUserRoleName("");
    setUserAge("");
    setUserPhone("");
  };

  const EditUserRole = (userRole, cid, userRoleName, userAge, userPhone) => {
    setUserRole(userRole);
    setCId(cid);
    setUserRoleName(userRoleName);
    setUserPhone(userPhone);
    setUserAge(userAge);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <SafeAreaProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.navBar}>
            <Text style={styles.headingText}> Category User Actions</Text>
          </View>
          <View style={styles.catFormContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Name"
                placeholderTextColor="#12232E"
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Description"
                placeholderTextColor="#12232E"
                value={description}
                onChangeText={(value) => setDescription(value)}
              />
            </View>

            {/* <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Image-Url"
                placeholderTextColor="#12232E"
                value={image}
                onChangeText={(value) => setImage(value)}
              />
            </View> */}

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="price"
                placeholderTextColor="#12232E"
                value={price}
                onChangeText={(value) => setPrice(value)}
              />
            </View>

            <TouchableOpacity onPress={create} style={styles.btn}>
              <Text style={styles.btnText}>Create Category</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={save} style={styles.btn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.catContainer}>
            {category.map((category) => (
              <CategoryAction
                key={category.id}
                category={category}
                edit={edit}
                remove={remove}
                {...category}
              />
            ))}
          </View>

          <Card>
            <View style={styles.rolesContainer}>
              <Text style={styles.title}>All customer roles</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Select user to change role"
                  placeholderTextColor="#12232E"
                  value={userRole}
                  onChangeText={(value) => setUserRole(value)}
                />
              </View>

              <TouchableOpacity onPress={saveUser} style={styles.btn}>
                <Text style={styles.btnText}>SaveUserRole</Text>
              </TouchableOpacity>

              <View style={{ marginTop: 10, alignItems: "flex-end" }}>
                {customers.map((c) => (
                  <View
                    key={c.id}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Text style={styles.helpLinkText4} key={c.id}>
                      Name: {c.name} Role: {c.role}
                    </Text>

                    <TouchableOpacity
                      style={{ marginLeft: 15 }}
                      onPress={() =>
                        EditUserRole(c.role, c.id, c.name, c.age, c.phone)
                      }
                    >
                      <Text
                        style={styles.helpLinkText3}
                        lightColor={Colors.light.tint}
                      >
                        <>&nbsp;</> EditUserRole
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </Card>
          {/*imean, from where u call this page you mean where i am dispaying? yes */}

          {/* <View style={styles.catContainer}>
            {category.map((category) => (
              <CategoryAction
                key={category.id}
                category={category}
                edit={edit}
                remove={remove}
                {...category}
              />
            ))}
          </View> */}
        </ScrollView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },

  btn: {
    width: "80%",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#007CC7",
  },

  rolesContainer: {
    borderRadius: 20,
    height: 400,
    width: 300,
    // margin: 20,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#EEFBFB",
  },
  catContainer: {
    // height: 3500,
    width: 365,
    marginLeft: "4%",
    // marginTop: 0, // equal to roles Container height
    // alignItems: "center",
    // justifyContent: "center",
    // marginBottom: 30,
    // backgroundColor: "red",
  },

  container: {
    height: 500,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEFBFB",
    marginTop: "0%",
  },
  catFormContainer: {
    height: 400,
    width: 400,
    margin: 10,
    // borderRadius: 20,
    // paddingTop:20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0%",
  },

  inputView: {
    borderColor: "#4DA8DA",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    paddingTop: 5,
    paddingLeft: 5,
    marginTop: 20,
    height: 50,
    fontSize: 15,
    color: "#12232E",
    // marginBottom: 20,
  },

  TextInput: {
    width: "80%",
    height: 10,
    flex: 1,
    fontSize: 15,
    // padding: 10,
    color: "#12232E",
  },

  navBar: {
    backgroundColor: "#4DA8DA",
    height: 60,
    alignItems: "center",
    width: "100%",
  },

  container1: {
    height: 300,
    width: 300,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
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
    backgroundColor: "#4DA8DA",
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
    paddingLeft: 7,
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
    backgroundColor: "#4DA8DA",
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
    backgroundColor: "#4DA8DA",
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
  headingText: {
    // top: "9%",
    fontSize: 30,
    textAlign: "center",
    // marginLeft: "32%",
    fontWeight: "bold",
  },
});
