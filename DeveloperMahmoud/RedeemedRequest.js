import React, { useContext, useState, useEffect } from "react";
import { ImageBackground, TouchableOpacity, Text, Image, ScrollView, TextInput } from "react-native";
import { View } from "../components/Themed";
import { Card, ListItem } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";
import styles from './SmartStyle'
import UserContext from "../UserContext";
import db from '../db'
import { useFocusEffect } from "@react-navigation/native";
import { CardItem } from "native-base";
import ListPromoRequest from "./ListPromoRequest";

export default function RedeemedRequest({ request }) {

    const [checkPromotion, setPromotion] = useState([]);
    useEffect(() => {
        db.Promotions.ActivePromotions.listenToAll(setPromotion, request.id)
    }, []);

    // console.log("request", request);
    // console.log("checkPromotion", checkPromotion);

    return (
        <Card containerStyle={styles.redeemCard}>
            <Card.Title style={styles.redeemTitle}>
                {request.name}
            </Card.Title>
            <Image style={styles.redeemImage} source={{ uri: request.image }} />
            {
                    checkPromotion.map((req, i) => (
                        req.Status == 'on hold'
                        &&
                        <ListPromoRequest key={i} request={req} promo={request.id} />
                    )
                    )
            }
        </Card>
    );
}

