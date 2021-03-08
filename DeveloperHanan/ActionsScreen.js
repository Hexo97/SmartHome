import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import db from "../db";
import CategoryAction from "./CategoryAction";
import { Input, Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ActionsScreen() {
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [when, setWhen] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => db.Categories.listenAll(setCategory), []);

  const { user } = useContext(UserContext);

  const create = async () => {
    db.Categories.create({
      id: id,
      description: description,
      image: image,
      name: name,
    });
    setId("");
    setDescription("");
    setImage("");
    setName("");
  };

  const edit = (category) => {
    setId(category.id);
    setDescription(category.description);
    setImage(category.image);
    setName(category.name);
  };

  const save = () => {
    db.Categories.update({
      id: id,
      description: description,
      image: image,
      name: name,
    });
    setId("");
    setDescription("");
    setImage("");
    setName("");
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
      <View style={styles.container1}>
        <Text style={styles.title}>Categories</Text>

        <Input
          placeholder="Name"
          value={name}
          onChangeText={(value) => setName(value)}
        />

        <Input
          placeholder="Description"
          value={description}
          onChangeText={(value) => setDescription(value)}
        />

        <Input
          placeholder="Image-Url"
          value={image}
          onChangeText={(value) => setImage(value)}
        />

        <TouchableOpacity onPress={create} style={styles.title}>
          <Text style={styles.helpLinkText1} lightColor={Colors.light.tint}>
            Create Category
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={save} style={styles.title}>
          <Text style={styles.helpLinkText1} lightColor={Colors.light.tint}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <View style={styles.container}>
              <Text style={styles.title}>All customer roles</Text>
              <Input
                placeholder="select user to change role"
                value={userRole}
                onChangeText={(value) => setUserRole(value)}
              />

              <TouchableOpacity onPress={saveUser} style={styles.title}>
                <Text
                  style={styles.helpLinkText}
                  lightColor={Colors.light.tint}
                >
                  SaveUserRole
                </Text>
              </TouchableOpacity>

              {customers.map((c) => (
                <View
                  key={c.id}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Text style={styles.helpLinkText4} key={c.id}>
                    Name: {c.name} Role: {c.role}
                  </Text>

                  <TouchableOpacity
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
          </Card>
          <View style={styles.container}>
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
    backgroundColor: "#EEFBFB",
  },
  container1: {
    height: 300,
    width: 300,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
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
});
