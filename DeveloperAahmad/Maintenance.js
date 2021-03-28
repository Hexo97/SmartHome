import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { Button, ListItem } from "react-native-elements";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function Maintenance({ route }) {

    const [maintenance, setMaintenence] = useState([]);
    useEffect(() => db.Sensors.Maintenance.listenToAll(setMaintenence), []);

    const [maintenanceReport, setMaintenanceReport] = useState([]);

    const [status, setStatus] = useState(null);
    const [comment, setComment] = useState("");

    const { user } = useContext(UserContext);

    const edit = (maintenanceReport) => {
        setStatus(maintenanceReport.status)
    };

    const save = async () => {
        console.log("status hhhhhhhhhhhhhhhhhhhhhhhhh", status)
        await db.Sensors.Maintenance.updateMaintenance(sensor.id, { ...maintenanceReport, status: status, comments: comment }, maintenanceReport.id);
        setAlert(false)
    };

    const [sensor, setSensor] = useState(null);
    useEffect(() => db.Sensors.listenOne(setSensor, maintenanceReport.sensorId), [maintenanceReport]);

    const [reportingUser, setReportingUser] = useState(null);
    useEffect(() => db.Users.listenOne(setReportingUser, maintenanceReport.userId), [maintenanceReport]);

    console.log(reportingUser);

    const [alert, setAlert] = useState(false)

    return (
        <>
            <View style={styles.navBar}>
                <Text style={styles.headingText}>Maintenance Requests</Text>
            </View>
            <SafeAreaProvider style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {
                        alert
                        &&
                        <>
                            <View style={{ flex: 1, backgroundColor: "#EEFBFB" }}>
                                <ListItem>
                                    <ListItem.Content>
                                        <ListItem.Title>Name</ListItem.Title>
                                        <View style={styles.subtitleView}>
                                            <Text style={{ fontSize: 15 }}>{reportingUser.name}</Text>
                                        </View>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Title>Status</ListItem.Title>
                                        <View style={styles.subtitleView}>
                                            <Text style={{ fontSize: 15 }}>{maintenanceReport.status}</Text>
                                        </View>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Title>Location</ListItem.Title>
                                        <View style={styles.subtitleView}>
                                            <Text style={{ fontSize: 15 }}>{sensor.location}</Text>
                                        </View>
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem>
                                    <ListItem.Content>
                                        <ListItem.Title>Request Message</ListItem.Title>
                                        <View style={styles.subtitleView}>
                                            <Text style={{ fontSize: 22 }}>{maintenanceReport.requestMessage}</Text>
                                        </View>
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem>
                                    <ListItem.Content>
                                        <ListItem.Title>Sensor Id</ListItem.Title>
                                        <View style={styles.subtitleView}>
                                            <Text style={{ fontSize: 22 }}>{maintenanceReport.sensorId}</Text>
                                        </View>
                                    </ListItem.Content>
                                </ListItem>

                                {/* 
                                <Text style={styles.normalTxt}>User: {reportingUser.name}</Text>
                                <Text style={styles.normalTxt}>Status: {maintenanceReport.status}</Text>
                                <Text style={styles.normalTxt}>Message: {maintenanceReport.requestMessage}</Text>
                                <Text style={styles.normalTxt}>Sensor ID: {maintenanceReport.sensorId}</Text>
                                <Text style={styles.normalTxt}>Location: {sensor.location}</Text> */}
                                <View style={{ backgroundColor: "#EEFBFB", alignItems: "center" }}>
                                    <Picker
                                        style={{
                                            height: 50, width: 200, backgroundColor: "white", marginVertical: 10
                                        }}
                                        selectedValue={status || maintenanceReport.status}
                                        onValueChange={setStatus}
                                    >
                                        <Picker.Item label="Requested" value="Requested" />
                                        <Picker.Item label="Resolved" value="Resolved" />
                                    </Picker>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="Please Enter a Comment"
                                            placeholderTextColor="#12232E"
                                            value={comment}
                                            onChangeText={(value) => setComment(value)}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#EEFBFB" }}>
                                        <Button
                                            disabled={status == "Requested" || !comment}
                                            onPress={save}
                                            title="Save"
                                            type="outline"
                                            buttonStyle={{ backgroundColor: "white" }}
                                        />
                                        <Text style={{ backgroundColor: "#EEFBFB" }}>&nbsp;&nbsp;&nbsp;</Text>
                                        <Button
                                            onPress={() => setAlert(false)}
                                            title="Cancel"
                                            type="outline"
                                            buttonStyle={{ backgroundColor: "white" }}
                                        />
                                    </View>
                                    <Text>{'\n'}</Text>
                                </View>
                            </View>
                        </>
                    }
                    <View style={styles.container}>
                        {user
                            ?
                            user.role === "Support"
                                ?
                                (
                                    maintenance.length > 0
                                        ?
                                        maintenance.map(r =>
                                            <View style={{ backgroundColor: "#007cc7", width: 300 }} key={r.id}>
                                                <Card>
                                                    <Text
                                                        style={{
                                                            fontSize: 15,
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Request Message: {r.requestMessage}
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
                                                        Date Scheduled: {r.dateScheduled.toLocaleDateString()}
                                                    </Text>
                                                    <Card.Divider />
                                                    {
                                                        r.status === "Requested"
                                                        &&
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                edit(r),
                                                                    setMaintenanceReport(r),
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
                                            There Are No Maintenance Requests
                                        </Text>
                                ) :
                                null
                            : null}
                    </View>
                </ScrollView>
            </SafeAreaProvider>
        </>
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
    navBar: {
        backgroundColor: "#007CC7",
        height: 60,
        paddingRight: 10,
        width: "100%",
        marginBottom: 10,
        flexDirection: "row",
    },
    headingText: {
        top: "1%",
        fontSize: 30,
        textAlign: "center",
        marginLeft: "10%",
        fontWeight: "bold",
    },
    inputView: {
        borderColor: "#4DA8DA",
        borderWidth: 2,
        borderRadius: 5,
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
    subtitleView: {
        flexDirection: 'row',
        paddingTop: 5
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});
