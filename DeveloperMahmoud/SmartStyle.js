'use strict';
import { StyleSheet } from 'react-native';
// backgroundColor: 'rgba(255, 255, 255, 0.3)',

module.exports = StyleSheet.create({
    background: {
        flex: 1,
    },
    //LOGS STYLE:
    Logscontainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#12232E"
    },
    LogsViewTitle: {
        backgroundColor: "#4DA8DA",
        height: 50,
        margin: 5,
        marginBottom: 10
    },
    LogsTextTitle: {
        color: 'black',
        textAlign: "center",
        marginTop: 10,
        fontSize: 18
    },
    LogsViewDesc: {
        marginTop: 20,
        marginBottom: 5
    },
    LogsTextDesc: {
        color: '#fff',
        textAlign: "center",
        fontSize: 15
    },
    LogsViewLogs: {
        color: '#000000',
        backgroundColor: '#000000'
    },
    LogsTextLogs: {
        color: '#fff',
        textAlign: "left",
        fontSize: 15,
        fontFamily: 'Roboto'
    },
    LogsTextLogsMsgCreate: {
        color: 'green'
    },
    LogsTextLogsMsgReported: {
        color: 'yellow'
    },
    LogsTextLogsMsgRemoved: {
        color: 'red'
    },
    LogsTextLogsMsgReview: {
        color: 'lightblue'
    },
    LogsTextLogsMsgRequest: {
        color: 'orange'
    },
    //PROMOTION STYLE:
    processPromoButton: {

    },
    listRequest: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 30,
        height: 50
    },
    redeemCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'transparent',
        borderRadius: 30,
        width: 300
    },
    redeemImage: {
        width: 200,
        height: 160,
        marginLeft: "15%",
    },
    Promotioncontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    redeemContainer: {
        // flex: 1,
        backgroundColor: "transparent",
    },
    redeemDialogContent: {
        alignItems: "center",
        marginHorizontal: 50,
    },
    RedeemButton: {
        textAlign: "center",
        height: 30,
        width: 130,
        borderRadius: 4,
        backgroundColor: "#4DA8DA",
        shadowColor: "white",
        shadowOpacity: 0.4,
        padding: 5,
        margin: 2,
        marginLeft: 70,
    },
    redeemTitle: {
        // backgroundColor: "#4DA8DA",
        color: "white",
        fontWeight: "bold",
    },
    redeemWarning: {
        color: "red"
    },
    redeemDesc: {
        fontSize: 17,
        // backgroundColor: "#4DA8DA",
        color: "white",
        fontWeight: "bold",
    },
    redeemServDesc: {
        fontSize: 14,
        // backgroundColor: "#4DA8DA",
        color: "white",
    },
    AddPromoButton: {
        textAlign: "center",
        height: 30,
        // width: 100,
        borderRadius: 4,
        backgroundColor: "#4DA8DA",
        shadowColor: "white",
        shadowOpacity: 0.4,
        padding: 5,
        margin: 2,
        marginLeft: 20,
        marginRight: 20,
    },
    // ADMIN DASHBOARD SCREEN
    AdminDashScrncontainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#12232E"
    },
    AdminDashScrnspace: {
        width: 0, // or whatever size you need
        height: 20,
    },
    AdminDashScrnheadingText: {
        top: "9%",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    AdminDashScrnnavBar: {
        backgroundColor: "#007CC7",
        height: 50,
        alignItems: "center",
        marginBottom: 20
    },

})