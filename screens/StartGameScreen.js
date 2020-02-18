import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Card from '../components/Card';

const StartGameScreen = props => {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <TextInput />
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={() => {}} />
            <Button title="Confirm" onPress={() => {}} />
          </View>
        </Card>
      </View>
    );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    alignItems: "center",
    width: 300,
    maxWidth: "80%"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%"
  },
});

export default StartGameScreen;
