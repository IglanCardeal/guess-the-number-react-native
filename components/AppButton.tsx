import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  style: {
    backgroundColor: string;
    width: number | string;
    color: string;
    fontSize: number;
  };
}

const AppButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.style }}
      onPress={props.onPress}
    >
      <Text
        style={{ color: props.style.color, fontSize: props.style.fontSize }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    // --- IOS ---
    shadowColor: 'black',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.26,
    borderRadius: 10,
  },
});

export default AppButton;
