import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../contants/colors';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
          <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.accent,
        borderRadius: 10,
        borderWidth: 2,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
    }
});

export default NumberContainer;