import React from 'react';
import { StyleSheet, ScrollView } from "react-native";
import { View, Text } from '../components/Themed';
import db from '../db'
import { Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function PressureInfo({ sensor }) {

    const StopTheAlarm = async () => {
        await db.Sensors.update({ ...sensor, alarm: "off" })
    }
    const RingTheAlarm = async () => {
        await db.Sensors.update({ ...sensor, alarm: "Running" })
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ flexDirection: "row", backgroundColor: "#12232E", marginBottom: 10, marginTop: 10 }}>
                    <View style={{ backgroundColor: "#EAB9B9", alignSelf: "center", height: 150, marginHorizontal: 40 }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{ name: 'map-marker-alt', type: 'fontisto' }}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5 }}
                        />
                        <Text style={{ textAlign: "center", fontSize: 20, color: "black", fontWeight: "bold", fontStyle: 'italic' }}>{sensor?.location}</Text>
                    </View>

                    <View style={{ backgroundColor: "#FFDB58", alignSelf: "center", height: 150 }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{ name: 'universal-acces', type: 'fontisto' }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5 }}
                        />
                        <Text style={sensor.presenceDetected ? styles.getStartedGreen : styles.getStartedRed}> {sensor.pressureDetected ? "True" : "False"}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", backgroundColor: "#12232E", marginBottom: 10 }}>
                    <View style={{ backgroundColor: "#B1DC88", alignSelf: "center", height: 150, marginHorizontal: 40 }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{ name: 'bed-patient', type: 'fontisto' }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5 }}
                        />
                        {
                            sensor.pressureDetected
                                ?
                                <Text style={styles.getStartedGreen}>Awake</Text>
                                :
                                <Text style={styles.getStartedRed}>Sleeping</Text>
                        }
                    </View>

                    <View style={{ backgroundColor: "#7EDFDB", alignSelf: "center", height: 150 }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{ name: 'clock', type: 'fontisto' }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5 }}
                        />
                        <Text style={{ textAlign: "center", fontSize: 20, color: "black", fontWeight: "bold", fontStyle: 'italic' }}>{sensor?.alarm}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", backgroundColor: "#12232E", marginBottom: 10 }}>
                    <View style={{ backgroundColor: "#ff2a26", alignSelf: "center", height: 150, marginHorizontal: 40 }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{ name: 'volume-up', type: 'fontisto' }}
                            onPress={() => RingTheAlarm()}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5 }}
                        />
                        <Text style={{ textAlign: "center", fontSize: 20, color: "black", fontWeight: "bold", fontStyle: 'italic' }}>Ring Alarm</Text>
                    </View>
                    <View style={{ backgroundColor: "#ff2a26", alignSelf: "center", height: 150 }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{ name: 'volume-off', type: 'fontisto' }}
                            onPress={() => StopTheAlarm()}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5 }}
                        />
                        <Text style={{ textAlign: "center", fontSize: 20, color: "black", fontWeight: "bold", fontStyle: 'italic' }}>Stop Alarm</Text>
                    </View>
                </View>

                <View style={styles.space} />
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: '#12232E',
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: "bold"
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    space: {
        width: 0, // or whatever size you need
        height: 5,
    },
    getStartedGreen: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: 'green',
        fontWeight: "bold",
        fontStyle: 'italic'
    },
    getStartedRed: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: 'red',
        fontWeight: "bold",
        fontStyle: 'italic'
    },
});