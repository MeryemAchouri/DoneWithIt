import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../styles/style";
import { StackNavigationProp } from "@react-navigation/stack";

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any, any>; 
};

const logo = require("../../assets/images/logo.png");

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/backgroundimg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
        <Text>Sell What you don't Need</Text>
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.SignIn}>LOG IN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.RegisterButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")} >
          <Text style={styles.SignIn} >REGISTER</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: COLOR.primary,
    justifyContent: "center",
  },
  RegisterButton: {
    width: "100%",
    height: 70,
    backgroundColor: COLOR.secondary,
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  SignIn: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
