import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import { Picker } from '@react-native-picker/picker';



export default function Reports() {
  const [reports, setReports] = useState([]);
  useEffect(() => db.Reports.listenAll(setReports), []);

  const [report, setReport] = useState([]);
  // useEffect(() => db.Reports.listenAll(setReports), [setReport]);
  console.log(reports);
  const [status, setStatus] = useState("");

  const { user } = useContext(UserContext);

  const edit = (report) => {
    setStatus(report.status)
  };

  const save = () => {
    db.Reports.update({ ...report, status: status });
    setAlert(false)
  };

  const remove = (id) => {
    db.Reports.remove(id);
  };

  const [alert, setAlert] = useState(false)

  return (
    <View style={styles.container}>
      {
        alert
        &&
        <>
          <Text style={styles.normalTxt}>Status: {report.status}</Text>
          <Text style={styles.normalTxt}>Message: {report.message}</Text>
          <Picker
            selectedValue={status}
            style={{ height: 50, width: 200 }}
            selectedValue={status}
            onValueChange={setStatus}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Resolved" value="Resolved" />
          </Picker>
          <Button
            onPress={save}
            title="Save"
            type="outline"
          />
        </>
      }

      { user ? user.role === "Support" ? (
        reports.map(r =>
          <View style={{ backgroundColor: "#007cc7", width: 300 }} key={r.id}>
            <Card>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {r.message}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {r.status}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {r.dateCreated.toDateString()}
              </Text>
              <Card.Divider />
              <TouchableOpacity
                onPress={() => {
                  edit(r),
                    setReport(r),
                    setAlert(true)
                }}
                style={styles.title}
              >
                <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                  Edit
              </Text>
              </TouchableOpacity>
            </Card>
          </View>
        )
      ) :
        null
        : null}



      {/* <View style={styles.container}>
        {faq.map((faq) =>
          faq.answer !== "" ? (
            <FaqScreen
              key={faq.id}
              userid={faq.userid}
              edit={edit}
              remove={remove}
              faq={faq}
              {...faq}
            />
          ) : user ? user.role === "Support" ? (
            <FaqScreen
              key={faq.id}
              userid={faq.userid}
              edit={edit}
              remove={remove}
              faq={faq}
              {...faq}
            />
          ) : null 
          : null
        )}
      </View> */}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4DA8DA",
  },
  normalTxt: {
    fontSize: 20,
    color: "#4DA8DA",

  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
    display: "flex",
    height: 30,
    width: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    shadowColor: "white",
    shadowOpacity: 0.4,
    padding: 5,
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
