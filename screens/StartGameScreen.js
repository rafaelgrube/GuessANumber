import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Colors from '../contants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import PrimaryButton from '../components/PrimaryButton';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
  setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHanlder = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
  const chosenNumber = parseInt(enteredValue);

  if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
    Alert.alert(
      "Invalid Number",
      "Number has to be a number between 0 and 99.",
      [{ text: "Okay", style: "destructive", onPress: resetInputHanlder }]
    );
    return
  };

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <PrimaryButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </PrimaryButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText>Start a New Game!</TitleText>

        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
              title="Reset"
              onPress={resetInputHanlder}
              color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>

        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 10,
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
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: 300,
  }
});

export default StartGameScreen;
