import React, { useState, useEffect } from "react";
import { ScrollView, ImageBackground } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, AirbnbRating, Rating } from "react-native-elements";
import Review from "./Review";

export default function Reviews({ route }) {

    const { reviewCategory } = route.params;
    console.log("revsssss");
    const [reviews, setReviews] = useState([]);
    useEffect(() => db.Categories.Reviews.listenToAll(setReviews, reviewCategory.id), [reviewCategory]);

    const [user, setUser] = useState([]);
    useEffect(() => db.Users.listenOne(setUser, reviewCategory.userId), [reviewCategory])

    return (
        <SafeAreaProvider style={styles.container}>

            <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {reviews.length !== 0 ? (
                        <>
                            {reviews.map((c) => (
                                <Review key={c.id} review={c} />
                            ))}
                        </>
                    ) : (
                        <Text
                            style={{
                                fontSize: 15,
                                color: "white",
                                marginTop: "60%",
                                textAlign: 'center'
                            }}
                        >
                            0 Reviews
                        </Text>
                    )}
                </ScrollView>

            </ImageBackground>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "transparent",
    },
    container1: {
        height: 300,
        width: 300,
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 60,
        color: "white"
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: "center",
        color: "black",
        // display: "flex",
        height: 30,
        width: 100,
        borderRadius: 4,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#99ceea",
        shadowColor: "white",
        shadowOpacity: 0.4,
        padding: 5,
        margin: 2,
        marginLeft: 10,
    },
    helpLinkText4: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
    },
    helpLinkText3: {
        textAlign: "center",
        color: "black",
        // display: "flex",
        height: 30,
        width: 100,
        borderRadius: 4,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#99ceea",
        shadowColor: "white",
        shadowOpacity: 0.4,
        padding: 5,
        margin: 2,
        marginLeft: 15,
    },
    helpLinkText1: {
        textAlign: "center",
        color: "black",
        // display: "flex",
        height: 30,
        width: 100,
        borderRadius: 4,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#99ceea",
        shadowColor: "white",
        shadowOpacity: 0.4,
        padding: 5,
        margin: 2,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 0,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
