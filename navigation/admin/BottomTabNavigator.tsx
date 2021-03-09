import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements'

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
// @ts-expect-error
import AdminHomeScreen from '../../DeveloperAisha/AdminHomeScreen';
// @ts-expect-error
import AdminDashboardScreen from '../../DeveloperAisha/AdminDashboardScreen';
// @ts-expect-error
import ActionsScreen from '../../DeveloperHanan/ActionsScreen';
// @ts-expect-error
import SettingsScreen from '../../DeveloperHanan/SettingsScreen';
import RealTimeMonitoring from '../../DeveloperAisha/RealTimeMonitoring';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList ,TabFourParamList, TabFiveParamList} from './types';

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
          tabBarIcon: ({ color }) => <Icon name="home" color="black"size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Dashboard"
        component={TabTwoNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="pie-chart" color="black"size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Actions"
        component={TabThreeNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="monitor" color="black"size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabFourNavigator}
        options={{
                    // @ts-expect-error
                    tabBarIcon: ({ color }) => <Icon name="settings" color="black"size={30} />,
        }}
      />
      <BottomTab.Screen
        name="UserTrack"
        component={TabFiveNavigator}
        options={{
             // @ts-expect-error
             tabBarIcon: ({ color }) => <Icon name="login" color="black"size={30} />,
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
        component={AdminHomeScreen}
        options={{ headerTitle: 'Dashboard' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="DashboardScreen"
        component={AdminDashboardScreen}
        options={{ headerTitle: 'Dashboard' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="ActionsScreen"
        component={ActionsScreen}
        options={{ headerTitle: 'Actions' }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabFourStack.Navigator>
  );
}

const TabFiveStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
  return (
    <TabFiveStack.Navigator>
      <TabFiveStack.Screen
        name="UserTrack"
        component={RealTimeMonitoring}
        options={{ headerTitle: 'UserTrack' }}
      />
    </TabFiveStack.Navigator>
  );
}