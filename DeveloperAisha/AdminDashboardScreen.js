import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Text} from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import ProgressCircle from 'react-native-progress-circle'
import { ListItem, Avatar } from 'react-native-elements'
import db from '../db'
import StatisticsChart from './StatisticsChart'
import * as Progress from 'react-native-progress';

export default function AdminDashboardScreen() {

  const[categories, setCategories] = useState([])
  useEffect(() => db.Categories.listenAll(setCategories), [])

  const[sensors, setSensors] = useState([])
  useEffect(() => db.Sensors.listenAll(setSensors), [])

  const[users, setUsers] = useState([])
  useEffect(() => db.Users.listenAll(setUsers), [])

  const[marketing, setMarketing] = useState([])
  useEffect(() => db.Users.listenByRole(setMarketing , "Marketing"), [])

  const[support, setSupport] = useState([])
  useEffect(() => db.Users.listenByRole(setSupport , "Support"), [])

  const[finance, setFinance] = useState([])
  useEffect(() => db.Users.listenByRole(setFinance , "Finance"), [])

  const[userSensors , setUserSensors] = useState("")
  return (
    <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.navBar}>
        <Text style={styles.headingText}>Admin Dashboard</Text>
      </View>

        <View style= {{ backgroundColor:"#007CC7", height:30, marginRight:20, marginLeft:20}}>
                <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'black',textAlign:"center",marginTop:10, fontSize:15 }}>User Information</Text>
        </View>
        <View style={{marginLeft:20, marginRight:20}}>
            {
                users.map((u, i) => (
                <ListItem key={i} bottomDivider>
                    <Avatar source={{uri: u.url ? u.url : "https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"}} />
                    <ListItem.Content>
                    <ListItem.Title>{u.name}</ListItem.Title>
                    <ListItem.Subtitle>{u.role}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content>
                    <ListItem.Subtitle>                {
                        sensors.map((sensor,index) => sensor.userid == u.id && 
                        <Text key={index}>{index + index }</Text>)}
                    </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                ))
            }
            </View>

        <View style= {{ backgroundColor:"#007CC7", height:30, marginRight:20, marginLeft:20, marginTop:10}}>
            <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'black',textAlign:"center",marginTop:10, fontSize:15 }}>Data Statistics</Text>
        </View>
        <View style={{marginLeft:20, marginRight:20}}>
        <ListItem bottomDivider>
        <ListItem.Content>
                <ListItem.Title>{"Budget"}</ListItem.Title>
                {
                categories
                &&
                <ProgressCircle
                percent={categories.reduce((total, current) => total + current.price, 0)}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 18 }}>{categories.reduce((total, current) => total + current.price, 0)}</Text>
                </ProgressCircle>
                }
                <ListItem.Title>{"Services"}</ListItem.Title>
                {
                categories
                &&
                <ProgressCircle
                percent={categories.length}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 18 }}>{categories.length}</Text>
                </ProgressCircle>
                }
        </ListItem.Content>
        <ListItem.Content>

            {
                users.length > 0
                ?
                <>
                <ListItem.Title>{"Customers"}</ListItem.Title>
                <Progress.Bar progress={users.length/10} width={100} />
                <View style={styles.space}></View>
                </>
                :
                undefined
            }

                <ListItem.Title>{"Staff"}</ListItem.Title>

            {
                marketing.length > 0
                ?
                <>
                <ListItem.Subtitle>{"Finance"}</ListItem.Subtitle>
                <Progress.Bar progress={marketing.length/10} width={100} />
                </>
                :
                undefined
            }
            {
                finance.length > 0
                ?
                <>
                <ListItem.Subtitle>{"Finance"}</ListItem.Subtitle>
                <Progress.Bar progress={finance.length/10} width={100} />
                </>
                : 
                undefined
            }
            {
                support.length > 0 
                ?
                <>
                <ListItem.Subtitle>{"Support"}</ListItem.Subtitle>
                <Progress.Bar progress={support.length/10} width={100} />
                </>
                :
                undefined
            }
        </ListItem.Content>
        </ListItem>
        </View>
       
        <View style= {{ backgroundColor:"#007CC7", height:30, marginRight:20, marginLeft:20, marginTop:10}}>
            <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'black',textAlign:"center",marginTop:10, fontSize:15 }}>Services List</Text>
        </View>
        <View style={{marginLeft:20, marginRight:20}}>
            {
            categories.map((c, i) => (
            <ListItem key={i} bottomDivider>
                <Avatar source={{uri: c.image ? c.image : "https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"}} />
                <ListItem.Content>
                    <ListItem.Title>{c.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            ))
            }
        </View>

        <View style= {{ backgroundColor:"#007CC7", height:30, marginRight:20, marginLeft:20, marginTop:10}}>
            <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'black',textAlign:"center",marginTop:10, fontSize:15 }}>Company's Sensors</Text>
        </View>
        <View style={{marginLeft:20, marginRight:20}}>
            <ListItem bottomDivider>
                <ListItem.Content>
                <View style={styles.space}></View>
                <ListItem.Title style={{textAlign:"center", fontWeight:"bold"}}>{"Available Products"}</ListItem.Title>
                <ListItem.Subtitle style={{alignSelf:"center", fontWeight:"bold"}}>{sensors.length}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content>
                <View style={styles.space}></View>
                <Progress.Bar progress={sensors.length/10} width={100} />
                </ListItem.Content>
            </ListItem>
        </View>
        
        <View>
            <Card>
            <StatisticsChart/>
            </Card>
        </View>

       </ScrollView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:"#12232E"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor:"#12232E"
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
    height: 20,
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
  headingText: {
    top: "9%",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  navBar: {
    backgroundColor: "#007CC7",
    height: 50,
    alignItems: "center",
    marginBottom:20
  },
});

