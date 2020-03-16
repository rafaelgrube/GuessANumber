import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import Colors from '../contants/colors';

const PrimaryOutlineButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default PrimaryOutlineButton;