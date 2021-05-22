import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import fontFamily from '../styles/fontFamily';

interface Props {
  onPress: () => void;
  title: string;
  style: {
    backgroundColor: string;
    width: number | string;
    color: string;
    fontSize: number;
    [propName: string]: any;
  };
}

/**
 *
 * @param props contém atributos de funcionalidades
 * `onPress`, título e estilização do botão.
 * @returns `TouchableOpacity`
 */
const AppButton: React.FC<Props> = (props) => {
  const { style, onPress, title } = props;
  const { color, fontSize } = style;

  return (
    <TouchableOpacity style={{ ...styles.button, ...style }} onPress={onPress}>
      <Text style={{ ...styles.buttonText, color, fontSize}}>{title}</Text>
    </TouchableOpacity>
  );
};

const blackShadow = '#0000';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    // --- IOS ---
    shadowColor: blackShadow,
    shadowOffset: {
      height: 3,
      width: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.26,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: fontFamily.text
  }
});

export default AppButton;
