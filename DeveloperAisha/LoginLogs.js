import React from "react";
import { StyleSheet,Text, View, ScrollView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Avatar } from 'react-native-elements'

export default function LoginLogs({setLogins}) {

return (
    <SafeAreaProvider style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
        {
            setLogins.length > 0
            ?
            <View>
            <View style= {{ backgroundColor:"#007CC7", height:30, marginHorizontal:50, marginLeft:30,marginRight:20, alignContent:"center", width:350}}>
            <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'black',textAlign:"center",marginTop:10, fontSize:15 }}>User Information</Text>
            </View>
        
            <View style= {{ backgroundColor:"#007CC7", marginHorizontal:50, marginLeft:30,marginRight:20, alignSelf:"center", width:350}}>
                    {
                        setLogins.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                            <ListItem.Title>{l.email}</ListItem.Title>
                            <ListItem.Subtitle>{l.activityDate.toDateString()}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        ))
                    }
            </View>
            </View>
        
            :
            <View style={{
                backgroundColor: '#932432',
                heigth:500,
                width:100,
                marginHorizontal:50,
              }}>
                  <Text style={{color:"white", fontWeight:"bold", fontSize:25}}>
                      No Data
                  </Text>
            </View>
        }


    </ScrollView>
    </SafeAreaProvider>
)}

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
  });
  