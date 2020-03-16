import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import BodyText from '../components/BodyText';
import Colors from '../contants/colors';
import PrimaryButton from '../components/PrimaryButton';
import TitleText from '../components/TitleText';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/success.png")}
          // source={{ uri: 'https://www.mountain-forecast.com/images/mtn_home.jpg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>
      <PrimaryButton onPress={props.onRestart}>New Game</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flex: 1,
    justifyContent: "center"
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderColor: "black",
    borderRadius: 100,
    borderWidth: 2,
    height: 200,
    marginBottom: 20,
    overflow: 'hidden',
    width: 200,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
  }
});

export default GameOverScreen;