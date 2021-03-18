'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
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
    }
})