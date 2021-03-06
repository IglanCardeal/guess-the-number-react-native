/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import AppButton from '../components/AppButton'
import Card from '../components/Card'
import TextInputField from '../components/TextInput'
import NumberContainer from '../components/NumberContainer'
import ButtonsContainer from '../components/ButtonsContainer'

import Colors from '../styles/colors'
import FontSize from '../styles/fontSize'
import FontFamily from '../styles/fontFamily'

interface Props {
  startGame: (value: number) => void
}

const StartGameScreen: React.FC<Props> = props => {
  const { startGame } = props

  const [inputNumber, setInputNumber] = useState<string>('')
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [enteredValue, setEnteredValue] = useState<number>(0)

  const inputFieldHandler = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '')

    setInputNumber(onlyNumbers)
  }

  const resetInputHandler = () => {
    setInputNumber('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const notValidNumber = checkIfIsValidNumber(inputNumber)

    if (notValidNumber) {
      Alert.alert('Invalid number', 'Enter a number between 1 and 99.', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler }
      ])
      return
    }

    dismissKeyboard()
    setEnteredValue(parseInt(inputNumber, 10))
    setConfirmed(true)
    setInputNumber('')
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  let outputText

  const startGameHandler = () => {
    startGame(enteredValue)
  }

  if (confirmed) {
    outputText = (
      <Card style={styles.outputContainer}>
        <Text style={styles.outputContainerTitle}>Chosen number:</Text>
        <NumberContainer numberValue={enteredValue} />
        <AppButton
          title='Start Game'
          onPress={startGameHandler}
          style={styles.startGameButton}
        />
      </Card>
    )
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
            keyboardType='numeric'
            maxLength={2}
            value={inputNumber}
            onChangeText={inputFieldHandler}
          />

          <ButtonsContainer>
            <AppButton
              style={styles.resetButton}
              onPress={resetInputHandler}
              title='Reset'
            />
            <AppButton
              style={styles.confirmButton}
              onPress={confirmInputHandler}
              title='Confirm'
            />
          </ButtonsContainer>
        </Card>

        {outputText}
      </View>
    </TouchableWithoutFeedback>
  )
}

const lightgreyColor = 'lightgrey'

const outputContainerBgColor = '#313638'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: FontSize.h2,
    marginVertical: 20,
    fontFamily: FontFamily.title
  },
  inputContainer: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center'
  },
  inputContainerText: {
    fontSize: FontSize.general,
    fontFamily: FontFamily.text
  },
  inputField: {
    borderColor: lightgreyColor,
    borderBottomWidth: 1,
    fontSize: FontSize.general,
    width: '30%',
    fontFamily: FontFamily.text
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   width: '100%',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 15,
  // },
  resetButton: {
    backgroundColor: Colors.buttons.secondary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.buttons
  },
  confirmButton: {
    backgroundColor: Colors.buttons.primary_color,
    width: 150,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.buttons
  },
  outputContainer: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: outputContainerBgColor,
    paddingVertical: 20
  },
  outputContainerTitle: {
    fontSize: FontSize.general,
    color: Colors.textColor.primary_color,
    fontFamily: FontFamily.title
  },
  startGameButton: {
    backgroundColor: Colors.buttons.primary_color,
    width: 150,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.buttons,
    marginVertical: 10,
    marginTop: 20
  }
})

export default StartGameScreen

function checkIfIsValidNumber (inputNumber: string): boolean {
  const number = parseInt(inputNumber, 10)
  const notValidNumber = Boolean(
    Number.isNaN(number) || number <= 0 || number > 99
  )

  return notValidNumber
}
