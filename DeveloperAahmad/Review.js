import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import db from "../db";
import { StyleSheet } from "react-native";
import { Card, AirbnbRating } from "react-native-elements";

export default function Review({ review }) {

    const [user, setUser] = useState([]);
    useEffect(() => db.Users.listenOne(setUser, review.userId), [])

    return (
        <>
            <View style={styles.container} key={review.id}>
                <Card containerStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    width:400
}}>
                    <Card.Title
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize:18
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
                        reviews={["Horrible", "Bad", "Average", "Good", "Perfect"]}
                        defaultRating={review.rating}
                        size={20}
                        isDisabled={true}
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
        backgroundColor: "transparent",
    },
    navBar: {
        backgroundColor: "#99ceea",
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
