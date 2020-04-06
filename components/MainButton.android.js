import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  TouchableNativeFeedbackComponent,
  Button,
} from "react-native";

import Colors from "../contants/colors";

const PrimaryOutlineButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedbackComponent;
  }

  return (
    <View class={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    borderColor: Colors.primary,
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: Colors.primary,
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default PrimaryOutlineButton;
