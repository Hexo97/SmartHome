import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import db from "../../db";
import { Picker } from "@react-native-picker/picker";

export default function UserPicker({ set }) {
  const [users, setUsers] = useState([]);
  useEffect(() => db.Users.listenAll(setUsers), []);
  const [userId, setUserId] = useState("");
  useEffect(() => db.Users.listenOne(set, userId), [userId]);

  return (
    <View
      style={{
        width: "80%",
        height: 50,
        borderColor: "#99ceea",
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 15,
      }}
    >
      <Picker selectedValue={userId} onValueChange={setUserId}>
        <Picker.Item label="Select User" value="" />
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.name} value={user.id} />
        ))}
      </Picker>
    </View>
  );
}
