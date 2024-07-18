import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FireBaseConf";
import { collection, query, where, getDocs } from "firebase/firestore";
import { COLOR } from "../styles/style";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackParamList = {
  WelcomeScreen: undefined;
  "My Listings": undefined;
  "My Messages": undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
const Account = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const auth = FIREBASE_AUTH;
  const isFocused = useIsFocused();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(FIRESTORE_DB, "Messages"),
          where("recipientId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        setUnreadMessagesCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching unread messages count: ", error);
      }
    };

    fetchUnreadMessagesCount();
  }, [auth.currentUser, isFocused]);

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
          source={require("../../assets/images/profil.png")}
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
          {unreadMessagesCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadMessagesCount}</Text>
            </View>
          )}
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
    backgroundColor: COLOR.primary,
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
    backgroundColor: COLOR.secondary,
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Position relative for badge positioning
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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

export default Account;
