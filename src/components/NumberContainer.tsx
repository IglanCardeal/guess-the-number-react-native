import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FontSize from '../styles/fontSize';
import Colors from '../styles/colors';

interface Props {
  numberValue: number;
  borderColor?: string;
  textColor?: string;
}

const NumberContainer: React.FC<Props> = props => {
  const { numberValue, borderColor, textColor } = props;
  return (
    <View
      style={{
        ...styles.container,
        borderColor: borderColor || Colors.textColor.primary_color
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: textColor || Colors.textColor.primary_color
        }}
      >
        {numberValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: Colors.textColor.primary_color
  },
  text: {
    fontSize: FontSize.general,
    color: Colors.textColor.primary_color
  }
});

export default NumberContainer;
