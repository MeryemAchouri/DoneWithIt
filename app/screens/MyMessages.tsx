import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../FireBaseConf";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  message: string;
  timestamp: any;
}

type RootStackParamList = {
  Account: { refreshMessages: boolean };
};

const MyMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(FIRESTORE_DB, "Messages"),
          where("recipientId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const messagesData: Message[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, [auth.currentUser]);

  const handleDelete = async (id: string) => {
    try {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this message?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const messageRef = doc(collection(FIRESTORE_DB, "Messages"), id);
              await deleteDoc(messageRef);
              navigation.navigate("Account", { refreshMessages: true });
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  const renderMessage = (message: Message) => {
    const swipeRightActions = () => (
      <TouchableOpacity
        onPress={() => handleDelete(message.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={25} color="white" />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={swipeRightActions}>
        <View key={message.id} style={styles.messageContainer}>
          <View style={styles.messageContent}>
            <Text style={styles.senderName}>{message.senderName}</Text>
            <Text style={styles.messageText}>{message.message}</Text>
            <Text style={styles.timestamp}>
              {message.timestamp?.toDate
                ? new Date(message.timestamp.toDate()).toLocaleString()
                : "Loading..."}
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={25} color="grey" />
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {messages.map((message) => renderMessage(message))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 14,
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  arrowContainer: {
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#FF2E2E",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "90%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteText: {
    marginTop: 5,
    color: "#fff",
  },
});

export default MyMessages;
