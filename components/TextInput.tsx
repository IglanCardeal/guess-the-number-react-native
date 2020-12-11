import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  [propName: string]: any; //para receber atributos dinamicamente com {...props}
  style: {
    borderColor: string;
    width: number | string;
  };
}

const TextInputField: React.FC<Props> = (props) => {
  return (
    <TextInput {...props} style={{ ...styles.textInput, ...props.style }} />
  );
};

const styles = StyleSheet.create({
  textInput: {
    // borderColor: '#000',
    // width: '30%',
    marginTop: 10,
    marginBottom: 30,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
});

export default TextInputField;