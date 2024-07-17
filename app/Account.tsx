import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FIREBASE_AUTH } from "../FireBaseConf";



const Account = () => {
      const navigation = useNavigation(); 
      const auth = FIREBASE_AUTH;

      const HandleLogOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("WelcomeScreen");
          })
          .catch((error) => {
            console.error(error);
          });
      };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/images/profil.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{auth.currentUser?.displayName}</Text>
          <Text style={styles.textEmail}>{auth.currentUser?.email}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.listingContainer}
        onPress={() => {
          navigation.navigate("My Listings");
        }}
      >
        <View style={styles.iconListContainer}>
          <Icon name="list" style={styles.Listicon} />
        </View>
        <Text style={styles.listingText}>My Listings</Text>
        <Icon name="keyboard-arrow-right" style={styles.arrowIcon} />
      </TouchableOpacity>

      <View style={styles.lineBreak} />

      <TouchableOpacity
        style={styles.messageContainer}
        onPress={() => {
          navigation.navigate("My Messages");
        }}
      >
        <View style={styles.iconMsgContainer}>
          <Icon name="mail" style={styles.Msgicon} />
        </View>
        <Text style={styles.listingText}>My Messages</Text>
        <Icon name="keyboard-arrow-right" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.LogOutContainer} onPress={HandleLogOut}>
        <View style={styles.iconLogOutContainer}>
          <Icon name="output" style={styles.LogOuticon} />
        </View>
        <Text style={styles.listingText}>Log Out</Text>
        <Icon name="keyboard-arrow-right" style={styles.arrowIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  profileContainer: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#333",
    paddingBottom: 5,
  },
  textEmail: {
    fontSize: 14,
    color: "grey",
  },
  listingContainer: {
    backgroundColor: "#fff",
    marginTop: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  iconListContainer: {
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  Listicon: {
    color: "#fff",
    fontSize: 30,
  },
  listingText: {
    marginLeft: 20,
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  arrowIcon: {
    color: "#888",
    fontSize: 30,
  },
  messageContainer: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  Msgicon: {
    color: "#fff",
    fontSize: 25,
  },
  iconMsgContainer: {
    backgroundColor: "#4ecdc4",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  LogOutContainer: {
    marginTop: 80,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  LogOuticon: {
    color: "#fff",
    fontSize: 25,
  },
  iconLogOutContainer: {
    backgroundColor: "gold",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  lineBreak: {
    height: 5,
  },
});
