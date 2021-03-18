import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet,  TextInput, ScrollView, Text } from "react-native";
import { View } from '../components/Themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from '../UserContext'
import db from '../db'
import { CheckBox } from 'react-native-elements'
import { IconButton, Colors } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';

export default function ProductSuggest({type}) {
  const { user } = useContext(UserContext)

  const [id, setId] = useState("");
  const [suggest, setSuggest] = useState("");
  const [suggestDate, setSuggestDate] = useState(new Date())
  const [color, setColor] = useState("")
  const[price , setPrice] = useState(0)

  const createSuggestion = async () =>
  {
    await db.Users.SuggestionList.createList(user.id,{suggest, color, type,price,suggestDate: new Date().toDateString()});
    setSuggest("")
    setSuggestDate("")
    setColor("")
    setPrice(0)
  }

  return (
    <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style= {{marginBottom:10, borderColor: "#F06292",borderWidth: 2,color: "#12232E",borderRadius: 15,marginHorizontal:50, marginLeft:30,marginRight:20, alignSelf:"center", width:350}}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter your suggestion"
                  placeholderTextColor="black"
                  value={suggest}
                  onChangeText={(value) => setSuggest(value)}
                />
        </View>
                
        <View style= {{ marginBottom:10, borderColor: "#F06292",borderWidth: 2,color: "#12232E",borderRadius: 15,marginHorizontal:50, marginLeft:30,marginRight:20, alignSelf:"center", width:350}}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Pick Favourite Color"
                  placeholderTextColor="black"
                  value={color}
                  onChangeText={(value) => setColor(value)}
                />
        </View>

        <View style={{alignSelf:"center" ,backgroundColor:"#EEFBFB"}}>
        <Text style={{alignSelf:'center',backgroundColor:"#EEFBFB", fontSize:20,fontWeight:"bold"}}>Suggest Price Range</Text>

        <RadioButton.Group onValueChange={value => setPrice(value)} value={price}>
            <RadioButton.Item label="QR50/month" value={50} />
            <RadioButton.Item label="QR100/month + 7 Days Free Trial" value={100} />
         </RadioButton.Group>
        </View>

                <View style={{alignSelf:"center" ,backgroundColor:"#EEFBFB"}}>
                <IconButton
                    icon="plus"
                    color={Colors.pink300}
                    size={40}
                    onPress={createSuggestion}
                />
                </View>

        </ScrollView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:"#EEFBFB",
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
   inputView: {
    borderColor: "#F06292",
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal:50,
    paddingTop: 0,
    height: 50,
    fontSize: 15,
    color: "#12232E",
    marginBottom: 20,
  },  
  TextInput: {
    width: "80%",
    height: 50,
    flex: 1,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
  },
  getStartedContainer: {
    alignItems: "center",
    marginTop:5,
    backgroundColor:"pink",
    borderRadius: 10,
    borderBottomColor: "black",
    borderWidth: 2,
    width: "75%",
    height: 50,
    borderColor: "#F06292",
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal:50,
    paddingTop: 0,
    height: 50,
    fontSize: 15,
    color: "#12232E",
    marginBottom: 20,
  },
});
