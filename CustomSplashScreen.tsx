import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";

interface CustomSplashScreenProps {
  navigation: any; // Adjust type according to your navigation setup
}

const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({
  navigation,
}) => {
  useEffect(() => {
    setTimeout(() => {
      // Navigate to the next screen after splash screen duration
      navigation.replace("MainScreen"); // Replace with your screen name
    }, 3000); // Example: Splash screen displays for 3 seconds
  }, []);

  return (
    <ImageBackground
      source={require("./assets/prelogo.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Welcome to My App</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CustomSplashScreen;
