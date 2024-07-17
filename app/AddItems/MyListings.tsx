import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../FireBaseConf"; 

const MyListings = () => {
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchUserListings = async () => {
      const auth = FIREBASE_AUTH;
      if (!auth.currentUser) return;

      const q = query(
        collection(FIRESTORE_DB, "Categories"),
        where("sellerName", "==", auth.currentUser.displayName)
      );

      try {
        const querySnapshot = await getDocs(q);
        const listings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserListings(listings);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      }
    };

    fetchUserListings();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={{ uri: item.photos[0] }} style={styles.image} />
      <View style={styles.imageTextContainer}>
        <Text style={styles.imageName}>{item.title}</Text>
        <Text style={styles.imagePrice}>{item.price} $</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.background}>
      <FlatList
        data={userListings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollViewContainer} // Added contentContainerStyle
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
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
    color: "#4ecdc4",
    fontSize: 14,
  },
});

export default MyListings;
