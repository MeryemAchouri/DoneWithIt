import React, { useEffect, useState, useRef } from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "./app/screens/Welcome";
import Login from "./app/screens/Login";
import Account from "./app/Account";
import Listings from "./app/AddItems/Listings";
import FeedTopTabs from "./app/feedTopTabs";
import Register from "./app/screens/Register";
import MyListings from "./app/AddItems/MyListings";
import MyMessages from "./app/AddItems/MyMessages";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerTintColor: "#fc5c65",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerTintColor: "#fc5c65",
          }}
        />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerTintColor: "#fc5c65",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="My Listings"
          component={MyListings}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerLeft: () => (
              <Ionicons
                name="chevron-back"
                size={35}
                color="#fc5c65"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="My Messages"
          component={MyMessages}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerLeft: () => (
              <Ionicons
                name="chevron-back"
                size={35}
                color="#fc5c65"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const MainApp = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor = focused ? "#fc5c65" : "gray";

          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Listings") {
            iconName = "add-circle";
            iconColor = "#fc5c65";
          }

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: "#fc5c65",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedTopTabs}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Tab.Screen
        name="Listings"
        component={Listings}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size }) => (
            <Ionicons name="add-circle" size={55} color="#fc5c65" />
          ),
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        component={Account}
        name="Account"
        options={{ headerTitle: "", headerTransparent: true }}
      />
    </Tab.Navigator>
  );
};
