import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { COLOR } from "../styles/style";

import CategoryItems from "./CategoryItems";
const FeedTopTabs = () => {
  const [activeTab, setActiveTab] = useState("Books"); 

  const renderScreen = () => {
    switch (activeTab) {
      case "Books":
        return <CategoryItems category="Books" />;
      case "Clothing":
        return <CategoryItems category="Clothing" />;
      case "Games":
        return <CategoryItems category="Games" />;
      case "Cameras":
        return <CategoryItems category="Cameras" />;
      case "Sports":
        return <CategoryItems category="Sports" />;
      case "Others":
        return <CategoryItems category="Others" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === "Books" && styles.activeTab]}
            onPress={() => setActiveTab("Books")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Books" && styles.activeTabText,
              ]}
            >
              Books
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "Clothing" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Clothing")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Clothing" && styles.activeTabText,
              ]}
            >
              Clothing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === "Games" && styles.activeTab]}
            onPress={() => setActiveTab("Games")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Games" && styles.activeTabText,
              ]}
            >
              Games
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "Cameras" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Cameras")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Cameras" && styles.activeTabText,
              ]}
            >
              Cameras
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === "Sports" && styles.activeTab]}
            onPress={() => setActiveTab("Sports")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Sports" && styles.activeTabText,
              ]}
            >
              Sports
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === "Others" && styles.activeTab]}
            onPress={() => setActiveTab("Others")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Others" && styles.activeTabText,
              ]}
            >
              Others
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.screenContainer}>{renderScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
  },
  tabContainer: {
    marginTop: 70,
    marginLeft: 20,
    marginRight: 30,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  tabItem: {
    borderRadius: 30,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor:COLOR.secondary, 
  },
  activeTabText: {
    color: "#fff", // Text color for active tab
  },
  tabText: {
    fontSize: 14,
    color: "#000",
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default FeedTopTabs;
