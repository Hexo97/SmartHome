import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import db from "../db";
import { View } from "../components/Themed";
import { Picker } from "@react-native-picker/picker";

export default function ReportPicker({ set }) {
  
  return (
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
      <Picker
            selectedValue={userType}
            style={{ height: 50, width: 200  }}
            selectedValue={userType}
            onValueChange={setUserType}
        >
            <Picker.Item label="Check User Login Here...." value="userType" />
            <Picker.Item label="Register" value="Register" />
            <Picker.Item label="Login" value="Login" />
            <Picker.Item label="Logout" value="Logout" />
        </Picker> 
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
