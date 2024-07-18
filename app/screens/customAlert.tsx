import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLOR } from "../styles/style";

const CustomAlert = ({ visible, message, onClose }) => {
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onClose()}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.alertContainer, { opacity: opacityInterpolate }]}
        >
          <Icon name="error" size={24} color={COLOR.error} />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={() => onClose()}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  message: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLOR.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomAlert;
