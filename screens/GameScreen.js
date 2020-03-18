import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import DefaultStyles from '../contants/defaultStyles';
import NumberContainer from '../components/NumberContainer';
import PrimaryOutlineButton from '../components/PrimaryOutlineButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rdnNum = Math.floor((Math.random() * (max - min)) + min);

  if(rdnNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rdnNum;
  }
};

const renderListItem = (value, numberOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numberOfRound}: </BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [{text: 'Sorry', style: 'cancel'}]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <PrimaryOutlineButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} />
        </PrimaryOutlineButton>
        <PrimaryOutlineButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} />
        </PrimaryOutlineButton>
      </Card>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    maxWidth: "80%",
    width: 300,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
    width: '80%',
  },
  list: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    width: '60%'
  },
  screen: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 10,
  }
});

export default GameScreen;