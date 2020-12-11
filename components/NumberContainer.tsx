import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FontSize from '../constants/fontSize';

interface Props {
  numberValue: number;
}

const NumberContainer: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.numberValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#fff',
  },
  text: {
    fontSize: FontSize.general,
    color: '#fff',
  },
});

export default NumberContainer;
