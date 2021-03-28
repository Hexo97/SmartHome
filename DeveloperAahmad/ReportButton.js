import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text } from "../components/Themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon, AirbnbRating, Button } from "react-native-elements";
import db from '../db'
import DialogInput from 'react-native-dialog-input';

export default function ReportButton({ user, category, sensor }) {

    const [reviewVisible, setReviewVisible] = useState(false)
    const [maintenanceVisible, setMaintenanceVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [alert, setAlert] = useState(false)
    const [reviewAlert, setReviewAlert] = useState(false)
    const [maintenanceAlert, setMaintenanceAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [reviewMessage, setReviewMessage] = useState("")
    const [maintenanceMessage, setMaintenanceMessage] = useState("")
    console.log(reviewMessage)
    const [rating, setRating] = useState(0)
    const [maintenanceDate, setMaintenanceDate] = useState(new Date())
    const [show, setShow] = useState(false);

    const createRequest = async (sensor, msg) => {
        if (!msg) {
            setAlert(true);
        }
        else {
            await db.Reports.create({
                sensorId: sensor.sensor.id,
                userId: user.id,
                message: msg,
                dateCreated: new Date(),
                status: "Pending",
            });
            await db.Logs.create(
                {
                    sensorId: sensor.sensor.id,
                    categoryId: category.id,
                    date: new Date(),
                    logMessage: ` Sensor Reported`
                }
            )
            setVisible(false);
        }
    };

    const createReview = async (category, reviewMsg) => {
        if (!reviewMsg) {
            setReviewAlert(true)
        }
        else {
            // console.log("else:", sensor.id);
            const review = { rating, categoryId: category.id, reviewMsg, date: new Date(), userId: user.id };
            await db.Categories.Reviews.createReview(category.id, review);
            await db.Logs.create(
                {
                    sensorId: sensor.id,
                    categoryId: category.id,
                    date: new Date(),
                    logMessage: ` Review`
                }
            )
            setReviewVisible(false)
            setReviewMessage("")
        }
    };

    const createMaintenance = async (maintMsg) => {
        if (!maintMsg) {
            setMaintenanceAlert(true)
        }
        else {
            const maintenance = { userId: user.id, sensorId: sensor.id, status: "Requested", dateScheduled: maintenanceDate, comments: "", requestMessage: maintMsg };
            await db.Sensors.Maintenance.createMaintenance(sensor.id, maintenance);
            setMaintenanceVisible(false)
            setMaintenanceMessage("")
        }
    };

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || maintenanceDate;
        setMaintenanceDate(currentDate);
        console.log(maintenanceDate);
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={true}>

                <View style={{ backgroundColor: "#12232E", flexDirection: "row", alignSelf: "center", marginRight: 50 }}>
                    <View style={{ backgroundColor: "#12232E" }} >
                        <Icon
                            name="report"
                            type="material-icons"
                            size={20}
                            reverse
                            containerStyle={{
                                left: "42.5%"
                            }}
                            color="#f50"

                            onPress={() => {
                                setVisible(true)
                            }}
                        />
                        <DialogInput
                            style={{ width: "80%" }}
                            isDialogVisible={visible}
                            title={"Report This Sensor"}
                            message={
                                alert
                                &&
                                <Text style={styles.alert}>Please enter a message</Text>
                            }
                            value={message}
                            submitInput={(inputText) => {
                                // setMessage(inputText) , 
                                createRequest({ sensor }, inputText)
                            }
                            }
                            closeDialog={() => {
                                setVisible(false),
                                    setMessage(""),
                                    setAlert(false)
                            }
                            }
                            onTouchOutside={() => {
                                setVisible(false);
                            }}
                        >
                        </DialogInput>
                    </View>

                    <View style={{ backgroundColor: "#12232E", marginHorizontal: 20 }}>
                        <Icon
                            name="star"
                            type="ant-design"
                            size={20}
                            reverse
                            containerStyle={{
                                left: "42.5%"
                            }}
                            color="#f50"

                            onPress={() => {
                                setReviewVisible(true)
                            }}
                        />
                    </View>

                    <View style={{ backgroundColor: "#12232E", marginHorizontal: 20 }}>
                        <DialogInput
                            style={{ width: "80%" }}
                            isDialogVisible={reviewVisible}
                            title={"Review This Sensor"}
                            message={
                                reviewAlert
                                    ?
                                    <View style={{ paddingHorizontal: 50 }}>
                                        <AirbnbRating
                                            count={5}
                                            reviews={["Horrible", "Bad", "Average", "Good", "Perfect"]}
                                            defaultRating={1}
                                            size={20}
                                            onPress={setRating}
                                            onFinishRating={rating => setRating(rating)}
                                        />
                                        <Text>{'\n'}</Text>
                                        <Text style={styles.alert}>Please enter a review</Text>
                                    </View>
                                    :
                                    <View style={{ paddingHorizontal: 50 }}>
                                        <AirbnbRating
                                            count={5}
                                            reviews={["Horrible", "Bad", "Average", "Good", "Perfect"]}
                                            defaultRating={1}
                                            size={20}
                                            onPress={setRating}
                                            onFinishRating={rating => setRating(rating)}
                                        />
                                    </View>
                            }
                            submitInput={(inputText) => {
                                createReview(category, inputText)
                            }

                            }

                            closeDialog={() => {
                                setReviewVisible(false),
                                    setReviewMessage(""),
                                    setReviewAlert(false)
                            }
                            }
                            onTouchOutside={() => {
                                setReviewVisible(false);
                            }}
                        >

                            {
                                reviewAlert
                                &&
                                <Text style={styles.alert}>Please enter a review</Text>
                            }

                        </DialogInput>
                    </View>

                    <View style={{ backgroundColor: "#12232E", alignItems: "center" }} >
                        <Icon
                            name="tools"
                            type="entypo"
                            size={20}
                            reverse
                            containerStyle={{
                                left: "42.5%"
                            }}
                            color="#f50"

                            onPress={() => {
                                setMaintenanceVisible(true)
                            }}
                        />
                        <DialogInput
                            style={{ width: "80%" }}
                            isDialogVisible={maintenanceVisible}
                            title={"Request Maintenance for Sensor"}
                            message={
                                <>
                                    <Button
                                        onPress={() => setShow(true)}
                                        title="Set Maintenance Date"
                                    />
                                    {'  '}
                                    <Button
                                        title={maintenanceDate.toLocaleDateString()}
                                        value={maintenanceDate.toLocaleDateString()}
                                        disabled
                                    />
                                    {
                                        show
                                        &&
                                        <>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={maintenanceDate}
                                                mode={"date"}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange}
                                            />
                                        </>
                                    }
                                    {maintenanceAlert
                                        &&
                                        <Text style={[styles.alert, { fontSize: 14 }]}>{'\n\n'}Please enter a comment explaining the issue</Text>
                                    }
                                </>
                            }
                            value={message}
                            submitInput={(inputText) => {
                                setMaintenanceMessage(inputText)
                                createMaintenance(inputText)
                                setShow(false)
                            }
                            }
                            closeDialog={() => {
                                setMaintenanceVisible(false),
                                    setMaintenanceMessage(""),
                                    setMaintenanceAlert(false)
                                setShow(false)
                                setMaintenanceDate(new Date())
                            }
                            }
                            onTouchOutside={() => {
                                setMaintenanceVisible(false);
                                setShow(false)
                                setMaintenanceDate(new Date())
                            }}
                        >
                        </DialogInput>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    space: {
        width: 0, // or whatever size you need
        height: 5,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#12232E"
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#EEFBFB",
        borderRadius: 10,
        borderBottomColor: "black",
        borderWidth: 2
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
    TextInput: {
        width: 200,
        height: 50,
        fontSize: 15,
        padding: 10,
        color: "#12232E",
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
    alert: {
        color: "red",
        textAlign: "center"
    },
});
