import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

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

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}: </BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {

  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [avaiableDeviceWidth, setAvaiableDeviceWidth] = useState(Dimensions.get('window').width);
  const [avaiableDeviceHeight, setAvaiableDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvaiableDeviceWidth(Dimensions.get('window').width);
      setAvaiableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => { Dimensions.removeEventListener('change', updateLayout); };
  });

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
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
  };

  let listContainerStyle = styles.listContainer;

  if (avaiableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (avaiableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <PrimaryOutlineButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} />
          </PrimaryOutlineButton>

          <NumberContainer>{currentGuess}</NumberContainer>

          <PrimaryOutlineButton
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Ionicons name="md-add" size={24} />
          </PrimaryOutlineButton>
        </View>

        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}>{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}</ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

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

      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}</ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    maxWidth: "80%",
    width: 300,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '90%'
  },
  list: {
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
    width: '100%'
  },
  screen: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 10,
  }
});

export default GameScreen;