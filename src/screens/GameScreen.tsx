import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import AppButton from '../components/AppButton';
import ButtonsContainer from '../components/ButtonsContainer';

import Colors from '../styles/colors';
import FontSize from '../styles/fontSize';

import generateRandomBetween from '../utils/generateRandomBetween';

interface Props {
  userChoice: number;
  restartGame: () => void;
  gameOver: (numberOfRounds: number) => void;
}

const GameScreen: React.FC<Props> = (props) => {
  const [currentGuess, setCurrentGuess] = useState<number>(
    generateRandomBetween(1, 100, props.userChoice),
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const numberOfRounds = useRef(0);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      return props.gameOver(numberOfRounds.current);
    }
  }, [currentGuess]);

  const nextGuessHandler = (direction: string) => {
    const lowerIsLie = Boolean(
      direction === 'lower' && currentGuess < props.userChoice,
    );
    const greaterIsLie = Boolean(
      direction === 'greater' && currentGuess > props.userChoice,
    );

    if (lowerIsLie || greaterIsLie) {
      return Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {
          text: 'Sorry',
          style: 'cancel',
        },
      ]);
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    }

    if (direction === 'greater') {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );

    setCurrentGuess(nextNumber);

    numberOfRounds.current = numberOfRounds.current + 1;
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.result}>
        <Text style={styles.title}>Opponent's Guess</Text>
        <NumberContainer
          numberValue={currentGuess}
          textColor={`${Colors.textColor.secondary_color}`}
          borderColor={`${Colors.textColor.secondary_color}`}
        />
        <ButtonsContainer>
          <AppButton
            onPress={() => nextGuessHandler('lower')}
            style={styles.lowerButton}
            title="Lower"
          />
          <AppButton
            onPress={() => nextGuessHandler('greater')}
            style={styles.greaterButton}
            title="Greater"
          />
        </ButtonsContainer>
      </Card>
      <View>
        <AppButton
          onPress={() => props.restartGame()}
          style={styles.restarButton}
          title="Restart Game"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  result: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center',
  },
  title: {
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.general,
  },
  lowerButton: {
    backgroundColor: Colors.buttons.secondary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general,
  },
  greaterButton: {
    backgroundColor: Colors.buttons.primary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general,
  },
  restarButton: {
    backgroundColor: '#ffcbbe',
    width: 200,
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.general,
    marginTop: 20,
  },
});

export default GameScreen;
