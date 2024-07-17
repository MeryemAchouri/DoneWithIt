import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./screens/Feed";
import Account from "./Account";
const Tab = createBottomTabNavigator();

const BottomTaps = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Account" component={Account} />
      {/* Add more tabs/screens as needed */}
    </Tab.Navigator>
  );
};

export default BottomTaps;
