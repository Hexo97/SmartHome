import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import fb from "../fb";
import db from "../db";
import { Input, Button, Card } from "react-native-elements";

export default function SettingsScreen() {
  const { user } = useContext(UserContext);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const edit = (user) => {
    setId(user.id);
    setName(user.name);
    setAge(user.age);
  };

  const saveName = async () => {
    await db.Users.update({
      id: user.id,
      name: name,
      role: user.role,
      age: age,
    });
    setName("");
    setId("");
    setRole("");
    setAge("");
  };

  const updatePassword = async () => {
    const loggedinuser = fb.auth().currentUser;
    loggedinuser
      .updatePassword(password)
      .then(function () {
        alert("done");
      })
      .catch(function (error) {
        alert("Failed to update");
      });

    setPassword("");
  };

  const logout = async () => {
    await fb.auth().signOut();
  };

  console.log(user);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.title}>Edit-Form</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Input
          placeholder="Age"
          value={age}
          onChangeText={(value) => setAge(value)}
        />

        <Input
          placeholder="Phone"
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />

        <Button onPress={saveName} title="Save-Info" type="outline" />

        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChangeText={(value) => setPassword(value)}
        />
        <Button
          onPress={updatePassword}
          title="Reset-password"
          type="outline"
        />

        <View style={{ backgroundColor: "#4DA8DA" }}>
          <Card>
            <Card.Title>Current-Details</Card.Title>

            <Text style={styles.title1}>Name:- {user.name}</Text>
            <Text style={styles.title1}>Phone:- {user.phone}</Text>
            <Text style={styles.title1}>Role:- {user.role}</Text>
            <Text style={styles.title1}> Password:- ********</Text>
            <Text style={styles.title1}>Age:- {user.age}</Text>
          </Card>
        </View>
        <Button onPress={logout} title="Logout" type="outline" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardBg: {
    flex: 1,
    backgroundColor: "pink",
    color: "pink",
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
    marginHorizontal: 5,
    backgroundColor: "#EEFBFB",
    height: 800,
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
    color: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title1: {
    fontSize: 14,
    fontWeight: "bold",
    // marginRight:150,
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    paddingEnd: 5,
    paddingBottom: 5,
    // marginRight:150,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
