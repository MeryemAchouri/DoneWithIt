import React, { useState ,useEffect} from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FireBaseConf";

const logo = require("../../assets/images/logo.png");

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("MainApp");
      }
    });

    return () => unsubscribe();
  }, []);
  const handleRegister = async () => {
    try {
      setLoading(true);
      // Ensure passwords match before proceeding
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response)
    await updateProfile(response.user, { displayName: username });
      Alert.alert("registration successful")
      // Assuming successful registration, navigate to another screen
    } catch (error:any) {
      console.error(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#C7C8CC" style={styles.icon} />
          <TextInput
            value={username}
            onChangeText={setUserName}
            style={styles.input}
            placeholder="Username"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="#C7C8CC" style={styles.icon} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email@example.com"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#C7C8CC" style={styles.icon} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#C7C8CC" style={styles.icon} />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.login} onPress={handleRegister}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textLogin}>SIGN UP</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
    backgroundColor: "#EFECEC",
    borderRadius: 50,
    paddingHorizontal: 10,
    width: 350,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%", // Ensure TextInput takes full height of its container
  },
  login: {
    padding: 5,
    width: 350,
    height: 50,
    backgroundColor: "#fc5c65",
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center", // Ensure text is centered vertically
    alignItems: "center", // Ensure text is centered horizontally
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
