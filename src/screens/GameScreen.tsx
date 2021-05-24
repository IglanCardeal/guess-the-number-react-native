import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import AppButton from '../components/AppButton'
import ButtonsContainer from '../components/ButtonsContainer'

import Colors from '../styles/colors'
import FontSize from '../styles/fontSize'
import FontFamily from '../styles/fontFamily'

import generateRandomBetween from '../utils/generateRandomBetween'

interface Props {
  userChoice: number
  restartGame: () => void
  gameOver: (numberOfRounds: number) => void
}

const GameScreen: React.FC<Props> = props => {
  const { userChoice } = props

  const [currentGuess, setCurrentGuess] = useState<number>(
    generateRandomBetween(1, 100, userChoice)
  )

  const currentLow = useRef(1)
  const currentHigh = useRef(100)
  const numberOfRounds = useRef(0)

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      // invoca a funcao do App.tsx que trata este evento
      props.gameOver(numberOfRounds.current)
    }
  }, [currentGuess])

  const nextGuessHandler = (direction: string) => {
    const { lowerIsLie, greaterIsLie } = checkIfUserIsLying({
      direction,
      currentGuess,
      userChoice
    })

    if (lowerIsLie || greaterIsLie) {
      return showAlertToUseInCaseOfLie()
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    }

    if (direction === 'greater') {
      currentLow.current = currentGuess
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )

    setCurrentGuess(nextNumber)

    numberOfRounds.current += 1
  }

  const restartGameHandler = () => {
    props.restartGame()
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.result}>
        <Text style={styles.title}>Opponent&apos;s Guess</Text>

        <NumberContainer
          numberValue={currentGuess}
          textColor={`${Colors.textColor.secondary_color}`}
          borderColor={`${Colors.textColor.secondary_color}`}
        />

        <ButtonsContainer>
          <AppButton
            onPress={() => nextGuessHandler('lower')}
            style={styles.lowerButton}
            title='Lower'
          />
          <AppButton
            onPress={() => nextGuessHandler('greater')}
            style={styles.greaterButton}
            title='Greater'
          />
        </ButtonsContainer>
      </Card>

      <View>
        <AppButton
          onPress={restartGameHandler}
          style={styles.restarButton}
          title='Restart Game'
        />
      </View>
    </View>
  )
}

const bgColor = '#ffcbbe'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  result: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center',
    fontFamily: FontFamily.text
  },
  title: {
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.general,
    fontFamily: FontFamily.title
  },
  lowerButton: {
    backgroundColor: Colors.buttons.secondary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general
  },
  greaterButton: {
    backgroundColor: Colors.buttons.primary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general
  },
  restarButton: {
    backgroundColor: bgColor,
    width: 200,
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.general,
    marginTop: 20
  }
})

export default GameScreen

type CheckIfUserIsLyingResponse = { lowerIsLie: boolean; greaterIsLie: boolean }
type CheckIfUserIsLyingParams = {
  direction: string
  currentGuess: number
  userChoice: number
}

function checkIfUserIsLying (
  params: CheckIfUserIsLyingParams
): CheckIfUserIsLyingResponse {
  const { direction, currentGuess, userChoice } = params

  const lowerIsLie = Boolean(direction === 'lower' && currentGuess < userChoice)
  const greaterIsLie = Boolean(
    direction === 'greater' && currentGuess > userChoice
  )

  return { lowerIsLie, greaterIsLie }
}

function showAlertToUseInCaseOfLie (): void {
  Alert.alert("Don't lie!", 'You know that this is wrong...', [
    {
      text: 'Sorry',
      style: 'cancel'
    }
  ])
}
