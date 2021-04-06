import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, StatusBar, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import UserContext from "../UserContext";
import fb from "../fb";
import db from "../db";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user } = useContext(UserContext);

  const findAuthUser = fb.functions().httpsCallable('findAuthUser');

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
    setPhone(user.phone)
  };

  const saveName = async () => {
    await db.Users.update({
      id: user.id,
      name: name,
      role: user.role,
      age: age,
      phone: phone,
    });
    setName("");
    setId("");
    setRole("");
    setAge("");
    setPhone("");
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
    if (user.name) {
      await db.RealTimeMonitoring.create({ userid: fb.auth().currentUser.uid, activity: "Logout", activityDate: new Date(), email: user.name })
    }
    else {
      await db.RealTimeMonitoring.create({ userid: fb.auth().currentUser.uid, activity: "Logout", activityDate: new Date(), email: user.id })
    }
    await fb.auth().signOut();
  };

  console.log(user);

  return (
    <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>

      <View style={styles.imagebg}>
        <StatusBar hidden={true} />

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
            placeholder="Age"
            placeholderTextColor="#12232E"
            value={age}
            onChangeText={(value) => setAge(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Phone"
            placeholderTextColor="#12232E"
            value={phone}
            onChangeText={(value) => setPhone(value)}
          />
        </View>

        <TouchableOpacity onPress={saveName} style={styles.loginBtn}>
          <Text>Save</Text>
        </TouchableOpacity>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#12232E"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>


        <TouchableOpacity onPress={updatePassword} style={styles.loginBtn}>
          <Text>Update Password</Text>
         </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Card>
          <Card.Title >Current-Details</Card.Title>
          <Text >Name:- {user.name}</Text>
          <Text>Phone:- {user.phone}</Text>
          <Text>Role:- {user.role}</Text>
          <Text>Password:- ********</Text>
          <Text>Age:- {user.age}</Text>
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold"
  },

  navBar: {
    height: 60,
    paddingRight: 10,
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
  },

  container: {
    height: 400,
    width: "90%",
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
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 70,
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
    marginTop: 5
  },

  TextInput: {
    width: "80%",
    height: 50,
    flex: 1,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
  },

  loginText: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },

  loginBtn: {
    width: "35%",
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#99ceea",
  },
  logoutBtn: {
    width: "35%",
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: "25%",
  },

  headingText: {
    top: "0.5%",
    fontSize: 30,
    textAlign: "center",
    marginLeft: "34%",
    fontWeight: "bold",
  },
});
