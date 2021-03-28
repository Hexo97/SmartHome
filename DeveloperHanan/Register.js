import React, { useState } from "react";
import fb from "../fb";
import db from "../db";
import { StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Text, View } from "../components/Themed";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    console.log("register");
    try {
      await fb.auth().createUserWithEmailAndPassword(email, password);
      console.log(fb.auth().currentUser.uid);
      await db.Users.update({
        id: fb.auth().currentUser.uid,
        role: "Customer",
      });
      await db.RealTimeMonitoring.create({ userid: fb.auth().currentUser.uid, activity: "Register", activityDate: new Date(), email })
    } catch (error) {
      alert(error.message);
    }
  };

  const valid = () => email !== "" && password !== "";

  return (
    <View style={styles.imagebg}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../assets/images/icon2.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>

        <Text style={styles.headingText}>REGISTER</Text>
      </View>

      <View style={styles.container}>
        {/* <LoginPicker setEmail={setEmail} setPassword={setPassword} /> */}

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#12232E"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#12232E"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
        </View>

        <TouchableOpacity
          disabled={!valid()}
          onPress={register}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#007CC7",
    height: 60,
    paddingRight: 10,
    width: "100%",
    flexDirection: "row",
  },

  container: {
    height: 350,
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
    width: "80%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
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
    alignItems: "center",
    marginTop: "25%",
  },

  headingText: {
    top: "1%",
    fontSize: 30,
    textAlign: "center",
    marginLeft: "19%",
    fontWeight: "bold",
  },
});
