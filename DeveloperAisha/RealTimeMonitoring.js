import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ListItem } from 'react-native-elements'
import db from '../db';
import { Picker } from '@react-native-picker/picker';
import ProgressCircle from 'react-native-progress-circle'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginLogs from './LoginLogs'
import RegisterLogs from './RegisterLogs'
import LogoutLogs from './LogoutLogs'

export default function RealTimeMonitoring() {

    const [logins, setLogins] = useState([])
    useEffect(() => db.RealTimeMonitoring.listenAll(setLogins), [])

    const [allLogins, setAllLogins] = useState([])
    useEffect(() => logins.length !== "" && setAllLogins(logins.filter(login => login.activity === "Login")), [logins])

    const [allRegisters, setAllRegisters] = useState([])
    useEffect(() => logins.length !== "" && setAllRegisters(logins.filter(login => login.activity === "Register")), [logins])
    
    const [allLogouts, setAllLogouts] = useState([])
    useEffect(() => logins.length !== "" && setAllLogouts(logins.filter(login => login.activity === "Logout")), [logins])

    const[userType , setUserType] = useState("")
    

    // const[sorted, setSorted] = useState("")
    // const filter = async (userType, sorted) => {
    //     loginsCopy = await db.TrackingSystem.findAll()
    //     setSorted(sorted)
    //     if (sorted) {
    //         setLogins(loginsCopy.sort((first, second) => (
    //             new Date(second.activityDate) - new Date(first.activityDate)
    //         )))
    //     }
    // }

    return (
        <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style= {{ backgroundColor:"#4DA8DA", height:50, margin:5, marginBottom:10}}>
        <Text style= {{ color: 'black',textAlign:"center",marginTop:10, fontSize:18 }}> REAL TIME MONITORING</Text>
        </View>

        {/* <View style={{marginLeft:20, marginRight:20}}>
        <ListItem bottomDivider>
        <ListItem.Content>
                <ListItem.Title>{"Total Logout"}</ListItem.Title>
                {
                allLogins
                &&
                <ProgressCircle
                percent={allLogins.length}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 18 }}>{allLogins.length}</Text>
                </ProgressCircle>
                }
                </ListItem.Content>
                <ListItem.Content>
                <ListItem.Title>{"Total Logouts"}</ListItem.Title>
                {
                allLogouts
                &&
                <ProgressCircle
                percent={allLogouts.length}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 18 }}>{allLogouts.length}</Text>
                </ProgressCircle>
                }
        </ListItem.Content>
        </ListItem>
        </View> */}

        <View style= {{marginTop:20, marginBottom:5}}>
        <Text style= {{ color: '#fff',textAlign:"center", fontSize:15 }}>Track user's daily sign in activity by the user type here.</Text>
        </View>
        
        <View style={styles.getStartedContainer}>
        <Picker
            selectedValue={userType}
            style={{ height: 50, width: 200  }}
            selectedValue={userType}
            onValueChange={setUserType}
        >
            <Picker.Item label="Check User Login Here...." value="userType" />
            <Picker.Item label="Register" value="Register" />
            <Picker.Item label="Login" value="Login" />
            <Picker.Item label="Logout" value="Logout" />
        </Picker> 
        </View>

        <View>
        <Text>
        {
          userType
          &&
          userType === "Login"
          &&
          <LoginLogs setLogins={allLogins} />
        }
        </Text>
        </View>

        <View>
        <Text>
        {
          userType
          &&
          userType === "Register"
          &&
          <RegisterLogs setRegister={allRegisters} />
        }
        </Text>
        </View>

        <View>
        <Text>
        {
          userType
          &&
          userType === "Logout"
          &&
          <LogoutLogs setLogout={allLogouts} />
        }
        </Text>
        </View>
        </ScrollView>
        </SafeAreaProvider>
       
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor:"#12232E"
    },
    rowContainer:{
        flex: 1,
        flexDirection: "row",
        backgroundColor:"#12232E",
        margin:10
    },
    text: {
        color: "#EEFBFB",
        backgroundColor:"#12232E"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        backgroundColor:"#12232E"
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        backgroundColor:"#12232E",
    },
    subText: {
        fontSize: 12,
        color: "#EEFBFB",
        textTransform: "uppercase",
        fontWeight: "500",
        backgroundColor:"#12232E"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor:"#FFFFFF"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    space: {
      width: 0, // or whatever size you need
      height: 7,
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer: {
        alignSelf: "center",
        // backgroundColor:"#12232E",
        marginTop: 16
    },
    dm: {
      backgroundColor: "#55C21B",
      position: "absolute",
      top: 20,
      width: 30,
      height: 30,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1,
        backgroundColor:"#12232E"
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10,
        backgroundColor:"#12232E"
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color:"white",
        backgroundColor:"#4DA8DA"
      },
      getStartedContainer: {
        alignItems: "center",
        marginHorizontal:30,
        marginTop:5,
        marginBottom:5,
        backgroundColor:"#EEFBFB",
        borderRadius: 10,
        borderBottomColor: "black",
        borderWidth: 2
      },
      check: {
        alignItems: "center",
        // alignSelf:"center",
        backgroundColor:"#EEFBFB",
        marginHorizontal:50,
        borderRadius: 10,
        borderBottomColor: "black",
        borderWidth: 2,
      }
  });