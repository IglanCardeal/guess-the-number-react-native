import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const restartGameHandler = () => {
    setUserNumber(0);
    setGuessRounds(0);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds: number) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  let screen =
    userNumber > 0 && !gameIsOver ? (
      <GameScreen
        userChoice={userNumber}
        restartGame={restartGameHandler}
        gameOver={gameOverHandler}
      />
    ) : (
      <StartGameScreen startGame={startGameHandler} />
    );

  screen =
    guessRounds > 0 && gameIsOver ? (
      <GameOverScreen
        restartGame={restartGameHandler}
        numberOfRounds={guessRounds}
        userNumber={userNumber}
      />
    ) : (
      screen
    );

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header title="Guess a Number Game" />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});
