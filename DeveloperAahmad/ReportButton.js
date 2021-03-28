import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { View, Text } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon, AirbnbRating } from "react-native-elements";
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import db from '../db'
import DialogInput from 'react-native-dialog-input';


export default function ReportButton({ user, category, sensor }) {

    const [reviewVisible, setReviewVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [alert, setAlert] = useState(false)
    const [reviewAlert, setReviewAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [reviewMessage, setReviewMessage] = useState("")
    console.log(reviewMessage)
    const [rating, setRating] = useState(0)



    const createRequest = async (sensor, msg) => {
        console.log(msg, "=--==")

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
            console.log("else:", sensor.id);
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

    return (
        <SafeAreaProvider style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={true}>

                <View style={{ backgroundColor:"#12232E",flexDirection:"row", alignSelf:"center",}}>
                <View style={{backgroundColor:"#12232E", alignItems:"center"}} >
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
                    {
                            alert
                            &&
                            <Text style={styles.alert}>Please enter a message</Text>
                        }
                    </DialogInput>
                </View>


                <View style={{backgroundColor:"#12232E" , marginHorizontal:20, }}>
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
                    {/* <Dialog
                        style={{ width: "80%" }}
                        visible={reviewVisible}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="CANCEL"
                                    onPress={() => {
                                        setReviewVisible(false),
                                            setReviewMessage(""),
                                            setReviewAlert(false)
                                    }
                                    }
                                />
                                <DialogButton
                                    text="OK"
                                    onPress={() => {
                                        createReview(category, reviewMessage)
                                    }
                                    }
                                />
                            </DialogFooter>
                        }
                        onTouchOutside={() => {
                            setReviewVisible(false);
                        }}
                    >
                        <DialogContent>
                            <TextInput
                                style={{ fontSize: 15, alignItems: "center" }}
                                style={styles.TextInput}
                                placeholder="Leave your review here ..."
                                value={reviewMessage}
                                onChangeText={(value) => setReviewMessage(value)}
                            />
                            <AirbnbRating
                                count={5}
                                reviews={["Horrible", "Bad", "Average", "Good", "Perfect"]}
                                defaultRating={1}
                                size={20}
                                onPress={setRating}
                                onFinishRating={rating => setRating(rating)}
                            />
                            {
                                reviewAlert
                                &&
                                <Text style={styles.alert}>Please enter a review</Text>
                            }
                        </DialogContent>
                    </Dialog> */}


                    <DialogInput
                        style={{ width: "80%" }}
                        isDialogVisible={reviewVisible}
                        title={"Report This Sensor"}
                        message={
                            <AirbnbRating
                            count={5}
                            reviews={["Horrible", "Bad", "Average", "Good", "Perfect"]}
                            defaultRating={1}
                            size={20}
                            onPress={setRating}
                            onFinishRating={rating => setRating(rating)}
                        />
                        }
                        submitInput={(inputText) => {
                            // setReviewMessage(inputText),
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
