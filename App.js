import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import NavigationCustomer from "./navigation/customer";
import NavigationAdmin from "./navigation/admin";
import NavigationSupport from "./navigation/support";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

import fb from "./fb";
import db from "./db";
import UserContext from "./UserContext";
import NavigationMarketing from './navigation/marketing';
import "./SampleData";
import Home from "./DeveloperHanan/Home";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [user, setUser] = useState(null); // store db user, not auth user
  
  

  // run once, set listener to auth user state
  useEffect(() => {
    // listener for auth state:
    // 1 - cancel db user listener
    // 2 - if non-null auth user,  start new db user listener

    let dbUnsubscribe = () => { }; // initially, do nothing

    const findAndSetUser = async (user) => {
      dbUnsubscribe();
      if (user) {
        dbUnsubscribe = db.Users.listenOne(setUser, user.uid);
      } else {
        dbUnsubscribe = () => { };
        setUser(null);
      }
    };

    const authUnsubscribe = fb.auth().onAuthStateChanged(findAndSetUser);

    return () => {
      authUnsubscribe();
      dbUnsubscribe();
    };
  }, []);


  const selectNavigation = () => {
    if (!user) {
      return <Home />;
    } else if (user?.role === "Customer") {
      return <NavigationCustomer colorScheme={'dark'} />;
    } else if (user?.role === "Admin") {
      return <NavigationAdmin colorScheme={'dark'} />;
    } else if (user?.role === "Support") {
      return <NavigationSupport colorScheme={'dark'} />;
    } else if (user?.role === "Marketing") {
      return <NavigationMarketing colorScheme={'dark'} />
    } else {
      fb.auth().signOut()
      return null
    }
  };

  return (
    isLoadingComplete && (
      <UserContext.Provider value={{ user }}>
        <SafeAreaProvider>
          {selectNavigation()}
          <StatusBar />
        </SafeAreaProvider>
      </UserContext.Provider>
    )
  );
}
