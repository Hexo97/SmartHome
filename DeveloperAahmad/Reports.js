import React, { useState, useEffect, useContext } from "react";
import {
  ImageBackground,
StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { Button } from "react-native-elements";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Reports() {
  const [reports, setReports] = useState([]);
  useEffect(() => db.Reports.listenAll(setReports), []);

  const [report, setReport] = useState([]);
  // useEffect(() => db.Reports.listenAll(setReports), [setReport]);
  // console.log(reports);
  const [status, setStatus] = useState("");

  const { user } = useContext(UserContext);

  const edit = (report) => {
    setStatus(report.status)
  };

  const save = async () => {
    await db.Sensors.remove(report.sensorId)
    console.log(report.sensorId)
    await db.Reports.update({ ...report, status: status });
    await db.Logs.create(
      {
        sensorId: sensor.id,
        categoryId: sensor.categoryid,
        date: new Date(),
        logMessage: ` Sensor Removed`
      }
    )
    setAlert(false)
  };

  // const remove = (id) => {
  //   db.Reports.remove(id);
  // };

  const [sensor, setSensor] = useState(null);
  useEffect(() => db.Sensors.listenOne(setSensor, report.sensorId), [report]);

  const [reportingUser, setReportingUser] = useState(null);
  useEffect(() => db.Users.listenOne(setReportingUser, report.userId), [report]);

  const [alert, setAlert] = useState(false)
  // console.log(sensor);
  return (
    <>
      <SafeAreaProvider style={styles.container}>
        {/* <ImageBackground source={require("../assets/images/background.png")} style={styles.background}> */}

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.container}>
            {
              alert
              &&
              <>
                <Text style={styles.normalTxt}>User: {reportingUser.name}</Text>
                <Text style={styles.normalTxt}>Status: {report.status}</Text>
                <Text style={styles.normalTxt}>Message: {report.message}</Text>
                <Text style={styles.normalTxt}>Sensor Id: {report.sensorId}</Text>
                <Text style={styles.normalTxt}>Location: {sensor.location}</Text>
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
                  disabled={status == "Pending"}
                  onPress={save}
                  title="Save"
                  type="outline"
                />
              </>
            }

            {user
              ?
              user.role === "Support"
                ?
                (
                  reports.length > 0
                    ?
                    reports.map(r =>
                      <View style={{ backgroundColor: "#007cc7", width: 300 }} key={r.id}>
                        <Card>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            Message: {r.message}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            Status: {r.status}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            Date Created: {r.dateCreated.toDateString()}
                          </Text>
                          <Card.Divider />
                          {
                            r.status === "Pending"
                            &&
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
                          }

                        </Card>
                      </View>
                    )
                    :
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      There are no reports
                    </Text>
                ) :
                null
              : null}




          </View>
          </ScrollView>
        {/* </ImageBackground> */}

      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEFBFB",
    // backgroundColor: "transparent",
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
  navBar: {
    backgroundColor: "#007CC7",
    height: 60,
    paddingRight: 10,
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
  },
  headingText: {
    top: "0.5%",
    fontSize: 30,
    textAlign: "center",
    marginLeft: "37.5%",
    fontWeight: "bold",
  },
});
