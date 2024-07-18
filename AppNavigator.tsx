import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WelcomeScreen from "./app/screens/Welcome";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import MyListings from "./app/screens/MyListings";
import MyMessages from "./app/screens/MyMessages";
import MainApp from "./MainApp";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
