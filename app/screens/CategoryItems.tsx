import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../FireBaseConf";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLOR } from "../styles/style";

interface Items {
  id: string;
  photos: string[];
  title: string;
  price: string;
  description: string;
  sellerName: string;
  category: string;
  SellerId: string;
}

interface Props {
  category: string;
}

const CategoryItems: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<Items[]>([]);
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState("Is this still available?");
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(FIRESTORE_DB, "Categories"),
        where("category", "==", category)
      ),
      (querySnapshot) => {
        const itemsData: Items[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        }) as Items[];
        setItems(itemsData);
      },
      (error) => {
        console.error(`Error fetching ${category}: `, error);
      }
    );

    return () => unsubscribe();
  }, [category]);

  const handleItemPress = (item: Items) => {
    setSelectedItem(item);
    setModalVisible(true);
    setDescriptionVisible(!!item.description);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    setMessageSent(false);
  };

  const handleContactSeller = async () => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    if (!selectedItem) {
      console.error("No item selected.");
      return;
    }

    if (!selectedItem.SellerId) {
      console.error("Selected item does not have a sellerId.");
      return;
    }

    const messageData = {
      senderId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName,
      recipientId: selectedItem.SellerId,
      message: message,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(FIRESTORE_DB, "Messages"), messageData);
      setMessageSent(true);
      console.log("Message sent successfully.");
      setTimeout(() => {
        setMessage("Is this still available");
      }, 3000);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) {
      console.error("No item selected.");
      return;
    }

    try {
      await deleteDoc(doc(FIRESTORE_DB, "Categories", selectedItem.id));
      setItems(items.filter((item) => item.id !== selectedItem.id));
      handleCloseModal();
      Alert.alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item: ", error);
      Alert.alert("Error deleting item.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {items.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.photos[0] }} style={styles.image} />
              <View style={styles.imageTextContainer}>
                <Text style={styles.imageName}>{item.title}</Text>
                <Text style={styles.imagePrice}>{item.price} $</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedItem && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={handleCloseModal}
              >
                <Ionicons name="close" size={25} color="#fff" />
              </TouchableOpacity>
              <KeyboardAwareScrollView>
                <Image
                  source={{ uri: selectedItem.photos[0] }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalPrice}>{selectedItem.price} $</Text>
                {descriptionVisible && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionContent}>
                      {selectedItem.description}
                    </Text>
                  </View>
                )}
                <View style={styles.profileContainer}>
                  <Image
                    source={require("../../assets/images/profile.png")}
                    style={styles.profileImage}
                  />
                  <View>
                    <Text style={styles.profileName}>
                      {selectedItem.sellerName}
                    </Text>
                    <Text style={styles.profileDetails}>
                      Additional details
                    </Text>
                  </View>
                </View>
                <View style={styles.contactContainer}>
                  {messageSent && (
                    <Text style={styles.successMessage}>
                      Message sent to seller 
                    </Text>
                  )}
                  {auth.currentUser?.uid === selectedItem.SellerId ? (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDeleteItem}
                    >
                      <Text style={styles.deleteButtonText}>Delete Item</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TextInput
                        style={styles.contactInput}
                        value={message}
                        onChangeText={setMessage}
                      />
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={handleContactSeller}
                      >
                        <Text style={styles.contactButtonText}>
                          Contact Seller
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    width: 330,
    height: 350,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  imageTextContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  imageName: {
    color: "#000",
    fontSize: 16,
    paddingBottom: 5,
  },
  imagePrice: {
    color: COLOR.secondary,
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    position: "relative",
  },
  closeIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    zIndex: 1,
  },
  modalImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  modalTitle: {
    marginLeft: 20,
    fontSize: 20,
    marginBottom: 10,
  },
  modalPrice: {
    marginLeft: 20,
    fontSize: 20,
    color: COLOR.secondary,
    marginBottom: 15,
  },
  descriptionContainer: {
    marginLeft: 20,
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    color: COLOR.primary,
    marginBottom: 7,
  },
  descriptionContent: {
    fontSize: 15,
    color: "grey",
  },
  profileContainer: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
  },
  profileDetails: {
    fontSize: 14,
    color: "gray",
  },
  contactContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  successMessage: {
    color: "#7FC82F",
    marginBottom: 10,
    fontSize: 15,
  },
  contactInput: {
    width: "90%",
    padding: 15,
    backgroundColor: "#EFECEC",
    borderRadius: 25,
    marginBottom: 15,
  },
  contactButton: {
    backgroundColor: COLOR.primary,
    padding: 15,
    borderRadius: 25,
    width: "90%",
  },
  contactButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#FF4D4D",
    padding: 15,
    borderRadius: 25,
    width: "90%",
    marginBottom: 15,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CategoryItems;
