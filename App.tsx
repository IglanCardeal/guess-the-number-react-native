import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  };

  const restartGameHandler = () => {
    setUserNumber(0);
  };

  const screen = userNumber ? (
    <GameScreen userChoice={userNumber} restartGame={restartGameHandler} />
  ) : (
    <StartGameScreen startGame={startGameHandler} />
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
