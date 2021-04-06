import React, { useState, useEffect } from "react";
import { ImageBackground, Text } from "react-native";
import { View } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styles from './SmartStyle'
import RedeemedRequest from './RedeemedRequest'
import db from '../db'

export default function UserPromReq() {

    const [checkPromotion, setPromotion] = useState([]);
    useEffect(() => {
        db.Promotions.listenToActiveByMaintenance(setPromotion)
    }, []);

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

