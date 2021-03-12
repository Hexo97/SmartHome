import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements'


import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
// @ts-expect-error
import MarketingHomeScreen from '../../DeveloperAisha/MarketingHomeScreen';
// @ts-expect-error
import AdsAction from '../../DeveloperHanan/AdsAction';
// @ts-expect-error
import SettingsScreen from '../../DeveloperHanan/SettingsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
          options={{
            // @ts-expect-error
            tabBarIcon: ({ color }) => <Icon name="home" color="black"size={25} />,
        }}
      />
      <BottomTab.Screen
        name="AdsAction"
        component={TabTwoNavigator}
        
        options={{
               // @ts-expect-error
               tabBarIcon: ({ color }) => <Icon name="advertisement" color="black"size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabThreeNavigator}
        options={{
                // @ts-expect-error
                tabBarIcon: ({ color }) => <Icon name="settings" color="black"size={25} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  // @ts-expect-error
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={MarketingHomeScreen}
        options={{ headerTitle: 'Home' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="AdsAction"
        component={AdsAction}
        options={{ headerTitle: 'Ads', headerShown:false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabThreeStack.Navigator>
  );
}