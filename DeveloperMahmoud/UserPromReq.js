import React, { useContext, useState, useEffect } from "react";
import { ImageBackground, TouchableOpacity, Text, Image, ScrollView, TextInput } from "react-native";
import { View } from "../components/Themed";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";
import styles from './SmartStyle'
import RedeemedRequest from './RedeemedRequest'
import UserContext from "../UserContext";
import db from '../db'
import { useFocusEffect } from "@react-navigation/native";

export default function UserPromReq() {

    const [checkPromotion, setPromotion] = useState([]);
    useEffect(() => {
        db.Promotions.listenToActiveByMaintenance(setPromotion)
    }, []);


    console.log("checkPromotion", { ...checkPromotion });
    console.log("length", checkPromotion.length);

    return (
        <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>

            <SafeAreaProvider style={styles.redeemContainer}>
                <View style={styles.Promotioncontainer}>
                    {
                        checkPromotion.length > 0 ?
                            checkPromotion.map((one, i) =>
                            (
                                <RedeemedRequest key={i} request={one} />
                            )
                            )
                            :
                            <Text>No Requests</Text>
                    }
                </View>
            </SafeAreaProvider >
        </ImageBackground>
    );
}

