import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "../contants/colors";

const PrimaryOutlineButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
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
