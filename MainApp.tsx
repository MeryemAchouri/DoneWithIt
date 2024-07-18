import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FeedTopTabs from "./app/screens/Feed";
import Listings from "./app/AddItems/Listings";
import Account from "./app/screens/Account";
import { COLOR } from "./app/styles/style";
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor = focused ? COLOR.primary : "gray";

          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Listings") {
            iconName = "add-circle";
            iconColor = COLOR.primary;
          } else {
            iconName = ""; 
          }

          return (
            <Ionicons name={iconName as any} size={size} color={iconColor} />
          );
        },
        tabBarActiveTintColor: COLOR.primary,
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
            <Ionicons name="add-circle" size={52} color = {COLOR.primary} />
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

export default MainApp;
