import React, { useContext, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
    
    <View style={styles.imagebg}>
      <StatusBar hidden={true} />
      <View style={styles.navBar}>
        <Text style={styles.headingText}>Settings</Text>
      </View>

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
        <Text style={styles.loginText}>Save Info</Text>
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
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout} style={styles.loginBtn}>
          <Text style={styles.loginText}>Logout</Text>
        </TouchableOpacity>
      <View style={{ backgroundColor: "#fff", width: 300, height: 150 }}>
        <Card style={{}}>
          <Card.Title>Current-Details</Card.Title>

          <Text style={styles.title1}>Name:- {user.name}</Text>
          <Text style={styles.title1}>Phone:- {user.phone}</Text>
          <Text style={styles.title1}>Role:- {user.role}</Text>
          <Text style={styles.title1}> Password:- ********</Text>
          <Text style={styles.title1}>Age:- {user.age}</Text>
        </Card>
        
        {/* <Button onPress={logout} title="Logout" type="outline" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize:40,
    fontWeight:"bold"
  },
  navBar: {
    backgroundColor: "#4DA8DA",
    height: 60,
    paddingRight: 10,
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
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

  loginText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },

  loginBtn: {
    width: "45%",
    borderRadius: 10,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 25,
    marginBottom: 20,
    backgroundColor: "#007CC7",
  },
  logoutBtn: {
    marginLeft: 10,
    marginTop: 10,
    width: "95%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 25,
    marginBottom: 20,
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
    marginTop: "25%",
  },

  headingText: {
    top: "0.5%",
    fontSize: 30,
    textAlign: "center",
    marginLeft: "32%",
    fontWeight: "bold",
  },
});
