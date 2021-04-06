import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, ScrollView } from "react-native";
import { View } from '../components/Themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from '../UserContext'
import db from '../db'
import { Icon, ListItem } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';

export default function suggestionforSupport() {
    const { user } = useContext(UserContext)

    const [suggestionType, setSuggestionType] = useState("")
    const [allState, setAllState] = useState(false)

    const [users, setUsers] = useState([])
    useEffect(() => db.Users.listenAll(setUsers), [])

    const [userid, setUserId] = useState("")

    // const [productsuggestions, setProductSuggestions] = useState([])
    // useEffect(() => userid ? db.Users.SuggestionList.listenToProductSuggestion(setProductSuggestions, userid) : undefined, [userid])

    const [productsuggestions, setProductSuggestions] = useState([])
    useEffect(() => db.Users.SuggestionList.listenToProductSuggestions(setProductSuggestions), [])

    // const [appsuggestions, setAppSuggestions] = useState([])
    // useEffect(() => userid ? db.Users.SuggestionList.listenToAppSuggestion(setAppSuggestions, userid) : undefined, [userid])

    const [appsuggestions, setAppSuggestions] = useState([])
    useEffect(() => db.Users.SuggestionList.listenToApplicationSuggestions(setAppSuggestions), [])

    // const [staffsuggestions, setStaffSuggestion] = useState([])
    // useEffect(() => userid ? db.Users.SuggestionList.listenToStaffSuggestion(setStaffSuggestion, userid) : undefined, [userid])
    const [staffsuggestions, setStaffSuggestion] = useState([])
    useEffect(() => db.Users.SuggestionList.listenToStaffSuggestions(setStaffSuggestion), [])

    return (
        <SafeAreaProvider style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', backgroundColor: "#EEFBFB", margin: 10 }}>
                    <Icon
                        reverse
                        name='heart'
                        type='ionicon'
                        color='#F06292'
                    />
                </View>
                <Text style={{ alignSelf: 'center', marginBottom: 30, backgroundColor: "#EEFBFB", fontSize: 20, fontWeight: "bold" }}>User Suggestions</Text>

                {/* <View style={styles.getStartedContainer}>
                    <Picker
                        style={{ height: 50, width: 200 }}
                        selectedValue={userid}
                        onValueChange={setUserId}
                    >
                        <Picker.Item label='Select Users' value="" />
                        {
                            users
                                .map(user => <Picker.Item key={user.id} label={user.name} value={user.id} />)
                        }
                    </Picker>
                </View> */}

                <Text style={{ marginLeft: 100 }}>
                    {
                        // userid
                        // &&
                        <View style={styles.getStartedContainer}>
                            <Picker
                                selectedValue={suggestionType}
                                style={{ height: 50, width: 200, color: "black" }}
                                selectedValue={suggestionType}
                                onValueChange={setSuggestionType}
                            >
                                <Picker.Item label="Select Suggestion Type" value="suggestionType" />
                                <Picker.Item label="Products" value="Products" />
                                <Picker.Item label="Application" value="Application" />
                                <Picker.Item label="Staff" value="Staff" />
                            </Picker>
                        </View>
                    }
                </Text>
                {
                    productsuggestions.length > 0
                    &&
                    suggestionType === "Products"
                    &&
                    <View style={{ backgroundColor: "#99ceea", marginHorizontal: 50, marginLeft: 30, marginRight: 20, alignSelf: "center", width: 350 }}>
                        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'black', textAlign: "center", marginTop: 10, fontSize: 15 }}>YOUR SUGGESTIONS</Text>
                       
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Suggestion</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Color</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Date</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Price</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
          
                        {
                            productsuggestions.map((s, i) => (
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
                                        <ListItem.Subtitle>{s.price}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                }
                {
                    appsuggestions.length > 0
                    &&
                    suggestionType === "Application"
                    &&
                    <View style={{ backgroundColor: "#99ceea", marginHorizontal: 50, marginLeft: 30, marginRight: 20, alignSelf: "center", width: 350 }}>
                        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'black', textAlign: "center", marginTop: 10, fontSize: 15 }}>YOUR SUGGESTIONS</Text>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Suggestion</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Date</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Improvement</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        {
                            appsuggestions.map((s, i) => (
                                <ListItem key={i} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>{s.suggest}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>{s.suggestDate}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>{s.improve}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                }
                {
                    staffsuggestions.length > 0
                    &&
                    suggestionType === "Staff"
                    &&
                    <View style={{ backgroundColor: "#99ceea", marginHorizontal: 50, marginLeft: 30, marginRight: 20, alignSelf: "center", width: 350 }}>
                        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'black', textAlign: "center", marginTop: 10, fontSize: 15 }}>YOUR SUGGESTIONS</Text>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Suggestion</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Date</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                            <ListItem.Title style={{color:"red", fontSize:12, fontWeight:"bold"}}>Staff</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        {
                            staffsuggestions.map((s, i) => (
                                <ListItem key={i} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>{s.improve}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>{s.suggestDate}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>{s.staff}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
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
        backgroundColor: "#EEFBFB"
    },
    text: {
        color: "#EEFBFB",
        backgroundColor: "#12232E"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        backgroundColor: "#12232E"
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        backgroundColor: "#12232E",
    },
    subText: {
        fontSize: 12,
        color: "#EEFBFB",
        textTransform: "uppercase",
        fontWeight: "500",
        backgroundColor: "#12232E"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: "#FFFFFF"
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
        backgroundColor: "#12232E"
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10,
        backgroundColor: "#12232E"
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
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: "skyblue",
        borderRadius: 10,
        borderWidth: 2
    },
});
