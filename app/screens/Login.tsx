import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FireBaseConf";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR } from "../styles/style";

const logo = require("../../assets/images/logo.png");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
   const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
       (navigation as any).replace("MainApp");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    try {

      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase Auth Response:", response);
       const token = await response.user.getIdToken();
       
       await AsyncStorage.setItem("userToken", token);
      Alert.alert("Login successful");
    } catch (error) {
      console.error(error);
      Alert.alert("Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="#C7C8CC" style={styles.icon} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="email@example.com"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#C7C8CC" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
       
          <View style={styles.login}>
            <TouchableOpacity onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textLogin}>SIGN IN</Text>
              )}
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
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
  inputContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.inputsColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    width:"100%",
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%", 
  },
  login: {
    padding: 5,
    width: 350,
    height: 50,
    backgroundColor: COLOR.primary,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center", 
    alignItems: "center", 
  },
  text: {
    color: "#000",
    padding: 10,
    textAlign: "center",
  },
  textLogin: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Login;
