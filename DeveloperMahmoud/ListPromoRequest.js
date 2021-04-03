import React, { useContext, useState, useEffect } from "react";
import { ImageBackground, TouchableOpacity, Text, Image, ScrollView, TextInput } from "react-native";
import { View } from "../components/Themed";
import { Card, ListItem, Button } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";
import styles from './SmartStyle'
import UserContext from "../UserContext";
import db from '../db'
import { useFocusEffect } from "@react-navigation/native";
import { CardItem } from "native-base";

export default function ListPromoRequest({ request, promo }) {
    const [requestUser, setRequestUser] = useState(null);
    useEffect(() => db.Users.listenOne(setRequestUser, request.userId), [request]);

    const process = async (status) => {
        await db.Promotions.ActivePromotions.updateActivePromo(promo, request.id, { ...request, Status: status });
        await db.Users.Notifications.createNotification(requestUser.id,
            {
                userId: requestUser.id,
                message: 'Your maintenance promotion has been processed successfully!',
                date: new Date(),
                isRead: false
            }
        )
    };

    return (
        <ListItem key={request.id} containerStyle={styles.listRequest}>
            <Text>{requestUser ? requestUser.name : 'Retrieving name'}</Text>
            <Text>{request.Status}</Text>
            <Button
                onPress={() => process('Processed')}
                title="Process"
                buttonStyle={styles.processPromoButton}
            />
        </ListItem>
    );
}

