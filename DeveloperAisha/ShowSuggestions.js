import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View } from '../components/Themed';
import { Button , Avatar , Badge} from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from '../UserContext'
import db from '../db'
import fb from '../fb'
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, ListItem,Input  } from 'react-native-elements'

export default function SuggestionList({navigation}) {
  const { user } = useContext(UserContext)

  const[suggestions , setSuggestions] = useState([])
  useEffect(() => db.Users.SuggestionList.listenToUserSuggestion(setSuggestions, user.id),[user])

  const deleteSuggestion = async (listId) =>
  {
      await db.Users.SuggestionList.removeUserSuggestList(user.id,listId)
  }
  return (
    <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                suggestions.length > 0
                ?
                <View style= {{ backgroundColor:"#007CC7", marginHorizontal:50, marginLeft:30,marginRight:20, alignSelf:"center", width:350}}>
                <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'black',textAlign:"center",marginTop:10, fontSize:15 }}>YOUR SUGGESTIONS</Text>
                {
                    suggestions.map((s, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                        <ListItem.Subtitle>{s.suggest}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content>
                        <ListItem.Subtitle>{s.color}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content>
                        <ListItem.Subtitle>{s.suggestDate}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content>
                        <IconButton
                            icon="delete"
                            color={Colors.pink300}
                            size={25}
                            onPress= { () => deleteSuggestion(s.id)}
                        />
                        </ListItem.Content>
                    </ListItem>
                    ))
                }
                </View>
                :
                <View style= {{ backgroundColor:"#932432", marginHorizontal:50, marginLeft:30,marginRight:20, alignSelf:"center", width:350}}>
                    <Text style= {{ fontWeight:"bold", fontStyle:"italic" ,color: 'white',textAlign:"center",marginTop:10, fontSize:15 }}>NOTHING TO SHOW</Text>
                </View>
            }
        </ScrollView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:"#EEFBFB"
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
  // activityIndicator: {
  //     backgroundColor: "#CABFAB",
  //     padding: 4,
  //     height: 12,
  //     width: 12,
  //     borderRadius: 6,
  //     marginTop: 3,
  //     marginRight: 20
  // },
});
