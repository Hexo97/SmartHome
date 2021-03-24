import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, AirbnbRating, Rating } from "react-native-elements";

export default function Review({ review }) {

    const [user, setUser] = useState([]);
    useEffect(() => db.Users.listenOne(setUser, review.userId), [])

    return (
        <>
            <View style={styles.container} key={review.id}>
                <Card>
                    <Card.Title
                        style={{
                            backgroundColor: "#4DA8DA",
                            color: "black",
                            fontWeight: "bold",
                        }}
                    >
                        <Text key={review.id}> Customer: {user.name}</Text>
                    </Card.Title>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "black",
                            fontWeight: "bold",
                            fontStyle: "italic",
                        }}
                    >
                        <Text key={review.id}> Review: {review.reviewMsg} </Text>
                    </Text>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad", "OK", "Good", "Perfect", "Done"]}
                        defaultRating={review.rating}
                        size={20}
                        onFinishRating={review.rating}
                        disabled
                    />
                </Card>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#203647",
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
        marginLeft: "39.8%",
        fontWeight: "bold",
    },
});
