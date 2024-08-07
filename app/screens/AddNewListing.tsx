import React, { useState, useEffect } from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FireBaseConf";
import { COLOR } from "../styles/style";

const Listings = () => {
  const auth = FIREBASE_AUTH;
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sellerName, setSellerName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setSellerName(auth.currentUser.displayName || "");
    }
  }, [auth.currentUser]);
   
  const categories = [
    { name: "Books", icon: "book", color: "lightblue" },
    { name: "Cameras", icon: "camera", color: "gold" },
    { name: "Clothing", icon: "shopping-bag", color: "#7AC74F" },
    { name: "Games", icon: "videogame-asset", color: "violet" },
    { name: "Sports", icon: "sports-soccer", color: "tomato" },
    { name: "Others", icon: "more-horiz", color: "#A5A5A5" },
  ];

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };


  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setModalVisible(false);
  };

  const handlePost = async () => {
    if (!title || !price || !category || photos.length === 0) {
      alert("Please fill all the fields and add at least one photo.");
      return;
    }

    const SellerId = auth.currentUser?.uid;

    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "Categories"), {
        photos,
        title,
        price,
        category,
        description,
        sellerName,
        SellerId,
        createdAt: serverTimestamp(),
      });
   
      console.log("Document written with ID: ", docRef.id); // Log document ID for debugging
      alert("Item posted successfully!");

      // Reset form fields after successful posting
      setPhotos([]);
      setTitle("");
      setPrice("");
      setCategory("");
      setDescription("");
    } catch (error: any) {
      console.error("Error posting item: ", error);
      alert("Error posting item: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Listing</Text>
      <View style={styles.imageRow}>
        <TouchableOpacity style={styles.imagePicker} onPress={chooseImage}>
          <Ionicons name="camera" size={30} color="gray" />
        </TouchableOpacity>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          horizontal={true}
          contentContainerStyle={styles.imageList}
        />
      </View>
      <View style={styles.inputTitleContainer}>
        <MaterialIcons name="create" size={20} color="#C7C8CC" />
        <TextInput
          style={styles.inputTitle}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputPriceContainer}>
        <MaterialIcons name="attach-money" size={20} color="#C7C8CC" />
        <TextInput
          style={styles.inputPrice}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={styles.inputCategoryContainer}>
        <MaterialIcons name="local-offer" size={20} color="#C7C8CC" />
        <Pressable
          style={styles.inputCategory}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 17, color: category ? "#000000" : "#AAAA" }}>
            {category || "Category"}
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <View style={styles.categoryIconsContainer}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.categoryButton, { borderColor: cat.color }]}
                  onPress={() => handleCategorySelect(cat.name)}
                >
                  <View
                    style={{
                      backgroundColor: cat.color,
                      padding: 10,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      height: 80,
                    }}
                  >
                    <MaterialIcons name={cat.icon} size={50} color="#fff" />
                  </View>
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.inputTitleContainer}>
        <MaterialIcons name="apps" size={20} color="#C7C8CC" />
        <TextInput
          style={styles.inputTitle}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.Post}>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.textPost}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    marginVertical: 20,
    textAlign: "left",
    fontWeight: "bold",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePicker: {
    width: 100,
    height: 110,
    marginTop: 16,
    borderRadius: 10,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: COLOR.inputsColor,
    marginRight: 10,
  },
  imageList: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 110,
    margin: 5,
    borderRadius: 10,
  },
  inputTitleContainer: {
    margin: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.inputsColor,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 350,
    height: 50,
  },
  inputPriceContainer: {
    margin: 5,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.inputsColor,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 120,
    height: 50,
  },
  inputCategoryContainer: {
    marginBottom: 10,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.inputsColor,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 200,
    height: 50,
  },
  inputTitle: {
    flex: 1,
    marginLeft: 7,
    fontSize: 17,
  },
  inputPrice: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
  },
  inputCategory: {
    flex: 1,
    marginLeft: 7,
    fontSize: 17,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 700,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    justifyContent: "flex-end",
  },
  categoryIconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  categoryButton: {
    alignItems: "center",
    margin: 10,
  },
  categoryText: {
    marginTop: 5,
  },
  Post: {
    padding: 10,
    justifyContent: "center",
    width: 350,
    height: 50,
    backgroundColor: "#fc5c65",
    borderRadius: 50,
    margin: 5,
    marginTop: 15,
  },

  textPost: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },
});
