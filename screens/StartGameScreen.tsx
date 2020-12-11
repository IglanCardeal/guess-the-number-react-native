import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import AppButton from '../components/AppButton';
import Card from '../components/Card';
import TextInputField from '../components/TextInput';
import NumberContainer from '../components/NumberContainer';

import Colors from '../constants/colors';
import FontSize from '../constants/fontSize';

interface Props {}

const StartGameScreen: React.FC<Props> = (props) => {
  const [inputNumber, setInputNumber] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [enteredValue, setEnteredValue] = useState<number>(0);

  const inputFieldHandler = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');

    setInputNumber(onlyNumbers);
  };

  const resetInputHandler = () => {
    setInputNumber('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const number = parseInt(inputNumber);
    const notValidNumber = Boolean(isNaN(number) || number <= 0 || number > 99);

    if (notValidNumber) {
      Alert.alert('Invalid number', 'Enter a number between 1 and 99.', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler },
      ]);

      return;
    }

    setEnteredValue(number);
    setConfirmed(true);
    setInputNumber('');

    dismissKeyboard();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  let outputText;

  if (confirmed) {
    outputText = (
      <Card style={styles.outputContainer}>
        <Text style={styles.outputContainerTitle}>Chosen number:</Text>
        <NumberContainer numberValue={enteredValue}/>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>

        <Card style={styles.inputContainer}>
          <Text style={styles.inputContainerText}>Select a number: </Text>
          <TextInputField
            style={styles.inputField}
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            value={inputNumber}
            onChangeText={inputFieldHandler}
          />
          <View style={styles.buttonContainer}>
            <AppButton
              style={styles.resetButton}
              onPress={resetInputHandler}
              title="Reset"
            />
            <AppButton
              style={styles.confirmButton}
              onPress={confirmInputHandler}
              title="Confirm"
            />
          </View>
        </Card>

        {outputText}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.h2,
    marginVertical: 20,
  },
  inputContainer: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center',
  },
  inputContainerText: {
    fontSize: FontSize.general,
  },
  inputField: {
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    fontSize: FontSize.general,
    width: '30%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  resetButton: {
    backgroundColor: Colors.buttons.primary_color,
    width: 100,
    color: '#fff',
    fontSize: FontSize.buttons,
  },
  confirmButton: {
    backgroundColor: Colors.buttons.secondary_color,
    width: 150,
    color: '#fff',
    fontSize: FontSize.buttons,
  },
  outputContainer: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#da387d',
    paddingVertical: 20,
  },
  outputContainerTitle: {
    fontSize: FontSize.general,
    color: '#fff',
  },
});

export default StartGameScreen;
