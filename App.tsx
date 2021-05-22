/* eslint-disable no-console */
/* eslint-disable global-require */
import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import Header from './src/components/Header'
import StartGameScreen from './src/screens/StartGameScreen'
import GameScreen from './src/screens/GameScreen'
import GameOverScreen from './src/screens/GameOverScreen'

export default function App () {
  const [fontLoaded, error] = useFonts({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf')
  })
  const [userNumber, setUserNumber] = useState(0)
  const [gameIsOver, setGameIsOver] = useState(false)
  const [guessRounds, setGuessRounds] = useState(0)

  if (error) {
    console.log('[FONT ERROR]: ', error)
    return (
      <View>
        <Text>Font loading error...</Text>
      </View>
    )
  }

  if (!fontLoaded) {
    return (
      <View>
        <Text>App loading</Text>
      </View>
    )
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const restartGameHandler = () => {
    setUserNumber(0)
    setGuessRounds(0)
    setGameIsOver(false)
  }

  // funcao que vai ser usadao pelo GameScreen para quando
  // houver o evento de gameover
  const gameOverHandler = (numberOfRounds: number) => {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  // determina a tela se o jogo comecou ou não
  let screen =
    userNumber > 0 && !gameIsOver ? (
      <GameScreen
        userChoice={userNumber}
        restartGame={restartGameHandler}
        gameOver={gameOverHandler}
      />
    ) : (
      <StartGameScreen startGame={startGameHandler} />
    )

  // caso seja gameover, screen recebe a tela do mesmo
  screen =
    guessRounds > 0 && gameIsOver ? (
      <GameOverScreen
        restartGame={restartGameHandler}
        numberOfRounds={guessRounds}
        userNumber={userNumber}
      />
    ) : (
      screen
    )

  return (
    <View style={styles.screen}>
      <StatusBar style='auto' />
      <Header title='Guess a Number Game' />
      {screen}
    </View>
  )
}

const whiteBg = '#fff'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: whiteBg,
    flexDirection: 'column'
  }
})
