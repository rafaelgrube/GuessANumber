import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from "react-native";

import BodyText from "../components/BodyText";
import Colors from "../contants/colors";
import PrimaryButton from "../components/PrimaryButton";
import TitleText from "../components/TitleText";

const GameOverScreen = props => {

  // Variables
  const [avaiableDeviceWidth, setAvaiableDeviceWidth] = useState(Dimensions.get('window').width);
  const [avaiableDeviceHeight, setAvaiableDeviceHeight] = useState(Dimensions.get('window').height);

  // Logics
  useEffect(() => {
    const updateLayout = () => {
      setAvaiableDeviceWidth(Dimensions.get('window').width);
      setAvaiableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return (() => { Dimensions.removeEventListener('change', updateLayout); });
  });

  // View
  return (
    <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is Over!</TitleText>
          <View
            style={{
              ...styles.imageContainer,
              ...{
                width:
                  avaiableDeviceWidth > 350
                    ? avaiableDeviceWidth * 0.3
                    : avaiableDeviceWidth * 0.7,
                height:
                  avaiableDeviceWidth > 350
                    ? avaiableDeviceWidth * 0.3
                    : avaiableDeviceWidth * 0.7,
                borderRadius:
                  (avaiableDeviceWidth > 350
                    ? avaiableDeviceWidth * 0.3
                    : avaiableDeviceWidth * 0.7) / 2,
                marginBottom: avaiableDeviceHeight / 30
              }
            }}
          >
            <Image
              source={require("../assets/success.png")}
              // source={{ uri: 'https://www.mountain-forecast.com/images/mtn_home.jpg' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              ...styles.resultContainer,
              ...{ marginVertical: avaiableDeviceHeight / 60 }
            }}
          >
            <BodyText
              style={{
                ...styles.resultText,
                ...{ fontSize: avaiableDeviceHeight < 400 ? 16 : 20 }
              }}
            >
              Your phone needed{" "}
              <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
              to guess the number{" "}
              <Text style={styles.highlight}>{props.userNumber}</Text>.
            </BodyText>
          </View>
          <PrimaryButton onPress={props.onRestart}>New Game</PrimaryButton>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#f9f9f9"
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10
  },
  image: {
    height: "100%",
    width: "100%"
  },
  imageContainer: {
    borderColor: "black",
    borderWidth: 2,
    overflow: "hidden",
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: "center"
  }
});

export default GameOverScreen;
